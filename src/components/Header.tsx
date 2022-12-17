import { useRouter } from 'next/router';
import { NavBarLink } from './NavBarLink';

export function Header() {
    const router = useRouter();

    return (
        <header className='px-4 desktop:px-28 largest:px-40 flex justify-between items-center bg-[#00000080] text-green-50 sticky top-0 shadow-md rounded-b-[20px] w-full py-4 border border-green-50/10 green-Shadow'>
            <div>Search Bar</div>
            <nav className='flex'>
                <NavBarLink pathname='playstation' />
                <NavBarLink pathname='xbox' />
                <NavBarLink pathname='switch' />
                <NavBarLink pathname='pc' />
            </nav>
        </header>
    );
}
