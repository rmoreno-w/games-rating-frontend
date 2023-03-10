import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { NavBarLink } from '../NavBarLink';

export const apiTokenAtom = atom('');
export const userNameAtom = atom('');

export function Header() {
    const router = useRouter();

    const [apiToken, setApiToken] = useAtom(apiTokenAtom);
    const [userName, setUserName] = useAtom(userNameAtom);

    useEffect(() => {
        let retrievedToken = window.localStorage.getItem('gamesRatingApiToken') || '';
        let retrievedUserName = window.localStorage.getItem('gamesRatingUserName') || '';
        setApiToken(retrievedToken);
        setUserName(retrievedUserName);
    }, []);

    function Logout(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        window.localStorage.removeItem('gamesRatingApiToken');
        window.localStorage.removeItem('gamesRatingUserName');
        setApiToken('');
        setUserName('');
    }

    return (
        <header className='px-4 desktop:px-28 largest:px-40 grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-4 bg-[#0a100d] text-green-50 sticky top-0 shadow-md rounded-b-[20px] py-4 border border-green-50/10 green-Shadow z-10'>
            <nav className='flex items-center justify-center sm:col-start-2 sm:col-span-2'>
                <NavBarLink pathname='playstation' />
                <NavBarLink pathname='xbox' />
                <NavBarLink pathname='switch' />
                <NavBarLink pathname='pc' />
            </nav>
            <div className='flex justify-center sm:justify-end items-center sm:col-start-4 sm:col-span-1'>
                {apiToken ? (
                    <div className='p-4 rounded-lg border border-green-50 flex gap-4 justify-center items-start'>
                        <div className='flex flex-col items-center'>
                            <Image src='/person.svg' alt='' width={36} height={36} />
                            {userName}
                            <Link
                                href={'/registerGame'}
                                className='hover:underline underline-offset-2 decoration-green-50'
                            >
                                Cadastrar novo jogo
                            </Link>
                        </div>
                        <button
                            className='self-center border border-red-700 items-center p-2 hover:underline underline-offset-2 decoration-red-700 rounded-md'
                            onClick={(e) => Logout(e)}
                        >
                            Sair
                        </button>
                    </div>
                ) : (
                    <Link href='/login'>
                        <button className='flex flex-col items-center p-3'>
                            <Image src='/person.svg' alt='' width={36} height={36} />
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
}
