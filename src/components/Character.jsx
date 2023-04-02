import styles from './../styles/Character.module.css';

function Character({ characters, id }) {
  const character = characters.find((obj) => obj.id === id);

  return (
    <button
      className={styles.character}
      style={{ top: character.yPos + 'px', left: character.xPos + 'px' }}
    >
      {character.name}
    </button>
  );
}

export default Character;
