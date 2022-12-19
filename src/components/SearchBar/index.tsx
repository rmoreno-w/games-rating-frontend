import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { apiClient } from '../../../services/axios';

export function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOption, setSearchOption] = useState('title');
    const [suggestedResults, setSuggestedResults] = useState<string[]>([]);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const router = useRouter();

    async function apiSearch() {
        router.push(`/search/${searchOption}?searchParam=${searchOption}&searchQuery=${searchQuery}`);
    }

    function apiAutoComplete() {
        searchQuery &&
            apiClient
                .get(`games/find/autocomplete?${searchOption}=${searchQuery}`)
                .then((response) => {
                    setSuggestedResults(response.data);
                })
                .catch((error) => {
                    setSuggestedResults([]);
                });
    }

    // Effect para fazer Debouncing
    useEffect(
        () => {
            if (debouncedSearchQuery) {
                apiAutoComplete();
            } else {
                setSuggestedResults([]);
            }
        },
        // Run the hook every time the user makes a keystroke
        [searchQuery]
    );

    return (
        <div className='w-3/4 self-center flex flex-col items-center'>
            <div className='relative grid grid-cols-12 border border-green-50 rounded-2xl focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 '>
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
                <button className='relative h-full bg-transparent' onClick={() => apiSearch()}>
                    <Image src='/search.svg' alt='' fill />
                </button>
            </div>
            {searchQuery && suggestedResults.length >= 1 && searchQuery != suggestedResults[0] && (
                <ul className='w-3/4  border border-l-green-50 border-b-green-50 border-r-green-50 border-t-transparent rounded ml-[8%]'>
                    {suggestedResults.map((suggestion) => {
                        return (
                            <li
                                className='pl-4 bg-[#00000070] hover:brightness-90 hover:bg-gray-600 hover:cursor-pointer'
                                onClick={(e) => setSearchQuery(suggestion)}
                            >
                                {suggestion}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
