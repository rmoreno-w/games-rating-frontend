import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { apiClient } from '../services/axios';
import { Container } from '../src/components/Container';
import { apiTokenAtom, userNameAtom } from '../src/components/Header';

const RegisterGame: NextPage = () => {
    const [apiToken, setApiToken] = useAtom(apiTokenAtom);
    const [userName, setUserName] = useAtom(userNameAtom);

    useEffect(() => {
        setApiToken(window.localStorage.getItem('gamesRatingApiToken') || '');
        setUserName(window.localStorage.getItem('gamesRatingUserName') || '');
    }, []);

    const [titleData, setTitleData] = useState('');
    const [descriptionData, setDescriptionData] = useState('');
    const [developerData, setDeveloperData] = useState('');
    const [genreData, setGenreData] = useState('');
    const [consoleData, setConsoleData] = useState('');
    const [gameImageData, setGameImage] = useState('');
    const [previewImageData, setPreviewImageData] = useState('');
    const [previewImageWidth, setPreviewImageWidth] = useState(0);
    const [previewImageHeight, setPreviewImageHeight] = useState(0);
    const [errorApi, setErrorApi] = useState('');

    const router = useRouter();

    function setImage(image: any) {
        if (image.target.files[0]) {
            let reader = new FileReader();
            reader.onload = () => {
                setPreviewImageData(reader.result as string);
                setGameImage(reader.result as string);
                setPreviewImageWidth(250);
            };
            reader.readAsDataURL(image.target.files[0]);
        } else {
            setPreviewImageWidth(0);
        }
    }

    async function Signup(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        await apiClient
            .post(
                'games',
                {
                    title: titleData,
                    resume: descriptionData,
                    developer: developerData,
                    genre: genreData,
                    console_id: consoleData,
                    img: gameImageData,
                },
                {
                    headers: {
                        // Authorization: `Bearer ${apiToken}`,
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzEzNzU4MjcsImV4cCI6MTY3MTQ2MjIyNywic3ViIjoiNjM5ZTI2NmE2ZmE4Yzc3YmE2NTg2NDI3In0.QbbAnpDcPEgOaZdfhf62S6PNI0uC064ctkYmLwdGOf0`,
                    },
                }
            )
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
            <h1 className='font-bold text-2xl'>Insira as informacões do novo jogo</h1>
            <form className='flex flex-col self-start w-full gap-4'>
                <label className=''>Titulo: </label>
                <input
                    type='text'
                    value={titleData}
                    onChange={(e) => setTitleData(e.target.value)}
                    placeholder='Ex: Mario Kart'
                    className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                />
                <label className=''>Resumo: </label>
                <textarea
                    value={descriptionData}
                    rows={3}
                    onChange={(e) => setDescriptionData(e.target.value)}
                    className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                />
                <label className=''>Desenvolvedor: </label>
                <input
                    type='text'
                    value={developerData}
                    onChange={(e) => setDeveloperData(e.target.value)}
                    placeholder='Ex: Akira Toryiama'
                    className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                />
                <label className=''>Gênero: </label>
                <select
                    value={genreData}
                    onChange={(e) => setGenreData(e.target.value)}
                    className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                >
                    <option className='bg-black' value='Ação'>
                        Ação
                    </option>
                    <option className='bg-black' value='Aventura'>
                        Aventura
                    </option>
                    <option className='bg-black' value='Estratégia'>
                        Estratégia
                    </option>
                    <option className='bg-black' value='RPG'>
                        RPG
                    </option>
                    <option className='bg-black' value='Esporte'>
                        Esporte
                    </option>
                    <option className='bg-black' value='Simulação'>
                        Simulação
                    </option>
                </select>
                <label className=''>Console: </label>
                <select
                    value={consoleData}
                    onChange={(e) => setConsoleData(e.target.value)}
                    className='border-2 border-gray-500 transition-all duration-300 focus:outline-none focus:ring focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-700 focus:border-green-600 rounded p-2 bg-transparent'
                >
                    <option className='bg-black' value='639f18b630b6cdf60d61f22c'>
                        Playstation
                    </option>
                    <option className='bg-black' value='639792c07a8793389697acda'>
                        Xbox
                    </option>
                    <option className='bg-black' value='639f18ca30b6cdf60d61f22e'>
                        Switch
                    </option>
                    <option className='bg-black' value='639f18c030b6cdf60d61f22d'>
                        Pc
                    </option>
                </select>
                <label className='transition duration-400'>Imagem Ilustrativa</label>
                <input id='input-btn' type='file' accept='image/*' onChange={(e) => setImage(e)} />
                <Image src={previewImageData} alt='' width={previewImageWidth} height={previewImageHeight} />
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

export default RegisterGame;