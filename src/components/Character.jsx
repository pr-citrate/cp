import { useContext, useEffect, useRef, useState } from 'react';

import setPosition from '../utils/setPosition';
import { stylesContext } from '../utils/StylesWrapper';
function Character({
  characters,
  handleDelete,
  id,
  relations,
  selected,
  setCharacters,
  setRelations,
  setSelected,
}) {
  const styles = useContext(stylesContext);
  const character = characters.find((obj) => obj.id === id);
  const contextRef = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const [showContext, setShowContext] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onHighlight, setOnHighlight] = useState(false);
  const [inputName, setInputName] = useState(character.name);

  const handleClick = () => {
    if (!onEdit) {
      if (selected === null) {
        // choosed as left
        setSelected(character.id);
      } else if (selected === character.id) {
        // double click
        setSelected(null);
      } else {
        // choosed as right

        // [
        //   [{ left: 'ch1', right: 'ch2' },
        //   { left: 'ch2', right: 'ch1' }],
        //   [{ left: 'ch1', right: 'ch4' }]
        // ]
        // console.log(
        //   relations.some((rels) => {
        //     console.log(rels);
        //     return rels.some(
        //       (rel) => rel.left === selected && rel.right === character.id
        //     );
        //   })
        // );
        const addNewRelations = (relations, relation) => {
          for (let i = 0; i < relations.length; i++) {
            const rels = relations[i];
            // having same characters
            if (
              rels.every(
                (rel) =>
                  (rel.left === relation.right &&
                    rel.right === relation.left) ||
                  (rel.right === relation.right && rel.left === relation.left)
              )
            ) {
              if (
                // not having relation
                rels.every(
                  (rel) =>
                    rel.left !== relation.left && rel.right !== relation.right
                )
              ) {
                relations[i] = [...relations[i], relation];
                return relations;
              } else {
                // have exactly same relation
                // delete relation
                if (relations[i].length === 1) {
                  relations.splice(i, 1);
                } else {
                  relations[i] = relations[i].filter(
                    (rel) =>
                      !(
                        rel.left === relation.left &&
                        rel.right === relation.right
                      )
                  );
                }
                return relations;
              }
            }
          }
          //not in list
          return [...relations, [relation]];
        };
        setRelations(
          addNewRelations(relations, { left: selected, right: character.id })
        );

        setSelected(null);
      }
    }
  };

  const handleEdit = () => {
    setOnEdit(true);
    setShowContext(false);
    setTimeout(() => {
      inputRef.current.select();
    }, 0);
  };
  const handleHighlight = () => {
    setOnHighlight(!onHighlight);
    setShowContext(false);
  };
  const handleNameChange = () => {
    if (inputName.trim() !== '') {
      setCharacters(
        setPosition(
          characters.map((obj) =>
            obj.id === character.id
              ? { name: inputName, id: character.id }
              : obj
          )
        )
      );
    }
    setOnEdit(false);
  };
  const handleUpdate = (event) => {
    setInputName(event.target.value);
  };
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleNameChange();
    }
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
          if (event.button === 0 && btn.contains(event.target)) return;
        }
        setSelected(null);
        setOnEdit(false);
      }
    };

    document.addEventListener('mousedown', handleClickError);

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
          disabled={onEdit ? false : true}
          onChange={handleUpdate}
          onKeyDown={handleEnter}
          ref={inputRef}
          style={styles.name}
          value={inputName}
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
          className={`context-menu`}
          onClick={() => handleDelete(character.id)}
          style={styles.contextMenu}
        >
          delete
        </button>
        <button
          className={`context-menu`}
          onClick={handleHighlight}
          style={styles.contextMenu}
        >
          {onHighlight ? 'cancel highlighting' : 'highlight'}
        </button>
        <button
          className={`context-menu`}
          onClick={handleEdit}
          style={styles.contextMenu}
        >
          edit
        </button>
      </div>
    </div>
  );
}

export default Character;
