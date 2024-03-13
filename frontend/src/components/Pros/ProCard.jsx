import React from 'react';
import starIcon from '../../assets/images/Star.png';
import { Link } from 'react-router-dom';


const ProCard = ({pro}) => {

    const {name, averageRating, totalRating, photo, specialization, city, bio} = pro

  return (
    <Link to={`/pros/${pro._id}`} className='shadow-md 
    rounded-lg hover:shadow-lg cursor-pointer
     hover:shadow-primary
     hover:scale-105 transition-all ease-in-out'>
    <div className='block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">'>
        <div>
            <img src={photo} className='w-full h-[300px] rounded-lg' alt="" />
        </div>

      <div className='p-2'>
      <h2 className="text-[18px] leading-[30px] le:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
            {name}
        </h2>

        <p className='mt-2 text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]'>
                    {bio}
                  </p>

        <div className="mt-2 lg:mt-4 flex items-center justify-between">
            <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] 
            leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                {specialization}
            </span>

            <div className="flex items-center gap-[6px]">
                <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 
                font-semibold text-headingColor'>
                    <img src={starIcon} alt="" />{averageRating}
                </span>
                <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 
                font-[400] text-textColor'>
                    ({totalRating})
                </span>
            </div>
        </div>

        <p className='text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px] font-bold'>
                  📍 {city}
        </p>
      </div>
    </div>
    </Link>
  )
}

export default ProCard