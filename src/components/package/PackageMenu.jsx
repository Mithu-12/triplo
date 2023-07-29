// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import ContentWrapper from '../wrapperComponent/ContentWrapper';
// import {
//   faBriefcase,
//   faCar,
//   faHotel,
//   faBangladeshiTakaSign,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import './PackageMenu.css';

// const PackageMenu = () => {
//   const location = useLocation();
//   const selectedData = location.state?.data || [];
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [filteredPackages, setFilteredPackages] = useState(selectedData);
//   const [selectedDuration, setSelectedDuration] = useState({
//     days4: false,
//     days5: false,
//     days6: false,
//   });

//   useEffect(() => {
//     if (selectedData.length > 0) {
//       const prices = selectedData.map((pack) => pack.price);
//       const min = Math.min(...prices);
//       const max = Math.max(...prices);
//       setMinPrice(min);
//       setMaxPrice(max);
//     }
//   }, [selectedData]);

//   const handlePriceChange = (values) => {
//     setMinPrice(values[0]);
//     setMaxPrice(values[1]);
//   };
//   const handlePriceAfterChange = (values) => {
//     const filtered = selectedData.filter(
//       (pack) => pack.price >= values[0] && pack.price <= values[1]
//     );
//     setFilteredPackages(filtered);
//   };

//   const handleDurationChange = (event) => {
//     const { name, checked } = event.target;
//     setSelectedDuration((prevSelectedDuration) => ({
//       ...prevSelectedDuration,
//       [name]: checked,
//     }));
//   };

//   useEffect(() => {
//     // Filter packages based on selected duration options
//     const filtered = selectedData.filter((item) => {
//       const duration = item.duration1.toLowerCase();
//       return (
//         (selectedDuration.days4 && duration.includes('4days')) ||
//         (selectedDuration.days5 && duration.includes('5days')) ||
//         (selectedDuration.days6 && duration.includes('6days'))
//       );
//     });

//     // Update the filteredPackages state
//     setFilteredPackages(filtered);
//   }, [selectedData, selectedDuration]);

//   return (
//     <ContentWrapper>
//       <div className="pt-20 flex">
//         <div className="basis-3/12 slideContent">
//           <div className="slider-container shadow px-5 py-8 mr-5 bg-white">
//             <Slider
//               range
//               min={Math.min(...selectedData.map((pack) => pack.price))}
//               max={Math.max(...selectedData.map((pack) => pack.price))}
//               defaultValue={[minPrice, maxPrice]} // Use defaultValue to set initial range
//               value={[minPrice, maxPrice]}
//               onChange={handlePriceChange}
//               onAfterChange={handlePriceAfterChange}
//               allowCross={false} // Set allowCross to false to prevent handles from crossing each other
//             />
//             <div className="slider-labels">
//               <div>
//                 <span>${minPrice}</span>
//                 <p>Min</p>
//               </div>
//               <div>
//                 <span>${maxPrice}</span>
//                 <p>Max</p>
//               </div>
//             </div>
//           </div>
//           <div className="duration-filter">
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="days4"
//                   checked={selectedDuration.days4}
//                   onChange={handleDurationChange}
//                 />
//                 4 days
//               </label>
//             </div>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="days5"
//                   checked={selectedDuration.days5}
//                   onChange={handleDurationChange}
//                 />
//                 5 days
//               </label>
//             </div>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="days6"
//                   checked={selectedDuration.days6}
//                   onChange={handleDurationChange}
//                 />
//                 6 days
//               </label>
//             </div>
//           </div>
//         </div>
//         <div className="basis-9/12">
//           {filteredPackages.map((item) => (
//             <div key={item._id} className="mb-5 bg-white shadow-lg rounded-md">
//               <div className="flex rounded-md">
//                 {/* <div className="imgContent"> */}
//                 <img
//                   className="menuImg w-48 h-32 object-cover"
//                   src={item.image[0].img2}
//                   alt=""
//                 />
//                 {/* </div> */}
//                 <div className="pl-5">
//                   <h2 className="font-bold text-lg">{item.name}</h2>
//                   <p>{item.description.slice(0, 200)}...</p>
//                   <p className="pt-5">
//                     <FontAwesomeIcon icon={faBriefcase} /> {item.duration}
//                   </p>
//                 </div>
//               </div>
//               <div
//                 className="flex justify-between items-center px-6 py-1 w-full"
//                 style={{ background: '#00276C' }}
//               >
//                 <div className="text-center" style={{ color: '#FFC610' }}>
//                   <p>Includes:</p>
//                   <FontAwesomeIcon icon={faCar} />
//                   {`  `} <FontAwesomeIcon icon={faHotel} />
//                 </div>
//                 <div className="text-white font-bold text-center">
//                   <FontAwesomeIcon icon={faBangladeshiTakaSign} /> {item.price}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </ContentWrapper>
//   );
// };

// export default PackageMenu;
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import ContentWrapper from '../wrapperComponent/ContentWrapper';
// import {
//   faBriefcase,
//   faCar,
//   faHotel,
//   faBangladeshiTakaSign,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import './PackageMenu.css';

