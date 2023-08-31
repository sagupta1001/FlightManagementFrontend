import React, { useState } from 'react';
import { FlightData } from '../common/types';

const EditFlightModal = ({ flight, onClose, onUpdate } : {flight: FlightData, onClose: () => void, onUpdate: (flight: FlightData) => void }) => {
  const [updatedFlight, setUpdatedFlight] = useState(flight);
  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setUpdatedFlight((prevFlight) => ({ ...prevFlight, [name]: value }));
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    // Send a PUT request to update flight details in the backend
    try {
      const response = await fetch(`/api/flights/${flight.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFlight),
      });
      if (response.ok) {
        onUpdate(updatedFlight);
        onClose();
      } else {
        // TODO: Improve this
        console.error('Response in EditFlightModal not ok');
      }
      onClose();
    } catch (error) {
      console.error('Error updating flight:', error);
      // Handle error
    }
  };

  return (
    <div className="edit-modal">
      <h3>Edit Flight Details</h3>
      <form onSubmit={handleSubmit}>
        {/* Display input fields for updating flight details */}
        <label>
          Flight Number:
          <input
            type="text"
            name="flight_number"
            value={updatedFlight.flight_number}
            onChange={handleChange}
          />
        </label>
        <label>
          Source:
          <input
            type="text"
            name="source_city"
            value={updatedFlight.source_city}
            onChange={handleChange}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            name="destination_city"
            value={updatedFlight.destination_city}
            onChange={handleChange}
          />
        </label>
        <label>
          Departure:
          <input
            type="time"
            name="departure_time"
            value={updatedFlight.departure_time}
            onChange={handleChange}
          />
        </label>
        <label>
          Arrival:
          <input
            type="time"
            name="arrival_time"
            value={updatedFlight.arrival_time}
            onChange={handleChange}
          />
        </label>
        <label>
          Flight date:
          <input
            type="date"
            name="flight_date"
            value={updatedFlight.flight_date}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditFlightModal;
