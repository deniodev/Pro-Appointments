import React from 'react';
import img1 from '../../assets/images/toyota/img1.jpg'
import img2 from '../../assets/images/toyota/img2.jpg'
import img3 from '../../assets/images/toyota/img3.jpg'

const Portfolio = () => {
  return (
    <div>
       <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2 mt-5">
                Trabalhos Recentes
        </h3>
      <div className="image-container mt-[30px]">
        <img src={img1} alt="Image Description"  className='mb-2'/>
        <img src={img2} alt="Image Description" className='mb-2'/>
        <img src={img3} alt="Image Description" className='mb-2'/>
      </div>
    </div>
  );
};

export default Portfolio;