import styles from './../styles/Character.module.css';
import { useState, useRef } from 'react';

function Character({ characters, id }) {
  const character = characters.find((obj) => obj.id === id);
  const contextRef = useRef(null);
  const [showContext, setShowContext] = useState(false);
  const handleRightClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowContext(true);
    contextRef.current.style.top = event.clientY + 'px';
    contextRef.current.style.left = event.clientX + 'px';
  };

  return (
    <div>
      <button
        onContextMenu={handleRightClick}
        className={styles.character}
        style={{ top: character.yPos + 'px', left: character.xPos + 'px' }}
      >
        {character.name}
      </button>
      <div
        ref={contextRef}
        className={styles.contexts}
        style={{ display: showContext ? 'flex' : 'none' }}
      >
        <button>delete</button>
        <button>highlight</button>
        <button>edit</button>
      </div>
    </div>
  );
}

export default Character;
