import React from 'react'
import Luffy from '../image/Luffy.png'
function Logo({width='200px'}) {
  return (
    <img src={Luffy}alt="Logo" style={{ width: width }} />
  )
}

export default Logo