import React from 'react';
import { useContext } from 'react';
import { stringify } from 'qs';
import { designContext } from '../utils/DesignWrapper';

function ShareButton({ characters }) {
  const design = useContext(designContext);
  const clipboardCopy = async (text) => {
    console.log(text);
    console.log(design);
    await window.navigator.clipboard.writeText(text);
    alert('link copied!');
  };

  return (
    <button
      onClick={() =>
        clipboardCopy(
          `localhost:5173/?${stringify({
            characters: characters.map((obj) => obj.name),
            design: design,
          })}`
        )
      }
    >
      Share
    </button>
  );
}

export default ShareButton;
