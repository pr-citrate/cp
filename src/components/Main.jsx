import styles from './../styles/Main.module.css';
import Character from './Character';
import Arrows from './Arrows';
import preventRightClick from '../utils/preventRightClick';
import setPosition from '../utils/setPosition';
import { memo } from 'react';

const MemoizedCharacter = memo(Character);

function Main({ characters, setCharacters, relations, setRelations }) {
  const handleDelete = (id) => {
    setCharacters(
      setPosition(characters.filter((character) => character.id !== id))
    );
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
