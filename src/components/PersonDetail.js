import React, { useState } from 'react';
import axios from 'axios';

const PersonForm = () => {
  const [formData, setFormData] = useState({
    identification_number: '',  // Ahora el identificador principal es identification_number
    identification_type: '',
    first_name1: '',
    first_name2: '',
    last_name1: '',
    last_name2: '',
    gender: '',
    date_of_birth: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/people/${formData.identification_number}`, formData);  // Utiliza identification_number en lugar de personId
      alert('Person updated successfully: ' + JSON.stringify(response.data));
    } catch (error) {
      console.error('Error updating person:', error);
      alert('Error updating person: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Identification Number:</label>
        <input
          type="text"
          name="identification_number"
          value={formData.identification_number}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Identification Type:</label>
        <input
          type="text"
          name="identification_type"
          value={formData.identification_type}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>First Name 1:</label>
        <input
          type="text"
          name="first_name1"
          value={formData.first_name1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>First Name 2:</label>
        <input
          type="text"
          name="first_name2"
          value={formData.first_name2}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name 1:</label>
        <input
          type="text"
          name="last_name1"
          value={formData.last_name1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name 2:</label>
        <input
          type="text"
          name="last_name2"
          value={formData.last_name2}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Person</button>
    </form>
  );
};

export default PersonForm;

