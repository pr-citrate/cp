import { useEffect, useRef } from 'react';
import c from './../constants/constants';
import styles from './../styles/Arrows.module.css';
import getPointPosition from '../utils/getPointPositions';

function Arrows({ characters }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let pointPositions = [];

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => {
      requestAnimationFrame(() => {
        // draw dots
        characters.forEach((character, index) => {
          const [pointX, pointY] = getPointPosition(index, characters.length);
          pointPositions = [...pointPositions, [pointX, pointY]];

          ctx.beginPath();
          ctx.arc(pointX, pointY, c.pointSize / 2, 0, 2 * Math.PI);
          ctx.fillStyle = 'black';
          ctx.fill();
        });
        // draw arrows
      });
    }, 500);
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
