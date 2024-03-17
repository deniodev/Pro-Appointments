import FaqItem from './FaqItem';

import { useTranslation } from 'react-i18next';

const FaqList = () => {

  const { t } = useTranslation();

  const faqs = [
    {
      question: `${t("faq1")}`,
      content: `${t("faq1a")}`,
    },
    {
      question: `${t("faq2")}`,
      content: `${t("faq2a")}`,
    },
    {
      question: `${t("faq3")}`,
      content: `${t("faq3a")}`,
    },
    {
      question: `${t("faq4")}`,
      content: `${t("faq4a")}`,
    },
    {
      question: `${t("faq5")}`,
      content: `${t("faq5a")}`,
    },

  ];
  

  return (
    <ul className="mt-[38px]">
        {faqs.map((item,index) => (
            <FaqItem item={item} key={index} />
        ))}
    </ul>
  )
}

export default FaqList