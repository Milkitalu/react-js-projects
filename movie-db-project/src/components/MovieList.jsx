

function MovieList(props) {
    const FavoriteComponent = props.favouriteComponent;
  return (
    <>
       {props.movies.map((movie, index) =>(
        <div className='image-container d-flex justify-content-start m3'>
            <img key={index} src={movie.Poster} alt='movie' />
            <div
               onClick={() =>props.handleFavoriteClick(movie)}
               className="overlay d-flex align-items-center justify-content-center"
            
            >
                <FavoriteComponent />
            </div>

        </div>
       ))}
    </>
  )
}

export default MovieList