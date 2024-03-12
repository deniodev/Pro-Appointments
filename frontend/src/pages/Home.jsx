import React from 'react';
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
        <div className="w-full">
          <h2 className="heading text-center">Perguntas frequentes</h2>
          <FaqList />
        </div>
    </div>
   </section>
   {/* ============= faq section end ================ */}

  </>
}

export default Home