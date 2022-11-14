import React from 'react';
import '../Styles/Card.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Card({ children, movieId }) {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => {
        navigate(`/movie/${movieId}`);
      }}
      whileHover={{ scale: 1.2, zIndex: 3 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className='card__div'
    >
      {children}
    </motion.div>
  );
}

export default Card;
