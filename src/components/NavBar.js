import styled from "styled-components"
import logo from "../assets/clapperboard.png"
import { Link } from "react-router-dom"

export  default function NavBar(){
    return(
        <ContainerNavBar>
                <Logo>
                    <Link to={"/"}>
                        <img src={logo} alt="logo" />
                        <p>Cineflex</p>
                    </Link>
                </Logo>
        </ContainerNavBar>
    )
}

const ContainerNavBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Logo = styled.div`
    width: 100%;
    height: 65px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EE897F;
    color: #FADBC5;
    font-weight: 600;
    font-size: 34px;
    line-height: 40px;
    a {
        display: flex;
        text-decoration: none;
        color: #FADBC5;
    }
    img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
`