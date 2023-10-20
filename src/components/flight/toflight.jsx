import React, { useEffect, useRef, useState } from 'react';
import './toFlight.css';
import airportData from './airport.json';
import { useDispatch, useSelector } from 'react-redux';
import { setFromAirport, setToAirport } from '../../slices/toFromSlice';
import useOutsideClick from '../../hooks/useOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faArrowRightArrowLeft} from '@fortawesome/free-solid-svg-icons';
const ToFrom = ({ handleFromChange, handleToChange, selectedOption}) => {
  const dispatch = useDispatch();
  const selectReturnDate = useSelector((state) => state.toFrom.returnDate);
  const [fromValue, setFromValue] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toValue, setToValue] = useState('');
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedFromAirport, setSelectedFromAirport] = useState(null);
  const [selectedToAirport, setSelectedToAirport] = useState(null);
  const [defaultFromAirport, setDefaultFromAirport] = useState({
    city: 'Dhaka',
    country: 'Bangladesh',
    name: "Hazrat Shahjalal International Airport",
    code: "DAC",
  });
  
  const [defaultToAirport, setDefaultToAirport] = useState({
    city: "Cox's Bazar",
    country: 'Bangladesh',
    name: "Cox's Bazar Airport",
    code: "CGP",
  });
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const handleFromChangeInternal = (event) => {
    const searchInput = event.target.value;
    setFromValue(searchInput);

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
    const filteredAirports = airportData
      .flatMap((country) => country.airports)
      .filter(
        (airport) =>
          airport.city.toLowerCase().includes(searchInput.toLowerCase()) ||
          airport.country.toLowerCase().includes(searchInput.toLowerCase()) ||
          airport.code.toLowerCase().includes(searchInput.toLowerCase())
      );

    setToSuggestions(filteredAirports);
    handleToChange(searchInput);
  };

  const handleFromClick = () => {
    setFromValue('');
    if (fromSuggestions.length === 0) {
      const filteredAirports = airportData.find(
        (country) => country.country === 'Bangladesh'
      ).airports;
      setFromSuggestions(filteredAirports);
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToClick = () => {
    setToValue('');
    if (toSuggestions.length === 0) {
      const filteredAirports = airportData.find(
        (country) => country.country === 'Bangladesh'
      ).airports;
      setToSuggestions(filteredAirports);
    } else {
      setToSuggestions([]);
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

  //close suggestion box to outside click
  useOutsideClick(fromInputRef, () => {
    setFromSuggestions([]);
  });

  useOutsideClick(toInputRef, () => {
    setToSuggestions([]);
  });

  const handleSwap = () => {
    // Swap the values of fromValue and toValue
    const temp = fromValue;
    setFromValue(toValue);
    setToValue(temp);

    // Swap the selected airports
    setSelectedFromAirport(selectedToAirport);
    setSelectedToAirport(selectedFromAirport);

      // Swap the default airports
  setDefaultFromAirport(defaultToAirport);
  setDefaultToAirport(defaultFromAirport);

  };
  useEffect(() => {
    setFromValue(defaultFromAirport.city);
    setToValue(defaultToAirport.city);
  }, [defaultFromAirport, defaultToAirport]);

  return (
    <div className="input-container">
      <div className="input-content">
        <p>From</p>
        <input
          className="from"
          type="text"
          value={fromValue}
          onClick={handleFromClick}
          onChange={handleFromChangeInternal}
          ref={fromInputRef}
          placeholder="Airport"
        />
        {selectedFromAirport ? (
          <div className="selected-airport">
            <p>{selectedFromAirport.country}</p>
            <p className="text-sm"> {selectedFromAirport.name}</p>
          </div>
        ) : (
          // Display the default From airport values
          <div className="selected-airport">
            <p>{defaultFromAirport.country}</p>
            <p className="text-sm">{defaultFromAirport.name}</p>
          </div>
        )}
        {fromSuggestions.length > 0 && (
          <div className="suggestionBox-from">
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
      { selectedOption !== 'multiCity' &&
        <button onClick={handleSwap} className="swap-button" title="Swap From and To">
       
      
      {selectReturnDate !== null ? (
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            ) : (
              <FontAwesomeIcon icon={faArrowRightLong} />
            )}
       
      </button>
      }
      <div className="input-content">
        <p>To</p>
        <input
          type="text"
          value={toValue}
          onClick={handleToClick}
          onChange={handleToChangeInternal}
          ref={toInputRef}
          placeholder="Airport"
          className="to font-bold"
        />
        {selectedToAirport ? (
          <div className="selected-airport">
            <p>{selectedToAirport.country}</p>
            <p className="text-sm">{selectedToAirport.name}</p>
          </div>
        ) : (
          // Display the default To airport values
          <div className="selected-airport">
            <p>{defaultToAirport.country}</p>
            <p className="text-sm">{defaultToAirport.name}</p>
          </div>
        )}

        {toSuggestions.length > 0 && (
          <div className="suggestionBox-to">
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
    </div>
  );
};

export default ToFrom;
