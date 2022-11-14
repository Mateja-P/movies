import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import nextArrow from '../Images/nextArrow.svg';
import prevArrow from '../Images/prevArrow.svg';

import '../Styles/Home.css';
import Popular from './Popular';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=e747a94eda239cfa755cfd7e7187f52c&language=en-US&page=1`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  const sliderRef = useRef(null);

  function PrevArrow() {
    return (
      <img
        onClick={() => sliderRef.current.slickPrev()}
        src={prevArrow}
        className='slider-arrows prevArrow'
      />
    );
  }
  function NextArrow() {
    return (
      <img
        onClick={() => sliderRef.current.slickNext()}
        src={nextArrow}
        className='slider-arrows nextArrow'
      />
    );
  }

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <div className='home-slider__wrapper'>
        <Slider ref={sliderRef} {...settings}>
          {movies.map((movie, index) => {
            return (
              <div className='single-movie__div' key={index}>
                <div className='movie-img__div'>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: '-50px' }}
                  animate={{ opacity: 1, y: '0px' }}
                  transition={{ duration: 1.5 }}
                  className='movie-info__div'
                >
                  <div className='movie-title__div'>
                    <h2>{movie.title}</h2>
                  </div>
                  <div className='movie-overview__div'>
                    <p>{movie.overview}</p>
                  </div>
                  <div className='movie-link__div'>
                    <Link
                      className='movie__link'
                      onClick={(e) => e.stopPropagation()}
                      to={`/movie/${movie.id}`}
                    >
                      See detailes
                    </Link>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className='popular-section__div'>
        <h2 className='popular-section__text'>Popular movies For You</h2>
        <Popular />
      </div>
      <div style={{ height: '200px' }}></div>
    </>
  );
}

export default Home;
