import styles from './../styles/Main.module.css';
import Character from './Character';
import Arrows from './Arrows';
import preventRightClick from '../utils/preventRightClick';

function Main({ characters, setCharacters, relations, setRelations }) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>header</div>
        <div className={styles.main} onContextMenu={preventRightClick}>
          {characters.map((character) => (
            <Character
              key={character.id}
              id={character.id}
              characters={characters}
              setCharacters={setCharacters}
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
