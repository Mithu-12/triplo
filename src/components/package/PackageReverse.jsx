import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPackageByIdQuery } from '../../api/packageApi';
import ContentWrapper from '../wrapperComponent/ContentWrapper';
import DatePicker from 'react-datepicker';
import './PackageReverse.css';
import Select from 'react-select';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setReserveRooms,
  setReserveTravelers,
  setReservePaymentType,
  setReserveDate,
  setReserveAddress,
  setReservePrice,
} from '../../slices/packageReserveOrderSlice';
import PaymentOptions from '../payment/Payment';

const PackageReverse = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
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

  const dispatch = useDispatch();
  const travelers = useSelector((state) => state.packageReserveOrder.travelers);
  const rooms = useSelector((state) => state.packageReserveOrder.rooms);
  const address = useSelector((state) => state.packageReserveOrder.address);
  const totalPrice = useSelector((state) => state.packageReserveOrder.price);
  const [selectedRooms, setSelectedRooms] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [addressList, setAddressList] = useState({
    title: '',
    gender: '',
    firstName: '',
    lastName: '',
    number: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    date: false,
    paymentOption: false,
    address: {
      title: false,
      gender: false,
      firstName: false,
      lastName: false,
      number: false,
      email: false,
    },
  });

  const handleTravelDate = (date) => {
    setTravelDate(date);
    dispatch(setReserveDate(date));
    setErrors({ ...errors, date: false });
  };

  const pricePerReserveRoom = {
    singleRoom: packageDetails?.price,
    doubleRoom: packageDetails?.price + packageDetails?.price * 0.85,
    twinRoom: packageDetails?.price + packageDetails?.price * 1.5,
    tripleRoom: packageDetails?.price + packageDetails?.price * 1.75,
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

  dispatch(setReservePrice(calculateTotalPrice()));
  const roomPrices = calculateRoomPrices();

  useEffect(() => {
    const totalSelectedRooms = Object.values(rooms).reduce(
      (total, count) => total + count,
      0
    );
    setSelectedRooms(totalSelectedRooms);
  }, [rooms]);

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
              : keys === 'infants'
              ? 'Under 3 years'
              : ''}
          </p>
        </div>
        <div className="flex items-center text-xl">
          <button
            className="reserve-Inc-Dec"
            onClick={() => handleDecrement(type, keys)}
          >
            {' '}
            -{' '}
          </button>
          <p className="px-3">
            {type === 'travelers' && travelers[keys] >= maxTravelers
              ? maxTravelers
              : type === 'travelers'
              ? travelers[keys]
              : rooms[keys]}
          </p>
          <button
            className="reserve-Inc-Dec"
            onClick={() => handleIncrement(type, keys)}
          >
            {' '}
            +{' '}
          </button>
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

  const handleAddressFieldChange = (field, value) => {
    const updatedAddress = {
      ...address,
      [field]: value,
    };
  
    dispatch(setReserveAddress(updatedAddress));
    setAddressList(updatedAddress);
    setErrors((prevErrors) => ({
      ...prevErrors,
      address: {
        ...prevErrors.address,
        [field]: false,
      },
    }));
  };
  const totalTravelers = travelers.adults + travelers.child +travelers.child2 + travelers.infants
  console.log('traveler', totalTravelers)
  const handlePaymentOptionChange = (option) => {
    setSelectedPayment(option);
    setErrors({ ...errors, paymentOption: false });
  };
  const handleConfirmBooking = async () => {
    try {
      const bookingData = {
        travelDate: travelDate,
        rooms: rooms,
        travelers: totalTravelers,
        email: address?.email,
        firstName: address?.firstName,
        paymentType: selectedPayment,
        price: totalPrice,
        productId: id,
        productData: packageDetails,
        travelersData: address,
        serviceType: 'holidays',
        userId: userId,
        // Add more data fields as needed
      };
      const validationErrors = {};

      if (!travelDate) {
        validationErrors.date = true;
      }

      if (!addressList.firstName) {
        validationErrors.firstName = true;
      }
      if (!addressList.lastName) {
        validationErrors.lastName = true;
      }
      if (!addressList.number) {
        validationErrors.number = true;
      }
      if (!addressList.email) {
        validationErrors.email = true;
      }

      if (!selectedPayment) {
        validationErrors.paymentOption = true;
      }
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const response = await axios.post(
        `https://triplo-flight.onrender.com/api/payment/payment-process/${selectedPayment}`,
        bookingData
      );
      if (response.status === 200) {
        window.location.replace(response.data.url);
        console.log(response.data, 'Booking confirmed successfully!');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      // Handle error cases if needed
    }
    if (selectedPayment === 'sslCommerze') {
      dispatch(setReservePaymentType(selectedPayment));
    } else if (selectedPayment === 'bkash') {
      dispatch(setReservePaymentType(selectedPayment));
    }
  };
console.log(errors)
  return (
    <div>
      <ContentWrapper>
        {packageDetails && (
          <div>
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
                  <div className="reserve-datepicker pb-3">
                    <p>Travel Date</p>
                    <DatePicker
                      className={`w-full ${errors.date ? 'error-border' : ''}`}
                      selected={travelDate}
                      onChange={handleTravelDate}
                      minDate={new Date()}
                      placeholderText="Select Travel Date"
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  {errors.date && (
                    <p className="error-message text-red-500">
                      Please select a travel date
                    </p>
                  )}

                  

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
                            onChange={(selectedOption) =>
                              handleAddressFieldChange(
                                'title',
                                selectedOption.value
                              )
                            }
                            required
                          />
                          <Select
                            options={genderOptions}
                            placeholder="Gender"
                            styles={reserveCustomStyle}
                            onChange={(selectedOption) =>
                              handleAddressFieldChange(
                                'gender',
                                selectedOption.value
                              )
                            }
                            required
                          />
                          <div>
                            <input
                              type="text"
                              placeholder="First Name"
                              className={`reserve-input-width ${
                                errors.firstName ? 'error-border' : ''
                              }`}
                              onChange={(e) =>
                                handleAddressFieldChange(
                                  'firstName',
                                  e.target.value
                                )
                              }
                              required
                            />
                            {errors.firstName && (
                              <p className="error-message text-red-500">
                                Please provide a first name
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Last Name"
                              className="reserve-input-width"
                              onChange={(e) =>
                                handleAddressFieldChange(
                                  'lastName',
                                  e.target.value
                                )
                              }
                              required
                            />
                            {errors.lastName && (
                              <p className="error-message text-red-600">
                                Please provide a last name
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="pt-8 flex justify-between">
                          <div>
                            <input
                              className="reserve-input-width-last"
                              type="number"
                              placeholder="Mobile Number"
                              onChange={(e) =>
                                handleAddressFieldChange(
                                  'number',
                                  e.target.value
                                )
                              }
                              required
                            />
                            {errors.number && (
                              <p className="error-message text-red-500">
                                Please provide a mobile number
                              </p>
                            )}
                          </div>

                          <div>
                            <input
                              className="reserve-input-width-last"
                              type="email"
                              placeholder="Email"
                              onChange={(e) =>
                                handleAddressFieldChange(
                                  'email',
                                  e.target.value
                                )
                              }
                              required
                            />
                            {errors.email && (
                              <p className="error-message text-red-500">
                                Please provide an email
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="mt-10">
                    
                      <PaymentOptions
                        selectedOption={selectedPayment}
                        onOptionSelect={handlePaymentOptionChange}
                      />
                    
                  </div>
                  <button
                    onClick={handleConfirmBooking}
                    className="reserve-confirm-order mt-8 py-3 w-full"
                  >
                    CONFIRM BOOKING
                    {/* <p className='text-center'>CONFIRM BOOKING</p> */}
                  </button>
                </div>
              </div>
              <div className="basis-4/12 ml-5 ">
                <div className="bg-white p-5 shadow-lg">
                  <p className="font-semibold text-lg py-1">Price Summary</p>
                  <div className="flex justify-between reserve-price-content">
                    <p>Details</p>
                    <p>BDT Amount</p>
                  </div>
                  {Object.entries(roomPrices).map(([key, price]) => (
                    <div key={key} className="reserve-price-list my-3">
                      <div className="text-lg font-semibold">
                        Adults{' '}
                        {key === 'singleRoom'
                          ? '(1 X per single room)'
                          : key === 'doubleRoom'
                          ? '(2 X per Double)'
                          : key === 'twinRoom'
                          ? '(2 X per Twin)'
                          : key === 'tripleRoom'
                          ? '(2 X per Triple)'
                          : ''}
                      </div>
                      <div className="flex justify-between">
                        <p>Base Fire</p>
                        <p className="font-semibold">
                          BDT {pricePerReserveRoom[key]}
                        </p>
                      </div>
                      <div className="flex justify-between ">
                        <p>Total Fare (Base Fare x {rooms[key]}) </p>
                        <p className="font-semibold">BDT {price}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <p>Total Payable:</p>
                    <p className="font-semibold">BDT {calculateTotalPrice()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default PackageReverse;
