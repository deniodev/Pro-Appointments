import ProCard from './ProCard';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Error from '../Error/Error';
import Loader from '../Loader/Loading';

const ProList = () => {

  const { data:pros, loading, error } = useFetchData(`${BASE_URL}/pros`)

  return ( 
  <>
  {loading && <Loader/>}
  {error && <Error/>}
  

    { !loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
        {pros.map((pro)=> (
             <ProCard key={pro._id} pro={pro}/>
        ))}
    </div>}

  </>
  )
}

export default ProList