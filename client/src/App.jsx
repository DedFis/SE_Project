import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Shops from './pages/Shops';
import Card from './pages/Card';
import Details from './pages/Details';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/shops' element={<Shops />}></Route>
      <Route path='/card' element={<Card />}></Route>
      <Route path='/product/details/:slug' element={<Details />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
