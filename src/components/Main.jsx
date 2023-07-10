import { memo, useContext, useState } from 'react';
import preventRightClick from '../utils/preventRightClick';
import setPosition from '../utils/setPosition';
import { designContext } from '../utils/DesignWrapper';
import Arrows from './Arrows';
import Character from './Character';

const MemoizedCharacter = memo(Character);

function Main({ characters, setCharacters }) {
  const [relations, setRelations] = useState([]);
  const [selected, setSelected] = useState(null);
  const design = useContext(designContext);
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
    <div className={`container`} style={design?.container}>
      <div className={`header`} style={design?.header}>
        <h2
          className='title'
          style={{
            fontFamily: design?.title?.font,
            color: design?.title?.color,
          }}
        >
          {design?.title?.text}
        </h2>
        <h3
          className='subtitle'
          style={{
            fontFamily: design?.subtitle?.font,
            color: design?.subtitle?.color,
          }}
        >
          {design?.subtitle?.text}
        </h3>
      </div>
      <div
        className={`main`}
        style={design?.main}
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
      <div className={`footer`} style={design?.footer}>
        <h6 className='dev'>@k_plks</h6>
      </div>
    </div>
  );
}

export default Main;
