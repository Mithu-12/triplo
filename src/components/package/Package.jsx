import React, { useEffect, useRef, useState } from 'react';
import { useGetPackagesQuery } from '../../api/packageApi';
import './style.css';
import { Link } from 'react-router-dom';
import ContentWrapper from '../wrapperComponent/ContentWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Package = () => {
  const { data: packages, isLoading, isError } = useGetPackagesQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselContainerRef = useRef(null);

  const itemWidth = 320 ; 
  const isLastItem = currentIndex === packages?.length - 1;
  const isFirstItem = currentIndex === 0;

  useEffect(() => {
    if (carouselContainerRef.current) {
      const translateX = -currentIndex * itemWidth;
      carouselContainerRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [currentIndex]);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % packages?.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? packages?.length - 1 : prevIndex - 1
    );
  };

  const skItem = () => {
    return (
      <div className="packageSkeletonItem">
     <ContentWrapper>
        <div className="countdown-container skeleton"></div>
        <div className="singleFlight-container skeleton">
        </div>
     </ContentWrapper>
      </div>
    );
  };
  if (isLoading) {
    return (
      <div className="packageSkeleton">
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
        </div>
    );
  }
  
  if (isError) {
    return (
      <div>
        <span>Error! Task failed successfully.</span>
      </div>
    );
  }

  return (
    <ContentWrapper>
      <div className="packageCarousel">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-serif pt-7 pb-2">Hot Packages</h2>
          <div>
            <button
              className="packageCarousel-button"
              onClick={handlePrevClick}
              disabled={isFirstItem}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="packageCarousel-button"
              onClick={handleNextClick}
              disabled={isLastItem}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className="packageCarousel-container" ref={carouselContainerRef}>
          {packages.map((pack, index) => (
              <div
                className="packageCarousel-item"
                key={pack._id}
                style={{ width: `${itemWidth}px` }}
              >
            <Link
              className=""
              to={`/packages/${pack._id}`}
            >
                {/* Content for each carousel item */}
                <div className="packageCarousel-card shadow-md">
                  <img src={pack.image[0].img1} alt="Package" />
                  <div className="packageCarousel-card-body p-4">
                    <h2 className="text-2xl pb-2">{pack.name}</h2>
                    <p>{pack.description.slice(0, 100)}...</p>
                  </div>
                </div>
            </Link>
              </div>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Package;
