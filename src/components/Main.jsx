import styles from './../styles/Main.module.css';
import Character from './Character';
import Arrows from './Arrows';

function Main({ characters, setCharacters }) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>header</div>
        <div className={styles.main}>
          {characters.map((character) => (
            <Character
              key={character.id}
              id={character.id}
              characters={characters}
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
