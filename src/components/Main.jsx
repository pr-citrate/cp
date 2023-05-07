import { memo, useState, useContext } from 'react';
import { stylesContext } from '../pages/Test';

import preventRightClick from '../utils/preventRightClick';
import setPosition from '../utils/setPosition';

import Character from './Character';
import Arrows from './Arrows';

const MemoizedCharacter = memo(Character);

function Main({ characters, setCharacters }) {
  const styles = useContext(stylesContext);
  const [relations, setRelations] = useState([]);
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
    <div>
      <div className={styles.container}>
        <div className={styles.header}>header</div>
        <div className={styles.main} onContextMenu={preventRightClick}>
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
          <Arrows characters={characters} relations={relations} />
        </div>
        <div className={styles.footer}>footer</div>
      </div>
    </div>
  );
}

export default Main;
