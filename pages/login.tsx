//https://stackoverflow.com/questions/41296668/how-do-i-add-validation-to-the-form-in-my-react-component
import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { apiClient } from '../services/axios';
import { Container } from '../src/components/Container';
import { apiTokenAtom, userNameAtom } from '../src/components/Header';

const Login: NextPage = () => {
    const [emailData, setEmailData] = useState('');
    const [passwordData, setPasswordData] = useState('');
    const [errorApi, setErrorApi] = useState('');

    const [apiToken, setApiToken] = useAtom(apiTokenAtom);
    const [userName, setUserName] = useAtom(userNameAtom);

    useEffect(() => {
        setApiToken(window.localStorage.getItem('gamesRatingApiToken') || '');
        setUserName(window.localStorage.getItem('gamesRatingUserName') || '');
    }, []);

    const router = useRouter();

    async function Login(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        await apiClient
            .post('login', {
                email: emailData,
                password: passwordData,
            })
            .then((response) => {
                // console.log(response);
                window.localStorage.setItem('gamesRatingApiToken', response.data.token);
                window.localStorage.setItem('gamesRatingUserName', response.data.userExists.name);
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
            {apiToken ? (
                <Container>
                    <p>Você já está logado!</p>
                </Container>
            ) : (
                <Container>
                    <h1 className='font-bold text-2xl'>Insira suas informacões de cadastro</h1>
                    <form className='flex flex-col self-start w-full gap-4'>
                        <label className=''>E-mail: </label>
                        <input
                            required
                            type='email'
                            value={emailData}
                            onChange={(e) => setEmailData(e.target.value)}
                            placeholder='Ex: nome@exemplo.com'
                            className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                        />
                        <label className=''>Senha: </label>
                        <input
                            required
                            type='password'
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
                            <span className='font-bold text-green-400 hover:bg-green-600 hover:text-green-50 transition-colors duration-250'>
                                clique aqui
                            </span>
                        </Link>{' '}
                        para se cadastrar e poder contribuir com reviews ou adicionar novos jogos à base de jogos.
                    </p>
                </Container>
            )}
        </>
    );
};

export default Login;
