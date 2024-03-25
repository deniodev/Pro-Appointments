import ProCard from '../../components/Pros/ProCard';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error'
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

const Pros = () => {

  const { t } = useTranslation();

  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(()=>{

    const timeout = setTimeout(()=>{
      setDebounceQuery(query)
    },700)

    return ()=> clearTimeout(timeout)

  },[query])

  const { data: pros, loading, error } = useFetchData(`${BASE_URL}/pros?query=${debounceQuery}`);

  const filteredPros = selectedCategory === 'All'
  ? pros
  : pros.filter(pro => pro.specialization === selectedCategory);

  return (
  <>

    <div className="container text-center">
        <div className="max-w-[400px] mt-[10px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input 
            type="search"
            className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-text'
            placeholder={t("search")}
            value={query}
            onChange={e=> setQuery(e.target.value)}
            />

            <select
            className="btn appearance-none mt-0 rounded-[0px] rounded-r-md cursor-pointer pl-6 pr-[0px]"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="All">{t("all")}</option>
              <option value="Assistência Técnica">{t("aTec")}</option>
              <option value="Aulas">{t("aulas")}</option>
              <option value="Design e Tecnologia">{t("dTec")}</option>
              <option value="Eventos">{t("eventos")}</option>
              <option value="Reformas">{t("reformas")}</option>
              <option value="Serviços Domésticos">{t("sDom")}</option>
          </select>
        </div>
    </div>


  <section>
    <div className="container">
    {loading && <Loader/>}
    {error && <Error/>}
      {!loading && !error && (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {filteredPros.map((pro, index)=> (
             <ProCard key={index} pro={pro}/>
        ))}
      </div>
      )}
    </div>
  </section>
  </>
)}

export default Pros