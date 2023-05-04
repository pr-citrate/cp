import styles from './../styles/Main.module.css';
import Character from './Character';
import Arrows from './Arrows';
import preventRightClick from '../utils/preventRightClick';
import setPosition from '../utils/setPosition';
import { memo } from 'react';

const MemoizedCharacter = memo(Character);

function Main({ characters, setCharacters }) {
  const [relations, setRelations] = useState([]);
  const [selection, setSelection] = useState('');

  const handleDelete = (id) => {
    setCharacters(
      setPosition(characters.filter((character) => character.id !== id))
    );
  };

  const updateRelations = (left, right) => {
    setRelations((prev) => {
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
          <Arrows characters={characters} />
        </div>
        <div className={styles.footer}>footer</div>
      </div>
    </div>
  );
}

export default Main;
