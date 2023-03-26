import styles from './../styles/Character.module.css';

function Character({ children, xPos, yPos }) {
  return (
    <button
      className={styles.character}
      style={{ top: yPos + 'px', left: xPos + 'px' }}
    >
      {children}
    </button>
  );
}

export default Character;
