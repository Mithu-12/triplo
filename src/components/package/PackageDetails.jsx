import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetPackageByIdQuery } from '../../api/packageApi';


import './PackageDetails.css';
import ContentWrapper from '../wrapperComponent/ContentWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrochip,
  faCalendar,
  faUtensils,
  faCar,
  faHotel,
  faPlaneCircleCheck,
  faShip,
  faBus,
  faTrain,
  faSnowflake,
  faBangladeshiTakaSign,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
// import Loader from '../loder/loader';



const PackageDetails = () => {
  const { id } = useParams();

  const {
    data: packageDetails,
    isLoading,
    isError,
  } = useGetPackageByIdQuery(id);
  console.log(packageDetails);
  if (isLoading) {
    return <div className="loader-overlay">
    <div className="loader">
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  </div>
  }

  if (isError) {
    return (
      <div>
        <span>Error! Failed to fetch package details.</span>
      </div>
    );
  }
  const { image } = packageDetails;

  const include1Data = packageDetails.packageIncludes.map((item, index) => {
    const include1Parts = item.include1
      .split(',')
      .map((part, partIndex) => <p key={partIndex}>{part}</p>);
    return <div key={index}>{include1Parts}</div>;
  });

  const include2Data = packageDetails.packageIncludes.map((item, index) => {
    const include1Parts = item.include2
      .split(',')
      .map((part, partIndex) => <p key={partIndex}>{part}</p>);
    return <div key={index}>{include1Parts}</div>;
  });

  const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string') {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const highlights = packageDetails.highlight.map((item, index) => {
    return Object.entries(item).map(([key, value]) => {
      if (key !== '_id') {
        return (
          <p className="pb-4 font-medium text-sm" key={key}>
            <strong>{capitalizeFirstLetter(key)}:</strong> {value}
          </p>
        );
      }
      return null;
    });
  });
  const cancellationPolicy = packageDetails.cancelationPolicy.map(
    (item, index) => {
      return Object.entries(item).map(([key, value]) => {
        if (key !== '_id') {
          return (
            <p className="pb-4 text-sm" key={key}>
              {value}
            </p>
          );
        }
        return null;
      });
    }
  );


  return (
    <ContentWrapper>
      <div className="packageDetailsImage-container">
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
      </div>
      <div className="flex flex-row">
        <div className="basis-4/6">
          <div className="container-shadow top-6 my-5">
            <div className="p-4 ">
              <h2 className="font-bold text-lg">{packageDetails.name}</h2>
              <p>{packageDetails.description}</p>
              <div className="flex justify-between pt-5">
                <div>
                  <FontAwesomeIcon icon={faMicrochip} className="pr-2" />
                  <b className="pr-6">{packageDetails.rating}</b>
                  <FontAwesomeIcon icon={faCalendar} className="pr-2" />
                  <b>{packageDetails.duration}</b>
                </div>
                <div>
                  <p>Per Person ( Price Includes VAT & Tax</p>
                  <h1 className="font-bold text-xl">
                    <b className="">
                      <FontAwesomeIcon icon={faBangladeshiTakaSign} />
                    </b>{' '}
                    {packageDetails.price}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="container-shadow">
            <div className="px-4 py-5">
              <h2 className="text-xl font-bold">Price Inclusive of</h2>
              <div className="flex justify-around text-center pt-3">
                <div>
                  <FontAwesomeIcon icon={faPlaneCircleCheck} />
                  <p>Flight</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCar} />
                  <p>Car</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHotel} />
                  <p>Hotel</p>
                </div>
                <div className="text-gray-300">
                  <FontAwesomeIcon icon={faUtensils} />
                  <p>Dine</p>
                </div>
                <div className="text-gray-300">
                  <FontAwesomeIcon icon={faShip} />
                  <p>Cruise</p>
                </div>
                <div className="text-gray-300">
                  <FontAwesomeIcon icon={faTrain} />
                  <p>Train</p>
                </div>
                <div className="text-gray-300">
                  <FontAwesomeIcon icon={faBus} />
                  <p>Bus</p>
                </div>
                <div className="text-gray-300">
                  <FontAwesomeIcon icon={faSnowflake} />
                  <p>Sight Seeing</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-shadow ">
            <div className="flex justify-between">
              <div className="px-3 py-3 ">
                <h2 className="text-lg font-bold">Package Includes:</h2>
                <div className="text-sm">{include1Data}</div>
              </div>
              <div className="px-3 py-3 ">
                <h2 className="text-lg font-bold">Package Excludes:</h2>
                <div className="text-sm">{include2Data}</div>
              </div>
            </div>
          </div>
          {/* <div className="collapse collapse-arrow container-shadow">
            <input type="radio" name="my-accordion-2" checked="checked" />
            <div className="collapse-title text-xl font-medium">Itenery</div>
            <div className="collapse-content">
              <div className="pb-4">
                <h2 className="text-md font-medium">
                  Day 1: Arrival at Hulhumale Hotel :
                </h2>
                <p className="text-sm">
                  After arrival at the airport, you will meet our local
                  representative who will transfer you to Hotel by private car
                  basis. Check in hotel , enjoy your own time, & Overnight stay
                  at Island.
                </p>
              </div>
              <div className="pb-4">
                <h2 className="text-md font-medium">
                  Day 2: Explore Hulhumale Beach:
                </h2>
                <p className="text-sm">
                  After having your breakfast enjoy free time of your own & over
                  night stay at hotel.
                </p>
              </div>
              <div className="pb-4">
                <h2 className="text-md font-medium">
                  Day 3: Explore Hulhumale Beach:
                </h2>
                <p className="text-sm">
                  After having your breakfast enjoy free time of your own & over
                  night stay at hotel.
                </p>
              </div>
              <div className="pb-4">
                <h2 className="text-md font-medium">
                  Day 4: Maldives to Colombo :
                </h2>
                <p className="text-sm">
                  After having Breakfast in hotel & Check out from hotel
                  transfer to Male International Airport. Catch flight for
                  Colombo. Arrival at Colombo Airport. Colombo Half Day City
                  Tour. Transfer to Hotel & Check in to hotel. Rest of the day
                  leisure at the hotel.
                </p>
              </div>
            </div>
          </div>
          <div className="collapse collapse-arrow container-shadow">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Pick up Notes:
            </div>
            <div className="collapse-content">
              <p>Our Representative will meet and welcome you.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow container-shadow">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Highlights</div>
            <div className="collapse-content">
              <p className="pb-4 font-bold text-sm">{highlights}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow container-shadow">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Cancellation Policy
            </div>
            <div className="collapse-content">
              <p className="pb-4text-sm">{cancellationPolicy}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow container-shadow">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Tax</div>
            <div className="collapse-content">
              <p className="pb-4 text-sm">{packageDetails.tax}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow container-shadow">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              General Condition
            </div>
            <div className="collapse-content">
              <p className="pb-4 text-sm">{packageDetails.generalCondition}</p>
            </div>
          </div> */}
        </div>
        <div className="basis-2/6">
          <div className="container-shadow ml-5 ">
            <div className="px-3 py-5">
              <h2>Deluxe</h2>
              <div className="flex justify-between font-medium">
                <div>
                  <p className="text-sm font-thin">Valid From</p>
                  <p>2023-01-01</p>
                </div>
                <div>
                  <p className="text-sm font-thin">Valid To</p>
                  <p>2023-01-01</p>
                </div>
                <div>
                  <p className="text-sm font-thin">Departs</p>
                  <p>Specific Day</p>
                </div>
              </div>
              <div className="py-5">
                <h2 className="text-medium font-bold">Hotels: </h2>
                <p className="text-sm font-medium">{packageDetails.hotels}</p>
              </div>
              <div>
                <p>Price Per Person</p>
                <p>Double</p>
                <h1 className="font-bold text-xl">
                  <b className="">
                    <FontAwesomeIcon icon={faBangladeshiTakaSign} />
                  </b>{' '}
                  {packageDetails.price}
                </h1>
              </div>
            </div>
            <Link to={`/packageReserve/${packageDetails._id}`} className='packageDetails-Button text-center'>
            <p className="text-lg w-full py-4  packageDetails-Button">
              SELECT OFFER
            </p>
            </Link>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default PackageDetails;
