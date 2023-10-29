import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { getDaysInMonth } from 'date-fns';
import { countries } from 'countries-list';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTraveler } from '../../../slices/travelerSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LoaderSpiner from '../../../components/Loader/LoaderSpiner';

const RegularTravelers = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const { id } = useParams();
  const location = useLocation();
  const traveler = location.state?.data || {};

  console.log('regularTraveler', traveler);
  console.log('regularTraveler', id);

  const [travelerData, setTravelerData] = useState({
    title: traveler?.title || '',
    gender: traveler?.gender || '',
    firstName: traveler?.firstName || '',
    lastName: traveler?.lastName || '',
    birthYear: traveler?.birthYear || '',
    birthMonth: traveler?.birthMonth || '',
    birthDay: traveler?.birthDay || '',
    nationality: traveler?.nationality || '',
    passportExYear: traveler?.passportExYear || '',
    passportExMonth: traveler?.passportExMonth || '',
    passportExDay: traveler?.passportExDay || '',
    passportNumber: traveler?.passportNumber || '',
    countryNumberCode: traveler?.countryNumberCode || '',
    mobileNumber: traveler?.mobileNumber || '',
    email: traveler?.email || '',
    address: traveler?.address || '',
    images: traveler?.images || [],
  });

  const [successMessage, setSuccessMessage] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);
