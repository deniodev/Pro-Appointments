import { useTranslation } from 'react-i18next';

const SidePanel = ({proId, phone}) => {

  const { t } = useTranslation();

    const handleClick = () => {
      window.open(`http://wa.me/+258${phone}`, '_blank');
    };
  
    return (
      <div>
        <img src="" alt="" />
        <button className='btn px-2 w-full rounded-md' onClick={handleClick}>
          {t("book")}
        </button>
      </div>
    );
  };
  
  export default SidePanel;
  

