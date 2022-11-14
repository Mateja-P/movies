import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListMovies from './listMovies';

function Popular() {
  const [popularMovies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=e747a94eda239cfa755cfd7e7187f52c&language=en-US&page=1`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  return (
    <div style={{ padding: '50px 0' }}>
      <ListMovies movies={popularMovies} />
    </div>
  );
}

export default Popular;
