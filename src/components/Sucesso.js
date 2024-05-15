import styled from "styled-components"
import check from "../assets/check.png"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Sucesso() {
    const location = useLocation();
    const { nomeFilme, dia, horario, assentos, nomeComprador, cpf } = location.state;
    return (
        <ContainerSucesso>
            <ContainerImagem>
                <img
                    src={check}
                    alt="check"
                />
                <p>Pedido finalizado!</p>
            </ContainerImagem>
            <ContainerInformacoes>
                <Informacoes>
                    <h1>Filme e sessão</h1>
                    <Linha></Linha>
                    <p>{nomeFilme}</p>
                    <p>{dia} às {horario}</p>
                    <h2>Ingressos</h2>
                    <Linha></Linha>
                    {assentos.map(assento => (<p>Assento {assento}</p>)) }
                    <h3>Comprador(a)</h3>
                    <Linha></Linha>
                    <p>Nome: {nomeComprador}</p>
                    <p>CPF: {cpf}</p>
                </Informacoes>
            </ContainerInformacoes>
            <Link to="/">
                <Voltar>Voltar para tela inicial</Voltar>
            </Link>
        </ContainerSucesso>
    )
}

const ContainerSucesso = styled.div`
    background-color: #212226;
    height: 100vh;
`
const ContainerImagem = styled.div`
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    p {
        color: green;
        font-size: 24px;
        line-height: 39px;
    }
`
const ContainerInformacoes = styled.div`
    height: auto;
    width: 338px;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #2B2D36;
    border-radius: 8px;
    border: 1px solid #2B2D36;
`

const Informacoes = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    h1 , h2, h3{
        font-weight: 700;
        font-size: 22px;
        line-height: 36px;
        color: #EE897F;
    }
    p {
        color: white;
        margin: 15px 0;
        font-weight: 400;
        font-size: 20px;
    }
`
const Linha = styled.div`
    height: 1px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #4E5A65;
`
const Voltar = styled.div`
    width: 338px;
    height: 42px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EE897F;
    border-radius: 8px;
    border: 1px solid #EE897F;
    color: black;
    font-size: 18px;
    font-weight: 700;
`