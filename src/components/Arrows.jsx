import { useEffect, useRef } from 'react';
import c from './../constants/constants';
import styles from './../styles/Arrows.module.css';

function Arrows({ characters }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = c.imgWidth / 2;
    const centerY = c.imgHeight / 2;

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // request a new frame and draw the black dots in the callback
    requestAnimationFrame(() => {
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
    });
  }, [characters]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width={c.imgWidth}
      height={c.imgHeight}
    ></canvas>
  );
}

export default Arrows;
