import React from 'react';
import heroImg01 from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroImg03 from '../assets/images/hero-img03.jpg';
import faqImg from '../assets/images/faq-img.jpg';
import FaqList from '../components/Faq/FaqList';
import Pros from './Pros/Pros';

const Home = () => { 
  return  <> 
  {/* =========== hero section ========== */}
  <section className='hero__section pt-[60px] 2xl:h-[800px'> 
    <div className="container">
      <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>

        {/* ========= hero content ============ */}
        <div>
          <div className='lg:w-[570px'>
            <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
            Conectando você com os melhores profissionais em todas as áreas.
            </h1>
            <p className='text__para'>
              Conectamos você com os profissionais certos para cada necessidade. 
              Simplifique sua busca e comece a trabalhar hoje mesmo!
            </p>
          </div>
    </div>
        {/* ========= hero content ============ */}

      <div className="flex gap-[30px] justify-end">
        <div>
          <img className="w-full" src={heroImg01} alt="" />
        </div>
        <div className='mt-[30]'> 
        <img src={heroImg02} alt='' className='w-full mb-[30px]'/>
        <img src={heroImg03} alt='' className='w-full'/>
        </div>
      </div>
    </div>
    </div>
  </section>
  {/* ============= hero section end =========== */}


   {/* ============= pros section================ */}
    <section>
      <div className="container">
      <div className="xl:w-[470px] mx-auto">
        <h2 className='heading text-center'>Os nossos profissionais</h2>
      </div>
      <Pros />
      </div>
    </section>
   {/* ============= pros section end ================ */}

   {/* ============= faq section ================ */}
   <section>
    <div className="container">
      <div className="flex justify-between gap-[50px] lg:gap-0">
        <div className="w-1/2 hidden md:block">
          <img src={faqImg} alt="" />
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