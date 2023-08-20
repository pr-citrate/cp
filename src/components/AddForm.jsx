import { useState, useContext } from 'react';
import uuid from 'react-uuid';

import setPosition from '../utils/setPosition';
import CaptureButton from './CaptureButton';

function ActionForm({ characters, setCharacters, updatePointsPositions }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      setCharacters(
        setPosition([...characters, { name: inputValue.trim(), id: uuid() }])
      );

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
    <div className='action-form'>
      <div>
        <input
          className='add-input-field'
          value={inputValue}
          onChange={handleInputOnChange}
          onKeyDown={handleInputKeyDown}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <CaptureButton />
    </div>
  );
}

export default ActionForm;
