import React, { useEffect, useState } from 'react';
import './CarList.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { update } from '../redux/userRedux';

const CarList = () => {

  const { currentUser } = useSelector(state => state.user);

  const userRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${currentUser.accesstoken}`
    },
  });

  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await userRequest.get(`/cars/fetchCars/${currentUser._id}`);
        if(JSON.stringify(res.data) !== JSON.stringify(cars)){
          setCars(res.data);
        }
        console.log(res.data);

      } catch (err) {
        console.log(err.message);
      }
    }
    if(!query){
      fetchCars();
    }
  }, [cars]);

  useEffect(() => {
    if (query) {

      const searchCars = async () => {

        try {
          const res = await userRequest.get(`/cars/search?query=${query}`);
          setCars(res.data);

          console.log(res.data);
        } catch (err) {
          console.log(err.message);
        }

      }
      searchCars();

    }
  }, [query]);

  const handleEdit = async (car) => {

    navigate('/updateCar', { state: {car} });

  }

  const handleDelete = async (car) => {
    try {
      const res = await userRequest.delete(`/cars/deleteCar/${car._id}/${currentUser._id}`);

      console.log(res.data);

      setCars(res.data);
      const updatedCars = currentUser.cars.filter(i => i._id !== car._id);
      const updatedUser = {...currentUser, cars: updatedCars};
      dispatch(update(updatedUser));


    } catch (err) {
      console.log(err.message);
    }
  }

  const handleClick = (car) => {
    navigate('/car', { state: {car} });
  }

  return (
    <div className='car-list-container'>
      <Navbar setQuery={setQuery} />
      {cars.length == 0 && <div style={{ "textAlign": "center", "fontWeight": "normal", "fontSize": "25px" }}> No Cars are added </div>}
      {cars.length !== 0 && <div className="car-list">
        {cars.map((car, index) => (
          <div className="car-card" key={index}>
            <i className="material-icons" style={{ "margin-left": "250px" }} onClick={()=>handleEdit(car)}>edit</i>
            <i className="material-icons" onClick={()=>handleDelete(car)}>delete</i>
            {car.images && car.images.length > 0 && (
              <img className="car-image" src={`https://car-management-hrir.onrender.com/${car.images[0].replace(/\\/g, '/')}`} alt={car.title} onClick={() => handleClick(car)}/>
            )}
            <h3 className="car-title" onClick={() => handleClick(car)}>{car.title}</h3>
            <p className="car-description" onClick={() => handleClick(car)}>{truncateDescription(car.description)}</p>
            {car.tag && <span className="car-tag">{car.tag}</span>}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default CarList;
