import { useState } from 'react';
import uuid from 'react-uuid';

import setPosition from '../utils/setPosition';
import StylesWrapper from '../utils/StylesWrapper';

import Main from '../components/main';
import AddForm from '../components/AddForm';

function Test() {
  import('./../styles/Test.css');
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
    <StylesWrapper styles={{}}>
      <Main characters={characters} setCharacters={setCharacters} />
      <AddForm setCharacters={setCharacters} />
    </StylesWrapper>
  );
}
export default Test;
