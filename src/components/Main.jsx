import { memo, useContext, useState } from "react";
import c from "../constants/constants.jsx";
import { designContext } from "../utils/DesignWrapper.jsx";
import preventRightClick from "../utils/PreventRightClick.jsx";
import setPosition from "../utils/SetPosition.jsx";
import Arrows from "./Arrows.jsx";
import Character from "./Character.jsx";

function Main({ characters, setCharacters }) {
  const [relations, setRelations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [dragged, setDragged] = useState(null);
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
      "debug",
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
    <div
      className={`container`}
      style={{
        background: `${
          design?.background?.bgType === "color"
            ? design?.background?.color
            : design?.background?.bgType === "webimg"
            ? `center / cover url(${design?.background?.internalLink})`
            : design?.background?.bgType === "externalimg"
            ? `center / cover url(${design?.background?.externalLink})`
            : "white"
        }`,
        transform: `scale(${(window.innerWidth * 0.5) / c.imgWidth})`,
      }}
    >
      <div className={`header`} style={design?.header}>
        <h2
          className="title"
          style={{
            fontFamily: design?.title?.font,
            color: design?.title?.color,
            fontSize: design?.title?.size + "px",
          }}
        >
          {design?.title?.text}
        </h2>
        <h3
          className="subtitle"
          style={{
            fontFamily: design?.subtitle?.font,
            color: design?.subtitle?.color,
            fontSize: design?.subtitle?.size + "px",
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
          <Character
            characters={characters}
            handleDelete={handleDelete}
            id={character.id}
            key={character.id}
            relations={relations}
            selected={selected}
            setCharacters={setCharacters}
            setRelations={setRelations}
            setSelected={setSelected}
            dragged={dragged}
            setDragged={setDragged}
          />
        ))}
        <Arrows
          characters={characters}
          relations={relations}
          setCharacters={setCharacters}
          dragged={dragged}
        />
      </div>
      <div className={`footer`} style={design?.footer}>
        <h6 className="dev">@k_plks</h6>
      </div>
    </div>
  );
}

export default Main;
