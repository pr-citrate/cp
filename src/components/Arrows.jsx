import c from './../constants/constants';
import { drawBody, drawDots, drawHead } from '../utils/drawing';
import { designContext } from '../utils/DesignWrapper';
import { useEffect, useRef, useContext } from 'react';

function Arrows({ characters, setCharacters, relations }) {
  const design = useContext(designContext);
  const canvasRef = useRef(null);

  const drawArrows = (ctx, relation) => {
    drawBody(ctx, relation[0], characters);
    relation.forEach((rel) => {
      drawHead(ctx, rel, characters);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = design?.arrow?.color ? design?.arrow?.color : '#000000';
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    setTimeout(() => {
      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw dots
        characters.forEach((character) => {
          drawDots(ctx, character.pointXPos, character.pointYPos);
        });
        // draw arrows
        relations.forEach((relation) => {
          drawArrows(ctx, relation);
        });
      });
    }, c.animationDuration * 1000);
    // }
  }, [characters.length, JSON.stringify(relations), design?.arrow?.color]);

  return (
    <canvas
      ref={canvasRef}
      className={`canvas`}
      width={c.imgWidth}
      height={c.imgHeight}
    ></canvas>
  );
}

export default Arrows;
