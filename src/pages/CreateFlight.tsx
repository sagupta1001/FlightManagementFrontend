import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateFlight: React.FC = () => {
  // TODO: Have one state for all fields
  const [flightNumber, setFlightNumber] = useState('');
  const [aircraftNumber, setAircraftNumber] = useState('');
  const [sourceCity, setSourceCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    let timer : NodeJS.Timeout;
    if (responseMessage) {
      // Set a timer to clear the success message after 2 seconds
      timer = setTimeout(() => {
        setResponseMessage('');
      }, 2000);
    }

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [responseMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    // console.log('Submitted data:', {
    //   flightNumber,
    //   aircraftNumber,
    //   sourceCity,
    //   destinationCity,
    //   flightDate,
    //   departureTime,
    //   arrivalTime,
    // });

    axios.post('http://localhost:3001/api/flights', {
      flightNumber,
      aircraftNumber,
      sourceCity,
      destinationCity,
      flightDate,
      departureTime,
      arrivalTime,
    })
      .then((response) => {
        // console.log('New flight created:', response.data);
        // Handle success, redirect, or show a success message to the user.
        setResponseMessage('Flight created successfully');
      })
      .catch((error) => {
        console.error('Error creating flight:', error);
        // Handle error, show an error message to the user, etc.
        setResponseMessage(`Error creating flight: ${error}`);
      });
  };

  return (
    <div>
      <h1>Create a new Flight</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Flight Number:</label>
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => {
              // console.log(e);
              setFlightNumber(e.target.value)
            }}
            required
          />
        </div>
        <div>
          <label>Aircraft Number:</label>
          <input
            type="text"
            value={aircraftNumber}
            onChange={(e) => setAircraftNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Source City:</label>
          <input
            type="text"
            value={sourceCity}
            onChange={(e) => setSourceCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Destination City:</label>
          <input
            type="text"
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Departure Time:</label>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Arrival Time:</label>
          <input
            type="time"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Flight Date:</label>
          <input
            type="date"
            name="flightDate"
            value={flightDate}
            onChange={(e) => setFlightDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <div className="success-message">{responseMessage}</div>}
    </div>
  );
};

export default CreateFlight;
