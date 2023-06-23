import { memo, useContext, useState } from 'react';
import preventRightClick from '../utils/preventRightClick';
import setPosition from '../utils/setPosition';
import { stylesContext } from '../utils/StylesWrapper';
import Arrows from './Arrows';
import Character from './Character';

const MemoizedCharacter = memo(Character);

function Main({ characters, setCharacters }) {
  const [relations, setRelations] = useState([]);
  const [selected, setSelected] = useState(null);
  const styles = useContext(stylesContext);
  const handleDelete = (id) => {
    setCharacters(
      setPosition(
        characters.filter((character) => {
          return character.id !== id;
        })
      )
    );
    console.log(
      'debug',
      relations.filter((rels) =>
        rels.some((rel) => rel.left !== id && rel.right !== id)
      )
    );

    setRelations(
      relations.filter((rels) =>
        rels.some((rel) => rel.left !== id && rel.right !== id)
      )
    );
  };

  return (
    <div className={`container`} style={styles.container}>
      <div className={`header`} style={styles.header}>
        header
      </div>
      <div
        className={`main`}
        style={styles.main}
        onContextMenu={preventRightClick}
      >
        {characters.map((character) => (
          <MemoizedCharacter
            characters={characters}
            handleDelete={handleDelete}
            id={character.id}
            key={character.id}
            relations={relations}
            selected={selected}
            setCharacters={setCharacters}
            setRelations={setRelations}
            setSelected={setSelected}
          />
        ))}
        <Arrows
          characters={characters}
          relations={relations}
          setCharacters={setCharacters}
        />
      </div>
      <div className={`footer`} style={styles.footer}>
        footer
      </div>
    </div>
  );
}

export default Main;
