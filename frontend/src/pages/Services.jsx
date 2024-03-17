import ServiceCard from '../components/Services/ServiceCard';
import { useTranslation } from 'react-i18next';

const Services = () => {

  const { t } = useTranslation();

  const services = [
    {
      name: `${t("serviceName1")}`,
      desc: `${t("serviceDesc1")}`,
      bgColor: "rgba(254, 182, 13, .2)",
      textColor: "#FEB60D",
    },
    {
      name: `${t("serviceName2")}`,
      desc: `${t("serviceDesc2")}`,
      bgColor: "rgba(151, 113, 255, .2)",
      textColor: "#9771FF",
    },
    {
      name: `${t("serviceName3")}`,
      desc: `${t("serviceDesc3")}`,
      bgColor: "rgba(1, 181, 197, .2)",
      textColor: "#01B5C5",
    },
    {
      name: `${t("serviceName4")}`,
      desc: `${t("serviceDesc4")}`,
      bgColor: "rgba(1, 181, 197, .2)",
      textColor: "#01B5C5",
    },
    {
      name: `${t("serviceName5")}`,
      desc: `${t("serviceDesc5")}`,
      bgColor: "rgba(254, 182, 13, .2)",
      textColor: "#FEB60D",
    },
    {
      name: `${t("serviceName6")}`,
      desc: `${t("serviceDesc6")}`,
      bgColor: "rgba(151, 113, 255, .2)",
      textColor: "#9771FF",
    },
  ];
  

  return (
    <section>
      <div className="container">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]'>
       {services.map((item,index)=> (
       <ServiceCard item={item} index={index} key={index}/>
       ))}
      </div>
      </div>
    </section>
  )
}

export default Services