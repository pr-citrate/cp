import styles from './../styles/Main.module.css';
import uuid from 'react-uuid';
import Character from './Character';
import c from './../constants/constants';

// todo: remove magic number and add comment

function getXPos(order, total) {
  const angle = (order / total) * 2 * Math.PI;
  let pos = c.imgHeight / 2;
  // prettier-ignore
  pos = pos - Math.sin(angle) * (c.imgHeight / 2 - (c.imgPadding + c.characterHeight / 2));
  pos = pos - c.characterHeight / 2;
  return pos;
}

function getYPos(order, total) {
  const angle = (order / total) * 2 * Math.PI;
  let pos = c.imgHeight / 2;
  // prettier-ignore
  pos = pos - Math.cos(angle) * (c.imgHeight / 2 - (c.imgPadding + c.characterHeight / 2));
  pos = pos - c.characterHeight / 2;
  return pos;
}

function Main({ characters, setCharacters }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>header</div>
      <div className={styles.main}>
        {characters.map((character, index) => (
          <Character
            key={character.id}
            xPos={getXPos(index, characters.length)}
            yPos={getYPos(index, characters.length)}
          >
            {character.name}
          </Character>
        ))}
      </div>
      <div className={styles.footer}>footer</div>
    </div>
  );
}

export default Main;
