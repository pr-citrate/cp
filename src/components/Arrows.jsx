import { useEffect, useRef, useContext } from 'react';
import c from './../constants/constants';
import getPointPosition from '../utils/getPointPositions';
import { stylesContext } from '../pages/Test';

function Arrows({ characters, relations }) {
  const styles = useContext(stylesContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let pointPositions = [];

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => {
      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
