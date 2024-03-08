import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";

function Favoritas() {
  const [receitaData, setReceitaData] = useState([]);
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = [];
      for (const id of favorites) {
        const apiReceita = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(apiReceita);
        const data = await response.json();
        if (data.meals) {
          fetchedData.push(data.meals[0]);
        }
      }
      setReceitaData(fetchedData);
    };
    fetchData();
  }, []);

  return (
    <main className="container-fluid home-favoritos">
      <section className="container d-flex flex-column">
        <article className="p-4 text-center">
          <h1 className="receitas-favoritas">Suas receitas favoritas</h1>
        </article>
        {receitaData.length !== 0 ? (
          <article className="row d-flex justify-content-center align-items-center grid-favoritas">
          {receitaData.map((receita) => (
           
                <Link
                  to={`/detalhes/${receita.idMeal}`}
                  className="col-lg-4 col-md-6 col-10 p-3"
                  reloadDocument
                >
                   <div className="card p-1 " key={receita.idMeal}>
              <img className="card-img img-fluid" src={receita.strMealThumb}></img>
              <div className="card-body">
                <h5 className="card-title">{receita.strMeal}</h5>      
                </div> 
                </div>
                </Link>
              
           
          ))}
        </article>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
          <p>Nenhuma receita adicionada aos favoritos.</p>
        </div> 
        )}
      </section>
    </main>
  );
}

export default Favoritas;