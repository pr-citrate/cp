import c from '../constants/constants';

const findCharacter = (id, characters) => {
  return characters.find((obj) => obj.id === id);
};

const drawBody = (ctx, relation, characters) => {
  const [lx, ly, rx, ry] = [
    findCharacter(relation.left, characters).pointXPos,
    findCharacter(relation.left, characters).pointYPos,
    findCharacter(relation.right, characters).pointXPos,
    findCharacter(relation.right, characters).pointYPos,
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
  ctx.stroke();
};

const drawHead = (ctx, relation, characters) => {
  const [lx, ly, rx, ry] = [
    findCharacter(relation.left, characters).pointXPos,
    findCharacter(relation.left, characters).pointYPos,
    findCharacter(relation.right, characters).pointXPos,
    findCharacter(relation.right, characters).pointYPos,
  ];
  const [dx, dy] = [rx - lx, ry - ly];
  const slope = Math.atan2(dy, dx);
  const [ex, ey] = [
    rx - c.pointMargin * Math.cos(slope),
    ry - c.pointMargin * Math.sin(slope),
  ];

  ctx.beginPath();
  ctx.moveTo(ex, ey);
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

const drawDots = (ctx, pointX, pointY) => {
  ctx.beginPath();
  ctx.arc(pointX, pointY, c.pointSize / 2, 0, 2 * Math.PI);
  ctx.fill();
};

export { drawBody, drawHead, drawDots };
