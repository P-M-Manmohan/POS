import { useState } from "react";
import "../index.css";


const EditableField = ( { type } ) => {
  const [value, setValue] = useState("Enter");
  const [tempValue, setTempValue] = useState(value); // Temorary value during editing
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setValue(tempValue); // Save the temporary value
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    setTempValue(value); // Revert changes
    setIsEditing(false); // Exit edit mode
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        handleSave();
    }else if (event.key === "Escape"){
        handleCancel();
    }
  };

  return (
      <>
    <div className='h-5'>
      {isEditing ? (
          <input
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={ (e) => handleKeyDown(e) }
            className=" w-fit absolute outline-0"
            onBlur= { () => handleSave() }
            autoFocus
          />
      ) : (
        <span className="inline relative overflow-hidden" onClick={() => setIsEditing(true)}>{value.length != 0 ? value : "Enter"}</span>
      )}
    </div>
      </>
  );
};

export default EditableField;

