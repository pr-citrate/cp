import { useEffect, useRef } from 'react';
import c from './../constants/constants';
import styles from './../styles/Main.module.css';
import Character from './Character';

function Main({ characters }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = c.imgWidth / 2;
    const centerY = c.imgHeight / 2;

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw points for each character
    characters.forEach((character) => {
      const characterX = character.xPos + c.characterWidth / 2;
      const characterY = character.yPos + c.characterHeight / 2;
      const directionX = centerX - characterX;
      const directionY = centerY - characterY;
      const distance = Math.sqrt(directionX ** 2 + directionY ** 2);
      const unitX = directionX / distance;
      const unitY = directionY / distance;
      const pointX =
        characterX +
        unitX * (c.pointPosition + c.pointSize / 2 + c.characterHeight / 2);
      const pointY =
        characterY +
        unitY * (c.pointPosition + c.pointSize / 2 + c.characterHeight / 2);

      ctx.beginPath();
      ctx.arc(pointX, pointY, c.pointSize / 2, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
    });
  }, [characters]);

  return (
    <div>
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
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={c.imgWidth}
        height={c.imgHeight}
        style={{ display: 'block', margin: 'auto' }}
      >
        why????????
      </canvas>
      <p>qwertyuio</p>
    </div>
  );
}

export default Main;
