import styles from './../styles/Main.module.css';
import uuid from 'react-uuid';
import Character from './Character';
import c from './../constants/constants';

// todo: remove magic number and add comment



function Main({ characters, setCharacters }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>header</div>
      <div className={styles.main}>
        {characters.map((character, index) => (
          <Character
            key={character.id}
            id={character.id}
            characters={characters}
            order={index}
          ></Character>
        ))}
      </div>
      <div className={styles.footer}>footer</div>
    </div>
  );
}

export default Main;
