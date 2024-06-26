import { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import ProAbout from "./ProAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loading";
import { useParams } from "react-router-dom";
import Portfolio from "./Portfolio";

import { useTranslation } from "react-i18next";

const ProDetails = () => {
  const { t } = useTranslation();

  const [tab, setTab] = useState("about");

  const { id } = useParams();

  const { data: pro, loading, error } = useFetchData(`${BASE_URL}/pros/${id}`);

  const {
    name,
    qualifications,
    experiences,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    photo,
    phone,
    city,
    portfolio,
  } = pro;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <img src={photo} alt="" className="w-[200px] h-[200px]" />
                <div className="">
                  <span
                    className="bg-[#CCF0F3] text-irisBlueColor py-1 lg:py-2 lg:px-6 text-[12px] 
                leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded px-0"
                  >
                    {specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span
                      className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px]
                  lg:leading-7 font-semibold text-headingColor"
                    >
                      <img src={starIcon} alt="" />({averageRating})
                    </span>
                    <span
                      className="text-[14px] leading-5 lg:text-[16px]
                  lg:leading-7 font-[400] text-textColor"
                    >
                      ({totalRating})
                    </span>
                  </div>
                  <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                    {bio}
                  </p>
                  <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px] font-bold">
                    📍 {city}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b border-solid border-primaryColor"
                  } 
                py-2 px-3 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  {t("about")}
                </button>

                <button
                  onClick={() => setTab("portfolio")}
                  className={`${
                    tab === "portfolio" &&
                    "border-b border-solid border-primaryColor"
                  } 
                py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  {t("gallery")}
                </button>

                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } 
                py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  {t("feedback")}
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && (
                  <ProAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                  />
                )}
                {tab === "portfolio" && <Portfolio portfolio={portfolio} />}
                {tab === "feedback" && (
                  <Feedback reviews={reviews} totalRating={totalRating} />
                )}
              </div>
            </div>

            <div className="">
              <SidePanel proId={pro._id} phone={phone} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProDetails;
