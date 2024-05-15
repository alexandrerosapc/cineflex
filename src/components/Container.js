import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Filmes from "./Filmes";
import Sessoes from "./Sessoes";
import Assentos from "./Assentos";
import Sucesso from "./Sucesso";


export default function Container() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Filmes
                        />}
                />
                <Route
                    path="/sessoes/:sessaoId"
                    element={
                        <Sessoes 
                        
                        />
                    }
                />
                <Route
                    path="/assentos/:sessaoId"
                    element={
                        <Assentos 
                        
                        />
                    }
                />
                <Route
                    path="/sucesso"
                    element={
                        <Sucesso 
                        
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}