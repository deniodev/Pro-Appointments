import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProCard from '../../components/Pros/ProCard';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { FaSearch } from 'react-icons/fa';

const Pros = () => {
  const { t } = useTranslation();

  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Assuming mobile device width is 768px or less

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: pros, loading, error } = useFetchData(`${BASE_URL}/pros?query=${debounceQuery}`);

  const filteredProsByCategory = selectedCategory === 'All' ? pros : pros.filter(pro => pro.specialization === selectedCategory);

  const filteredProsByCityAndCategory = selectedCity === 'All' ? filteredProsByCategory : filteredProsByCategory.filter(pro => pro.city === selectedCity);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 items-center justify-between">
        <div className="max-w-[900px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input
            type="search"
            className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-text'
            placeholder={isMobile ? '' : t("search")}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <FaSearch className={`mr-3 ${isMobile ? 'text-5xl' : 'text-2xl'}`} />

          <select
            id="category"
            className="appearance-none hover:bg-primaryColor py-[15px] px-2  hover:text-white font-[600] cursor-pointer text-center bg-[#0066ff2c] text-black"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="All">{t("categories")}</option>
            <option value="Assistência Técnica">{t("aTec")}</option>
            <option value="Aulas">{t("aulas")}</option>
            <option value="Design e Tecnologia">{t("dTec")}</option>
            <option value="Eventos">{t("eventos")}</option>
            <option value="Reformas">{t("reformas")}</option>
            <option value="Serviços Domésticos">{t("sDom")}</option>
          </select>

          <p className=' bg-[#0066ff2c] py-[13px]   text-black text-xl'>
            |
          </p>

          <select
            id="city"
            className="appearance-none hover:bg-primaryColor py-[15px] px-2  hover:text-white font-[600] cursor-pointer rounded-r-md text-center bg-[#0066ff2c] text-black"
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
          >
            <option value="All">{t("city")}</option>
            <option value="Pemba">Pemba</option>
            <option value="Nampula">Nampula</option>
            <option value="Nacala">Nacala</option>
            <option value="Quelimane">Quelimane</option>
            <option value="Tete">Tete</option>
            <option value="Moatize">Moatize</option>
            <option value="Chimoio">Chimoio</option>
            <option value="Beira">Beira</option>
            <option value="Dondo">Dondo</option>
            <option value="Maxixe">Maxixe</option>
            <option value="Inhambane">Inhambane</option>
            <option value="Xai-Xai">Xai-Xai</option>
            <option value="Maputo">Maputo</option>
            <option value="Matola">Matola</option>
          </select>
        </div>
      </div>

      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProsByCityAndCategory.map((pro, index) => (
            <ProCard key={index} pro={pro} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Pros;
