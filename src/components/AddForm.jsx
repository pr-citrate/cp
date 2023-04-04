import { useState } from 'react';
import uuid from 'react-uuid';
import setPosition from '../utils/setPosition';

function AddForm({ setCharacters }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      setCharacters((prevCharacters) => {
        return setPosition([
          ...prevCharacters,
          { name: inputValue.trim(), id: uuid() },
        ]);
      });

      setInputValue('');
    }
  };

  const handleInputOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={handleInputOnChange}
        onKeyDown={handleInputKeyDown}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddForm;
