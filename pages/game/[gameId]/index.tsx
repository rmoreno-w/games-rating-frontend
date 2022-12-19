import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { apiClient } from '../../../services/axios';
import { Container } from '../../../src/components/Container';
import { GameReviews } from '../../../src/components/GameReviews';
import Loader from '../../../src/components/Loader';

const GameReview: NextPage = () => {
    const router = useRouter();

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
                        <p>Ainda não há reviews para este jogo.</p>
                    )}
                </>
            )}
        </Container>
    );
};

export default GameReview;
