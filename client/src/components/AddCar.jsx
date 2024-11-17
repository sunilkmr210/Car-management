import React, { useState } from 'react';
import './AddCar.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { update } from '../redux/userRedux';
import { useNavigate } from 'react-router-dom';

const Car = () => {

  const { currentUser } = useSelector(state => state.user);

  const userRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      token: `Bearer ${currentUser.accesstoken}`
    },
  });

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert('You can only upload up to 10 images.');
      return;
    }
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    const form = new FormData();  
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("tag", formData.tag);

    formData.images.forEach((image) => {
      form.append("images", image);  
    });

    try{
      const res = await userRequest.post(`/cars/addCar/${currentUser._id}`, form);

      //needed to avoid shallow copy and immutable redux state
      const updatedUser = {...currentUser, cars: [...currentUser.cars, res.data._id]};

      dispatch(update(updatedUser));
      navigate('/listCars');

      console.log(res.data);



    }catch(err){
      console.log(err.message);
    }

  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="label">Car Name:</div>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <div className="label">Description:</div>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <div className="label">Tag:</div>
        <input
          type="text"
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <div className="label">Upload Images:</div>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        {formData.images.length > 0 && (
          <p>{formData.images.length} file(s) selected</p>
        )}
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default Car;
