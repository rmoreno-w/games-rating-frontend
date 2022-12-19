import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';

export function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOption, setSearchOption] = useState('title');
    const [suggestedResults, setSuggestedResults] = useState<string[]>([]);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    async function apiSearch(e: React.MouseEvent<HTMLButtonElement>) {
        console.log(`games/find/${searchOption}?${searchOption}=${searchQuery}`);
        // apiClient.get(`games/find/${searchOption}?${searchOption}=${searchQuery}`)
    }

    function apiAutoComplete(e: React.ChangeEvent<HTMLInputElement>) {}

    // Effect para fazer Debouncing
    useEffect(
        () => {
            if (debouncedSearchQuery) {
                apiSearch().then((suggestionResults) => {
                    console.log(suggestionResults);
                });
            } else {
                setSuggestedResults([]);
            }
        },
        // Run the hook every time the user makes a keystroke
        [searchQuery]
    );

    return (
        <div className='w-3/4 self-center relative grid grid-cols-12 border border-green-50 rounded-2xl focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 '>
            <select
                value={searchOption}
                onChange={(e) => setSearchOption(e.target.value)}
                className='p-2 bg-transparent col-span-2'
            >
                <option className='bg-black' value='title'>
                    Título
                </option>
                <option className='bg-black' value='developer'>
                    Desenvolvedor
                </option>
                <option className='bg-black' value='genre'>
                    Gênero
                </option>
            </select>
            <input
                className='bg-transparent focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 leading-10 pl-4 col-span-9'
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                placeholder='Procurar por...'
                type='search'
            />
            <button
                className='relative h-full bg-transparent'
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => apiSearch(e)}
            >
                <Image src='/search.svg' alt='' fill />
            </button>
        </div>
    );
}
