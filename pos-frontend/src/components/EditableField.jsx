import { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
   style={{
        appearance: "textfield",
        MozAppearance: "textfield",
        WebkitAppearance: "none",
      }}`;

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
    <div>
      {isEditing ? (
        <div className='max-w-fit'>
          <StyledInput
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={ (e) => handleKeyDown(e) }
            className="flex w-fit"
            onBlur= { () => handleSave() }
            autoFocus
          />
        </div>
      ) : (
        <span onClick={() => setIsEditing(true)}>{value.length != 0 ? value : "Enter"}</span>
      )}
    </div>
  );
};

export default EditableField;

