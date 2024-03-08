import './style.css'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
function Detalhes() {

    const [detalhesReceita, setDetalhesReceita] = useState([])
    const [isFavorite, setIsFavorite] = useState(false);
    const { id } = useParams()
    let meal_id = id;

    useEffect(() => {
        buscarDados();
        const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(currentFavorites.includes(meal_id));
    }, [meal_id]);

    const buscarDados = () => {
        const apiReceita = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`;

        fetch(apiReceita)
            .then((r) => r.json())
            .then((data) => {
                setDetalhesReceita(data.meals[0]);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados:', error);
            });

    };

    function trocaFavorite() {
        if (isFavorite) {
          removeFavorite(meal_id);
        } else {
          addFavorite(meal_id);
        }
        setIsFavorite(!isFavorite);
      }

      function addFavorite(id) {
        const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        currentFavorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(currentFavorites));
      }
    
      function removeFavorite(id) {
        const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = currentFavorites.filter((favoriteId) => favoriteId !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }

    function ingredienteEMeasure() {
        let listaIngrediente = [];
        for (let i = 1; i < 21; i++) {
            if (detalhesReceita[`strIngredient${i}`] !== "" && detalhesReceita[`strMeasure${i}`] !== "") {
                listaIngrediente.push(<li className='ingredientes-lista' key={i}>{`${i}° - `}{detalhesReceita[`strIngredient${i}`]} - {detalhesReceita[`strMeasure${i}`]}</li>);
            }
        }
        return <ul className='lista-nao-ordenada'>{listaIngrediente}</ul>
    }

    return (
        <main className='borda home-detalhes' id="inicio-detalhes">
            {detalhesReceita ? (
                <section className='container-fluid home-detalhes'>
                    <div className='d-flex aligm-items-center justify-content-center introducao-receita'>
                        
                            <h1 className='titulo-receita'>{detalhesReceita.strMeal}</h1>
                    </div>
                    
                    <article className='d-flex row container-fluid borda justify-content-center align-items-start'>
                        <div className='d-flex justify-content-center align-items-start container-imagem col-md-6  col-sm-12'>
                            <img className='img-fluid imagem-detalhes ' src={detalhesReceita.strMealThumb}></img>
                        </div>
                        <div className='d-flex col-sm-12 col-md-3 flex-column text-center'>
                            <h2>Ingredientes:</h2>
                            <div className='d-flex aligm-items-start justify-content-center'>
                                {ingredienteEMeasure()}
                            </div>
                        </div>
            
                    </article>
                    <h1 className='text-center p-5 mt-5 titulo-como-fazer'>COMO FAZER?</h1>
                    <article className='container-fluid d-flex row p-4 preparo-receita '>
                        <div className='col-lg-6'>
                            <h2 className='text-center'>MODO DE PREPARO</h2>
                            <p className='instrucao-receita  p-1'>{detalhesReceita.strInstructions}</p>
                        </div>
                        <div className='col-lg-6'>
                            <ReactPlayer url={detalhesReceita.strYoutube} width="100%" />
                        </div>
                    </article>
                    <article className='container-fluid borda curtir-receita p-5'>
                        <h3 className='text-center '>Gostou da receita? Curta e salve!</h3>
                        <div className='container-botao text-center'>
                        <button onClick={trocaFavorite} type="button" className={`btn btn-lg btn-outline-warning botao-curtida rounded-circle ${isFavorite ? 'active' : 'desativado'}`}>
                            <i className='fa fa-heart'></i>
                        </button>
                        </div>
                    </article>
                </section>
            ) : (
                <p>Carregando...</p>
            )}
        </main>
    )
}



export default Detalhes;