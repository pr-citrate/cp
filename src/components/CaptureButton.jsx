import { toPng } from 'html-to-image';
import React from 'react';
import c from '../constants/constants.jsx';

export default function CaptureButton() {
  async function downloadElement() {
    console.log('clicked');
    document.querySelector('.container').style.transform = 'none';
    const image = await toPng(document.querySelector('.container'));
    document.querySelector('.container').style.transform = `scale(${
      (window.innerWidth * 0.7) / c.imgWidth
    })`;
    let link = document.createElement('a');
    document.body.appendChild(link);
    link.download = 'cp.png';
    link.href = image;
    link.click();
    document.body.removeChild(link);
  }

  return <button onClick={downloadElement}>download!</button>;
}
