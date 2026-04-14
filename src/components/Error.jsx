import React from 'react'
import { useSelector } from 'react-redux'

function Error() {
  const {showerr,error}=useSelector(state=>state.error)

  return showerr?(
    <div>
      {error}
    </div>
  ):(<>
  </>)
}

export default Error
