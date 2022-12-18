import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { apiClient } from '../services/axios';
import { Container } from '../src/components/Container';

const Signup: NextPage = () => {
    const [nameData, setNameData] = useState('');
    const [emailData, setEmailData] = useState('');
    const [passwordData, setPasswordData] = useState('');
    const [errorApi, setErrorApi] = useState('');

    const router = useRouter();

    async function Signup(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        await apiClient
            .post('users', {
                name: nameData,
                email: emailData,
                password: passwordData,
            })
            .then((response) => {
                console.log(response);

                router.push('/login');
            })
            .catch((error) => {
                // error.response.data.error == 'There is no userExists with this email'
                error.response.status == 401
                    ? setErrorApi('Oops, não conseguimos encontrar esse email na base de dados')
                    : setErrorApi('Houve um erro na comunicacao com a API, por favor tente novamente em instantes');
            });
    }

    return (
        <Container>
            <h1 className='font-bold text-2xl'>Insira suas informacões para se cadastrar</h1>
            <form className='flex flex-col self-start w-full gap-4'>
                <label className=''>Seu Nome: </label>
                <input
                    type='text'
                    value={nameData}
                    onChange={(e) => setNameData(e.target.value)}
                    placeholder='Ex: João Souza'
                    className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                />
                <label className=''>E-mail: </label>
                <input
                    type='email'
                    value={emailData}
                    onChange={(e) => setEmailData(e.target.value)}
                    placeholder='Ex: nome@exemplo.com'
                    className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                />
                <label className=''>Senha: </label>
                <input
                    type='password'
                    value={passwordData}
                    onChange={(e) => setPasswordData(e.target.value)}
                    className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                />
                <button
                    className='bg-green-600 p-2 desktop:p-3 rounded-md transition duration-300 font-bold hover:brightness-90 mt-4 focus:ring focus:ring-green-600/70 focus:ring-offset-2 focus:ring-offset-gray-700'
                    type='button'
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => Signup(event)}
                >
                    Cadastrar
                </button>
            </form>
        </Container>
    );
};

export default Signup;
