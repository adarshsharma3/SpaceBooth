import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";


export default function RTE({name,control,label,defaultValue=""}){
return(
    <div className="w-full">
     {label && <label className="inline-block mb-1 pl-1">{label}</label>}
     
     <Controller
     name={name || "body"}
     control={control}
     render={({field:{onChange}})=>(
     <Editor
      apiKey='x1rp7c1ei3h00lv0ic8rmbmk1i4dzfxt87wijd0n2w048ozp'
     initialValue={defaultValue}
     init={{
        initialValue: defaultValue,
        height: 500,
        menubar: true,
        plugins: [
            "image",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "anchor",
        ],
        toolbar:
        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
    }}

    onEditorChange={onChange}
     /> 


)}
     />

    </div>
)

}