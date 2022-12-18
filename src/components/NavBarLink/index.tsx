import Link from 'next/link';

interface NavBarLinkProps {
    pathname: string;
}

export function NavBarLink({ pathname }: NavBarLinkProps) {
    return (
        <>
            <Link
                href={`/${pathname}`}
                className={`relative mx-4
                hover:underline decoration-2 underline-offset-4 decoration-green-400 cursor-pointer [&:nth-last-child(2)]:mr-0 first:ml-0
                ${pathname == `/${pathname}` ? 'border-b-2 border-b-green-400 hover:no-underline cursor-auto' : ''}`}
            >
                {pathname[0].toUpperCase() + pathname.slice(1)}
            </Link>
            <span className='h-4 w-[2px] bg-green-400 self-center last:hidden'></span>
        </>
    );
}
