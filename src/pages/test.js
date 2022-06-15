import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { PencilIcon } from "@heroicons/react/solid"

const Example = ({setCodeEditing, codeString}) => {
  return (
    <div className="relative h-full">
    <PencilIcon onClick={() => setCodeEditing(true)} className='absolute h-8 w-8 top-2 right-2 z-50 bg-white rounded-full p-1 cursor-pointer' />
    <SyntaxHighlighter showLineNumbers className="h-full rounded-b-md" language="c++" style={vs2015}>
      {codeString}
    </SyntaxHighlighter>
    </div>
  )
}

export default Example
