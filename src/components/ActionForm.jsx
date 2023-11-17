import { useState } from "react";
import uuid from "react-uuid";

import setPosition from "../utils/SetPosition.jsx";
import CaptureButton from "./CaptureButton.jsx";
import ShareButton from "./ShareButton.jsx";

function ActionForm({ characters, setCharacters, updatePointsPositions }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setCharacters(
        setPosition([...characters, { name: inputValue.trim(), id: uuid() }])
      );

      setInputValue("");
    }
  };

  const handleInputOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="action-form">
      <div>
        <input
          className="add-input-field"
          value={inputValue}
          onChange={handleInputOnChange}
          onKeyDown={handleInputKeyDown}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <CaptureButton />
      <ShareButton characters={characters} />
      {/* <a href="https://www.buymeacoffee.com/citrate">
        <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=citrate&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00" />
      </a> */}
    </div>
  );
}

export default ActionForm;
