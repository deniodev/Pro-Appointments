const SidePanel = ({proId, phone}) => {
    const handleClick = () => {
      window.open(`http://wa.me/${phone}`, '_blank');
    };
  
    return (
      <div>
        <img src="" alt="" />
        <button className='btn px-2 w-full rounded-md' onClick={handleClick}>
          Agendar
        </button>
      </div>
    );
  };
  
  export default SidePanel;
  

