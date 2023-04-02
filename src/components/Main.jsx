import styles from './../styles/Main.module.css';
import Character from './Character';
import Arrows from './Arrows';
import { useEffect } from 'react';
import c from './../constants/constants';

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
        </div>
        <div className={styles.footer}>footer</div>
      </div>
      <Arrows />
    </div>
  );
}

export default Main;
