import Image from 'next/image';
import { useRouter } from 'next/router';
import { NavBarLink } from '../NavBarLink';

export function Header() {
    const router = useRouter();

    return (
        <header className='px-4 desktop:px-28 largest:px-40 grid grid-cols-4 bg-[#00000080] text-green-50 sticky top-0 shadow-md rounded-b-[20px] py-4 border border-green-50/10 green-Shadow'>
            <nav className='flex items-center justify-center col-start-2 col-span-2'>
                <NavBarLink pathname='playstation' />
                <NavBarLink pathname='xbox' />
                <NavBarLink pathname='switch' />
                <NavBarLink pathname='pc' />
            </nav>
            <div className='flex justify-end items-center col-start-4 col-span-1'>
                <button className='flex flex-col items-center p-3'>
                    <Image src='/person.svg' alt='' width={36} height={36} />
                    Login
                </button>
            </div>
        </header>
    );
}
