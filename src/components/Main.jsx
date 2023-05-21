import { memo, useState, useContext } from 'react';
import { stylesContext } from '../utils/StylesWrapper';

import preventRightClick from '../utils/preventRightClick';
import setPosition from '../utils/setPosition';

import Character from './Character';
import Arrows from './Arrows';

const MemoizedCharacter = memo(Character);

function Main({ characters, setCharacters }) {
  const styles = useContext(stylesContext);
  const [relations, setRelations] = useState([
    { left: characters[3].id, right: characters[7].id },
    { left: characters[7].id, right: characters[3].id },
    { left: characters[2].id, right: characters[5].id },
    { left: characters[2].id, right: characters[5].id },
    { left: characters[1].id, right: characters[6].id },
    { left: characters[8].id, right: characters[2].id },
    { left: characters[0].id, right: characters[3].id },
    { left: characters[1].id, right: characters[2].id },
    { left: characters[4].id, right: characters[2].id },
    { left: characters[8].id, right: characters[5].id },
  ]);
  const [selection, setSelection] = useState('');
  const [pointCoordinate, setPointCoordinate] = useState([]);

  const handleDelete = (idk) => {
    setRelations(
      relations.filter(
        (relation) => relation.left !== idk && relation.right !== idk
      )
    );
    setCharacters(
      setPosition(characters.filter((character) => character.idk !== idk))
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
