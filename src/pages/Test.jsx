import Main from '../components/main';
import AddForm from '../components/AddForm';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import c from './../constants/constants';

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

  const setPosition = () => {
    function getXPos(order, total) {
      const angle = (order / total) * 2 * Math.PI;
      let pos = c.imgHeight / 2;
      pos =
        pos -
        Math.sin(angle) *
          (c.imgHeight / 2 - (c.imgPadding + c.characterHeight / 2));
      pos = pos - c.characterHeight / 2;
      return pos;
    }

    function getYPos(order, total) {
      const angle = (order / total) * 2 * Math.PI;
      let pos = c.imgHeight / 2;
      pos =
        pos -
        Math.cos(angle) *
          (c.imgHeight / 2 - (c.imgPadding + c.characterHeight / 2));
      pos = pos - c.characterHeight / 2;
      return pos;
    }

    setCharacters(
      characters.map((obj, index) => ({
        ...obj,
        xPos: getXPos(index, characters.length),
        yPos: getYPos(index, characters.length),
      }))
    );
  };

  useEffect(setPosition, []);
  return (
    <div>
      <Main characters={characters} setCharacters={setCharacters} />
      <AddForm characters={characters} setCharacters={setCharacters} />
    </div>
  );
}

export default Test;
