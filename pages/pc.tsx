import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { apiClient } from '../services/axios';
import { Container } from '../src/components/Container';
import { GameCard } from '../src/components/GameCard';
import Loader from '../src/components/Loader';
import { SearchBar } from '../src/components/SearchBar';
import { gameInfoType } from '../types/gameInfo';

const Pc: NextPage = () => {
    const [gamesArray, setGamesArray] = useState<gameInfoType[]>([]);

    useEffect(() => {
        apiClient.get('consoles/topGames/639f18c030b6cdf60d61f22d').then((apiReturn) => {
            setGamesArray(apiReturn.data);
            console.log(apiReturn.data);
        });
    }, []);

    return (
        <Container>
            {gamesArray.length == 0 ? (
                <Loader />
            ) : (
                <>
                    <SearchBar />
                    {gamesArray.map((game: gameInfoType) => (
                        <GameCard key={game!.id} gameInfo={game} />
                    ))}
                </>
            )}
        </Container>
    );
};

export default Pc;
