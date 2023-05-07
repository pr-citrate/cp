import Main from '../components/main';
import AddForm from '../components/AddForm';
import uuid from 'react-uuid';
import { useState, useContext } from 'react';
import setPosition from '../utils/setPosition';
import styles from './../styles/Test.module.css';
import { createContext } from 'react';

export const stylesContext = createContext({ styles: '' });

function Test() {
  const [characters, setCharacters] = useState(
    setPosition([
      { id: uuid(), name: 'c1' },
      { id: uuid(), name: 'c2' },
      { id: uuid(), name: 'c3' },
      { id: uuid(), name: 'c4' },
      { id: uuid(), name: 'c5' },
      { id: uuid(), name: 'c6' },
      { id: uuid(), name: 'c7' },
      { id: uuid(), name: 'c8' },
      { id: uuid(), name: 'c9' },
    ])
  );

  return (
    <stylesContext.Provider value={styles}>
      <div>
        <Main characters={characters} setCharacters={setCharacters} />
        <AddForm setCharacters={setCharacters} />
      </div>
    </stylesContext.Provider>
  );
}
export default Test;
