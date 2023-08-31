import { useEffect, useState } from "react";
import EditFlightModal from "./EditFlightModal";
import { FlightData } from "../common/types";
import EditFlightCostModal from "./EditFlightCostModal";

const UpdateFlightFinance = () => {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<FlightData[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSourceCity, setSelectedSourceCity] = useState('');
  const [selectedDestinationCity, setSelectedDestinationCity] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightData>();

  const fetchFlights = async () => {
    try {
      // TODO: Handle server being unavailable
      const response = await fetch('http://localhost:3001/api/flights');
      const data = await response.json();
      setFlights(data);
      setFilteredFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleDateChange = (e : any) => {
    setSelectedDate(e.target.value);
    // Filter flights by date
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

  const handleEditClick = (flight : FlightData) => {
    setSelectedFlight(flight);
    setShowEditModal(true);
  };

  // Scalability issues with this. TODO: Look into optimizations here
  const handleUpdateFlight = (updatedFlight : FlightData) => {
    setFilteredFlights((prevFlights) =>
      prevFlights.map((flight) => {
        return (flight.id === updatedFlight.id ? updatedFlight : flight)
      })
    );
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <div>
      <h2>Flight Editor</h2>
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
      showEditModal ? 
        <EditFlightCostModal flight={selectedFlight!} onClose={handleCloseModal} onUpdate={handleUpdateFlight} /> 
        : filteredFlights.map((flight) => (
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
            <button onClick={() => handleEditClick(flight)}>Edit</button>
          </div>
        </div>
      )))}
    </div>
  );
}

export default UpdateFlightFinance;