import { memo, useState, useContext } from 'react';
import { stylesContext } from '../utils/StylesWrapper';

import preventRightClick from '../utils/preventRightClick';
import setPosition from '../utils/setPosition';

import Character from './Character';
import Arrows from './Arrows';

const MemoizedCharacter = memo(Character);

function Main({ characters, setCharacters }) {
  const styles = useContext(stylesContext);
  const [relations, setRelations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isNameUpdated, setIsNameUpdated] = useState(false);
  const handleDelete = (id) => {
    setCharacters(
      setPosition(
        characters.filter((character) => {
          return character.id !== id;
        })
      )
    );

    setRelations(
      relations.filter(
        (relation) => !relations.left === id || !relations.right === id
      )
    );
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
            relations={relations}
            setRelations={setRelations}
            selected={selected}
            setSelected={setSelected}
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
