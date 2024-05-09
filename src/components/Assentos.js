import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ocupado from "../assets/user.png";
import ReactInputMask from "react-input-mask";
import clapperboard from "../assets/clapperboard.png";
import calendar from "../assets/calendar (1).png"

export default function Assentos() {
  const [assentos, setAssentos] = useState([]);
  const { sessaoId } = useParams();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [filmeEscolhido, setFilmeEscolhido] = useState({});


  function selecionarAssento(name, livre) {
    if (livre) {
      setAssentos((prevAssentos) =>
        prevAssentos.map((assento) =>
          assento.name === name
            ? { ...assento, selecionado: !assento.selecionado }
            : assento
        )
      );
    }
  }

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessaoId}/seats`
    );
    promise.then((res) => {
      setAssentos(
        res.data.seats.map((assento) => ({ ...assento, selecionado: false }))
      );
      setFilmeEscolhido(res.data.movie);
    });
  }, []);

  return (
    <Container>
      <ContainerAssentos>
        <p>Selecione o(s) assento(s)</p>
        <Lugares>
          {assentos.map((assento) => (
            <Assento
              key={assento.id}
              livre={assento.isAvailable}
              selecionado={assento.selecionado}
              onClick={() =>
                selecionarAssento(assento.name, assento.isAvailable)
              }
            >
              <img src={ocupado} />
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
          <p>Nome do comprador(a)</p>
          <form>
            <ReactInputMask
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </form>
          <p>CPF do comprador(a)</p>
          <form>
            <ReactInputMask
              id="cpf"
              mask={"999.999.999-99"}
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </form>
          <Reservar>Reservar assento(s)</Reservar>
        </InformacoesComprador>
        <FooterInformacoes>
          <div>
              <NomeFilme>
                <ImagemClapperboard src={clapperboard} alt="clapperboard" />
                <p>{filmeEscolhido.title}</p>
              </NomeFilme>
              <NomeFilme>
                <ImagemClapperboard src={calendar} alt="calendar" />
                <p>{filmeEscolhido.date}</p>
              </NomeFilme>
          </div>
          <ImagemFilme
            src={filmeEscolhido.posterURL}
            alt={filmeEscolhido.title}
          />
        </FooterInformacoes>
      </ContainerAssentos>
    </Container>
  );
}

const Container = styled.div`
  background-color: #212226;
  height: 100vh;
`;

const ContainerAssentos = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: auto;
  background-color: #212226;
  p {
    text-align: center;
    color: white;
    margin: 20px;
  }
`;

const Lugares = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Assento = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.selecionado ? "#EE897F" : props.livre ? "#9DB899" : "grey"};
  margin-right: 6px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 26px;
    height: 26px;
    display: ${(props) => (props.livre ? "none" : "block")}; 
  }
  p {
    display: ${(props) => (!props.selecionado ? "none" : "block")};
  }
`;

const Linha = styled.div`
  width: 90%;
  height: 1px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #4e5a65;
`;
const Legenda = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Disponivel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 26px;
    height: 26px;
    border-radius: 17px;
    background-color: #9db899;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const Indisponivel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 26px;
    height: 26px;
    border-radius: 17px;
    background-color: grey;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const Selecionado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 26px;
    height: 26px;
    border-radius: 17px;
    background-color: #ee897f;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

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
    border: 1px solid;
  }
`;

const Reservar = styled.button`
  margin: 15px 0;
  width: 338px;
  height: 42px;
  background-color: #ee897f;
  border-radius: 8px;
  border: 1px solid #ee897f;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 140px;
`;
const FooterInformacoes = styled.div`
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0877e;
  position: fixed;
  bottom: 0;
  left: 0;
  div {
    display: flex;
    flex-direction: column;
  }
  p {
    color: #2b2d36;
    font-weight: 700;
    font-size: 20px;
    line-height: 33px;
    margin: 0 20px;
  }
`;

const ImagemClapperboard = styled.img`
  width: 25px;
  height: 25px;
`;

const ImagemFilme = styled.img`
  width: 65px;
  height: 95px;
`;

const NomeFilme = styled.span`
  display: flex;
  margin: 10px;
`;
