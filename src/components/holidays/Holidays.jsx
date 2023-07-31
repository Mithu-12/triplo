import React, { useState } from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useGetPackagesQuery } from '../../api/packageApi';
import { useNavigate } from 'react-router-dom';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Holidays.css'
import ContentWrapper from '../wrapperComponent/ContentWrapper';


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: 5,
    height: '60px',
    cursor: 'pointer',
    borderColor: state.isFocused ? '#00276C' : 'gray',
    boxShadow: state.isFocused ? '0 2px 4px rgba(0, 39, 108, 0.5)' : 'none',
    '&:hover': {
      borderColor: '#00276C',
    },
  }),

  option: (provided, state) => ({
    ...provided,
    width: '380px',
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
    backgroundColor: '#FFC610',
    // width: '500px',
    color: '#00276C',
    borderRadius: 5,
  }),

  // Styles for the input field inside the control container
  input: (provided) => ({
    ...provided,
    color: 'black',
    
  }),

  // Styles for the dropdown menu container
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '400px',
    // marginLeft: '20px'
  }),

  // Styles for the single value (displayed when only one option is selected)
  singleValue: (provided) => ({
    ...provided,
    color: '#00276C',
    fontWeight: 'bold'
  }),
};

export default function AnimatedMulti() {
  const { data: packages, isLoading, isError } = useGetPackagesQuery();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  const navigate = useNavigate();

  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (isError) {
    return (
      <div>
        <span>Error! Task failed successfully.</span>
      </div>
    );
  }
  const handleToChange = (selectValue)=>{
    setSelectedOptions(selectValue)
    setIsSearchButtonDisabled(false)
  }
  const handleSearch = () => {
    // Filter the data based on the selected options
    const searchData = packages.filter((item) =>
      selectedOptions.some((selected) => selected.value === item.package)
    );
    navigate('/packageMenu', {state: {data: searchData}})
  };

  return (
    <div className='h-60 bg-white holidays-container'>
    
   <div className='holidays-content'>
   <Select
    className='pt-12 holidaysSelect-content'
      closeMenuOnSelect={false}
      components={makeAnimated()}
      isMulti
      options={packages.map((item) => ({ value: item.package, label: item.package }))}
      value={selectedOptions}
      onChange={handleToChange}
      styles={customStyles}
      placeholder='Select Holidays Destination...'
    />
    <div>
        <button className='holidaysSearch-button' type='button' onClick={handleSearch} disabled={isSearchButtonDisabled} style={{ backgroundColor: isSearchButtonDisabled ? '#E0E0E0' : '#FFC610', color: '#00276C' }}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />{' '}
        SEARCH VISA</button>
      </div>
   </div>
    
  </div>
  );
}