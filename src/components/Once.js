import React, { useEffect } from 'react'

function Once() {

    useEffect(()=>{

        console.log("Mounted");





        return () => console.log("Cleanup..");
    },[])

  return (
    <div>
      Hey
    </div>
  )
}

export default Once
