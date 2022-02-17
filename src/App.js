import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar"
import Movies from './components/Movies';
import Banner from './components/Banner';
import Favourites from './components/Favourites';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <NavBar />
            <Banner />
            <Movies />
            {/* <Pagination /> */}
          </>        
        } />

        <Route path="/favourites" element={
          <>
            <Favourites />
          </>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
