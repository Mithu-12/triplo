import React, { useEffect } from 'react';
import axios from 'axios';

const FlightSearch = () => {
  useEffect(() => {
    const searchFlights = async (searchCriteria) => {
      try {
        const response = await axios.get('/api/airport/search', {
          params: searchCriteria,
        });
        const flights = response.data.flights;
        // Process the flight search results
        console.log(flights);
      } catch (error) {
        console.error('Error searching flight offers:', error);
      }
    };

    // Example usage
    const searchCriteria = {
      fromCity: 'New York',
      toCity: 'London',
      departureDate: '2023-08-01',
      passengerCount: 1,
    };

    searchFlights(searchCriteria);
  }, []);

  return <div>Flight Search Component</div>;
};

export default FlightSearch;