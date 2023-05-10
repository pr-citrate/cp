import { useState } from 'react';
import uuid from 'react-uuid';
import { useLocation } from 'react-router-dom';
import QueryString from 'qs';

// import styles from './../styles/Landing.module.css';

import './../styles/Landing.css';

import setPosition from '../utils/setPosition';
import StylesWrapper from '../utils/StylesWrapper';

import Main from '../components/main';
import AddForm from '../components/AddForm';

function Landing() {
  const location = useLocation();

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
    <StylesWrapper
      // styles={styles}
      userStyles={QueryString.parse(location.search)}
    >
      <Main characters={characters} setCharacters={setCharacters} />
      <AddForm setCharacters={setCharacters} />
    </StylesWrapper>
  );
}
export default Landing;
