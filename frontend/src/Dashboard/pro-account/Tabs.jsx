import {useContext} from 'react';
import { authContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';


const Tabs = ({tab, setTab}) => {

    const { t } = useTranslation();

    const {dispatch} = useContext(authContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'});
        navigate('/');
    };

  return (
    <div>
        <div className=" lg:flex flex-col p-[30px] bg-white shadow-panelShadow
        items-center h-max rounded-md">
            <button 
            onClick={()=>setTab('overview')}
            className={`${
                tab === "overview" 
                ? "bg-indigo-100 text-primaryColor"
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}>
                {t("overview")}
            </button>

            <button onClick={()=>setTab('settings')}
            className={`${
                tab === "settings" 
                ? "bg-indigo-100 text-primaryColor"
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}>
                {t("profile1")}
            </button>

            <button onClick={()=>setTab('portfolio')}
            className={`${
                tab === "portfolio" 
                ? "bg-indigo-100 text-primaryColor"
                : "bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}>
                {t("gallery")}
            </button>

            <div className="mt-[50px] w-full">
                    <button onClick={handleLogout} 
                    className='w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white'>
                        {t("logout")}
                    </button>
                   
                </div>
        </div>
    </div>
  )
}

export default Tabs