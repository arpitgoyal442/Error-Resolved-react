import React, {useEffect, useState, useRef, useMemo} from 'react';

// if(window)
//   import JoditEditor from "jodit-react";

const Example = () => {
	const editor = useRef(null)
	const [content, setContent] = useState('')

	const config = useMemo({
		readonly: false ,
		placeholder:'Start typings...'
	}, [placeholder])

  useEffect(() => {
    
  }, [])

	return (
    //         <JoditEditor
    //         	ref={editor}
    //             value={content}
    //             config={config}
		// tabIndex={1} // tabIndex of textarea
		// onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
    //             onChange={newContent => {}}
    //         />

          <div></div>
        )
}


export default Example;