import Main from '../components/main';
import AddForm from '../components/AddForm';
import uuid from 'react-uuid';
import { useState } from 'react';

function Test() {
  const [characters, setCharacters] = useState([
    { id: uuid(), name: '해량' },
    { id: uuid(), name: '수혁' },
    { id: uuid(), name: '무현' },
    { id: uuid(), name: '지혁' },
    { id: uuid(), name: '애영' },
    { id: uuid(), name: '재희' },
    { id: uuid(), name: '수정' },
    { id: uuid(), name: '지현' },
    { id: uuid(), name: '상현' },
  ]);

  return (
    <div>
      <Main characters={characters} setCharacters={setCharacters} />
      <AddForm characters={characters} setCharacters={setCharacters} />
    </div>
  );
}

export default Test;
