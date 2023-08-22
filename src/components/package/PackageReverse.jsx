import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPackageByIdQuery } from '../../api/packageApi';
import ContentWrapper from '../wrapperComponent/ContentWrapper';
import DatePicker from 'react-datepicker';
import './PackageReverse.css';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
  setReserveRooms,
  setReserveTravelers,
} from '../../slices/packageReserveOrderSlice';

const PackageReverse = () => {
  const { id } = useParams();
  const [travelDate, setTravelDate] = useState();
 


  const reserveCustomStyle = {
    control: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      borderColor: state.isFocused ? '#00276C' : 'black',
      boxShadow: state.isFocused ? '0 2px 4px rgba(0, 39, 108, 0.5)' : 'none',
      '&:hover': {
        borderColor: '#00276C',
      },
    }),
  };

  const {
    data: packageDetails,
    isLoading,
    isError,
  } = useGetPackageByIdQuery(id);
  console.log('omg', packageDetails);

  const handleTravelDate = (date) => {
    setTravelDate(date);
  };
  
  const dispatch = useDispatch();
  const travelers = useSelector((state) => state.packageReserveOrder.travelers);
  const rooms = useSelector((state) => state.packageReserveOrder.rooms);
  const [selectedRooms, setSelectedRooms] = useState(0);

  const pricePerReserveRoom = {
    singleRoom: packageDetails?.price,
    doubleRoom: packageDetails?.price + packageDetails.price * 0.85,
    twinRoom: packageDetails?.price + packageDetails.price * 1.5,
    tripleRoom: packageDetails?.price + packageDetails.price * 1.75,
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const key in rooms) {
      totalPrice += rooms[key] * pricePerReserveRoom[key];
    }
    return totalPrice;
  };
  const calculateRoomPrices = () => {
    const roomPrices = {};
    for (const key in rooms) {
      if (rooms[key] > 0) {
        roomPrices[key] = rooms[key] * pricePerReserveRoom[key];
      }
    }
    return roomPrices;
  };

  const roomPrices = calculateRoomPrices();


  useEffect(() => {
    const totalSelectedRooms = Object.values(rooms).reduce(
      (total, count) => total + count,
      0
    );
    setSelectedRooms(totalSelectedRooms);
  }, [rooms]);


  // const handleIncrement = (type, key) => {
  //   if (type === 'travelers') {
  //     const maxTravelers = selectedRooms ; 
  //     console.log('Max Travelers:', maxTravelers); // Debugging
  //     console.log('Current Travelers:', travelers[key]);
  //     if (travelers[key] < maxTravelers) {
  //       dispatch(
  //         setReserveTravelers({
  //           ...travelers,
  //           [key]: travelers[key] + 1,
  //         })
  //       );
  //     }
  //   } else if (type === 'rooms') {
      
  //     const updatedRooms = {
  //       ...rooms,
  //       [key]: rooms[key] + 1,
  //     };
  
  //     // Check if all other room types have a quantity of 0
  //     const allOtherRoomsZero =
  //       key !== 'singleRoom' &&
  //       Object.keys(updatedRooms)
  //         .filter((roomKey) => roomKey !== 'singleRoom')
  //         .every((roomKey) => updatedRooms[roomKey] === 0);
  
  //     if (allOtherRoomsZero) {
  //       updatedRooms.singleRoom = updatedRooms.singleRoom || 1;
  //     }
  
  //     // Update selectedRooms based on the total selected rooms
     
  
  //     dispatch(setReserveRooms(updatedRooms));
  //   }
  // };
  
  const handleIncrement = (type, key) => {

    if (type === 'rooms') {
       // Define the value here
  
      const updatedRooms = {
        ...rooms,
        [key]: rooms[key] + 1,
      };
  
      // Check if all other room types have a quantity of 0
      const allOtherRoomsZero =
        key !== 'singleRoom' &&
        Object.keys(updatedRooms)
          .filter((roomKey) => roomKey !== 'singleRoom')
          .every((roomKey) => updatedRooms[roomKey] === 0);
  
      if (allOtherRoomsZero) {
        updatedRooms.singleRoom = updatedRooms.singleRoom || 1;
      }
  
      // Update selectedRooms based on the total selected rooms
      const totalSelectedRooms = Object.values(updatedRooms).reduce(
        (total, roomCount) => total + roomCount,
        0
      );
      setSelectedRooms(totalSelectedRooms);
  
      dispatch(setReserveRooms(updatedRooms));
    }
  
    if (type === 'travelers') {
      const maxTravelers = selectedRooms;
      if (travelers[key] < maxTravelers) {
        dispatch(
          setReserveTravelers({
            ...travelers,
            [key]: travelers[key] + 1,
          })
        );
      }
    }
  };
  


  const handleDecrement = (type, key) => {
    if (type === 'travelers') {
      dispatch(
        setReserveTravelers({
          ...travelers,
          [key]: Math.max(travelers[key] - 1, 0),
        })
      );
    } else if (type === 'rooms') {
      const updatedRooms = {
        ...rooms,
        [key]: Math.max(rooms[key] - 1, 0),
      };

      // Check if all other room types have a quantity of 0
      const allOtherRoomsZero =
        key !== 'singleRoom' &&
        Object.keys(updatedRooms)
          .filter((roomKey) => roomKey !== 'singleRoom')
          .every((roomKey) => updatedRooms[roomKey] === 0);

      if (allOtherRoomsZero) {
        updatedRooms.singleRoom = updatedRooms.singleRoom || 1;


      }

     

      dispatch(setReserveRooms(updatedRooms));
    }
  };

