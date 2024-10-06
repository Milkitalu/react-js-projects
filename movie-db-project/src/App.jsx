import React, {useState, useEffect} from 'react';
import MovieList from './components/MovieList';

import './App.css'
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorite from './components/AddFavorites';
import RemoveFavorite from './components/RemoveFavorite';


function App() {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] =useState('');  //hook for search bar
  const [favourites, setFavorites] = useState([]);

  const fetchMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=401f509e`;
    const res = await fetch(url);
    const jsonRes = await res.json();

    if(jsonRes.Search) {
      setMovies(jsonRes.Search);
    }

  };

  const cacheToLocalStorage = (items) => {
    localStorage.setItem("movie-db-app-favourites", JSON.stringify(items));
  }

  useEffect(() => {
    fetchMovieRequest(searchValue);
  }, [searchValue]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavorites(newFavouriteList);
    cacheToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie =(movie) => {
    const updatedFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavorites(updatedFavouriteList);
    cacheToLocalStorage(updatedFavouriteList);
  }

  return (
    <div className='container-fluid movie-db'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies" />
        <SearchBox
              searchValue={searchValue}
              setSearchValue={setSearchValue}
          />

      </div>
        <div className='d-flex align-items-center gap-1'>
         < MovieList 
                   movies = {movies}
                   handleFavouriteClick = {addFavouriteMovie}
                   favouriteComponent = {AddFavorite}      
                   />
        </div>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading = 'Favourites' />
        </div>
        <div className='row'>
          <MovieList 
                  movies = {favourites}
                  handleFavouritesClick = {removeFavouriteMovie}
                  favouriteComponent = {RemoveFavorite}
                  />
                  
        </div>
    </div>
  )
}

export default App