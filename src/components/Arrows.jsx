import { useEffect, useRef, useContext } from 'react';

import c from './../constants/constants';

import { stylesContext } from '../utils/StylesWrapper';

function Arrows({ characters, setCharacters, relations }) {
  const styles = useContext(stylesContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => {
      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw dots
        characters.forEach((character) => {
          const pointX = character.pointXPos;
          const pointY = character.pointYPos;
          ctx.beginPath();
          ctx.arc(pointX, pointY, c.pointSize / 2, 0, 2 * Math.PI);
          ctx.fillStyle = 'black';
          ctx.fill();
        });
        // draw arrows
      });
    }, c.animationDuration * 1000);
  }, [characters]);

  return (
    <canvas
      ref={canvasRef}
      className={`canvas`}
      style={styles.canvas}
      width={c.imgWidth}
      height={c.imgHeight}
    ></canvas>
  );
}

export default Arrows;
