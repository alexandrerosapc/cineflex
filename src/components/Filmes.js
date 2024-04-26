import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Filmes() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");
        promise.then(res => setImages(res.data));
        promise.catch(err => console.log(err.response.data))
    }, []);

    return (
        <ContainerFilme>
            <p>Em cartaz</p>
            <ListaDeFilmes>
                {images.map(image => (
                    <Link to={`/sessoes/${image.id}`} key={image.id}>
                        <Filme src={image.posterURL} alt={image.title} />
                    </Link>
                ))}
            </ListaDeFilmes>
        </ContainerFilme>
    );
}

const ContainerFilme = styled.div`
    background-color: #212226;
    padding: 20px;
    p {
        color: #FFFFFF;
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
    }
`;

const ListaDeFilmes = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Filme = styled.img`
    width: 90%;
    max-width: 210px;
    height: auto;
    border-radius: 8px;
    margin: 10px;

    @media (max-width: 768px) {
        width: 50%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;
