import close from "../assets/images/close.png"
import { useState } from "react";

const TaxUpdateModal = ( {taxRate,setTaxRate, discount, setDiscount, setTaxUpdate }) => {

    const [tempDis,setTempDis] = useState(null);
    const [tempTax, setTempTax] = useState(null);


  


    const handleKeyDown = (e) => {
        if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace") {
            e.preventDefault(); // Block invalid keys
        }
    };

    const updateData = () => {
        console.log(tempTax, tempDis);
        setTaxRate(tempTax);
        setDiscount(tempDis);
        setTaxUpdate(false);
    }

  return (
      <div className=' flex flex-col fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50'>
      <div className='bg-white rounded'>
        <div className='modal-box'>
            <div className="flex justify-between mx-4 font-bold">
                <h2 className='text-xl'>Update</h2>
                <form method="dialog">
                    <button className='p-1 rounded transition ease-in-out delay-150 hover:- hover:scale-100 hover:bg-red-600 duration-100' onClick = { () => setTaxUpdate(false)}>
                        <img src={close} className="h-3 w-2"/>
                    </button>
                </form>
            </div>
            <div className='flex flex-col mx-4 my-4'>
                <div className='my-2 flex justify-between'>
                    <label htmlFor='tax' className='me-4'>Tax</label>
                    <input onKeyDown={(e) => handleKeyDown(e) } className='outline rounded outline-2 outline-gray-500 outline-offset-2' name='tax' type='number' onChange={(e) => setTempTax(e.target.value)} defaultValue={taxRate}></input>
                </div>
                <div className='my-2 flex justify-between'>
                    <label htmlFor='discount' className='me-4'>Discount</label>
                    <input onKeyDown={(e) => handleKeyDown(e) } className='outline rounded outline-2 outline-gray-500 outline-offset-2' name='discount' type='number'  onChange={(e) => setTempDis(e.target.value)}  defaultValue={discount}></input>
                </div>
            </div>
        </div>
        <div className='flex justify-end'>
      
            <button className='bg-green-600 p-1 m-2 rounded transtition ease-in-out delay-50 hover:scale-110 hover:bg-green-800 ' onClick={() => {updateData()} }>
                Update
            </button>

        </div>
      </div>
      </div>
  )
}


export default TaxUpdateModal;
