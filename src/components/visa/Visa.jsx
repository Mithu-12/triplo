import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { countries } from 'countries-list';
import { useGetVisaQuery } from '../../api/visa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCountry, updateNationality, updateTravelers } from '../../slices/visaSlice';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Visa.css'

const countryOptions = Object.keys(countries).map((code) => ({
  value: code,
  label: countries[code].name,
}));

const visaCountry = [
  { value: 'Srilanka', label: 'Srilanka' },
    { value: 'Malaysia', label: 'Malaysia' },
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Thailand', label: 'Thailand' },
]

const VisaCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: 5,
    height: '60px',
    width: '380px',
    cursor: 'pointer',
    borderColor: state.isFocused ? '#00276C' : 'gray',
    boxShadow: state.isFocused ? '0 2px 4px rgba(0, 39, 108, 0.5)' : 'none',
    '&:hover': {
      borderColor: '#00276C',
    },
  }),
  
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#00276C' : 'white',
    color: state.isFocused ? 'blue' : 'black',
    '&:hover': {
      backgroundColor: '#00276C',
      color: '#ffffff',
    },
  }),
  
  // Styles for the selected option(s)
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#E0E0E0',
    color: 'white',
  }),
  
  // Styles for the input field inside the control container
  input: (provided) => ({
    ...provided,
    color: '#00276C',
    fontWeight: 500,
  }),
  
  // Styles for the dropdown menu container
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }),
  
  // Styles for the single value (displayed when only one option is selected)
  singleValue: (provided) => ({
    ...provided,
    color: '#00276C',
    fontWeight: 'bold'
  }),
  
  
};

const Visa = () => {
  const { data: visa, isLoading, isError } = useGetVisaQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('Bangladesh');
  const travelers = useSelector((state)=> state.visa.travelers)
  const defaultNationality = useSelector((state)=> state.visa.nationality)
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return (
      <div>
        <span>Error! Task failed successfully.</span>
      </div>
    );
  }
  console.log('select', selectedCountry)
    const handleTravelersCountChange = (travelers) => {
      dispatch(updateTravelers(travelers));
    };

  const handleNationalityChange = (selectNationality) => {
    setSelectedNationality(selectNationality.label)
    dispatch(updateNationality(selectNationality.label))
    console.log(selectNationality.label);
  };

  const handleCountryChange = (selectCountry)=>{
    setSelectedCountry(selectCountry.value)
    dispatch(updateCountry(selectCountry.value))
    setIsSearchButtonDisabled(false)
  }

  const handleSearch = () => {
    // Filter the data based on the selected options
    const searchData = visa.find((item) => item.country === selectedCountry
    );
    navigate('/visaDetails', { state: { data: searchData } });
  };

  const handleIncrementTravelers = () => {
    handleTravelersCountChange(travelers + 1);
  };

  const handleDecrementTravelers = () => {
    if (travelers > 1) {
      handleTravelersCountChange(travelers - 1);
    }
  };

console.log('travelers', travelers)
  return (
    <div className='visa-container'>
    
      <div className='visa-content'>
      <Select
        options={visaCountry}
        onChange={handleCountryChange}
        placeholder="Select a Country..."
        styles={VisaCustomStyles}
        className='select-container'
      />
      <Select
        options={countryOptions}
        defaultValue={{ value: defaultNationality, label: defaultNationality }}
        onChange={handleNationalityChange}
        placeholder="Select Your Nationality"
        styles={VisaCustomStyles}
        className='select-container'
      />
      <div className="travelPerson-container">
        <div className="flex text-black justify-between items-center travelPerson-content">
          <h3>Travelers</h3>
          <div className='flex items-center '>
          <button className='visaPerson-count' onClick={handleDecrementTravelers}>-</button>
          <p className='px-3 font-bold text-lg'>{travelers}</p>
          <button className='visaPerson-count' onClick={handleIncrementTravelers}>+</button>
          </div>
        </div>
      </div>
      </div>
      <div>
        <button className='visaSearch-button' type='button' onClick={handleSearch} disabled={isSearchButtonDisabled} style={{ backgroundColor: isSearchButtonDisabled ? '#E0E0E0' : '#FFC610', color: '#00276C' }}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />{' '}
        SEARCH VISA</button>
      </div>
    </div>
  );
};

export default Visa;
