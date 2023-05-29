import { useEffect, useRef, useContext } from 'react';

import c from './../constants/constants';

import { stylesContext } from '../utils/StylesWrapper';
import { useState } from 'react';

function Arrows({
  characters,
  setCharacters,
  relations,
  prevRelationsLength,
  setPrevRelationsLength,
}) {
  const styles = useContext(stylesContext);
  const canvasRef = useRef(null);
  const [prevIDs, setPrevIDs] = useState([]);
  const findCharacter = (id) => {
    return characters.find((obj) => obj.id === id);
  };

  const drawArrow = (ctx, relation) => {
    const [lx, ly, rx, ry] = [
      findCharacter(relation.left).pointXPos,
      findCharacter(relation.left).pointYPos,
      findCharacter(relation.right).pointXPos,
      findCharacter(relation.right).pointYPos,
    ];
    const [dx, dy] = [rx - lx, ry - ly];
    const slope = Math.atan2(dy, dx);
    const [sx, sy, ex, ey] = [
      lx + c.pointMargin * Math.cos(slope),
      ly + c.pointMargin * Math.sin(slope),
      rx - c.pointMargin * Math.cos(slope),
      ry - c.pointMargin * Math.sin(slope),
    ];

    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.lineTo(
      ex - c.arrowHeadSize * Math.cos(slope + c.arrowHeadAngle),
      ey - c.arrowHeadSize * Math.sin(slope + c.arrowHeadAngle)
    );
    ctx.lineTo(
      ex - c.arrowHeadSize * Math.cos(slope - c.arrowHeadAngle),
      ey - c.arrowHeadSize * Math.sin(slope - c.arrowHeadAngle)
    );
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const IDs = characters.map((obj) => obj.id);
    console.log(IDs === prevIDs);
    if (prevIDs === IDs && prevRelationsLength < relations.length) {
      drawArrow(ctx, relations[relations.length - 1]);
      setPrevRelationsLength(relations.length);
    } else {
      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      setTimeout(() => {
        requestAnimationFrame(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // draw dots
          characters.forEach((character) => {
            const pointX = character.pointXPos;
            const pointY = character.pointYPos;
            ctx.beginPath();
            ctx.arc(pointX, pointY, c.pointSize / 2, 0, 2 * Math.PI);
            ctx.fill();
          });
          // draw arrows

          relations.forEach((relation) => {
            drawArrow(ctx, relation);
          });
        });
      }, c.animationDuration * 1000);
    }
    setPrevIDs(IDs);
  }, [characters, relations]);

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
