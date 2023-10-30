import React, { useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import { useSelector } from 'react-redux';
import './VisaBookSchedule.css';
import DatePicker from 'react-datepicker';
import { getDaysInMonth } from 'date-fns';
import { countries } from 'countries-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import usePaymentOptions from '../../hooks/usePaymentHook';
import PaymentOptions from '../../components/payment/Payment';
import axios from 'axios';

const VisaBookSchedule = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const [travelerData, setTravelerData] = useState([]); 
  const [travelerErrors, setTravelerErrors] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('travelerDrop');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const location = useLocation();
  const visa = location.state?.visa || null;
  const { index } = useParams();
  const selectedVisa = visa?.visaList[index];
  const visaTravelers = useSelector((state) => state.visa);
  const travelersCount = visaTravelers?.travelers || 0;
  const inputRef = useRef([]);
  const id = visa._id;
  const visaExpress = '../../../public/visaExpress.jpg';

  const basePrice = selectedVisa?.price;
  const priceWithTraveler = basePrice * travelersCount;
  const visaProcessingFee = 650;
  const totalProcessingFee = visaProcessingFee * travelersCount;
  const pickUpFee = 500;
  const totalPrice = priceWithTraveler + totalProcessingFee + pickUpFee;

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

  const passportYearOptions = () => {
    const options = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i <= currentYear + 50; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  // Handle delete to traveler selected image
  const handleDeleteImage = (travelerIndex, imgIndex) => {
    const updatedTravelerData = [...travelerData];
    const travelerToUpdate = { ...updatedTravelerData[travelerIndex] };

    // Remove the selected image at imgIndex
    const updatedImages = travelerToUpdate.images.filter(
      (image, index) => index !== imgIndex
    );

    travelerToUpdate.images = updatedImages;
    updatedTravelerData[travelerIndex] = travelerToUpdate;
    setTravelerData(updatedTravelerData);
  };

  const handleTravelerChange = (travelerIndex, field, value) => {
    const updatedTravelerData = [...travelerData];
    const travelerToUpdate = { ...updatedTravelerData[travelerIndex] };

    if (field === 'image') {
      const images = travelerToUpdate.images || [];
      images.push(value);
      travelerToUpdate.images = images;
    } else {
      travelerToUpdate[field] = value;
    }

    updatedTravelerData[travelerIndex] = travelerToUpdate;
    setTravelerData(updatedTravelerData);
  };

  const handleImageRefOnclick = (travelerIndex) => {
    inputRef.current[travelerIndex].click();
  };

  const handleDeliveryDate = (date) => {
    setDeliveryDate(date);
  };

  const handleSelectedPayment = (option) => {
    setSelectedPayment(option);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      deliveryDate: deliveryDate,
      productData: visa,
      travelersData: travelerData,
      address: travelerData[0]?.address,
      pickUpAddress: pickUpAddress,
      email: travelerData[0]?.email,
      firstName: travelerData[0]?.firstName,
      paymentType: selectedPayment,
      selectedPlan: selectedVisa,
      price: totalPrice,
      productId: id,
      travelers: travelersCount,
      userId: userId,
      serviceType: 'visa',
    };

    if (!selectedPayment) {
      return; // Don't proceed if no payment option is selected
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

  };

  return (
    <div>
      <ContentWrapper>
        {visa && (
          <div>
            <div>
              <img className="visaImage-container" src={visa.image} alt="" />
            </div>
            <h2 className="text-2xl py-4 font-bold">Book Schedule</h2>
            <div className="flex">
              <div className="basis-8/12">
                <form onSubmit={onSubmit}>
                  <div className="visaBookSchedule-contact-header">
                    <p>Travelers Details</p>
                  </div>
                  {Array.from({ length: travelersCount }).map((_, index) => {
                    const traveler = travelerData[index];
                    return (
                      <div className="bg-white shadow-md" key={index}>
                        <div className="px-9 pt-4" >
                          <div className="flex gap-3  items-center bookSchedule-traveler-person my-4">
                            <FontAwesomeIcon
                              icon={faUser}
                              style={{ color: '#3679ec' }}
                            />
                            <p>Traveler {index + 1}</p>
                          </div>
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
                          <div>
                            <p className="py-1">Passport Expires On</p>
                            <div className="flex justify-between pb-5 passport">
                              <div>
                                <select
                                  name="passportExYear"
                                  className="custom-select"
                                  value={
                                    travelerData[index]?.passportExYear || ''
                                  }
                                  onChange={(e) =>
                                    handleTravelerChange(
                                      index,
                                      'passportExYear',
                                      e.target.value
                                    )
                                  }
                                  required
                                >
                                  <option value="">Year</option>
                                  {passportYearOptions()}
                                </select>
                              </div>
                              <div>
                                <select
                                  name="passportExMonth"
                                  className="custom-select"
                                  value={
                                    travelerData[index]?.passportExMonth || ''
                                  }
                                  onChange={(e) =>
                                    handleTravelerChange(
                                      index,
                                      'passportExMonth',
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
                                  name="passportExDay"
                                  className="custom-select"
                                  value={
                                    travelerData[index]?.passportExDay || ''
                                  }
                                  onChange={(e) =>
                                    handleTravelerChange(
                                      index,
                                      'passportExDay',
                                      e.target.value
                                    )
                                  }
                                  required
                                >
                                  <option value="">Day</option>
                                  {dayOptions(
                                    travelerData[index]?.passportExMonth,
                                    travelerData[index]?.passportExYear
                                  ).map((day) => (
                                    <option key={day} value={day}>
                                      {day}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <input
                                  type="number"
                                  name={`passportNumber-${index}`}
                                  className="visaBookSchedule-input-width"
                                  value={
                                    travelerData[index]?.passportNumber || ''
                                  }
                                  onChange={(e) =>
                                    handleTravelerChange(
                                      index,
                                      'passportNumber',
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter Your Passport Number"
                                  required
                                />
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
                          <div className="py-3">
                            <p>Address</p>
                            <input
                              type="text"
                              name={`address-${index}`}
                              value={travelerData[index]?.address || ''}
                              placeholder="Enter your full address"
                              className="visaBookSchedule-input-width"
                              onChange={(e) =>
                                handleTravelerChange(
                                  index,
                                  'address',
                                  e.target.value
                                )
                              }
                            ></input>
                          </div>

                          <input
                            type="file"
                            // ref={inputRef}
                            ref={(el) => (inputRef.current[index] = el)}
                            name={`image-${index}`}
                            className="hidden-input"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = e.target.files;
                              for (let i = 0; i < files.length; i++) {
                                handleTravelerChange(index, 'image', files[i]);
                              }
                            }}
                          />
                          <div className="flex justify-between py-5">
                            <div className="flex flex-col gap-3">
                              <h1 className="text-lg font-semibold">
                                Upload Document
                              </h1>
                              <div className="flex">
                                {traveler?.images && traveler.images.length > 0
                                  ? traveler.images.map((image, imgIndex) => (
                                      <div
                                        key={imgIndex}
                                        className="visaBookSchedule-image-container "
                                      >
                                        <img
                                          src={URL.createObjectURL(image)}
                                          alt={`Traveler ${index + 1} - Image ${
                                            imgIndex + 1
                                          }`}
                                          width={100}
                                          height={100}
                                        />
                                        <button
                                          className="visaBookSchedule-delete-button"
                                          onClick={() =>
                                            handleDeleteImage(index, imgIndex)
                                          }
                                        >
                                          X
                                        </button>
                                      </div>
                                    ))
                                  : 'No document uploaded'}
                              </div>
                            </div>
                            ;
                            <div onClick={() => handleImageRefOnclick(index)}>
                              <p className="visaBookSchedule-add-document">
                                {' '}
                                + ADD A DOCUMENT
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="my-8 shadow-md bg-white">
                    <div className="visaBookSchedule-contact-header">
                      <p>Choose Delivery Method</p>
                    </div>
                    <div className="flex flex-col  gap-4 p-9 text-lg">
                      <label>
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="travelerDrop"
                          checked={selectedMethod === 'travelerDrop'}
                          onChange={() => setSelectedMethod('travelerDrop')}
                        />
                        <React.Fragment>
                          {' '}
                          I will drop-off my documents
                        </React.Fragment>
                      </label>
                      <div className="flex justify-between">
                        <label>
                          <input
                            type="radio"
                            name="deliveryMethod"
                            value="pickUp"
                            checked={selectedMethod === 'pickUp'}
                            onChange={() => setSelectedMethod('pickUp')}
                          />
                          <React.Fragment>
                            {' '}
                            Pick up from my location
                          </React.Fragment>
                        </label>
                        <p className="font-bold">BDT 500TK</p>
                      </div>
                      {selectedMethod === 'pickUp' && (
                        <div>
                          <p className="text">Document Pickup Address</p>
                          <input
                            onChange={(e) => setPickUpAddress(e.target.value)}
                            className="visaBookSchedule-input-width"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedMethod === 'pickUp' && (
                    <div className="my-4 bg-white">
                      <div className="visaBookSchedule-contact-header">
                        <p>Choose Delivery Schedule</p>
                      </div>
                      <div className="visaBookSchedule-datePicker p-9">
                        <DatePicker
                          className={'w-full'}
                          selected={deliveryDate}
                          onChange={handleDeliveryDate}
                          minDate={new Date()}
                          placeholderText="Select Travel Date"
                          dateFormat="yyyy-MM-dd"
                          required
                        />
                      </div>
                    </div>
                  )}

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
              <div className="basis-4/12 ml-5">
                <div className="bg-white p-5 shadow-lg">
                  <p className="font-semibold text-lg py-1">Price Summary</p>
                  <div className="flex justify-between visaBookSchedule-price-content">
                    <p>Details</p>
                    <p>BDT Amount</p>
                  </div>
                  <p className="py-3 text-lg font-semibold">
                    Travelers X {travelersCount}
                  </p>
                  <div className="flex justify-between">
                    <p>Visa Fee X {travelersCount}</p>
                    <p className="font-semibold">BDT {priceWithTraveler}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Triplo Processing Fee </p>
                    <p className="font-semibold">BDT {totalProcessingFee}</p>
                  </div>
                  {selectedMethod === 'pickUp' && (
                    <div className="flex justify-between py-2">
                      <p>Pick Up Charge </p>
                      <p className="font-semibold">BDT {pickUpFee}</p>
                    </div>
                  )}
                  <hr />
                  <div className="flex justify-between font-semibold text-lg py-3">
                    <p>Total Payable:</p>
                    <p className="font-semibold">BDT {totalPrice}</p>
                  </div>
                </div>
                <div className="bg-white p-5 shadow-lg mt-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">
                      {selectedVisa.name}
                    </h3>
                    <img style={{ width: '150px' }} src={visaExpress} alt="" />
                  </div>
                  <div className="flex justify-between pt-5 pb-2">
                    <p>
                      Visa Validity : <b>{selectedVisa.validity} days</b>
                    </p>
                    <p>
                      Stay Period : <b>{selectedVisa.stayPeriod} days</b>
                    </p>
                  </div>
                  <p>
                    Refundable : <b>No</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default VisaBookSchedule;
