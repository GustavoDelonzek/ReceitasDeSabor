import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import Favoritas from './pages/Favoritas'
import Detalhes from './pages/Detalhes'

import Footer from "./components/footer";
import Header from "./components/Header";

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/favoritas" element={<Favoritas/>}/>
                <Route path="/detalhes/:id" element={<Detalhes/>}/>
            </Routes>   
            <Footer></Footer>
        </BrowserRouter>
       
    );
}

export default RoutesApp;