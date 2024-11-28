import close from '../assets/images/close.png';
import { useState } from 'react';

const UpdateModal = ({ setModal, data, mode, count, setCount}) => {
 

    const [input, setInput] = useState(data)

    const handleChange= (e)=>{
    const {name, value}=e.target;
        if (name =='id' || name=='stock'){
    setInput(input=>({
      ...input,
      [name]: Number(value)
    }))
        }
        else{
    setInput(input=>({
      ...input,
      [name]: value
    }))

        }
  }


    const handleKeyDown = (e) => {
        if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace") {
            e.preventDefault(); // Block invalid keys
        }
    };

    const addData = async () => {
        try {

            const result = await fetch("http://localhost:8080/add",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input)
            });
            if(result.status==200){
                setModal(false);
                console.log(setCount);
                setCount();
            }
        } catch (err){
            console.error(err);
        }
    }



    const updateData = async () => {
        try {

            const result = await fetch("http://localhost:8080/update",{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input)
            });
            if(result.status==200){
                setModal(false);
                setCount();
            }
        } catch (err){
            console.error(err);
        }
    }

    const deleteData = async () => {
        try {

            const result = await fetch("http://localhost:8080/delete",{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input)
            });
            if(result.status==200){
                setModal(false);
                setCount();
            }
        } catch (err){
            console.error(err);
        }
    }


    const null_data = () => {
      if (data==null){
        data= {
            id:"",
            name:"",
            stock:"",
            price:""
        };
    }
    }
    

  return (
      <div className=' flex flex-col fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50'>
      <div className='bg-white rounded'>
        <div className='modal-box'>
            <div className="flex justify-between mx-4 font-bold">
                <h2 className='text-xl'>Update</h2>
                <form method="dialog">
                    <button className='p-1 rounded transition ease-in-out delay-150 hover:- hover:scale-100 hover:bg-red-600 duration-100' onClick = { () => setModal(false)}>
                        <img src={close} className="h-3 w-2"/>
                    </button>
                </form>
            </div>
            <div className='flex flex-col mx-4 my-4'>
                <div className='my-2 flex justify-between'>
                    <label htmlFor='id' className='me-4'>Id</label>
                    { data==null && null_data()  }
                    <input 
                        onKeyDown={handleKeyDown} 
                        id='id' 
                        className='outline rounded outline-2 outline-gray-500 outline-offset-2' 
                        onChange={handleChange} 
                        name='id' 
                        type='number' 
                        defaultValue={data.id}
         style={{
        appearance: "textfield", // Hide spinner in WebKit browsers
        MozAppearance: "textfield", // Hide spinner in Firefox
        WebkitAppearance: "none", // Another WebKit-specific rule
      }}></input>
                </div>
                <div className='my-2 flex justify-between'>
                    <label htmlFor='name' className='me-4'>Name</label>
                    <input className='outline rounded outline-2 outline-gray-500 outline-offset-2' onChange={handleChange} name='name' defaultValue={data.name}></input>
                </div>
                <div className='my-2 flex justify-between'>
                    <label htmlFor='stock' className='me-4'>Stock</label>
                    <input onKeyDown={handleKeyDown} id='stock' className='outline rounded outline-2 outline-gray-500 outline-offset-2' onChange={handleChange} name='stock' type='number' defaultValue={data.stock}></input>
                </div>
                <div className='my-2 flex justify-between'>
                    <label htmlFor='price' className='me-4'>Price</label>
                    <input onKeyDown={handleKeyDown} id='price' className='outline rounded outline-2 outline-gray-500 outline-offset-2' onChange={handleChange} name='price' defaultValue={data.price}></input>
                </div>
            </div>
        </div>
        <div className='flex justify-end'>
      
            <button className='bg-green-600 p-1 m-2 rounded transtition ease-in-out delay-50 hover:scale-110 hover:bg-green-800 ' onClick={() => {mode=='Add' ? addData() : updateData()} }>
                {mode}
            </button>

            <button className='bg-red-600 p-1 m-2 rounded' onClick={() => deleteData()}>
                Delete
            </button>
        </div>
      </div>
      </div>
  )
}
export default UpdateModal;
