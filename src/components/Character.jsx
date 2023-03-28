import styles from './../styles/Character.module.css';
import c from './../constants/constants';

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

const findCharacter = (characters, id) =>
  characters.find((obj) => obj.id === id);

function Character({ characters, id, order }) {
  const character = findCharacter(characters, id);
  const xPos = getXPos(order, characters.length);
  const yPos = getYPos(order, characters.length);
  console.log(`${character.name} ${xPos} `);

  characters = characters.map((obj) =>
    obj.id === id ? { ...obj, xPos: xPos, yPos: yPos } : obj
  );

  return (
    <button
      className={styles.character}
      style={{ top: yPos + 'px', left: xPos + 'px' }}
    >
      {character.name}
    </button>
  );
}

export default Character;
