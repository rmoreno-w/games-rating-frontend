import type { NextPage } from 'next';
import { Container } from '../src/components/Container';

const Home: NextPage = () => {
    return (
        <Container>
            <p>Selecione um console no menu de navegacão para ver os 3 jogos mais bem avaliados do console!</p>
        </Container>
    );
};

export default Home;
