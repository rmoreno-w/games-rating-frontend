import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { tokenAtom, userNameAtom } from '../../../pages/login';
import { NavBarLink } from '../NavBarLink';

export function Header() {
    const [apiToken, setApiToken] = useAtom(tokenAtom);
    const [userName, setUserName] = useAtom(userNameAtom);

    const router = useRouter();

    function Logout(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setUserName('');
        setApiToken('');
    }

    return (
        <header className='px-4 desktop:px-28 largest:px-40 grid grid-cols-4 bg-[#00000080] text-green-50 sticky top-0 shadow-md rounded-b-[20px] py-4 border border-green-50/10 green-Shadow'>
            <nav className='flex items-center justify-center col-start-2 col-span-2'>
                <NavBarLink pathname='playstation' />
                <NavBarLink pathname='xbox' />
                <NavBarLink pathname='switch' />
                <NavBarLink pathname='pc' />
            </nav>
            <div className='flex justify-end items-center col-start-4 col-span-1'>
                {apiToken ? (
                    <>
                        <div className='flex flex-col items-center p-3'>
                            <Image src='/person.svg' alt='' width={36} height={36} />
                            {userName}
                        </div>
                        <button
                            className='flex justify-center border border-green-50 items-center p-2 mt-1 hover:underline underline-offset-2 decoration-green-50'
                            onClick={(e) => Logout(e)}
                        >
                            Sair
                        </button>
                    </>
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
