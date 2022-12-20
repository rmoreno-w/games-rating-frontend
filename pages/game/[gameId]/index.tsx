import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { apiClient } from '../../../services/axios';
import { CommentaryBox } from '../../../src/components/CommentaryBox';
import { Container } from '../../../src/components/Container';
import { GameReviews } from '../../../src/components/GameReviews';
import { apiTokenAtom } from '../../../src/components/Header';
import Loader from '../../../src/components/Loader';

const GameReview: NextPage = () => {
    const router = useRouter();
    const [apiToken] = useAtom(apiTokenAtom);

    const {
        data: gameData,
        isFetching,
        refetch,
    } = useQuery('gameRatingsByUsers', async () => {
        let dataFromApi;
        router.isReady &&
            (dataFromApi = await apiClient
                .get(`/games/${router.query.gameId}`)
                .then((apiReturn) => {
                    return apiReturn.data;
                })
                .catch((error) => {
                    console.log(error);
                }));
        console.log(dataFromApi);
        return dataFromApi;
    });

    return (
        <Container>
            {isFetching ? (
                <Loader />
            ) : (
                <>
                    <h1 className='font-bold text-2xl'>
                        Reviews para <span className='text-green-600'>"</span>
                        {gameData.title}
                        <span className='text-green-600'>"</span>
                    </h1>
                    {gameData.reviews.length > 0 ? (
                        <GameReviews gameRatingsByUsers={gameData.reviews} gameId={gameData.id} />
                    ) : (
                        <>
                            <p>Ainda não há reviews para este jogo.</p>
                            <CommentaryBox apiToken={apiToken} gameId={gameData.id} />
                        </>
                    )}
                </>
            )}
        </Container>
    );
};

export default GameReview;
