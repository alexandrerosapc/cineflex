import styled from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import calendario from "../assets/calendar.png"
import logo from "../assets/clapperboard.png"
import { useParams } from "react-router-dom";

export default function Sessoes() {
    const { sessaoId } = useParams()
    const [sessoes, setSessoes] = useState([]);
    const [cartaz, setCartaz] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${sessaoId}/showtimes`);
        promise.then(res => setSessoes(res.data.days));
        const promise2 = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${sessaoId}/showtimes`);
        promise2.then(res => setCartaz(res.data));

    }, []);

    return (
        <ContainerSessoes>
            <p>Selecione o horário</p>
            <ListaDeSessoes>
                {sessoes.map(sessao => (
                    <Sessao key={sessao.id}>
                        <DataSessao>
                            <img src={calendario} alt="data" />
                            <span>
                                {sessao.weekday}, {sessao.date}
                            </span>
                        </DataSessao>
                        <Linha>

                        </Linha>
                        <Horarios>
                            {sessao.showtimes.map(showtime => (
                                <Horario key={showtime.id} >
                                    {showtime.name}
                                </Horario>
                            ))}
                        </Horarios>
                    </Sessao>
                ))}
            </ListaDeSessoes>
            <FooterSessao>
                <ImagemLogo
                    src={logo}
                    alt="logo" />
                <p>{cartaz.title}</p>
                <ImagemFilme
                    src={cartaz.posterURL}
                    alt={cartaz.title}
                />
            </FooterSessao>
        </ContainerSessoes>
    )
}

const ContainerSessoes = styled.div`
    background-color: #212226;
    height: 100%;
    padding: 20px; /* Adicionando espaço interno */
    p {
        color: #FFFFFF;
        font-size: 24px;
        text-align: center; /* Centralizando o texto */
        margin-bottom: 20px; /* Adicionando espaço abaixo do título */
    }
`

const ListaDeSessoes = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 120px;
`

const Sessao = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #2B2D36;
    margin-bottom: 20px;
    width: 70%;
    height: 149px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 30px;
        height: 30px;
        text-align: center;
        margin-right: 10px;
    }
    span {
        color: #FFFFFF;
        font-size: 24px;
        text-align: center; /* Centralizando o texto */
        margin-bottom: 20px; /* Adicionando espaço abaixo do título */
    }
`

const DataSessao = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`

const Linha = styled.div`
    width: 90%;
    height: 1px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #4E5A65;
`

const Horarios = styled.ul`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const Horario = styled.div`
    width: 84px;
    height: 41px;
    color: #EE897F;
    border-radius: 4px;
    border: 2px solid #EE897F;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FooterSessao = styled.div`
    height: 120px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #E0877E;
    position: fixed;
    bottom: 0;
    left: 0;
    p {
        color: #2B2D36;
        font-weight: 700;
        font-size: 20px;
        line-height: 33px;
    }
`

const ImagemLogo = styled.img`
    width: 25px;
    height: 25px;

`

const ImagemFilme = styled.img`
    width: 65px;
    height: 95px;
`