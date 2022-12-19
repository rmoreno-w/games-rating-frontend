import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { apiClient } from '../../../services/axios';
import queryClient from '../../../services/reactQuery';
import { reviewType } from '../../../types/review';
import { apiTokenAtom, userNameAtom } from '../Header';

interface gameReviewsProps {
    gameRatingsByUsers: reviewType[];
    gameId: string;
}

export function GameReviews({ gameId, gameRatingsByUsers }: gameReviewsProps) {
    const [apiToken, setApiToken] = useAtom(apiTokenAtom);
    const [userName, setUserName] = useAtom(userNameAtom);

    const [newReviewRating, setNewReviewRating] = useState<undefined | number>();
    const [newReviewCommentary, setNewReviewCommentary] = useState('');

    function setRating(e: React.ChangeEvent<HTMLInputElement>) {
        let inputValue = parseInt(e.target.value);

        if (inputValue >= 0 && inputValue <= 10) {
            setNewReviewRating(inputValue);
        } else if (inputValue > 10) {
            setNewReviewRating(10);
        } else if (inputValue < 0) {
            setNewReviewRating(0);
        }
    }

    const { mutate, isSuccess } = useMutation(
        async () => {
            return apiClient
                .post(
                    'games/review',
                    {
                        game_id: gameId,
                        rating: newReviewRating,
                        description: newReviewCommentary,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${apiToken}`,
                        },
                    }
                )
                .then((apiReturn) => {
                    console.log(apiReturn);
                    setNewReviewCommentary('');
                    setNewReviewRating(undefined);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('gameRatingsByUsers');
            },
        }
    );

    useEffect(() => {
        setApiToken(window.localStorage.getItem('gamesRatingApiToken') || '');
        setUserName(window.localStorage.getItem('gamesRatingUserName') || '');
    }, []);

    function postRating(e: React.MouseEvent<HTMLButtonElement>) {
        mutate();
    }
    return (
        <>
            <ul className='list-disc marker:text-green-600'>
                {gameRatingsByUsers.map((gameReview) => (
                    <li key={gameReview._id} className='ml-8'>
                        Comentário: {gameReview.description} - Nota: <span className=''>{gameReview.rating}</span>
                    </li>
                ))}
            </ul>

            {apiToken ? (
                <form className='flex flex-col self-start w-1/2 gap-4'>
                    <p>Nos ajude a melhorar a avaliação deste jogo e dê você também a sua avaliação!</p>

                    <label className=''>Sua nota para o jogo (um numero de 0 a 10): </label>
                    <input
                        required
                        type='number'
                        value={newReviewRating}
                        onChange={(e) => setRating(e)}
                        className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                    />
                    <label className=''>Seu Comentário: </label>
                    <input
                        required
                        value={newReviewCommentary}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewReviewCommentary(e.target.value)}
                        className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                    />
                    <button
                        className='bg-green-600 p-2 desktop:p-3 rounded-md transition duration-300 font-bold hover:brightness-90 mt-4 focus:ring focus:ring-green-600/70 focus:ring-offset-2 focus:ring-offset-gray-700'
                        type='button'
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => postRating(event)}
                    >
                        Cadastrar minha avaliação
                    </button>
                    {isSuccess && <p className='text-green-600'>Avaliação cadastrada com sucesso!</p>}
                </form>
            ) : null}
        </>
    );
}