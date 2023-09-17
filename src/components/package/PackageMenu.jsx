import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentWrapper from '../wrapperComponent/ContentWrapper';
import {
  faBriefcase,
  faCar,
  faHotel,
  faBangladeshiTakaSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './PackageMenu.css';

const PackageMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedData = location.state?.data || [];
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filteredPackages, setFilteredPackages] = useState([]);

  useEffect(() => {
    if (selectedData.length > 0) {
      // Calculate min and max prices and update state
      const prices = selectedData.map((pack) => pack.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);

      // Perform initial filtering when the component mounts
      filterPackages(selectedData, min, max);
    }
  }, [selectedData]);

  const filterPackages = (data, min, max) => {
    const filtered = data.filter((item) => item.price >= min && item.price <= max);
    setFilteredPackages(filtered);
  };

  const handlePriceChange = (values) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const handlePriceAfterChange = (values) => {
    // Trigger filtering based on the updated price range
    filterPackages(selectedData, values[0], values[1]);
  };

  const handleButtonClick = (packageId) => {
    navigate(`/packages/${packageId}`);
  };

  return (
    <ContentWrapper>
      <div className="pt-20 flex">
        <div className="basis-3/12 slideContent">
          <div className="slider-container shadow px-5 py-8 mr-5 bg-white">
            <Slider
              range
              min={Math.min(...selectedData.map((pack) => pack.price))}
              max={Math.max(...selectedData.map((pack) => pack.price))}
              defaultValue={[minPrice, maxPrice]}
              value={[minPrice, maxPrice]}
              onChange={handlePriceChange}
              onAfterChange={handlePriceAfterChange}
              allowCross={false}
            />
            <div className="slider-labels">
              <div>
                <span>${minPrice}</span>
                <p>Min</p>
              </div>
              <div>
                <span>${maxPrice}</span>
                <p>Max</p>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-9/12">
          {filteredPackages.length === 0 && selectedData.length > 0 ? (
            <div>
              <p>No data found</p>
            </div>
          ) : (
            filteredPackages.map((item) => (
              <div
                key={item._id}
                onClick={() => handleButtonClick(item._id)}
                className="mb-5 bg-white shadow-lg rounded-md cursor-pointer"
              >
                <div className="flex rounded-md">
                  <img
                    className="menuImg w-48 h-32 object-cover"
                    src={item.image[0].img2}
                    alt=""
                  />
                  <div className="pl-5">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p>{item.description.slice(0, 200)}...</p>
                    <p className="pt-5">
                      <FontAwesomeIcon icon={faBriefcase} /> {item.duration}
                    </p>
                  </div>
                </div>
                <div
                  className="flex justify-between items-center px-6 py-1 w-full"
                  style={{ background: '#00276C' }}
                >
                  <div className="text-center" style={{ color: '#FFC610' }}>
                    <p>Includes:</p>
                    <FontAwesomeIcon icon={faCar} />
                    {`  `} <FontAwesomeIcon icon={faHotel} />
                  </div>
                  <div className="text-white font-bold text-center">
                    <FontAwesomeIcon icon={faBangladeshiTakaSign} />{' '}
                    {item.price}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default PackageMenu;

