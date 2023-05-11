import { useState, useContext } from 'react';
import uuid from 'react-uuid';

import setPosition from '../utils/setPosition';
import { stylesContext } from '../utils/StylesWrapper';

function AddForm({ setCharacters, updatePointsPositions }) {
  const styles = useContext(stylesContext);
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
