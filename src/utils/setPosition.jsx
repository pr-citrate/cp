import c from './../constants/constants';

function setPosition(characters) {
  function getXPos(order, total) {
    const angle = (order / total) * 2 * Math.PI;
    let pos = c.imgHeight / 2;
    pos =
      pos -
      Math.sin(angle) *
        (c.imgHeight / 2 - (c.imgPadding + c.characterHeight / 2));
    pos = pos - c.characterHeight / 2;
    return pos;
  }

  function getYPos(order, total) {
    const angle = (order / total) * 2 * Math.PI;
    let pos = c.imgHeight / 2;
    pos =
      pos -
      Math.cos(angle) *
        (c.imgHeight / 2 - (c.imgPadding + c.characterHeight / 2));
    pos = pos - c.characterHeight / 2;
    return pos;
  }

  return characters.map((obj, index) => ({
    ...obj,
    xPos: getXPos(index, characters.length),
    yPos: getYPos(index, characters.length),
  }));
}

export default setPosition;
