import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import ocupado from "../assets/user.png"
import ReactInputMask from "react-input-mask"

export default function Assentos() {
    const [assentos, setAssentos] = useState([])
    const { sessaoId } = useParams()
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [validCpf, setValidCpf] = useState(false) // Estado para armazenar se o CPF é válido
    const [assentosSelecionados, setAssentosSelecionados] = useState([]);
    const navigate = useNavigate()


    function selecionarAssento(name, livre) {
        if (livre) {
            setAssentos(prevAssentos =>
                prevAssentos.map(assento =>
                    assento.name === name ? { ...assento, selecionado: !assento.selecionado } : assento
                )
            );
            setAssentosSelecionados(prevAssentosSelecionados => {
                const index = prevAssentosSelecionados.indexOf(name);
                if (index !== -1) {
                    // Se o assento já estiver selecionado, remova-o da lista
                    return prevAssentosSelecionados.filter(item => item !== name);
                } else {
                    // Caso contrário, adicione-o à lista
                    return [...prevAssentosSelecionados, name];
                }
            });
        }
    }


    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessaoId}/seats`)
        promise.then(res => setAssentos(res.data.seats.map(assento => ({ ...assento, selecionado: false }))))
    }, [])

    // Função para manipular a mudança no campo de CPF
    const handleCpfChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove tudo exceto os dígitos
        setCpf(value);
        // Verifica se o CPF tem 11 dígitos para ativar o estado validCpf
        setValidCpf(value.length === 11);
    }

    const reservarAssentos = (e) => {
        e.preventDefault()
        const dadosComprador = { name, cpf, assentosSelecionados }

        /*
        const url_post = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
        const promise = axios.post(url_post, dadosComprador)

        promise.then(res => console.log(res.data))
        */

        console.log(dadosComprador)
        setName('')
        setCpf("")
        navigate('/sucesso')
    }


    return (
        <Container>
            <ContainerAssentos>
                <p>Selecione o(s) assento(s)</p>
                <Lugares>
                    {assentos.map(assento => (
                        <Assento
                            key={assento.id}
                            livre={assento.isAvailable}
                            selecionado={assento.selecionado}
                            onClick={() => selecionarAssento(assento.name, assento.isAvailable)}
                        >
                            <img
                                src={ocupado}
                            />
                            <p>{assento.name}</p>
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
                    <form onSubmit={reservarAssentos}>
                        <InputGroup>
                            <Title htmlFor="name">
                                Nome do comprador(a)
                            </Title>
                            <ReactInputMask
                                id="name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Title htmlFor="cpf">
                                CPF do comprador(a)
                            </Title>
                            <ReactInputMask
                                id="cpf"
                                mask={"999.999.999-99"}
                                type="text"
                                value={cpf}
                                onChange={handleCpfChange}
                                required
                            />
                        </InputGroup>
                        <Reservar disabled={!validCpf}>
                            Reservar assento(s)
                        </Reservar>
                    </form>
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
        color: white;
        margin: 20px;
    }
`

const Lugares = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Assento = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 12px;
    background-color: ${props => props.selecionado ? "#EE897F" : (props.livre ? "#9DB899" : "grey")};
    margin-right: 6px;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        width: 26px;
        height: 26px;
        display: ${props => props.livre ? "none" : "block"}; /* Alterado */
    }
    p {
        display: ${props => !props.selecionado ? "none" : "block"};
    }
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    p {
        margin-left: 0px;
        
    }
    input {
        width: 338px;
        height: 40px;
        border-radius: 8px;
        border: 1px solid ;
    }
`

const Reservar = styled.button`
    margin: 15px 0;
    width: 338px;
    height: 42px;
    background-color: #EE897F;
    border-radius: 8px;
    border: 1px solid #EE897F;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
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

const InputGroup = styled.div`
    input {
        margin:  10px 0px;
    }
`

const Title = styled.label`
    margin: 3px;
    color: white;
`