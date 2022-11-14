import React from 'react';
import logo from '../Images/logo.png';
import { Link } from 'react-router-dom';
import '../Styles/Header.css';
import Search from './Search';

function Header() {
  return (
    <header>
      <div className='header-content__div'>
        <div className='header-left-side__div'>
          <div className='header-logo__div'>
            <Link className='logo-link' to='/'>
              <img src={logo} />
            </Link>
          </div>
          <div className='header-navigation__div'>
            <nav>
              <li>
                <Link className='navigation__link' to='/popular'>
                  Popular
                </Link>
              </li>
              <li>
                <Link className='navigation__link' to='/top_rated'>
                  Top rated
                </Link>
              </li>
              <li>
                <Link className='navigation__link' to='upcoming'>
                  Upcoming
                </Link>
              </li>
            </nav>
          </div>
        </div>
        <div className='right-side__div'>
          <Search />
        </div>
      </div>
    </header>
  );
}

export default Header;
