import { useTranslation } from "react-i18next";

const languageOptions = [
  {
    name: "PT",
    value: "pt",
  },
  {
    name: "EN",
    value: "en",
  },
];

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="flex">
      <select
        onChange={handleLanguageChange}
        className="cursor-pointer text-[20px] leading-7 font-[800] appearance-none  rounded-md"
      >
        {languageOptions.map((languageOption) => (
          <option
            key={languageOption.value}
            value={languageOption.value}
            defaultValue={i18n.language === languageOption.value}
          >
            {languageOption.name}
          </option>
        ))}
      </select>
    </div>
  );
};
