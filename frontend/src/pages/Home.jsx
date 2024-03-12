import React from 'react';
import faqImg from '../assets/images/faq-img.jpg';
import FaqList from '../components/Faq/FaqList';
import Pros from './Pros/Pros';

const Home = () => { 
  return  <> 
      <section>
  <div className='flex items-center gap-3 flex-col justify-center  pb-7'>
        <h2 className='font-bold text-[46px] text-center'>
        Agende com profissionais
            <br></br> perto de você </h2>
        <h2 className='text-xl text-gray-400 text-center'>Explore os melhores serviços e reparos domésticos perto de você</h2>

    </div>

      <div className="container">
      <Pros />
      </div>
    </section>


   {/* ============= faq section ================ */}
   <section>
    <div className="container">
      <div className="flex justify-between gap-[50px] lg:gap-0">
        <div className="w-1/2 hidden md:block">
          <img src={faqImg} alt="" className='rounded-lg h-[px]'/>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="heading">Perguntas frequentes</h2>

          <FaqList />
        </div>
      </div>
    </div>
   </section>
   {/* ============= faq section end ================ */}

  </>
}

export default Home