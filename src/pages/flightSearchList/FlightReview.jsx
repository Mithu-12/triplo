import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import SessionModal from './SessionModal';
import CountdownClock from './CountdownTimer';
import { useSelector } from 'react-redux';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import AccordionFlightBooking from './accordionBookingFlight/AccordionBookingFlight';
import PaymentOptions from '../../components/payment/Payment';
import { countries } from 'countries-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getDaysInMonth } from 'date-fns';
import axios from 'axios';
import useFlightPrice from '../../hooks/useFlightPrice';

const FlightReview = () => {
  const location = useLocation();
  const { sessionEndTime, flightData: flight } = location.state || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpenArray, setIsOpenArray] = useState(false);
  const [travelerData, setTravelerData] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [travelerErrors, setTravelerErrors] = useState([]);
  const selectDepartureDate = useSelector(
    (state) => state.toFrom.departureDate
  );
  const selectReturnDate = useSelector((state) => state.toFrom.returnDate);
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const id = flight?.id;

  console.log('flightData', flight);

  const {
    initialTotalPrice,
    totalDiscount,
    totalFare,
    totalPassenger,
    totalTax,
  } = useFlightPrice(flight);

  function onTimeUp() {
    setIsModalVisible(true);
  }
  const toggleAccordion = () => {
    setIsOpenArray((prevIsOpenArray) => {
      // let updatedIsOpenArray = {...prevIsOpenArray};
      let updatedIsOpenArray = !prevIsOpenArray;
      return updatedIsOpenArray;
    });
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
  const countryOptions = Object.keys(countries).map((code) => ({
    value: code,
    label: `${countries[code].emoji} +${countries[code].phone}`,
    phone: countries[code].phone,
    emoji: countries[code].emoji,
    name: countries[code].name,
  }));

  const dayOptions = (selectedMonth, selectedYear) => {
    const daysInMonth = getDaysInMonth(
      new Date(selectedYear, selectedMonth - 1)
    );
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const monthOptions = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months.map((month, index) => (
      <option key={index + 1} value={index + 1}>
        {month}
      </option>
    ));
  };

  const birthYearOptions = () => {
    const options = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 90; i--) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const handleTravelerChange = (travelerIndex, field, value) => {
    const updatedTravelerData = [...travelerData];
    const travelerToUpdate = { ...updatedTravelerData[travelerIndex] };
    travelerToUpdate[field] = value;
    updatedTravelerData[travelerIndex] = travelerToUpdate;
    setTravelerData(updatedTravelerData);
  };

  const handleSelectedPayment = (option) => {
    setSelectedPayment(option);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      productData: flight,
      travelersData: travelerData,
      address: travelerData[0]?.address,
      email: travelerData[0]?.email,
      firstName: travelerData[0]?.firstName,
      paymentType: selectedPayment,
      travelers: totalPassenger,
      deliveryDate: selectDepartureDate,
      price: totalFare,
      productId: id,
      userId: userId,
      serviceType: 'flight',
    };

    if (!selectedPayment) {
      return;
    }
    try {
      const apiUrl = `https://triplo-flight.onrender.com/api/payment/payment-process/${selectedPayment}`;
      const response = await axios.post(apiUrl, bookingData);
      if (response.status === 200) {
        window.location.replace(response.data.url);
        console.log(response.data, 'Booking confirmed successfully!');
      }
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
    // console.log('Submitted traveler data:', response);
    console.log('Submitted traveler data:', bookingData);
  };

  return (
    <div>
      {/* {isModalVisible && <SessionModal show={isModalVisible} />} */}
      <ContentWrapper>
        <div className="flex pt-24">
          <div className="basis-8/12 w-full mr-8">
            <AccordionFlightBooking
              key={flight?.id}
              flight={flight}
              isOpen={isOpenArray}
              toggleAccordion={() => toggleAccordion()}
            />
            <div>
              <form onSubmit={onSubmit}>
                <div className="visaBookSchedule-contact-header">
                  <p>Travelers Details</p>
                </div>
                <p className="py-7 bg-white border">
                  Please enter the details as given in the Passport for
                  international flights and government approved IDs for domestic
                  flight
                </p>
                <div className="shadow bg-white pb-5 border">
                  {Array.from({ length: totalPassenger }).map((_, index) => {
                    const traveler = travelerData[index];
                    return (
                      <div className=" pb-12" key={index}>
                        <div className="flex gap-3  items-center bookSchedule-traveler-person mb-6">
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{ color: '#3679ec' }}
                          />
                          <p>Traveler {index + 1}</p>
                        </div>
                        <div className="px-9 pt-4" key={index}>
                          <div className="flex justify-between pb-5">
                            <div>
                              <select
                                name="title"
                                className="custom-select"
                                value={travelerData[index]?.title || ''}
                                onChange={(e) =>
                                  handleTravelerChange(
                                    index,
                                    'title',
                                    e.target.value
                                  )
                                }
                                required
                              >
                                <option value="">Title</option>
                                {titleOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              {travelerErrors[index]?.title && (
                                <div className="error">
                                  {travelerErrors[index]?.title}
                                </div>
                              )}
                            </div>
                            <div>
                              <select
                                name="gender"
                                className="custom-select"
                                value={travelerData[index]?.gender || ''}
                                onChange={(e) =>
                                  handleTravelerChange(
                                    index,
                                    'gender',
                                    e.target.value
                                  )
                                }
                                required
                              >
                                <option value="">Gender</option>
                                {genderOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              {travelerErrors[index]?.gender && (
                                <div className="error">
                                  {travelerErrors[index]?.gender}
                                </div>
                              )}
                            </div>
                            <div>
                              <input
                                type="text"
                                name="firstName"
                                placeholder="Enter Your First Name"
                                className="visaBookSchedule-input-width"
                                value={travelerData[index]?.firstName || ''}
                                onChange={(e) =>
                                  handleTravelerChange(
                                    index,
                                    'firstName',
                                    e.target.value
                                  )
                                }
                                required
                              />
                              {travelerErrors[index]?.firstName && (
                                <div className="error">
                                  {travelerErrors[index]?.firstName}
                                </div>
                              )}
                            </div>
                            <div>
                              <input
                                type="text"
                                name="lastName"
                                placeholder="Enter Your Last Name"
                                className="visaBookSchedule-input-width"
                                value={travelerData[index]?.lastName || ''}
                                onChange={(e) =>
                                  handleTravelerChange(
                                    index,
                                    'lastName',
                                    e.target.value
                                  )
                                }
                                required
                              />
                              {travelerErrors[index]?.lastName && (
                                <div className="error">
                                  {travelerErrors[index]?.lastName}
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="py-1">Birth of Date</p>
                            <div className="flex justify-between pb-5">
                              <div>
                                <select
                                  name="birthYear"
                                  className="custom-select"
                                  value={travelerData[index]?.birthYear || ''}
                                  onChange={(e) =>
                                    handleTravelerChange(
                                      index,
                                      'birthYear',
                                      e.target.value
                                    )
                                  }
                                  required
                                >
                                  <option value="">Year</option>
                                  {birthYearOptions()}
                                </select>
                              </div>
                              <div>
                                <select
                                  name="birthMonth"
                                  className="custom-select"
                                  value={travelerData[index]?.birthMonth || ''}
                                  onChange={(e) =>
                                    handleTravelerChange(
                                      index,
                                      'birthMonth',
                                      e.target.value
                                    )
                                  }
                                  required
                                >
                                  <option value="">Month</option>
                                  {monthOptions()}
                                </select>
                              </div>
                              <div>
                                <select
                                  name="birthDay"
                                  className="custom-select"
                                  value={travelerData[index]?.birthDay || ''}
                                  onChange={(e) =>
                                    handleTravelerChange(
                                      index,
                                      'birthDay',
                                      e.target.value
                                    )
                                  }
                                  required
                                >
                                  <option value="">Day</option>
                                  {dayOptions(
                                    travelerData[index]?.birthMonth,
                                    travelerData[index]?.birthYear
                                  ).map((day) => (
                                    <option key={day} value={day}>
                                      {day}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select
                                  name={`nationality-${index}`}
                                  value={travelerData[index]?.nationality || ''}
                                  className="custom-select"
                                  onChange={(e) =>
                                    handleTravelerChange(
                                      index,
                                      'nationality',
                                      e.target.value
                                    )
                                  }
                                  required
                                >
                                  <option value="">Nationality</option>

                                  {countryOptions?.map((code) => (
                                    <option
                                      key={code.name}
                                      label={code.name}
                                      value={code.name}
                                    >
                                      {' '}
                                      {code.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <div>
                              <p>Mobile Number</p>
                              <div className=" flex visaSchedule-select-container ">
                                <select
                                  name={`countryCode-${index}`}
                                  value={
                                    travelerData[index]?.selectedCode || ''
                                  }
                                  // className="custom-select"
                                  onChange={(e) =>
                                    handleTravelerChange(
                                      index,
                                      'selectedCode',
                                      e.target.value
                                    )
                                  }
                                  required
                                >
                                  {countryOptions?.map((code) => (
                                    <option
                                      key={code.emoji}
                                      label={`${code.emoji}  (+${code.phone})`}
                                      value={code.phone}
                                    >
                                      {' '}
                                      +{code.phone}
                                    </option>
                                  ))}
                                </select>

                                <input
                                  type="number"
                                  name={`mobileNumber-${index}`}
                                  className="visaSchedule-number-input"
                                  value={
                                    travelerData[index]?.mobileNumber || ''
                                  }
                                  onChange={(e) =>
                                    handleTravelerChange(
                                      index,
                                      'mobileNumber',
                                      e.target.value
                                    )
                                  }
                                  placeholder="Mobile Number"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <p>Email</p>
                              <input
                                type="email"
                                name={`email-${index}`}
                                className="visaBookSchedule-input-width"
                                style={{ width: '350px' }}
                                value={travelerData[index]?.email || ''}
                                onChange={(e) =>
                                  handleTravelerChange(
                                    index,
                                    'email',
                                    e.target.value
                                  )
                                }
                                placeholder="Enter Your Email"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <PaymentOptions
                  selectedOption={selectedPayment}
                  onOptionSelect={handleSelectedPayment}
                />

                <button
                  className="w-full py-3 mt-5 profile-submit"
                  type="submit"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
          <div className="basis-4/12">
            <div className="p-2 bg-white shadow-sm">
              <CountdownClock
                sessionEndTime={sessionEndTime}
                onTimeUp={onTimeUp}
              />
            </div>
            <div className="bg-white p-5 shadow-lg my-8">
              <p className="font-semibold text-lg py-1">Price Summary</p>
              <div className="flex justify-between visaBookSchedule-price-content">
                <p>Details</p>
                <p>BDT Amount</p>
              </div>
              <p className="py-3 text-lg font-semibold">
                Travelers X {totalPassenger}
              </p>
              <div className="flex justify-between">
                <p>Flight Fee X {totalPassenger}</p>
                <p className="font-semibold">BDT {initialTotalPrice}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax </p>
                <p className="font-semibold">BDT {totalTax}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount </p>
                <p className="font-semibold">BDT {totalDiscount}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg py-3">
                <p>Total Payable:</p>
                <p className="font-semibold">BDT {totalFare}</p>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default FlightReview;
