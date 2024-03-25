import ProCard from '../../components/Pros/ProCard';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Pros = () => {
  const { t } = useTranslation();

  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All'); // State for selected city

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const { data: pros, loading, error } = useFetchData(`${BASE_URL}/pros?query=${debounceQuery}`);

  const filteredProsByCategory = selectedCategory === 'All' ? pros : pros.filter(pro => pro.specialization === selectedCategory);

  const filteredProsByCityAndCategory = selectedCity === 'All' ? filteredProsByCategory : filteredProsByCategory.filter(pro => pro.city === selectedCity);

  return (
    <>
      <div className="container">
        <div className="flex flex-col">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <form className="">
              <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" className=""></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                </svg>
                <input
                  type="search"
                  className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-4 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder={t("search")}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col">
                  <label htmlFor="manufacturer" className="text-sm font-medium text-stone-600">{t("categories")}</label>

                  <select
                    className="cursor-pointer appearance-none mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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


                <div className="flex flex-col">
                  <label htmlFor="city" className="text-sm font-medium text-stone-600">{t("city")}</label>

                  <select
                    id="city"
                    className="appearance-none mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)} // Update selected city on change
                  >
                    <option value="All">{t("allcity")}</option>
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

                <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                  <button className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring">Reset</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
              {filteredProsByCityAndCategory.map((pro, index) => (
                <ProCard key={index} pro={pro} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Pros;
