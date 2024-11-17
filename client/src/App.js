import AddCar from './components/AddCar';
import CarInfo from './components/CarInfo';
import CarList from './components/CarsList';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateCar from './components/UpdateCar';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/listCars" element={<CarList/>}></Route>
        <Route exact path="/addCar" element={<AddCar />}></Route>
        <Route exact path="/car" element={<CarInfo/>}></Route>
        <Route exact path="/updateCar" element={<UpdateCar/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
