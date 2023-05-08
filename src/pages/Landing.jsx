import Main from '../components/main';
import AddForm from '../components/AddForm';
import uuid from 'react-uuid';
import { useState } from 'react';
import setPosition from '../utils/setPosition';
import cssModule from '../utils/cssModule';
import { createContext } from 'react';
import styles from './../styles/Landing.module.css';

export const stylesContext = createContext({ styles: '' });

function Landing() {
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
    <stylesContext.Provider value={cssModule(styles)}>
      <div>
        <Main characters={characters} setCharacters={setCharacters} />
        <AddForm setCharacters={setCharacters} />
      </div>
    </stylesContext.Provider>
  );
}
export default Landing;
