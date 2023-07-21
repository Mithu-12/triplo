import React, { useRef, useState } from 'react';
import { useGetPackagesQuery } from '../../api/packageApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';

import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Package = () => {
  const { data: packages, isLoading, isError } = useGetPackagesQuery();

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

  return (
    <div className="flex">
      {packages.map((pack) => (
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <div key={pack._id}>
            <div className="card">
              <img src={pack.image[0].img1} alt="Package" />
              <div className="card-body">
                <h2>{pack.name}</h2>
                <p>{pack.description}</p>
                <Link to={`/packages/${pack._id}`}>button</Link>
              </div>
            </div>
          </div>

          {/* </Link> */}
        </Swiper>
      ))}
    </div>
  );
};

export default Package;
