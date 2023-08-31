import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CreateFlight from './pages/CreateFlight';
import ListFlights from './pages/ListFlights';
import UpdateFlight from './pages/UpdateFlight';
import UpdateFlightFinance from './pages/UpdateFlightFinance';


function App() {
  return (
    <Router>
        {/* TODO: Refactor the navigation code into its own file */}
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin/create-flight">[Admin | Scheduling] Create Flight</Link>
          </li>
          <li>
            <Link to="/admin/update-flight">[Admin | Scheduling] Update Flight</Link>
          </li>
          <li>
            <Link to="/admin/update-flight-finance">[Admin | Finance] Update Flight</Link>
          </li>
          <li>
            <Link to="/list-flights">[Public] List Flights</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<div>Welcome to Flights Management Demo</div>} />
        <Route path="/admin/create-flight" element={<CreateFlight />} />
        <Route path="/admin/update-flight" element={<UpdateFlight />} />
        <Route path="/admin/update-flight-finance" element={<UpdateFlightFinance />} />
        <Route path="/list-flights" element={<ListFlights />} />
      </Routes>
    </Router>
  );
}

export default App;
