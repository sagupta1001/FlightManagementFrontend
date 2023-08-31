import React, { useState } from "react";
import { FlightData } from "../common/types";

const EditFlightCostModal = ({ flight, onClose, onUpdate } : {flight: FlightData, onClose: () => void, onUpdate: (flight: FlightData) => void }) => {
  const [updatedFlight, setUpdatedFlight] = useState(flight);
  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setUpdatedFlight((prevFlight) => ({ ...prevFlight, [name]: value }));
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    // Send a PUT request to update flight details in the backend
    try {
      // TODO: Switch to axios
      const response = await fetch(`http://localhost:3001/api/flights/${flight.id}/cost`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({updatedFlight}),
      });
      if (response.ok) {
        onUpdate(updatedFlight);
        onClose();
      } else {
        // TODO: Improve this
        console.error('Response in EditFlightCostModal not ok');
      }
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
        Flight Cost:
        <input
          type="number"
          name="cost"
          value={updatedFlight?.cost || NaN}
          onChange={handleChange}
        />
      </label>
      <label>
        Flight Currency:
        <input
          type="text"
          name="currency"
          value={updatedFlight?.currency || ''}
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

export default EditFlightCostModal;