// Helper function to determine the traveler multiplier based on room type
// const getTravelerMultiplier = (roomType) => {
//   console.log(roomType)
//   if (roomType === 'singleRoom') {
//     return 1;
//   } else if (roomType === 'doubleRoom') {
//     return 2;
//   } else if (roomType === 'twinRoom') {
//     return 2;
//   } else if (roomType === 'tripleRoom') {
//     return 3;
//   }
//   return 1; 
// };


  const renderControls = (type, label, keys) => {
    const maxTravelers = selectedRooms || 1; 
    return (
      <div className="flex items-center justify-between py-3">
        <div>
          <p className="text-lg">{label}</p>
          <p>
            {keys === 'adults'
              ? '12+ years'
              : keys === 'child'
              ? '7-12 years'
              : keys === 'child2'
              ? '3-6 years' 
              : keys === 'infants' ? 'Under 3 years'
              : ''}
          </p>
        </div>
        <div className="flex items-center text-xl">
          <button onClick={() => handleDecrement(type, keys)}> - </button>
          <p>
          {type === 'travelers' && travelers[keys] >= maxTravelers
            ? maxTravelers
            : type === 'travelers'
            ? travelers[keys]
            : rooms[keys]}
        </p>
          <button onClick={() => handleIncrement(type, keys)}> + </button>
        </div>
      </div>
    );
  };

  const titleOptions = [
    { value: 'Mr.', label: 'Mr.' },
    { value: 'Md.', label: 'Md.' },
    { value: 'Ms.', label: 'Ms.' },
    { value: 'Miss.', label: 'Miss.' },
    { value: 'Mrs.', label: 'Mrs.' },
  ];
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  return (
    <div>
      <ContentWrapper>
        <div className="packageReverse-image">
          {packageDetails.image ? (
            <img
              className="packageReverse-img"
              src={packageDetails.image[0].img2}
            />
          ) : (
            ''
          )}
        </div>
        <div className="reserved-content flex mt-5">
          <div className="basis-8/12 my-3">
            <div className="reserve-header text-xl font-semibold">
              <p>Reserve package</p>
            </div>
            <div className="bg-white shadow-md p-8">
              <div></div>
              <div className="reserve-datepicker pb-3">
                <p>Travel Date</p>
                <DatePicker
                  className="w-full"
                  selected={travelDate}
                  onChange={handleTravelDate}
                  minDate={new Date()}
                  placeholderText="Select Travel Date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <div className="reserve-room">
                <div>
                  Rooms
                  {renderControls('rooms', 'Single Room', 'singleRoom')}
                  {renderControls('rooms', 'Double Room', 'doubleRoom')}
                  {renderControls('rooms', 'Twin Room', 'twinRoom')}
                  {renderControls('rooms', 'Triple Room', 'tripleRoom')}
                </div>
              </div>
              <div>
                Travelers
                {renderControls('travelers', 'Adults', 'adults')}
                {renderControls('travelers', 'Child', 'child')}
                {renderControls('travelers', 'Child', 'child2')}
                {renderControls('travelers', 'Infants', 'infants')}
              </div>
            </div>
            <div>
              <div className="bg-white shadow-lg my-5">
                <div className="reserve-contact-details ">
                  <div className="reserve-contact-header">
                    <p className="text-lg font-semibold">Contact Details</p>
                  </div>
                  <div className="px-8 py-14">
                    <div className="flex justify-between">
                      <Select
                        options={titleOptions}
                        placeholder="Title"
                        styles={reserveCustomStyle}
                        required
                      />
                      <Select
                        options={genderOptions}
                        placeholder="Gender"
                        styles={reserveCustomStyle}
                        required
                      />
                      <input
                        type="text"
                        placeholder="First Name"
                        className="reserve-input-width"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="reserve-input-width"
                        required
                      />
                    </div>
                    <div className="pt-8 flex justify-between">
                      <input
                        className="reserve-input-width-last"
                        type="number"
                        placeholder="Mobile Number"
                        required
                      />
                      <input
                        className="reserve-input-width-last"
                        type="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="mt-10">
                <div className="bg-white shadow-lg">
                  <div className="reserve-contact-header">
                    <p className="text-lg font-semibold">
                      Prepared Payment Option
                    </p>
                  </div>
                  <div className="px-8 py-14"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-4/12 ml-5 ">
            <div className="bg-white p-5 shadow-lg">
              <p className='font-semibold text-lg py-1'>Price Summary</p>
              <div className="flex justify-between reserve-price-content">
                <p>Details</p>
                <p>BDT Amount</p>
              </div>
              {Object.entries(roomPrices).map(([key, price]) => (
                <div  key={key} className='reserve-price-list my-3'>
                  <div className='text-lg font-semibold'>
                    Adults {key === 'singleRoom' ? '(1 X per single room)' 
                    : key === 'doubleRoom' ? '(2 X per Double)' 
                    : key === 'twinRoom' ? '(2 X per Twin)'
                    : key === 'tripleRoom' ? '(2 X per Triple)' 
                    : ''}
                  </div>
                  <div className='flex justify-between'>
                  <p>Base Fire</p>
                  <p className='font-semibold'>BDT {pricePerReserveRoom[key]}</p>
                  </div>
                  <div className="flex justify-between ">
                  <p>Total Fare (Base Fare x {rooms[key]}) </p>
                  <p className='font-semibold'>BDT {price}</p>
                  </div>
                </div>
              ))}
              <div className='flex justify-between font-semibold text-lg'>
              <p>Total Payable:</p>
               <p className='font-semibold'>BDT {calculateTotalPrice()}</p></div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default PackageReverse;


