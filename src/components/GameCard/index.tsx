import Image from 'next/image';
import { gameInfoType } from '../../../types/gameInfo';

interface gameCardProps {
    gameInfo: gameInfoType;
}
export function GameCard({ gameInfo }: gameCardProps) {
    return (
        <article className='border border-green-100 rounded-xl grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 sm:flex-row gap-4 sm:gap-12 overflow-hidden'>
            <div className='h-full relative'>
                <Image src={gameInfo.img} fill alt='Zelda GB' className='object-fill' />
            </div>

            <div className='px-8 sm:px-0 py-4 sm:py-8 flex flex-col gap-4 justify-between sm:col-span-2'>
                <h2 className='text-center font-bold text-2xl text-green-400'>{gameInfo.title}</h2>
                <p className='font-light'>
                    <span className='font-bold'>Resumo</span>
                    <span className='font-bold text-green-400 mr-2'> : </span>
                    {gameInfo.resume}
                </p>
                <p className='font-light'>
                    <span className='font-bold'>Desenvolvedor</span>
                    <span className='font-bold text-green-400 mr-2'> : </span>
                    {gameInfo.developer}
                </p>
                <p className='font-light'>
                    <span className='font-bold'>Gênero</span>
                    <span className='font-bold text-green-400 mr-2'> : </span>
                    {gameInfo.genre}
                </p>
                <p className='font-light'>
                    <span className='font-bold'>Avaliação</span>
                    <span className='font-bold text-green-400 mr-2'> : </span>
                    {gameInfo.rating}
                </p>
            </div>
        </article>
    );
}
