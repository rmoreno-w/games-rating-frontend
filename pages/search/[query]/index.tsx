import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { apiClient } from '../../../services/axios';
import { Container } from '../../../src/components/Container';
import { GameCard } from '../../../src/components/GameCard';
import Loader from '../../../src/components/Loader';
import { gameInfoType } from '../../../types/gameInfo';

const GameReview: NextPage = () => {
    const router = useRouter();

    const {
        data: gamesData,
        isFetching,
        refetch,
    } = useQuery('gamesSearched', async () => {
        let dataFromApi = [];
        router.isReady &&
            (dataFromApi = await apiClient
                .get(`/games/find/${router.query.searchParam}?${router.query.searchParam}=${router.query.searchQuery}`)
                .then((apiReturn) => {
                    return apiReturn.data;
                })
                .catch((error) => {
                    console.log(error);
                    let emptyArray: Array<gameInfoType> = [];
                    return emptyArray;
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
                        Resultados da busca por <span className='text-green-600'>"</span>
                        {router.query.searchQuery}
                        <span className='text-green-600'>"</span>
                    </h1>
                    {gamesData.length > 0 ? (
                        gamesData.map((game: gameInfoType) => {
                            return <GameCard gameInfo={game} key={game?.id} />;
                        })
                    ) : (
                        <p className='ml-4'>
                            Ah não! 😔 Não foram encontrados resultados para {router.query.searchQuery}.
                        </p>
                    )}
                </>
            )}
        </Container>
    );
};

export default GameReview;
