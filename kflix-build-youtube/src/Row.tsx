import axios from './axios'
import React, { useEffect, useState } from 'react'
import "./Row.css"

type Rows = {title: string, fetchUrl: string, isLargeRow?: boolean}
type Movies = {poster_path: string, backdrop_path: string, id: number, name: string}

function Row({title, fetchUrl, isLargeRow = false}: Rows) {
    const [movies, setMovies] = useState<Movies[]>([]);

    const base_url: string = "https://image.tmdb.org/t/p/original/"
    
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    console.log(movies)
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
                {movies && movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) ||
                        (!isLargeRow && movie.backdrop_path)) && (
                            <img
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                key={movie.id}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                        )
                )}
            </div>
        </div>
    )
}

export default Row