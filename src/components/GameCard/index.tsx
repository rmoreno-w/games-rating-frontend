import Image from 'next/image';

export function GameCard() {
    return (
        <article className='border border-green-100 rounded-xl flex flex-col sm:flex-row gap-4 sm:gap-12'>
            <div className='h-[150px] sm:h-[300px] sm:w-[300px] relative'>
                <Image src='/zelda.png' fill alt='Zelda GB' className='' />
            </div>

            <div className='px-8 sm:px-0 py-4 sm:py-8 flex flex-col gap-4 justify-between flex-grow'>
                <h2 className='text-center font-bold text-2xl text-green-400'>Zelda</h2>
                <p className='font-light'>
                    <span className='font-bold'>Resumo</span>
                    <span className='font-bold text-green-400 mr-2'> : </span>
                    Hi Men
                </p>
                <p className='font-light'>
                    <span className='font-bold'>Desenvolvedor</span>
                    <span className='font-bold text-green-400 mr-2'> : </span>
                    Akiyra Toryiama
                </p>
                <p className='font-light'>
                    <span className='font-bold'>Gênero</span>
                    <span className='font-bold text-green-400 mr-2'> : </span>
                    Terror
                </p>
                <p className='font-light'>
                    <span className='font-bold'>Avaliação</span>
                    <span className='font-bold text-green-400 mr-2'> : </span>5
                </p>
            </div>
        </article>
    );
}