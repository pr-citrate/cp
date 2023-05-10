import { useState, useRef, useEffect, useContext } from 'react';

import { stylesContext, userStylesContext } from '../utils/StylesWrapper';

function Character({ characters, id, handleDelete, updateRelations }) {
  const styles = useContext(stylesContext);
  const userStyles = useContext(userStylesContext);
  const character = characters.find((obj) => obj.id === id);
  const contextRef = useRef(null);
  const inputRef = useRef(null);
  const [showContext, setShowContext] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onHighlight, setOnHighlight] = useState(false);

  const handleEdit = () => {
    setOnEdit(true);
    setShowContext(false);
    setTimeout(() => {
      inputRef.current.focus();
    }, 50);
  };
  const handleHighlight = () => {
    setOnHighlight(!onHighlight);
    setShowContext(false);
  };

  useEffect(() => {
    const handleContextRemove = (event) => {
      if (
        showContext &&
        (event.button === 0 || event.button === 2) &&
        !contextRef?.current.contains(event.target)
      ) {
        setShowContext(false);
      }
    };

    document.addEventListener('mousedown', handleContextRemove);
    inputRef.current.value = character.name;

    return () => {
      document.removeEventListener('mousedown', handleContextRemove);
    };
  });

  const handleContextMenu = (event) => {
    setShowContext(true);
    event.preventDefault();
    event.stopPropagation();
    contextRef.current.style.top = event.clientY + 'px';
    contextRef.current.style.left = event.clientX + 'px';
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <button
        className={`character ${styles.fadein} ${styles.character} ${
          onHighlight ? styles.highlight : ''
        }`}
        style={{
          top: character.yPos + 'px',
          left: character.xPos + 'px',
          ...userStyles.character,
        }}
      >
        <input
          className={styles.name}
          style={userStyles.name}
          ref={inputRef}
          disabled={onEdit ? false : true}
        ></input>
      </button>
      <div
        className={styles.contextMenuContainer}
        ref={contextRef}
        style={{
          display: showContext ? 'flex' : 'none',
          ...userStyles.contextMenuContainer,
        }}
      >
        <button
          style={userStyles.contextMenu}
          className={styles.contextMenu}
          onClick={() => handleDelete(character.id)}
        >
          delete
        </button>
        <button
          className={styles.contextMenu}
          style={userStyles.contextMenu}
          onClick={handleHighlight}
        >
          {onHighlight ? 'cancel highlighting' : 'highlight'}
        </button>
        <button
          className={styles.contextMenu}
          style={userStyles.contextMenu}
          onClick={handleEdit}
        >
          edit
        </button>
      </div>
    </div>
  );
}

export default Character;
