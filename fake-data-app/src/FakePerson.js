// src/FakePerson.js
import React, { useState } from 'react';
import domain from './config';  // Import domain

const FakePerson = () => {
  const [personData, setPersonData] = useState([]);  // Array to store the data
  const [numberOfPersons, setNumberOfPersons] = useState(1);  
  const [error, setError] = useState(null);

  const fetchPersonData = async () => {
    try {
      // Fetch the data from the backend using numberOfPersons
      const response = await fetch(`${domain}/${numberOfPersons}`);
      const data = await response.json();
      if (response.ok) {
        setPersonData(data);  // Save the data in state
        setError(null);  // Clear any previous errors
      } else {
        setError('Failed to fetch person data');
        setPersonData([]);  // Clear data in case of error
      }
    } catch (err) {
      setError('Failed to fetch person data');
      setPersonData([]); // Clear data in case of error
    }
  };

  return (
    <div>
      <h2>Generate Fake Persons</h2>

      {/* Input for the number of persons */}
      <label>
        Number of Persons:
        <input
          type="number"
          value={numberOfPersons}
          onChange={(e) => setNumberOfPersons(parseInt(e.target.value))}
          min="1"
          max="100"
        />
      </label>
      <button onClick={fetchPersonData}>Generate</button>

      {error && <div>Error: {error}</div>}  {/* Display error message if any */}

      {/* Display fetched person data */}
      <div>
        {personData.map((person, index) => (
          <div key={index}>
            <h3>Person {index + 1}</h3>
            <p><strong>First Name:</strong> {person.firstname}</p>
            <p><strong>Last Name:</strong> {person.lastname}</p>
            <p><strong>Gender:</strong> {person.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FakePerson;
