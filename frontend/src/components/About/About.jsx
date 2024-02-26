import React from 'react';
import aboutImg from '../../assets/images/about.jpg';
import { Link } from 'react-router-dom';

const About = () => {
  return <section>
    <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">

            {/* ============ about img =========== */}
            <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                <img src={aboutImg} alt="" />
            </div>

            {/* ============= about content ============ */}
            <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                <h2 className="heading">Conheça nossa missão</h2>
                <p className='text__para'>Na Pro Appoitments, nossa missão é simples: facilitar a conexão entre profissionais 
                talentosos e clientes em busca de expertise especializada. Estamos comprometidos em fornecer uma plataforma 
                intuitiva e confiável, onde você pode encontrar os melhores profissionais, independentemente da sua 
                necessidade ou localização. 
                </p>

                <p className="text__para mt-[30px]">Junte-se a nós enquanto capacitamos indivíduos e empresas a alcançar seus objetivos, um projeto de cada vez.
                </p>

                <Link to="/">
                    <button className='btn'>Ver mais</button>
                </Link>

            </div>

        </div>
    </div>
  </section>
}

export default About