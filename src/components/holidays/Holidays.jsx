import React, { useState } from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useGetPackagesQuery } from '../../api/packageApi';
import { useNavigate } from 'react-router-dom';


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: 8,
    borderColor: state.isFocused ? 'blue' : 'gray',
    boxShadow: state.isFocused ? '0 0 0 2px lightblue' : 'none',
    '&:hover': {
      borderColor: 'blue',
    },
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'lightblue' : 'white',
    color: state.isFocused ? 'blue' : 'black',
    '&:hover': {
      backgroundColor: 'lightblue',
      color: 'blue',
      
    },
  }),

  // Styles for the selected option(s)
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#E0E0E0',
    // width: '500px',
    color: 'white',
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
  }),

  // Styles for the single value (displayed when only one option is selected)
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

export default function AnimatedMulti() {
  const { data: packages, isLoading, isError } = useGetPackagesQuery();
  const [selectedOptions, setSelectedOptions] = useState([]);
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
  const handleSearch = () => {
    // Filter the data based on the selected options
    const searchData = packages.filter((item) =>
      selectedOptions.some((selected) => selected.value === item.package)
    );
    navigate('/packageMenu', {state: {data: searchData}})
  };

  return (
    <div className='h-60 bg-white'>
    <Select
    className='pt-12'
      closeMenuOnSelect={false}
      components={makeAnimated()}
      isMulti
      options={packages.map((item) => ({ value: item.package, label: item.package }))}
      value={selectedOptions}
      onChange={setSelectedOptions}
      styles={customStyles}
    />
    <button className='bg-yellow-400 py-5 px-10' onClick={handleSearch}>Search</button>
  </div>
  );
}