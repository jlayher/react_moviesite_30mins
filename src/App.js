import React from 'react';
import './App.css';

import MovieCard from './MovieCard';

//importing search icon
import SearchIcon from './search.svg';

//import react hook 
import { useEffect, useState } from 'react';

//api url 
const API_URL = 'http://www.omdbapi.com?apikey=6ee814b2';

//App Component used to render site
export default function App() {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    //async arrow function that accepts a search title
    const searchMovies = async (title) => {
        //check whether this uses the api url + '&searchTitle'
        //create response variable, and use await before calling fetch on the API url
        const response = await fetch(`${API_URL}&s=${title}`);
        //convert the response object to json and store in data variable
        const data = await response.json();
        //call the setMovies function using the returned data, and specify the Search results
        setMovies(data.Search);
    }

   //use effect normally updates the component upon change, but the dependecy array causes it to only execute on page load 
    useEffect(() => {
        searchMovies('Cool'); 
    }, []);


    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className='search'>
                {/* Take in the user input in the search bar, and update the searchTerm in state. */}
                <input 
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm) }
                />
            </div>
            
            {movies.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
}

