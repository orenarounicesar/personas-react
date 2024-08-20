import React, { useState } from 'react';
import axios from 'axios';

const PersonDetail = () => {
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [person, setPerson] = useState(null);

  const handleChange = (e) => {
    setIdentificationNumber(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/people/${identificationNumber}`);
      setPerson(response.data);
    } catch (error) {
      console.error('Error fetching person:', error);
      alert('Person not found');
      setPerson(null);
    }
  };

  return (
    <div>
      <div>
        <label>Identification Number:</label>
        <input type="text" value={identificationNumber} onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {person && (
        <div>
          <h3>Person Details</h3>
          <p>Identification Type: {person.identification_type}</p>
          <p>Identification Number: {person.identification_number}</p>
          <p>First Name 1: {person.first_name1}</p>
          <p>First Name 2: {person.first_name2}</p>
          <p>Last Name 1: {person.last_name1}</p>
          <p>Last Name 2: {person.last_name2}</p>
          <p>Gender: {person.gender}</p>
          <p>Date of Birth: {person.date_of_birth}</p>
        </div>
      )}
    </div>
  );
};

export default PersonDetail;