// const PackageMenu = () => {
//   const location = useLocation();
//   const selectedData = location.state?.data || [];
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [filteredPackages, setFilteredPackages] = useState([]);
//   const [selectedDuration, setSelectedDuration] = useState({
//     days4: false,
//     days5: false,
//     days6: false,
//   });
//   const [initialFilteringDone, setInitialFilteringDone] = useState(false);

//   useEffect(() => {
//     if (selectedData.length > 0) {
//       // Calculate min and max prices and update state
//       const prices = selectedData.map((pack) => pack.price);
//       const min = Math.min(...prices);
//       const max = Math.max(...prices);
//       setMinPrice(min);
//       setMaxPrice(max);
//     }
//   }, [selectedData]);

//   useEffect(() => {
//     // Perform initial filtering when the component mounts
//     if (minPrice !== 0 && maxPrice !== 1000 && !initialFilteringDone) {
//       filterPackages(selectedData, selectedDuration, minPrice, maxPrice);
//       setInitialFilteringDone(true);
//     }
//   }, [selectedData, selectedDuration, minPrice, maxPrice, initialFilteringDone]);

//   const handlePriceChange = (values) => {
//     setMinPrice(values[0]);
//     setMaxPrice(values[1]);
//   };

//   const handlePriceAfterChange = (values) => {
//     filterPackages(selectedData, selectedDuration, values[0], values[1]);
//   };

//   const handleDurationChange = (event) => {
//     const { name, checked } = event.target;
//     setSelectedDuration((prevSelectedDuration) => ({
//       ...prevSelectedDuration,
//       [name]: checked,
//     }));
//   };

//   const filterPackages = (data, durationFilters, min, max) => {
//     const filtered = data.filter((item) => {
//       const duration = item.duration1.toLowerCase();
//       return (
//         (durationFilters.days4 && duration.includes('4days')) ||
//         (durationFilters.days5 && duration.includes('5days')) ||
//         (durationFilters.days6 && duration.includes('6days'))
//       ) && item.price >= min && item.price <= max;
//     });
//     setFilteredPackages(filtered);
//   };

//   return (
//     <ContentWrapper>
//       <div className="pt-20 flex">
//         <div className="basis-3/12 slideContent">
//           <div className="slider-container shadow px-5 py-8 mr-5 bg-white">
//             <Slider
//               range
//               min={Math.min(...selectedData.map((pack) => pack.price))}
//               max={Math.max(...selectedData.map((pack) => pack.price))}
//               defaultValue={[minPrice, maxPrice]}
//               value={[minPrice, maxPrice]}
//               onChange={handlePriceChange}
//               onAfterChange={handlePriceAfterChange}
//               allowCross={false}
//             />
//             <div className="slider-labels">
//               <div>
//                 <span>${minPrice}</span>
//                 <p>Min</p>
//               </div>
//               <div>
//                 <span>${maxPrice}</span>
//                 <p>Max</p>
//               </div>
//             </div>
//           </div>
//           <div className="duration-filter">
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="days4"
//                   checked={selectedDuration.days4}
//                   onChange={handleDurationChange}
//                 />
//                 4 days
//               </label>
//             </div>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="days5"
//                   checked={selectedDuration.days5}
//                   onChange={handleDurationChange}
//                 />
//                 5 days
//               </label>
//             </div>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="days6"
//                   checked={selectedDuration.days6}
//                   onChange={handleDurationChange}
//                 />
//                 6 days
//               </label>
//             </div>
//           </div>
//         </div>
//         <div className="basis-9/12">
//           {filteredPackages.length === 0 && selectedData.length > 0 ? (
//             <div><p>No data found</p></div>
//           ) : (
//             filteredPackages.map((item) => (
//               <div key={item._id} className="mb-5 bg-white shadow-lg rounded-md">
//                 <div className="flex rounded-md">
//                   {/* <div className="imgContent"> */}
//                   <img
//                     className="menuImg w-48 h-32 object-cover"
//                     src={item.image[0].img2}
//                     alt=""
//                   />
//                   {/* </div> */}
//                   <div className="pl-5">
//                     <h2 className="font-bold text-lg">{item.name}</h2>
//                     <p>{item.description.slice(0, 200)}...</p>
//                     <p className="pt-5">
//                       <FontAwesomeIcon icon={faBriefcase} /> {item.duration}
//                     </p>
//                   </div>
//                 </div>
//                 <div
//                   className="flex justify-between items-center px-6 py-1 w-full"
//                   style={{ background: '#00276C' }}
//                 >
//                   <div className="text-center" style={{ color: '#FFC610' }}>
//                     <p>Includes:</p>
//                     <FontAwesomeIcon icon={faCar} />
//                     {`  `} <FontAwesomeIcon icon={faHotel} />
//                   </div>
//                   <div className="text-white font-bold text-center">
//                     <FontAwesomeIcon icon={faBangladeshiTakaSign} /> {item.price}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </ContentWrapper>
//   );
// };

// export default PackageMenu;

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

