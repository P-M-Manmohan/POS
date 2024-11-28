import { useState, useEffect } from "react";
import "../index.css";


const EditableField = ( { type, fieldName, setVisible, setInput, product, setProducts, setLength, length, addToList }) => {
    const [value, setValue] = useState("Enter");
    const [tempValue, setTempValue] = useState(value); // Temorary value during editing
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setTempValue(e.target.value);
        if (fieldName != "qty"){
        setInput(e.target.value);
        }
    }

  const handleSave = () => {
    if (fieldName != "qty"){
        addToList(product[length]);
    setValue(tempValue); // Save the temporary value
        return;
   }
    if ( tempValue <= product.stock ){
        var field = product;
        field.stock = tempValue;
        setProducts(field);
        setVisible(false);
    }else {
        console.log("not enough stock");
    }
      setIsEditing(false);// Exit edit mode
    setInput(null)
  };

  const handleCancel = () => {
    setTempValue(value); // Revert changes
    setIsEditing(false); // Exit edit mode
    setVisible(false);
    setInput(null)
  };

    const handleEditing = () => {
        setIsEditing(true);
        setVisible(true);
    }
                                                                                                                                                                                                                                
  const handleKeyDown = (event) => {
    
    if (event.key === "Enter") {
        handleSave();
    }else if (event.key === "Escape"){
        handleCancel();
    }
      else if (event.key === "ArrowUp"){
        event.preventDefault();
        if (length != 0)
        setLength( length-1 );
    } else if (event.key === "ArrowDown"){
        event.preventDefault();
        if ( length != product.length-1)
        setLength( length+1 )
    }
  };


    useEffect(() => {
        if (Array.isArray(product)){
            setLength(product.length-1)
        }
    },[product]);

    useEffect(() => {
        if (fieldName == "qty"){
            setIsEditing(true);
        }       
    },[fieldName]);


  return (
      <>
    <div className='h-5'>
      {isEditing ? (
          <input
            type={type}
            value={tempValue}
            onChange={(e) => handleChange(e) }
            onKeyDown={ (e) => handleKeyDown(e) }
            className=" w-fit absolute outline-0"
            onBlur= { () => handleSave() }
            autoFocus
          />
      ) : (
        <span className="inline-block absolute overflow-hidden" onClick={() => handleEditing()}>{value.length != 0 ? value : "Enter"}</span>
      )}
    </div>
      </>
  );
};

export default EditableField;

