import React, { forwardRef } from 'react'
import {} from "react-hook-form"
import {Editor} from "@tinymce/tinymce-react"
import { Controller } from 'react-hook-form'


export default function({control,name,defaultValue=""}){
    return (
    
      <Controller
      name={name||"content"}
      control={control}
      render={({field:{onChange,value}})=>{
     
      return <Editor
          apiKey='2voaxteh3ds66vhe2cqyz1vv8ooaf7faz1vi66p5272fud4h'
          initialValue={defaultValue.props?.children||""}
          onEditorChange={onChange}
        init={{
              height: 500,
              menubar: false,
          plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'help',
          'wordcount'
        ],
        toolbar:
          'undo redo | blocks | bold italic underline | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist | link image media | code fullscreen',
      }}
      />
      }}
      />
      
      
  )
}





