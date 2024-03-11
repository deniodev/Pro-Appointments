import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import { useParams } from 'react-router-dom';

const Portfolio = () => {
  const { id } = useParams();
  const { data: pro } = useFetchData(`${BASE_URL}/pros/${id}`);
  const { portfolio } = pro;

  return (
    <div>
      {portfolio && portfolio.map((image, index) => (
        <img
        className='mt-2 rounded-md'
        key={index} 
        src={image} 
        alt={`Portfolio Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default Portfolio;

