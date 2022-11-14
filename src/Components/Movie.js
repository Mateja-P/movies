import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import nextArrow from '../Images/nextArrow.svg';
import prevArrow from '../Images/prevArrow.svg';
import star from '../Images/star.svg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/Movie.css';

//Homepage

function Movie() {
  const param = useParams();
  const { movieId } = param;
  const sliderRef = useRef();

  const [movie, setMovie] = useState([]);
  const [comments, setComments] = useState([]);
  let [commentsLimit, setLimit] = useState(5);
  const [similarMovies, setSimilarMovies] = useState([]);

  let allComments = comments.slice(0, commentsLimit);

  function getMovieDetails(movieId) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=e747a94eda239cfa755cfd7e7187f52c&language=en-US`
      )
      .then((res) => {
        setMovie(res.data);
      });
  }

  function getReviews(movieId) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=e747a94eda239cfa755cfd7e7187f52c`
      )
      .then((res) => {
        const result = res.data.results.reverse();
        setComments(result);
      });
  }

  function getSimilarMovies(movieId) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=e747a94eda239cfa755cfd7e7187f52c`
      )
      .then((res) => {
        setSimilarMovies(res.data.results);
      });
  }

  useEffect(() => {
    getMovieDetails(movieId);
    getReviews(movieId);
    getSimilarMovies(movieId);
  }, []);

  function PrevArrow() {
    return (
      <img
        onClick={() => sliderRef.current.slickPrev()}
        src={prevArrow}
        className='slider-arrows movie-slider-left'
      />
    );
  }
  function NextArrow() {
    return (
      <img
        onClick={() => sliderRef.current.slickNext()}
        src={nextArrow}
        className='slider-arrows movie-slider-right'
      />
    );
  }

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 5,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      {Object.keys(movie).length == 0 ? (
        <div>..Loading</div>
      ) : (
        <motion.div
          initial={{ x: '+15vh' }}
          animate={{ x: '0' }}
          transition={{ duration: 1 }}
          className='single-movie__div-wrapper'
        >
          <div className='overview-relative__div'>
            <img
              className='backdrop_img'
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            />
            <div className='absolute-movie__div'>
              <div className='single-movie-info__div'>
                <div className='single-movie-poster__div'>
                  <motion.img
                    initial={{ opacity: 0, x: '-15px' }}
                    animate={{ opacity: 1, x: '0px' }}
                    transition={{ duration: 1.5 }}
                    className='poster_img'
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: '-50px' }}
                  animate={{ opacity: 1, y: '0px' }}
                  transition={{ duration: 1 }}
                  className='movie-information-right-div'
                >
                  <div>
                    <h1 className='single-movie-title'>{movie.title}</h1>
                    <p className='single-movie-tagline'>{movie.tagline}</p>
                    <div className='single-movie-rating__div-wrapper'>
                      <span className='rating_span'>
                        <img src={star} />
                        <h4>{movie.vote_average}</h4>
                      </span>
                      <h4>({movie.vote_count}) votes</h4>
                    </div>
                    <h4 className='movie-runtime'>{movie.runtime} mins</h4>
                    <h4 className='movie-release'>
                      Release Date: {movie.release_date}
                    </h4>
                    <div className='genres__div-wrapper'>
                      {movie.genres &&
                        movie.genres.map((genre, index) => {
                          return (
                            <div className='genres__div' key={index}>
                              {genre.name}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    <h3 className='single-movie-overview-title'>Overview:</h3>
                    <p className='single-movie-overview'>{movie.overview}</p>
                  </div>
                </motion.div>
              </div>
              <div className='useFul-links__div'>
                <h3>Useful Links</h3>
                <div className='links__div'>
                  <a
                    className='home-link'
                    href={movie.homepage}
                    target='_blank'
                  >
                    Homepage
                  </a>
                  <a
                    className='imdb-link'
                    href={`https://www.imdb.com/title/${movie.imdb_id}/?ref_=nv_sr_srsg_0`}
                    target='_blank'
                  >
                    Imdb
                  </a>
                </div>
              </div>
              <div className='comments-section__wrapper'>
                <h3>Comments</h3>
                <div className='comments-content__div'>
                  {comments.length > 0 ? (
                    allComments.map((comment, index) => {
                      const { username, avatar_path } = comment.author_details;
                      const { content } = comment;

                      return (
                        <div key={index} className='each-comment__wrapper'>
                          <div className='left-side-image__div'>
                            {avatar_path ? (
                              <img
                                className='avatar_img'
                                src={`https://www.gravatar.com/avatar${avatar_path}`}
                              />
                            ) : (
                              <img
                                className='avatar_img'
                                src='http://www.guvitgowl.com/images/admin/no-avatar.png'
                              />
                            )}
                          </div>
                          <div className='right-side-content__div'>
                            <div className='top-comments-info'>
                              <h4>{username}</h4>
                            </div>
                            <div className='comments-content'>
                              <p>{content}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className='no-comments'>No comments yet</p>
                  )}
                </div>

                <p
                  className={
                    commentsLimit > comments.length
                      ? 'expand-comments-p active'
                      : 'expand-comments-p'
                  }
                  onClick={() => {
                    setLimit((commentsLimit += 5));
                  }}
                >
                  Read more
                </p>
              </div>
              <div className='similar-movies-div__wrapper'>
                <h3>Similar movies</h3>
                <Slider
                  ref={sliderRef}
                  className='similar-movies-slider'
                  {...settings}
                >
                  {similarMovies.map((similar, index) => {
                    return (
                      <div className='single-movie-slider' key={index}>
                        <div className='single-movie-image__div'>
                          <img
                            className=''
                            src={`https://image.tmdb.org/t/p/original${similar.poster_path}`}
                          />
                        </div>

                        <div className='similar-movie-info__div'>
                          <h2>{similar.title}</h2>
                          <p>{similar.overview.substring(0, 90) + '...'}</p>
                          <a href={`/movie/${similar.id}`}>See more</a>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Movie;
