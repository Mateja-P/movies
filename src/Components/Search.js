import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import '../Styles/Search.css';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Dropdown from './Dropdown';
import { motion } from 'framer-motion';

function Search() {
  const [method, setMethod] = useState('movie');
  const [searchQuery, setQuery] = useState('');
  const [movieRes, setMovieRes] = useState([]);
  const [showRes, setShowRes] = useState([]);

  const inputRef = useRef();
  const location = useLocation();

  function searchMovie(query) {
    if (query != '') {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=e747a94eda239cfa755cfd7e7187f52c&language=en-US`
        )
        .then((res) => {
          setMovieRes(res.data.results);
        });
    } else {
      setMovieRes([]);
    }
  }

  function searchTvShow(query) {
    if (query != '') {
      axios
        .get(
          `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=e747a94eda239cfa755cfd7e7187f52c&language=en-US`
        )
        .then((res) => {
          setShowRes(res.data.results);
        });
    } else {
      setShowRes([]);
    }
  }

  function getShowData(shows) {
    if (shows.length > 0) {
      return shows.map((show, index) => {
        return (
          <div className='each-value__div' key={index}>
            <img
              className='show-image'
              src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
            />
            <Link
              onClick={() => {
                inputRef.current.value = '';
                setMovieRes([]);
                setShowRes([]);
                location.reload();
              }}
              className='link__wrapper'
              key={index}
              to={`movie/${show.id}`}
            >
              <p>{show.name}</p>
            </Link>
          </div>
        );
      });
    }
  }

  function getMovieData(movies) {
    if (movies.length > 0) {
      return movies.map((movie, index) => {
        return (
          <div className='each-value__div' key={index}>
            <img
              className='show-image'
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
            <Link
              onClick={() => {
                inputRef.current.value = '';
                setQuery('');
                setMovieRes([]);
                setShowRes([]);
                location.reload();
              }}
              className='link__wrapper'
              key={index}
              to={`movie/${movie.id}`}
            >
              <p>{movie.title}</p>
            </Link>
          </div>
        );
      });
    }
  }

  function showClose(input) {
    if (input != '') {
      return (
        <CloseIcon
          className='close-icon'
          onClick={() => {
            inputRef.current.value = '';
            setQuery('');
            setMovieRes([]);
            setShowRes([]);
          }}
        />
      );
    }
  }

  useEffect(() => {
    if (method === 'movie') {
      searchMovie(searchQuery);
    } else if (method === 'show') {
      searchTvShow(searchQuery);
    }

    if (inputRef.current.value === '') {
      setQuery('');
      setMovieRes([]);
      setShowRes([]);
    }
  }, [searchQuery, method]);

  return (
    <div className='search-div__wrapper'>
      <Dropdown method={method} setMethod={setMethod} />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='icon-div'>
          <SearchIcon className='search-icon' />
        </div>
        <input
          ref={inputRef}
          type='text'
          placeholder='Search...'
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <div className='icon-div'>
          {inputRef.current ? showClose(inputRef.current.value) : ''}
        </div>
      </form>

      <div className='search-output__div'>
        <div className='search-values__div'>
          {method === 'show' ? getShowData(showRes) : ''}
          {method === 'movie' ? getMovieData(movieRes) : ''}
        </div>
      </div>
    </div>
  );
}

export default Search;
