import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { reviewType } from '../../../types/review';
import { CommentaryBox } from '../CommentaryBox';
import { apiTokenAtom, userNameAtom } from '../Header';

interface gameReviewsProps {
    gameRatingsByUsers: reviewType[];
    gameId: string;
}

export function GameReviews({ gameId, gameRatingsByUsers }: gameReviewsProps) {
    const [apiToken, setApiToken] = useAtom(apiTokenAtom);
    const [userName, setUserName] = useAtom(userNameAtom);

    useEffect(() => {
        setApiToken(window.localStorage.getItem('gamesRatingApiToken') || '');
        setUserName(window.localStorage.getItem('gamesRatingUserName') || '');
    }, []);

    return (
        <>
            <ul className='list-disc marker:text-green-600'>
                {gameRatingsByUsers.map((gameReview) => (
                    <li key={gameReview._id} className='ml-8'>
                        Comentário: {gameReview.description} - Nota: <span className=''>{gameReview.rating}</span>
                    </li>
                ))}
            </ul>
            <CommentaryBox apiToken={apiToken} gameId={gameId} />
        </>
    );
}
