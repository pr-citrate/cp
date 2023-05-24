import { useState, useRef, useEffect, useContext } from 'react';

import { stylesContext } from '../utils/StylesWrapper';

function Character({
  characters,
  id,
  handleDelete,
  relations,
  setRelations,
  selected,
  setSelected,
  prevRelationsLength,
  setPrevRelationsLength,
}) {
  const styles = useContext(stylesContext);
  const character = characters.find((obj) => obj.id === id);
  const contextRef = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const [showContext, setShowContext] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onHighlight, setOnHighlight] = useState(false);

  const handleClick = () => {
    if (selected === null) {
      setSelected(character.id);
    } else if (selected === character.id) {
      setSelected(null);
    } else {
      setPrevRelationsLength(relations.length);
      setRelations([...relations, { left: selected, right: character.id }]);
      setSelected(null);
    }
  };

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
    const handleClickError = (event) => {
      if (
        showContext &&
        (event.button === 0 || event.button === 2) &&
        !contextRef?.current.contains(event.target)
      ) {
        setShowContext(false);
      } else if (
        !showContext &&
        (event.button === 0 || event.button === 2) &&
        !buttonRef?.current.contains(event.target)
      ) {
        for (const btn of document.querySelectorAll('.character')) {
          if (btn.contains(event.target)) return;
        }
        setSelected(null);
      }
    };

    document.addEventListener('mousedown', handleClickError);
    inputRef.current.value = character.name;

    return () => {
      document.removeEventListener('mousedown', handleClickError);
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
        ref={buttonRef}
        className={`character fadein
          ${onHighlight ? 'highlight' : ''}
          ${selected === character.id ? 'selected' : ''}`}
        style={{
          top: character.yPos + 'px',
          left: character.xPos + 'px',
          ...styles.character,
        }}
        onClick={handleClick}
      >
        <input
          className={`name`}
          style={styles.name}
          ref={inputRef}
          disabled={onEdit ? false : true}
        ></input>
      </button>
      <div
        className={`context-menu-container`}
        ref={contextRef}
        style={{
          display: showContext ? 'flex' : 'none',
          ...styles.contextMenuContainer,
        }}
      >
        <button
          style={styles.contextMenu}
          className={`context-menu`}
          onClick={() => handleDelete(character.id)}
        >
          delete
        </button>
        <button
          className={`context-menu`}
          style={styles.contextMenu}
          onClick={handleHighlight}
        >
          {onHighlight ? 'cancel highlighting' : 'highlight'}
        </button>
        <button
          className={`context-menu`}
          style={styles.contextMenu}
          onClick={handleEdit}
        >
          edit
        </button>
      </div>
    </div>
  );
}

export default Character;
