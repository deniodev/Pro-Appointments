const Contact = () => {
  return (
    <section>
      <div className="px-4 mx-auto max-screen-md">
        <h2 className="heading text-center">
          Contacte-nos
        </h2>
        <p className='mb-8 lg:mb-16 font-light text-center text__para'>
        Tem um problema técnico? Quer enviar feedback sobre um recurso melhor? Nos informe.
        </p>
        <form action="#" className='space-y-8'>
          <div>
            <label htmlFor="email"className='form__label'>
              Email
            </label>
            <input type="email"
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