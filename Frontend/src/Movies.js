import { useEffect, useState } from 'react';
import "./Movies.css";
import Navbarr from './Navbarr';
import Foter from './Foter';

function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function getApi() {
            const res = await fetch(
                'https://api.themoviedb.org/3/trending/movie/day?api_key=d903bcdae97d41411a8e54f49fb3b5d0'
            );
            const finalRes = await res.json();
            setMovies(finalRes.results);
        }
        getApi();
    }, []);

    return (
        <div className='Movies-overlay'>
            <Navbarr />
            <div className='Movies'>
                <div className="Movies py-5" id="#movies">
                    <div className="container py-5">
                        <div className="row g-5" id="showData">
                            {movies.map((movie) => (
                                <div key={movie.id} className="col-md-3">
                                    <div className="movie position-relative shadow-lg rounded">
                                        <div className="rate position-absolute end-0 top-0">
                                            <span>{movie.vote_average}</span>
                                        </div>
                                        <img
                                            className="card-img-top w-100"
                                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Foter/>
        </div>
    );
}
export default Movies;