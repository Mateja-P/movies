import React from 'react';
import Card from './Card';

function ListMovies({ movies }) {
  return (
    <div className='grid-movies'>
      {movies.map((movie, index) => {
        return (
          <Card key={index} movieId={movie.id}>
            <img
              className='single-card-image'
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
            <div className='movie-info__wrapper-div'>
              <h2>{movie.title}</h2>
              <p className='card-overview__p'>
                {movie.overview.substring(0, 90) + '...'}
              </p>
              <p className='seeMore__p'>See more</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default ListMovies;
