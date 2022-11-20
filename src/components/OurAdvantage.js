import React from 'react'
import { Icon } from '@iconify/react';

function OurAdvantage({title,icon,para}) {
  return (
    <div className='advantage'>

         <span className='advantage_header'>

        <h1>{title}</h1>
        <span className='advantage_icon'>
        <Icon className='myic' icon={icon} color="white"  width="50" height="50" />
        </span>
      
        </span>

        <p>{para}</p>
      
    </div>
  )
}

export default OurAdvantage
