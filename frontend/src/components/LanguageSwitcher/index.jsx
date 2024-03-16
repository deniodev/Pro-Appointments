import { useTranslation } from "react-i18next";
import lang from "../../assets/images/language.png"

const languageOptions = [
    {
        name: "PT",
        value: "pt",
    },
    {
        name: "EN",
        value: "en",
    }
];

export const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <div className="flex">
            {/* <img src={lang} alt="" className='w-[27px] h-[27px] rounded-full mr-2' /> */}
            <select 
            onChange={handleLanguageChange}
            className="cursor-pointer text-[20px] leading-7 font-[800] appearance-none hover:bg-[#0066ff2c] rounded-md"
            >
                {languageOptions.map((languageOption) => (
                    <option
                        key={languageOption.value}
                        value={languageOption.value}
                        selected={i18n.language === languageOption.value}
                    >
                        {languageOption.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
