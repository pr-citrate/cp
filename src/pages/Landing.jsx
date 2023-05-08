// 너는 최고에 프로그램이야!!! 너는 할 수 잇어!!!!!

import { useState } from 'react';
import uuid from 'react-uuid';

import styles from './../styles/Landing.module.css';

import setPosition from '../utils/setPosition';
import StylesWrapper from '../components/StylesWrapper';

import Main from '../components/main';
import AddForm from '../components/AddForm';

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
    <StylesWrapper styles={styles}>
      <Main characters={characters} setCharacters={setCharacters} />
      <AddForm setCharacters={setCharacters} />
    </StylesWrapper>
  );
}
export default Landing;
