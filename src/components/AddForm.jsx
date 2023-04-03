import { useState } from 'react';
import uuid from 'react-uuid';
import setPosition from '../utils/setPosition';

function AddForm({ characters, setCharacters }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddOnClick = () => {
    if (inputValue.trim() !== '') {
      setCharacters((prevChars) => {
        const newChars = [
          ...prevChars,
          { name: inputValue.trim(), id: uuid() },
        ];
        return setPosition(newChars);
      });
      setInputValue('');
    }
  };

  const handleInputOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddOnClick();
    }
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={handleInputOnChange}
        onKeyDown={handleInputKeyDown}
      />
      <button onClick={handleAddOnClick}>Add</button>
    </div>
  );
}

export default AddForm;
