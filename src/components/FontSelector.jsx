import { useState } from "react";
import uuid from "react-uuid";

function FontSelector({ register }) {
  const [selectedFont, setSelectedFont] = useState("Arial");
  const data = [
    "Arial",
    "Arial Black",
    "EBS훈민정음",
    "Kotra Bold",
    "건축조각체",
    "기후위기",
    "길벗",
    "램체",
    "영도바다체",
    "인천교육자람체",
    "태백은하수체",
    "평창평화체",
    "학교안심우주",
    "한글재민체",
  ];
  return (
    <select
      {...register}
      onChange={(e) => {
        register.onChange(e);
        setSelectedFont(e.target.value);
      }}
      value={selectedFont}
      style={{ fontFamily: selectedFont }}
    >
      {data.map((datum) => (
        <option key={uuid()} value={datum} style={{ fontFamily: datum }}>
          {datum}
        </option>
      ))}
    </select>
  );
}

export default FontSelector;
