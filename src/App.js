import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Filmes from "./components/Filmes";
import Sessoes from "./components/Sessoes";
import Assentos from "./components/Assentos";
import Sucesso from "./components/Sucesso";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Filmes /> }
        />
        <Route
          path="/sessoes/:sessaoId"
          element={<Sessoes /> }
        />
        <Route
          path="/assentos"
          element={<Assentos /> }
        />
        <Route
          path="/sucesso"
          element={<Sucesso /> }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
