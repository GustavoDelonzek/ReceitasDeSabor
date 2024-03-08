import { useState, useEffect } from "react";
import "./style.css"
import axios from 'axios';
import { Link } from "react-router-dom";

function Home() {
  const [receitaData, setReceitaData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("beef");
  const [controleReceita, setControleReceita] = useState(0);
  //Para que ao carregar a página funcione
  useEffect(() => {
    buscarDados();
  }, [query]);


  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  const buscarDados = () => {
    const apiReceita = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(apiReceita)
      .then((r) => r.json())
      .then((data) => {
        setReceitaData(data.meals);
        setControleReceita(6)
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });

  };



  const mostreMais = () => {
    setControleReceita(controleReceita + 6)
  }




  return (
    <main >
      <section className="home-principal img-fluidcontainer-fluid borda d-flex justify-content-center align-items-center">
        <form className="search-form search d-flex justify-content-center align-items-center" onSubmit={getSearch}  >
          <div className="p-2 bg-warning pesquisa mb-4 rounded rounded-pill">
            <div className="input-group">

              <input type="search" placeholder="Digite uma receita..." aria-describedby="button-addon1" className="form-control border-0 rounded rounded-pill" value={search} onChange={updateSearch} />

              <div className="input-group-append d-flex justify-content-center align-items-center">
                <button id="button-addon1" type="submit" className="btn btn-lg p-3">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>

      <section className="grid-receita borda" >

        <div className="row justify-content-center align-items-center">
          <h1 className="text-center m-5 titulo-lista-receita">LISTA DE RECEITAS</h1>
          {receitaData ? (
            <>
              {receitaData.slice(0, controleReceita).map((meal) => (
                <div className="col-lg-4 col-md-6 mb-4 card-receitas" key={meal.idMeal}>
                  <div className="card p-3 ">
                    <img src={meal.strMealThumb} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <div className="row d-flex align-items-center justify-content-center card-title">
                        <h4 className="titulo-card-receita">{meal.strMeal} </h4>
                      </div>
                      <p className="previa-instrucao">{meal.strInstructions.substring(0, 81)}...</p>
                    </div>
                    <div className="">
                      <Link to={`/detalhes/${meal.idMeal}`} className="btn btn-outline-warning butao-saiba" reloadDocument>Saiba mais</Link>
                    </div>
                  </div>
                </div>
              ))}
              {controleReceita < receitaData.length &&
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <button onClick={mostreMais} className="btn btn-warning p-3 m-3 mostre-mais">Ver mais</button>
                </div>
              }
            </>) : (
            <div className="container-fluid erro d-flex justify-content-center align-items-center flex-column">
              <h2>Nenhuma receita encontrada!!</h2>
              <p>Tente fazer outra pesquisa.</p>
            </div>
          )}

        </div>
      </section>


    </main>
  )
}

export default Home;