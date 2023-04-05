import React from 'react';

function CharacterContextMenu({ x, y, items, onItemClick, onClose }) {
  const handleItemClick = (action) => {
    onItemClick(action);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '5px',
      }}
    >
      {items.map((item) => (
        <div key={item.action} onClick={() => handleItemClick(item.action)}>
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default CharacterContextMenu;
