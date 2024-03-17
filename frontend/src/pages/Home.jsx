import React from 'react';
import FaqList from '../components/Faq/FaqList';
import Pros from './Pros/Pros';
import { useTranslation } from 'react-i18next';


const Home = () => { 

  const { t } = useTranslation();

  return  <> 
      <section>
        <div className='flex items-center gap-3 flex-col justify-center  pb-7'>
        <h2 className='font-bold text-[46px] text-center'>
        {t("hero")} <br/> {t("hero1")}
        </h2>
        <h2 className='text-xl text-gray-400 text-center'>
          {t("hero2")}
        </h2>

    </div>

      <div className="container">
      <Pros />
      </div>
    </section>


   {/* ============= faq section ================ */}
   <section>
    <div className="container">
        <div className="w-full">
          <h2 className="heading text-center">{t("faq")}</h2>
          <FaqList />
        </div>
    </div>
   </section>
   {/* ============= faq section end ================ */}

  </>
}

export default Home