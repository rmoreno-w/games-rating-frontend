import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { apiClient } from '../services/axios';
import { Container } from '../src/components/Container';
import { GameCard } from '../src/components/GameCard';
import Loader from '../src/components/Loader';
import { gameInfoType } from '../types/gameInfo';

const Switch: NextPage = () => {
    const [gamesArray, setGamesArray] = useState<gameInfoType[]>([]);

    useEffect(() => {
        console.log(gamesArray.length);
    }, [gamesArray.length]);

    useEffect(() => {
        apiClient.get('consoles/topGames/639f18ca30b6cdf60d61f22e').then((apiReturn) => {
            setGamesArray(apiReturn.data);
            console.log(gamesArray);
        });
    }, []);

    return (
        <Container>
            {gamesArray.length == 0 ? <Loader /> : gamesArray.map((game: gameInfoType) => <GameCard gameInfo={game} />)}
        </Container>
    );
};

export default Switch;
