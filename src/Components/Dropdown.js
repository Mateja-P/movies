import React from 'react';
import '../Styles/Dropdown.css';

function Dropdown(props) {
  const { method, setMethod } = props;

  return (
    <div className='options-div__wrapper'>
      <select
        onChange={(e) => {
          setMethod(e.target.value);
        }}
      >
        <option
          className={
            method === 'movie' ? 'search-option active' : 'search-option'
          }
          value='movie'
        >
          Movie
        </option>
        <option
          className={
            method === 'show' ? 'search-option active' : 'search-option'
          }
          value='show'
        >
          Show
        </option>
      </select>
    </div>
  );
}

export default Dropdown;
