import React, { useState } from 'react';
import Select from 'react-select';
import { countries } from 'countries-list';
import { useGetVisaQuery } from '../../api/visa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTravelers } from '../../slices/visaSlice';
import ContentWrapper from '../wrapperComponent/ContentWrapper';

const countryOptions = Object.keys(countries).map((code) => ({
  value: code,
  label: countries[code].name,
}));

const VisaCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: 8,
    borderColor: state.isFocused ? 'blue' : 'gray',
    boxShadow: state.isFocused ? '0 0 0 2px lightblue' : 'none',
    // width: '300px',
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

const Visa = () => {
  const { data: visas, isLoading, isError } = useGetVisaQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState('');
  const travelers = useSelector((state)=> state.visa.travelers)

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
  
    const handleTravelersCountChange = (travelers) => {
      dispatch(updateTravelers(travelers));
    };

  const handleCountryChange = (selectedOption) => {
    // Dispatch the selected country to Redux
    console.log(selectedOption.name);
  };

  const handleSearch = () => {
    // Filter the data based on the selected options
    const searchData = visas.filter((item) =>
      selectedOptions.some((selected) => selected.value === item.package)
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
    <div>
    <ContentWrapper>
      <div className='flex justify-around'>
      <Select
        options={visas.map((item) => ({
          value: item.country,
          label: item.country,
        }))}
        onChange={setSelectedOptions}
        value={selectedOptions}
        placeholder="Select a country..."
        styles={VisaCustomStyles}
      />
      <Select
        options={countryOptions}
        onChange={handleCountryChange}
        placeholder="Your Nationality"
        styles={VisaCustomStyles}
      />
      <div className="">
        <div className="">
          <h3>Travelers</h3>
          <div>
          <button onClick={handleDecrementTravelers}>hello -</button>
          <p>{travelers}</p>
          <button onClick={handleIncrementTravelers}>+</button>
          </div>
        </div>
      </div>
      </div>
      </ContentWrapper>
    </div>
  );
};

export default Visa;
