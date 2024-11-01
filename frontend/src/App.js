
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import SuperheroCreation from './pages/SuperheroCreation/SuperheroCreation';
import SuperheroPage from './pages/SuperheroPage/SuperheroPage';
import SuperheroEdition from './pages/SuperheroEdition/SuperheroEdition';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create' element={<SuperheroCreation/>}></Route>
        <Route path='/hero/:id' element={<SuperheroPage/>}></Route>
        <Route path='/edit/:id' element={<SuperheroEdition/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
