import React from "react";
import { GrClose } from "react-icons/gr";

function SelectedItem({ text, itemId, removeItem }) {
  return (
    <li>
      {text}
      <button className="delete" onClick={() => removeItem(itemId)}>
        <GrClose />
      </button>
    </li>
  );
}

export default SelectedItem;
