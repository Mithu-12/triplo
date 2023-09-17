import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentWrapper from '../../components/wrapperComponent/ContentWrapper';
import './VisaDetails.css';

const VisaDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const visa = location.state?.data || [];
  console.log('firstss', visa);
  const visaExpress = '../../../public/visaExpress.jpg';
  const getItem = (person, items) => {
    return (
      <div>
        <div
          style={{
            fontWeight: 500,
            fontSize: '20px',
            padding: '15px 0px 4px 0px',
          }}
        >
          {person} :{' '}
        </div>
        {items.map((item) => (
          <ul style={{ listStyleType: 'disc', padding: '0 0 0 35px' }}>
            <li>{item}</li>
          </ul>
        ))}
      </div>
    );
  };

  const handleBookSchedule = (index)=>{
    navigate(`/visaBookSchedule/${index}`,
    {state: { visa: visa }})
  }

  return (
    <div className="visaDetails-container">
      <ContentWrapper>
        <div>
          <img className="visaImage-container" src={visa.image} alt="" />
        </div>
        <div className="flex mt-6">
          <div className="basis-8/12 bg-white shadow-md px-8 py-5 ">
            <div>
              <h3 className="text-2xl font-semibold font">{visa.name}</h3>
            </div>
            <div className="">
              {getItem('Jobholders', visa.jobholders)}
              {getItem('BusinessMan', visa.businessman)}
              {getItem('GovtJobHolder', visa.govtJobHolder)}
              {getItem('RetiredPerson', visa.retiredPerson)}
              {getItem('Unemployed', visa.unemployed)}
              {getItem('Housewife', visa.housewife)}
              {getItem('Student', visa.student)}
              {getItem('NonChild', visa.nonChild)}
            </div>
          </div>
          <div className="basis-4/12 ml-8">
            <div className="">
              {visa?.visaList.map((item, index) => {
                return (
                  <div>
                    <div className="py-6 px-4 bg-white  shadow-md mt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-semibold">{item.name}</h3>
                      <img
                        style={{ width: '150px' }}
                        src={visaExpress}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between pt-5 pb-2">
                      <p>
                        Visa Validity : <b>{item.validity} days</b>
                      </p>
                      <p>
                        Stay Period : <b>{item.stayPeriod} days</b>
                      </p>
                    </div>
                    <p>
                      Refundable : <b>No</b>
                    </p>
                  </div>
                    <button onClick={() => handleBookSchedule(index)} style={{backgroundColor: '#FFC610'}} 
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#bb7900')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#FFC610')}
                    className='visaDetails-price flex justify-between px-4 py-4 '>
                      <p className='font-bold text-lg'>SPECIAL OFFER</p>
                      <p className='font-bold text-lg'>{item.price}</p>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default VisaDetails;
