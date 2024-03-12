import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {

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
      <div className="px-4 mx-auto max-screen-md">
        <h2 className="heading text-center">
          Contacte-nos
        </h2>
        <p className='mb-8 lg:mb-16 font-light text-center text__para'>
        Tem um problema técnico? Quer enviar feedback sobre um recurso melhor? Nos informe.
        </p>
        <form ref={form} onSubmit={sendEmail} className='space-y-8 ml-5 mr-5'>
        <div>
            <label htmlFor="name"className='form__label'>
              Nome
            </label>
            <input type="name"
            name='user_name'
            id='name'
            placeholder='Nome completo'
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
              Assunto
            </label>
            <input type="text"
            name='user_subject'
            id='subject'
            placeholder='Deixe-nos saber como podemos ajudá-lo'
            className="form__input mt-1" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message"
            className='form__label'>
              Sua mensagem
            </label>
            <textarea
            name='message'
            rows='6'
            type="text"
            id='message'
            placeholder='Deixe o seu comentario....'
            className="form__input mt-1" />
          </div>
          <button 
          type="submit"
          className="btn rounded sm:w-fit">
            Enviar
          </button>
        </form>

      </div>
    </section>
  )
}

export default Contact