
import './App.css';
import Form from './Form';
import Home from './Home';
import Signup from './Signup';
import Movies from './Movies';
import Community from './Community';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Form />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/movie' element ={<Movies/>}/>
          <Route path='/Profile' element ={<Profile/>}/>
          <Route path='/Community' element ={<Community/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
