import type { NextPage } from 'next';
import { useEffect } from 'react';
import { apiClient } from '../services/axios';

const Playstation: NextPage = () => {
    useEffect(() => {
        apiClient.get('consoles/topGames/639f18b630b6cdf60d61f22c').then();
    }, []);

    return (
        <>
            <main className='relative mx-4 py-6 px-6 my-6 sm:py-12 sm:px-16 sm:m-12 desktop:px-24 desktop:py-12 large:px-32 large:py-16 desktop:mx-28 desktop:my-16 max-w-[1520px] largest:mx-auto flex flex-col gap-6 sm:gap-12 justify-center bg-[#00000080] rounded-[20px]  text-green-50 shadow-md green-Shadow backdrop-blur-2xl text-sm md:text-base'>
                <p>Selecione um console no menu de navegacão para ver os 3 jogos mais bem avaliados!</p>
            </main>
        </>
    );
};

export default Playstation;
