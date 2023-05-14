import { memo, useState, useContext } from 'react';
import { stylesContext } from '../utils/StylesWrapper';

import preventRightClick from '../utils/preventRightClick';
import setPosition from '../utils/setPosition';

import Character from './Character';
import Arrows from './Arrows';

const MemoizedCharacter = memo(Character);

function Main({ characters, setCharacters }) {
  const styles = useContext(stylesContext);
  console.log(characters);
  const [relations, setRelations] = useState([
    { left: characters[3], right: characters[7] },
    { left: characters[7], right: characters[3] },
    { left: characters[2], right: characters[5] },
    { left: characters[2], right: characters[5] },
    { left: characters[1], right: characters[6] },
    { left: characters[8], right: characters[2] },
    { left: characters[0], right: characters[3] },
    { left: characters[1], right: characters[2] },
    { left: characters[4], right: characters[2] },
    { left: characters[8], right: characters[5] },
  ]);
  const [selection, setSelection] = useState('');
  const [pointCoordinate, setPointCoordinate] = useState([]);

  const handleDelete = (id) => {
    setCharacters(
      setPosition(characters.filter((character) => character.id !== id))
    );
  };

  const updateRelations = (left, right) => {
    setRelations((prevRelations) => {
      const idx = prevRelations.findIndex(
        (obj) => obj.left === left && obj.right === right
      );
      if (idx !== -1) {
        return [
          ...prevRelations.slice(0, idx),
          ...prevRelations.slice(idx + 1),
        ];
      } else {
        return [...prevRelations, { left: left, right: right }];
      }
    });
  };

  return (
    <div className={`container`} style={styles.container}>
      <div className={`header`} style={styles.header}>
        header
      </div>
      <div
        className={`main`}
        style={styles.main}
        onContextMenu={preventRightClick}
      >
        {characters.map((character) => (
          <MemoizedCharacter
            key={character.id}
            id={character.id}
            characters={characters}
            setCharacters={setCharacters}
            handleDelete={handleDelete}
            updateRelations={updateRelations}
          />
        ))}
        <Arrows
          characters={characters}
          setCharacters={setCharacters}
          relations={relations}
        />
      </div>
      <div className={`footer`} style={styles.footer}>
        footer
      </div>
    </div>
  );
}

export default Main;
