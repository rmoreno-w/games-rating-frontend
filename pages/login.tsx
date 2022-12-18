//https://stackoverflow.com/questions/41296668/how-do-i-add-validation-to-the-form-in-my-react-component
import { atom, useAtom } from 'jotai';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { apiClient } from '../services/axios';
import { Header } from '../src/components/Header';

export const tokenAtom = atom('');
export const userNameAtom = atom('');

const Home: NextPage = () => {
    const [apiToken, setApiToken] = useAtom(tokenAtom);
    const [userName, setUserName] = useAtom(userNameAtom);

    const [emailData, setEmailData] = useState('');
    const [passwordData, setPasswordData] = useState('');
    const [errorApi, setErrorApi] = useState('');

    const router = useRouter();

    async function Login(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        await apiClient
            .post('login', {
                email: emailData,
                password: passwordData,
            })
            .then((response) => {
                console.log(response);
                setApiToken(response.data.token);
                setUserName(response.data.userExists.name);
                router.push('/');
            })
            .catch((error) => {
                // error.response.data.error == 'There is no userExists with this email'
                error.response.status == 401
                    ? setErrorApi('Oops, não conseguimos encontrar esse email na base de dados')
                    : setErrorApi('Houve um erro na comunicacao com a API, por favor tente novamente em instantes');
            });
    }

    return (
        <>
            <Header />

            <main className='relative mx-4 py-6 px-6 my-6 sm:py-12 sm:px-16 sm:m-12 desktop:px-24 desktop:py-12 large:px-32 large:py-16 desktop:mx-28 desktop:my-16 max-w-[1520px] largest:mx-auto flex flex-col gap-6 sm:gap-12 justify-center bg-[#00000080] rounded-[20px]  text-green-50 shadow-md green-Shadow backdrop-blur-2xl text-sm md:text-base'>
                <h1 className='font-bold text-2xl'>Insira suas informacões de cadastro</h1>
                <form className='flex flex-col self-start w-full gap-4'>
                    <label className=''>E-mail: </label>
                    <input
                        required
                        type='text'
                        value={emailData}
                        onChange={(e) => setEmailData(e.target.value)}
                        placeholder='Ex: nome@exemplo.com'
                        className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                    />
                    <label className=''>Senha: </label>
                    <input
                        required
                        type='email'
                        value={passwordData}
                        onChange={(e) => setPasswordData(e.target.value)}
                        className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                    />
                    <button
                        className='bg-green-600 p-2 desktop:p-3 rounded-md transition duration-300 font-bold hover:brightness-90 mt-4 focus:ring focus:ring-green-600/70 focus:ring-offset-2 focus:ring-offset-gray-700'
                        type='submit'
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => Login(event)}
                    >
                        Entrar
                    </button>
                </form>
                <p>
                    Ou ainda, se você não é cadastrado,{' '}
                    <Link href='/contact'>
                        <span className='font-bold text-green-400 hover:bg-green-400 hover:text-green-50 transition-colors duration-250'>
                            clique aqui
                        </span>
                    </Link>{' '}
                    para se cadastrar e poder contribuir com reviews ou adicionar novos jogos à base de jogos.
                </p>
            </main>
        </>
    );
};

export default Home;
