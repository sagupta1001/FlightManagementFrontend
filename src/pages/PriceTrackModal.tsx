import { useState } from "react";
import axios from 'axios';

const PriceTrackModal = ({ flightIdToTrack, onClose } : { flightIdToTrack: string, onClose: () => void} ) => {
  const [updatedPriceTrack, setUpdatedPriceTrack] = useState({ email: '', budget: ''});

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    console.log('flight id ', flightIdToTrack);
    console.log(updatedPriceTrack.email);
    console.log(updatedPriceTrack.budget);

    try {
      await axios.post('/api/track-flight', {
        flightId: flightIdToTrack,
        email : updatedPriceTrack.email,
        priceThreshold : updatedPriceTrack.budget,
      }).then((response) => {
        onClose();
      }).catch((error) => {
        console.error('Response in Price Track modal not ok ', error);
      });
    } catch (error) {
      console.error('Error creating the price tracking ', error);
    }

  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedPriceTrack((prevTrack) => ({
      ...prevTrack, [name]: value
    }))
  };

  return (
    <div className="edit-modal">
      <h3>Track price</h3>
      <form onSubmit={handleSubmit}>
        {/* Display input fields for updating flight details */}
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={updatedPriceTrack.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Flight Budget:
          <input
            type="number"
            name="budget"
            value={updatedPriceTrack.budget}
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
}

export default PriceTrackModal;