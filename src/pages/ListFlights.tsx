import React, { useState, useEffect } from 'react';
import './ListFlights.css';
import { FlightData } from '../common/types';
import PriceTrackModal from './PriceTrackModal';

const ListFlights = () => {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<FlightData[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSourceCity, setSelectedSourceCity] = useState('');
  const [selectedDestinationCity, setSelectedDestinationCity] = useState('');
  const [selectedFlight, setSelectedFlight] = useState<FlightData>();
  const [showPriceTrackModal, setShowTrackPriceModal] = useState(false);

  const handleDateChange = (e : any) => {
    setSelectedDate(e.target.value);
    // Filter flights by date
    // console.log('selected date value ', e.target.value);
    filterFlights(e.target.value, selectedSourceCity, selectedDestinationCity)
  };

  const handleSourceCityChange = (e: any) => {
    setSelectedSourceCity(e.target.value);
    
    filterFlights(selectedDate, e.target.value, selectedDestinationCity);
  };

  const handleDestinationCityChange = (e: any) => {
    setSelectedDestinationCity(e.target.value);
    
    filterFlights(selectedDate, selectedSourceCity, e.target.value);
  };

  // TODO: Refactor function arguments into an object?
  const filterFlights = (date : string, sourceCity : string, destinationCity: any) => {
    let filtered = flights;

    if (date) {
      filtered = filtered.filter((flight) => {
        const flightDateOnly = flight.flight_date.split('T')[0]; // Get the date part only
        return flightDateOnly === date;
      });
    }

    if (sourceCity) {
      filtered = filtered.filter((flight) => flight.source_city.toLowerCase().includes(sourceCity.toLowerCase()));
    }

    if (destinationCity) {
      filtered = filtered.filter((flight) => flight.destination_city.toLowerCase().includes(destinationCity.toLowerCase()));
    }

    setFilteredFlights(filtered);
  };

  const fetchFlights = async () => {
    // console.log('fetch flights');
    try {
      // TODO: Handle server being unavailable
      const response = await fetch('http://localhost:3001/api/flights');
      const data = await response.json();
      // console.log('data ', data);
      setFlights(data);
      setFilteredFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleTrackPriceClick = (flight: FlightData) => {
    setSelectedFlight(flight);
    setShowTrackPriceModal(true);
  };

  const onClose = () => {
    setShowTrackPriceModal(false);
  }

  return (
    <div>
      <h2>List of Flights</h2>
      <label>
        Filter by Departure Date:
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </label>
      <label>
        Filter by Source City:
        <input type="text" value={selectedSourceCity} onChange={handleSourceCityChange} />
      </label>
      <label>
        Filter by Destination City:
        <input type="text" value={selectedDestinationCity} onChange={handleDestinationCityChange} />
      </label>
      {filteredFlights.length === 0 ? (
        <p>No flights match the selected date.</p>
      ) : (
      showPriceTrackModal ?
        <PriceTrackModal flightIdToTrack={selectedFlight?.id!} onClose={onClose} /> :
      filteredFlights.map((flight) => (
        <div key={flight.id} className="list-item">
          <div className="list-item-header">Flight Number: {flight.flight_number}</div>
          <div className="list-item-details">
            <p>Source: {flight.source_city}</p>
            <p>Destination: {flight.destination_city}</p>
            <p>Departure: {flight.departure_time}</p>
            <p>Arrival: {flight.arrival_time}</p>
            <p>Date: {flight.flight_date}</p>
            {
            flight.cost === null ? <p>Cost: Please check back later</p> :
                <p>Cost: {flight?.cost} {flight?.currency}</p>
            }
          </div>
          <button onClick={() => handleTrackPriceClick(flight)}>Track price</button>
        </div>
      )))}
    </div>
  );
};

export default ListFlights;
