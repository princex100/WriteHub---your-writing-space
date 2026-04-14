import { nanoid } from '@reduxjs/toolkit'
import React, { forwardRef } from 'react'

const forwardReff=forwardRef(({ type="text",
  placeholder="",
  label,
  ...props},ref)=>{

 const id=nanoid()

  return (
  <div className="flex flex-col space-y-2">
  <label
    htmlFor={id}
    className="text-sm font-medium text-gray-700"
  >
    {label}
  </label>

  <input
  {...props}
  ref={ref}
  type={type}
  id={id}
    placeholder={placeholder}
    className="w-full px-4 py-2 border border-gray-300 rounded-md 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 transition duration-200"
  />
</div>
  )
  })


export default forwardReff
