
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import LogInn from './LogInn';
import Registerr from './Registerr';
import Tododo from './Tododo';


function App() {
 
  return (
    <BrowserRouter>
    <Routes>
    
    <Route path='/' element = { <Registerr></Registerr>}></Route>
    <Route path='/register' element = { <Registerr></Registerr>}></Route>
    <Route path='/login' element = { <LogInn></LogInn>}></Route>
    <Route path = '/todo' element = { <Tododo></Tododo>}></Route>

    </Routes>
    </BrowserRouter>
  );
}


export default App;
