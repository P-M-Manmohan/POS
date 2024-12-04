import add from '../assets/images/plus.png';
import box from '../assets/images/box.png';
import percentage from '../assets/images/percentage.png';
import { NavLink } from 'react-router-dom';
import ColorTabs from './Tabs.jsx';
import {useState, useEffect} from 'react';

const Navbar = ({setTaxUpdate,update}) => {
 

    const [sales,setSales] = useState(null);


    const checkSales = async () => {
        
        try{
            const result = await fetch(`http://localhost:8080/sales`,{
              method:"GET",
            });

            setSales(await result.json());

        }catch(Err){
            console.log(Err);
        }
    }

    useEffect( () => {
        checkSales();
    },[update] );


  const linkClass=({isActive})=>
    isActive?
    'text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2':
    'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'

  return (
      <>
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-0.5 max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-items-center md:items-stretch md:justify-start space-x-2"
          >


      {/* The add button */}

      <div className='flex flex-col items-center pt-3 pe-3 border-r-2 border-black h-15'>   
            <NavLink className="flex flex-col flex-shrink-0 items-center mr-4" to="/">
            <img
                className="h-9 w-9"
                src={add}
                alt="add sign"
              />
              <span className="hidden md:block text-white text-l font-bold "
                >Add</span>
            </NavLink>
      </div>


      <div className='flex flex-col items-start border-r-2 border-black h-15'>

    <div className='flex flex-1 items-center mr-2 border-b-2 border-black w-20' onClick={()=> setTaxUpdate(true) }>
            <img
            className='h-3 w-3 mr-2'
            src={percentage}
            alt="percentage sign"
      />
              <span className="hidden md:block text-white text-l font-bold "
                  >Discount & Taxes</span>
      </div>

    <div className='Inventory flex flex-1 items-center mr-2'
        onClick={()=> document.getElementById('modal1').showModal()}
      >
            <img
            className='h-3 w-3 mr-2'
            src={box}
            alt="percentage sign"
      />
              <span className="hidden md:block text-white text-l font-bold "
                >Inventory</span>

    </div>
        

      </div>
      <div className='flex flex-1 items-center mr-2' onClick={() => checkSales() }>      
      <div className="flex w-fit h-full text-xl font-serif items-center content-center rounded bg-blue-100 p-3">
            Sales: {sales}
      </div>
      </div>


            <div className=" flex justify-items-center items-center content-center md:ml-auto">
              <div className=" h-6 space-x-2">
                <NavLink to="/" className={linkClass}>
                  Day End
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
      <ColorTabs></ColorTabs>
      </>
  )
}

export default Navbar