console.log('success', successMessage)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef([]);

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

  const handleImageUpload = (files) => {
    const updatedImages = [...travelerData.images];
    for (let i = 0; i < files.length; i++) {
      updatedImages.push(files[i]);
    }
    setTravelerData({
      ...travelerData,
      images: updatedImages,
    });
  };

  // Handle delete to traveler selected image
  const handleDeleteImage = (imgIndex) => {
    const updatedImages = travelerData.images.filter(
      (image, index) => index !== imgIndex
    );
    setTravelerData({
      ...travelerData,
      images: updatedImages,
    });
  };

  const handleTravelerChange = (field, value) => {
    setTravelerData({
      ...travelerData,
      [field]: value,
    });
  };

  const handleImageRefOnclick = () => {
    inputRef.current.click();
  };

  const handleGoBack = () => {
    navigate(-1); 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log(travelerData);
    try {
      const response = await axios.post('https://triplo-flight.onrender.com/api/traveler/', {
        ...travelerData,
        userId: userId,
        travelerId: id,
      });
      if (response.status === 201) {
        const newTraveler = response.data;
        dispatch(setTraveler([...newTraveler]));
        console.log(newTraveler);
        setSuccessMessage(response.data.message || 'user created or successfully');
        setErrorMessage(null);
      }
    } catch (error) {
      // Handle the error
      console.log('Error:', error);
      
        setErrorMessage(error);
      
    } finally {
      setLoading(false);
    }

  };

  return (
    <div>
    <div>
      <button className='pb-5 text-md font-semibold' onClick={handleGoBack}><FontAwesomeIcon icon={faChevronLeft} /> GO BACK</button>
    </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md">
          <div className="px-9 pt-4">
    <h2 className='text-xl font-bold py-5'>PERSONAL DETAILS</h2>
            
            <div className="flex justify-between pb-5">
              <div>
                <select
                  name="title"
                  className="custom-select"
                  value={travelerData?.title || ''}
                  onChange={(e) =>
                    handleTravelerChange('title', e.target.value)
                  }
                  required
                >
                  <option value="">Title</option>
                  {titleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
              </div>
              <div>
                <select
                  name="gender"
                  className="custom-select"
                  value={travelerData?.gender || ''}
                  onChange={(e) =>
                    handleTravelerChange('gender', e.target.value)
                  }
                  required
                >
                  <option value="">Gender</option>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
               
              </div>
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter Your First Name"
                  className="visaBookSchedule-input-width"
                  value={travelerData?.firstName || ''}
                  onChange={(e) =>
                    handleTravelerChange('firstName', e.target.value)
                  }
                  required
                />
               
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  className="visaBookSchedule-input-width"
                  value={travelerData?.lastName || ''}
                  onChange={(e) =>
                    handleTravelerChange('lastName', e.target.value)
                  }
                  required
                />
               
              </div>
            </div>
            <div>
              <p className="py-1">Birth of Date</p>
              <div className="flex justify-between pb-5">
                <div>
                  <select
                    name="birthYear"
                    className="custom-select"
                    value={travelerData?.birthYear || ''}
                    onChange={(e) =>
                      handleTravelerChange('birthYear', e.target.value)
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
                    value={travelerData?.birthMonth || ''}
                    onChange={(e) =>
                      handleTravelerChange('birthMonth', e.target.value)
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
                    value={travelerData?.birthDay || ''}
                    onChange={(e) =>
                      handleTravelerChange('birthDay', e.target.value)
                    }
                    required
                  >
                    <option value="">Day</option>
                    {dayOptions(
                      travelerData?.birthMonth,
                      travelerData?.birthYear
                    ).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    name={`nationality`}
                    value={travelerData?.nationality || ''}
                    className="custom-select"
                    onChange={(e) =>
                      handleTravelerChange('nationality', e.target.value)
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
                    value={travelerData?.passportExYear || ''}
                    onChange={(e) =>
                      handleTravelerChange('passportExYear', e.target.value)
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
                    value={travelerData?.passportExMonth || ''}
                    onChange={(e) =>
                      handleTravelerChange('passportExMonth', e.target.value)
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
                    value={travelerData?.passportExDay || ''}
                    onChange={(e) =>
                      handleTravelerChange('passportExDay', e.target.value)
                    }
                    required
                  >
                    <option value="">Day</option>
                    {dayOptions(
                      travelerData?.passportExMonth,
                      travelerData?.passportExYear
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
                    name={`passportNumber`}
                    className="visaBookSchedule-input-width"
                    value={travelerData?.passportNumber || ''}
                    onChange={(e) =>
                      handleTravelerChange('passportNumber', e.target.value)
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
                    name={`countryCode`}
                    value={travelerData?.countryNumberCode || ''}
                    // className="custom-select"
                    onChange={(e) =>
                      handleTravelerChange('countryNumberCode', e.target.value)
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
                    name={`mobileNumber`}
                    className="visaSchedule-number-input"
                    value={travelerData?.mobileNumber || ''}
                    onChange={(e) =>
                      handleTravelerChange('mobileNumber', e.target.value)
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
                  name={`email`}
                  className="visaBookSchedule-input-width"
                  style={{ width: '350px' }}
                  value={travelerData?.email || ''}
                  onChange={(e) =>
                    handleTravelerChange('email', e.target.value)
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
                name={`address`}
                value={travelerData?.address || ''}
                placeholder="Enter your full address"
                className="visaBookSchedule-input-width"
                onChange={(e) =>
                  handleTravelerChange('address', e.target.value)
                }
              ></input>
            </div>

            <input
              type="file"
              // ref={inputRef}
              ref={(el) => (inputRef.current = el)}
              name={`image`}
              className="hidden-input"
              accept="image/*"
              multiple
              // onChange={handleImageUpload}
              onChange={(e) => handleImageUpload(e.target.files)}
            />
            <div className="flex justify-between py-5">
              <div className="flex flex-col gap-3">
                <h1 className="text-lg font-semibold">Upload Document</h1>
                <div className="flex">
                  {travelerData?.images && travelerData.images.length > 0
                    ? travelerData.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="visaBookSchedule-image-container"
                        >
                          {image ? (
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Traveler-Image ${imgIndex + 1}`}
                              width={100}
                              height={100}
                            />
                          ) : (
                            // Handle the case where image is null or undefined
                            <p>Image not available</p>
                          )}
                          <button
                            className="visaBookSchedule-delete-button"
                            onClick={() => handleDeleteImage(imgIndex)}
                          >
                            X
                          </button>
                        </div>
                      ))
                    : 'No document uploaded'}
                </div>
              </div>
              ;
              <div onClick={handleImageRefOnclick}>
                <p className="visaBookSchedule-add-document">
                  {' '}
                  + ADD A DOCUMENT
                </p>
              </div>
            </div>
          </div>
        </div>
        {loading ? <LoaderSpiner/> : null}

        {successMessage && (
  <div className="success-message">
    {successMessage}
  </div>
)}

{errorMessage && (
  <div className="error-message">
    {errorMessage}
  </div>
)}

        <button className="w-full py-3 mt-5 regular-traveler-submit text-white rounded-md" type="submit">
            {Object.keys(traveler).length === 0 ? 'ADD TRAVELER'  : 'UPDATE DETAILS'}
          </button>
      </form>
    </div>
  );
};

export default RegularTravelers;
