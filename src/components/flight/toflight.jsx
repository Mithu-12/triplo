import React, { useState } from 'react';
import './style.css';
import airportData from './airport.json';
import { useDispatch } from 'react-redux';
import { setFromAirport, setToAirport } from '../../slices/toFromSlice';

const ToFrom = ({ handleFromChange, handleToChange }) => {
  const [fromValue, setFromValue] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toValue, setToValue] = useState('');
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedFromAirport, setSelectedFromAirport] = useState(null);
  const [selectedToAirport, setSelectedToAirport] = useState(null);

  const dispatch = useDispatch();
  const handleFromChangeInternal = (event) => {
    const searchInput = event.target.value;
    setFromValue(searchInput);
    console.log(fromValue);

    // Filter airports based on search input
    const filteredAirports = airportData
      .flatMap((country) => country.airports)
      .filter(
        (airport) =>
          airport.city.toLowerCase().includes(searchInput.toLowerCase()) ||
          airport.country.toLowerCase().includes(searchInput.toLowerCase())
      );

    setFromSuggestions(filteredAirports);
    handleFromChange(searchInput);
  };

  const handleToChangeInternal = (event) => {
    const searchInput = event.target.value;
    setToValue(searchInput);
    console.log(toValue);
    // Filter airports based on search input
    const filteredAirports = airportData
      .flatMap((country) => country.airports)
      .filter(
        (airport) =>
          airport.city.toLowerCase().includes(searchInput.toLowerCase()) ||
          airport.country.toLowerCase().includes(searchInput.toLowerCase())
      );

    setToSuggestions(filteredAirports);
    handleToChange(searchInput);
  };

  const handleFromClick = () => {
    if (fromSuggestions.length === 0) {
      const filteredAirports = airportData.find(
        (country) => country.country === 'Bangladesh'
      ).airports;
      setFromSuggestions(filteredAirports);
    } else {
      setFromSuggestions([]); // Clear suggestions if already showing
    }
  };

  const handleToClick = () => {
    if (toSuggestions.length === 0) {
      const filteredAirports = airportData.find(
        (country) => country.country === 'Bangladesh'
      ).airports;
      setToSuggestions(filteredAirports);
    } else {
      setToSuggestions([]); // Clear suggestions if already showing
    }
  };

  const handleFromSuggestionClick = (suggestion) => {
    setFromValue(suggestion.city);
    setSelectedFromAirport(suggestion);
    setFromSuggestions([]);
    handleFromChange(suggestion.city);
    dispatch(setFromAirport(suggestion));
  };

  const handleToSuggestionClick = (suggestion) => {
    setToValue(suggestion.city);
    setSelectedToAirport(suggestion);
    setToSuggestions([]);
    handleToChange(suggestion.city);
    dispatch(setToAirport(suggestion));
  };

  return (
    <div className="flight-container">
      <div className="input-container">
        <input
          className="from"
          type="text"
          value={fromValue}
          onClick={handleFromClick}
          onChange={handleFromChangeInternal}
          placeholder="From"
        />
        {fromSuggestions.length > 0 && (
          <div className="suggestion-box">
            <ul>
              {fromSuggestions.map((suggestion) => (
                <li
                  key={suggestion.city}
                  onClick={() => handleFromSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  <div className="code">{suggestion.code}</div>
                  <div className="airport-name">
                    <div>
                      {suggestion.name}, {suggestion.city}
                    </div>
                    <div>{suggestion.country}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={toValue}
          onClick={handleToClick}
          onChange={handleToChangeInternal}
          placeholder="To"
          className="to"
        />
        {toSuggestions.length > 0 && (
          <div className="suggestion-box">
            <ul>
              {toSuggestions.map((suggestion) => (
                <li
                  key={suggestion.city}
                  onClick={() => handleToSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  <div className="code">{suggestion.code}</div>
                  <div className="airport-name">
                    <div>
                      {suggestion.name}, {suggestion.city}
                    </div>
                    <div>{suggestion.country}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {selectedFromAirport && (
        <div className="selected-airport">
          <p>Selected From Airport:</p>
          <p>Country: {selectedFromAirport.country}</p>
          <p>City: {selectedFromAirport.city}</p>
          <p>Airport Name: {selectedFromAirport.name}</p>
          <p>Airport Code: {selectedFromAirport.code}</p>
        </div>
      )}

      {selectedToAirport && (
        <div className="selected-airport">
          <p>Selected To Airport:</p>
          <p>Country: {selectedToAirport.country}</p>
          <p>City: {selectedToAirport.city}</p>
          <p>Airport Name: {selectedToAirport.name}</p>
          <p>Airport Code: {selectedToAirport.code}</p>
        </div>
      )}
    </div>
  );
};

export default ToFrom;
