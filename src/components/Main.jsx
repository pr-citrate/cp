import { memo, useState, useContext } from 'react';
import { stylesContext, userStylesContext } from '../utils/StylesWrapper';

import preventRightClick from '../utils/preventRightClick';
import setPosition from '../utils/setPosition';

import Character from './Character';
import Arrows from './Arrows';

const MemoizedCharacter = memo(Character);

function Main({ characters, setCharacters }) {
  const styles = useContext(stylesContext);
  const userStyles = useContext(userStylesContext);
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
    <div className={styles.container} style={userStyles.container}>
      <div className={styles.header} style={userStyles.header}>
        header
      </div>
      <div
        className={styles.main}
        style={userStyles.main}
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
        <Arrows characters={characters} relations={relations} />
      </div>
      <div className={styles.footer} style={userStyles.footer}>
        footer
      </div>
    </div>
  );
}

export default Main;
