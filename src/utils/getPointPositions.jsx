import c from '../constants/constants';

function getPointPosition(order, total) {
  function getXPos(order, total) {
    const angle = (order / total) * 2 * Math.PI;
    let pos = c.imgHeight / 2;
    pos =
      pos -
      Math.sin(angle) *
        (c.imgHeight / 2 -
          (c.imgPadding +
            c.characterHeight +
            c.pointPosition +
            c.pointSize / 2));
    return pos;
  }

  function getYPos(order, total) {
    const angle = (order / total) * 2 * Math.PI;
    let pos = c.imgHeight / 2;
    pos =
      pos -
      Math.cos(angle) *
        (c.imgHeight / 2 -
          (c.imgPadding +
            c.characterHeight +
            c.pointPosition +
            c.pointSize / 2));
    return pos;
  }

  return [getXPos(order, total), getYPos(order, total)];
}

export default getPointPosition;
