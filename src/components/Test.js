import { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from "draft-js";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Modifier } from "draft-js";

const BLOCK_TYPES = [
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];
var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const CodeEditor = ({setCodeEditing, setCodeString, editorState, setEditorState}) => {
  useEffect(() => {
    if(!editorState)
      setEditorState(EditorState.createEmpty());
  }, [])

  const handleChange = (e) => {
    setEditorState(e);
    const blocks = convertToRaw(e.getCurrentContent()).blocks;
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    setCodeString(value)
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
    }
  }

  const toggleBlockType = (blockType) => {
    setEditorState(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  }
  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  }
  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  const handleTab = (e) => {
    const tabCharacter = "    ";
    e.preventDefault();

    let currentState = editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );
      setEditorState(EditorState.push(currentState, newContentState, 'insert-characters'))
  }
  return (
    <div className="relative h-full flex flex-col">  
    <CheckCircleIcon onClick={() => setCodeEditing(false)} className='absolute h-9 w-9 top-2 right-2 z-50 rounded-full cursor-pointer' /> 
    <div className="flex justify-center space-x-4 bg-gray-100">
    <BlockStyleControls
      editorState={editorState}
      onToggle={toggleBlockType} />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      </div>
      <div className="p-2 flex-1">
      <Editor onTab={handleTab} keyBindingFn={mapKeyToEditorCommand} style={{backgroundColor: "#ab321a"}} className="bg-red-500" placeholder="Your code here..." editorState={editorState} onChange={handleChange} handleKeyCommand={handleKeyCommand} />
      </div>
    </div>
  )
}

export default CodeEditor

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState?.getSelection();
  const blockType = editorState?.getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls inline">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
}

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState?.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls inline">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle?.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const StyleButton = (props) => {

  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };


  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );

}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}