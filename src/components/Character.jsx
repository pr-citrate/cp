import styles from './../styles/Character.module.css';
import { useState } from 'react';
import CharacterContextMenu from './CharacterContextMenu';

function Character({ characters, id }) {
  const character = characters.find((obj) => obj.id === id);

  const [menuPosition, setMenuPosition] = useState(null);

  function handleContextMenu(event) {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
  }

  function handleMenuClick(action) {
    switch (action) {
      case 'delete':
        // 삭제 로직
        console.log('delete');
        break;
      case 'highlight':
        // 강조 로직
        break;
      case 'edit':
        // 수정 로직
        break;
      default:
        break;
    }
    setMenuPosition(null);
  }

  function handleCloseMenu() {
    setMenuPosition(null);
  }
  return (
    <div onContextMenu={handleContextMenu}>
      <button
        className={styles.character}
        style={{ top: character.yPos + 'px', left: character.xPos + 'px' }}
      >
        {character.name}
      </button>
      {menuPosition && (
        <CharacterContextMenu
          x={menuPosition.x}
          y={menuPosition.y}
          items={[
            { label: 'Delete', action: 'delete' },
            { label: 'Highlight', action: 'highlight' },
            { label: 'Edit', action: 'edit' },
          ]}
          onClose={handleCloseMenu}
          onItemClick={handleMenuClick}
        />
      )}
    </div>
  );
}

export default Character;
