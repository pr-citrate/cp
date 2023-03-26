import styles from './../styles/Main.module.css';
import uuid from 'react-uuid';
import Character from './Character';

// todo: remove magic number and add comment

function getXPos(order, total) {
  const angle = (order / total) * 2 * Math.PI;
  return 290 + Math.sin(angle) * 280;
}
function getYPos(order, total) {
  const angle = (order / total) * 2 * Math.PI;
  return 290 - Math.cos(angle) * 280;
}

function Main() {
  const characters = [
    { id: uuid(), name: '해량' },
    { id: uuid(), name: '수혁' },
    { id: uuid(), name: '무현' },
    { id: uuid(), name: '지혁' },
    { id: uuid(), name: '애영' },
  ];
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
