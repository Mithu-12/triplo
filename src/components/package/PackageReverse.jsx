import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetPackageByIdQuery } from '../../api/packageApi';
import ContentWrapper from '../wrapperComponent/ContentWrapper';
import './PackageReverse.css'
const PackageReverse = () => {

    const { id } = useParams();

    const {
      data: packageDetails,
      isLoading,
      isError,
    } = useGetPackageByIdQuery(id);
    console.log('omg',packageDetails)
  return (
    <div>
        <ContentWrapper>
        <div className="packageReverse-image">
        <img className="packageReverse-img" src={packageDetails.image[0].img2}/>
      </div>
        </ContentWrapper>
    </div>
  )
}

export default PackageReverse