import React from 'react'
import FAButton from "./FAButton";

const UndoRedoButtons = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <FAButton iconName='arrow-left' onClick={onUndo} disabled={!canUndo} />
    <FAButton iconName='arrow-right' onClick={onRedo} disabled={!canRedo} />
  </p>
)

export default UndoRedoButtons;