import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import ocupado from "../assets/user.png"

export default function Assentos() {
    const [assentos, setAssentos] = useState([])
    const { sessaoId } = useParams()
    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessaoId}/seats`)
        promise.then(res => setAssentos(res.data.seats))
        
    }, [])
    
    return (
        <Container>
            <ContainerAssentos>
                <p>Selecione o(s) assento(s)</p>
                <Lugares>
                    {assentos.map(assento => (
                        <Assento
                            key={assento.id}
                            ocupado={assento.isAvaible}
                        >
                            <img />
                        </Assento>
                    ))}
                </Lugares>
                <Linha></Linha>
                <Legenda>
                    <Selecionado>
                        <div></div>
                        <p>Selecionado</p>
                    </Selecionado>
                    <Disponivel>
                        <div></div>
                        <p>Disponível</p>
                    </Disponivel>
                    <Indisponivel>
                        <img src={ocupado} alt="ocupado" />
                        <p>Indisponível</p>
                    </Indisponivel>
                </Legenda>
                <InformacoesComprador>
                </InformacoesComprador>
                <FooterInformacoes>
                </FooterInformacoes>
            </ContainerAssentos>
        </Container>
    )
}

const Container = styled.div`
    background-color: #212226;
    height: 100vh;
`

const ContainerAssentos = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    margin: auto;
    background-color: #212226;
    p{
        text-align: center;
        color: aliceblue;
    }
`

const Lugares = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: ;
`

const Assento = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 12px;
    background-color: ${props => props.ocupado === true ? "blue" : "yellow"};
    margin-right: 6px;
    margin-top: 5px;
`

const Linha = styled.div`
    width: 90%;
    height: 1px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #4E5A65;
`
const Legenda = styled.div`
    display: flex;
    justify-content: space-around;
`

const Disponivel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        width: 26px;
        height: 26px;
        border-radius: 17px;
        background-color: #9DB899;
        margin-top: 5px;
        margin-bottom: 5px;
    }
`

const Indisponivel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 26px;
        height: 26px;
        border-radius: 17px;
        background-color: grey;
        margin-top: 5px;
        margin-bottom: 5px;
    }
`

const Selecionado = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        width: 26px;
        height: 26px;
        border-radius: 17px;
        background-color: #EE897F;
        margin-top: 5px;
        margin-bottom: 5px;
    }
`

const InformacoesComprador = styled.div`

`
const FooterInformacoes = styled.div`
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