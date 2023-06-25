import { toPng } from 'html-to-image';
import React from 'react';
import c from '../constants/constants';

export default function CaptureButton() {
  async function downloadElement() {
    console.log('clicked');
    const image = await toPng(document.querySelector('.container'));
    let link = document.createElement('a');
    document.body.appendChild(link);
    link.download = 'cp.png';
    link.href = image;
    link.click();
    document.body.removeChild(link);
  }

  return <button onClick={downloadElement}>download!</button>;
}
