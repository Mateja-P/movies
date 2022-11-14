import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Components/Home';
import Header from './Components/Header';
import Popular from './Components/Popular';
import TopRated from './Components/TopRated';
import Upcoming from './Components/Upcoming';
import Movie from './Components/Movie';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/top_rated' element={<TopRated />} />
          <Route path='/upcoming' element={<Upcoming />} />
          <Route path='/movie/:movieId' element={<Movie />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
