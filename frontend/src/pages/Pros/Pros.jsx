import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProCard from "../../components/Pros/ProCard";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Pros = () => {
  const { t } = useTranslation();

  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: pros,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/pros?query=${debounceQuery}`);

  const filteredProsByCategory =
    selectedCategory === "All"
      ? pros
      : pros.filter((pro) => pro.specialization === selectedCategory);

  const filteredProsByCityAndCategory =
    selectedCity === "All"
      ? filteredProsByCategory
      : filteredProsByCategory.filter((pro) => pro.city === selectedCity);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center gap-5 flex-wrap">
        <div className="w-full sm:w-72 mb-3">
          <div className="relative h-10 w-full min-w-[200px] ">
            <input
              placeholder={t("search")}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
            />
          </div>
        </div>

        <div className="w-full sm:w-72 mb-3">
          <div className="relative h-10 w-full min-w-[200px] ">
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            >
              <option value="All">{t("all")}</option>
              <option value="Assistência Técnica">{t("aTec")}</option>
              <option value="Aulas">{t("aulas")}</option>
              <option value="Design e Tecnologia">{t("dTec")}</option>
              <option value="Eventos">{t("eventos")}</option>
              <option value="Reformas">{t("reformas")}</option>
              <option value="Serviços Domésticos">{t("sDom")}</option>
            </select>
            <label className=" before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              {t("categories")}
            </label>
          </div>
        </div>

        <div className="w-full sm:w-72 mb-3">
          <div className="relative h-10 w-full min-w-[200px] ">
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            >
              <option value="All">{t("all")}</option>
              <option value="Pemba">Pemba</option>
              <option value="Lichinga">Lichinga</option>
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
            <label className=" before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              {t("city")}
            </label>
          </div>
        </div>
      </div>

      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredProsByCityAndCategory.map((pro, index) => (
            <ProCard key={index} pro={pro} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pros;
