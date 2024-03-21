import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

import { useTranslation } from 'react-i18next';

const Contact = () => {

  const { t } = useTranslation();

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_up3dqi5', 'template_0lz9f1d', form.current, 'r10s-hMpE6DwP6_gw')
      .then((result) => {
          console.log(result.text);
          e.target.reset();
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">
        {t("contact1")}
        </h2>
        <p className='mb-8 lg:mb-16 font-light text-center text__para'>
        {t("contact2")}
        </p>
        <form ref={form} onSubmit={sendEmail} className='space-y-8 ml-5 mr-5'>
        <div>
            <label htmlFor="name"className='form__label'>
              {t("name")}
            </label>
            <input type="name"
            name='user_name'
            id='name'
            placeholder={t("fullName")}
            className="form__input mt-1" />
          </div>
          <div>
            <label htmlFor="email"className='form__label'>
              Email
            </label>
            <input type="email"
            name='user_email'
            id='email'
            placeholder='example@gmail.com'
            className="form__input mt-1" />
          </div>
          <div>
            <label htmlFor="subject"
            className='form__label'>
              {t("subject1")}
            </label>
            <input type="text"
            name='user_subject'
            id='subject'
            placeholder={t("subject2")}
            className="form__input mt-1" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message"
            className='form__label'>
              {t("message")}
            </label>
            <textarea
            name='message'
            rows='6'
            type="text"
            id='message'
            placeholder={t("comment")}
            className="form__input mt-1" />
          </div>
          <button 
          type="submit"
          className="btn rounded sm:w-fit">
            {t("send")}
          </button>
        </form>

      </div>
    </section>
  )
}

export default Contact