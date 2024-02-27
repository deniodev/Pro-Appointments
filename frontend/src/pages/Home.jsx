import React from 'react';
import heroImg01 from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroImg03 from '../assets/images/hero-img03.jpg';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import faqImg from '../assets/images/faq-img.jpg';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import About from '../components/About/About';
import ServiceList from '../components/Services/ServiceList';
import DoctorList from '../components/Doctors/DoctorList';
import FaqList from '../components/Faq/FaqList';

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

            <button className='btn'>Agende um encontro</button>
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

  <section>
    <div className="container">
      <div className='lg:w-[470px] mx-auto'>
        <h2 className='heading text-center'>
        Providenciando os melhores serviços
        </h2>
        <p className='text__para text-center'>
        Encontre especialistas em todas as áreas e comece a colaborar hoje mesmo para alcançar o sucesso.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">

      <div className="py-[30px] px-5">
        <div className='flex items-center justify-center'>
          <img 
            src={icon01}
            alt=''
          />
        </div>

        <div className="mt-[30px]">
          <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
            Encontre o Profissional
          </h2>
          <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
          Explore perfis detalhados, avaliações de clientes e 
          encontre o profissional perfeito para si.
          </p>

          <Link to="/doctors"
           className='w-[44px] h-[44px] rounded-full border border-solid 
          border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor 
          hover:border-none'>
            <BsArrowRight className='group-hover:text-white w-6 h-5'/>
          </Link>
        </div>
      </div>

      <div className="py-[30px] px-5">
        <div className='flex items-center justify-center'>
          <img 
            src={icon02}
            alt=''
          />
        </div>

        <div className="mt-[30px]">
          <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
          Encontre a Localização
          </h2>
          <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
          Localize profissionais próximos a você ou em uma região específica para atender às suas necessidades.
          </p>

          <Link to="/doctors"
           className='w-[44px] h-[44px] rounded-full border border-solid 
          border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor 
          hover:border-none'>
            <BsArrowRight className='group-hover:text-white w-6 h-5'/>
          </Link>
        </div>
      </div>

      <div className="py-[30px] px-5">
        <div className='flex items-center justify-center'>
          <img 
            src={icon03}
            alt=''
          />
        </div>

        <div className="mt-[30px]">
          <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
            Agende um Encontro
          </h2>
          <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
          Agende facilmente uma reunião com o profissional escolhido através da nossa plataforma integrada. 
          </p>

          <Link to="/doctors"
           className='w-[44px] h-[44px] rounded-full border border-solid 
          border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor 
          hover:border-none'>
            <BsArrowRight className='group-hover:text-white w-6 h-5'/>
          </Link>
        </div>
      </div>

      </div>
    </div>
  </section>
  
  <About />

  {/* ============== services section ============ */}
  <section>
    <div className="container">
      <div className="xl:w-[470px] mx-auto">
        <h2 className='heading text-center'>Nossos serviços</h2>
        <p className='text__para text-center'>Desde assistência técnica
         e aulas até design e tecnologia, eventos, reformas e serviços domésticos.</p>
      </div>

      <ServiceList/>
    </div>
  </section>
  {/* ============== services section end ============ */}


   {/* ============= doctors section================ */}
    <section>
      <div className="container">
      <div className="xl:w-[470px] mx-auto">
        <h2 className='heading text-center'>Os nossos profissionais</h2>
      </div>

      <DoctorList />
      </div>
    </section>
   {/* ============= doctors section end ================ */}

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