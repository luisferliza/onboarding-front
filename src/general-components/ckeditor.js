import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from 'ilu-ck-editor/build/ckeditor';
import MyCustomUploadAdapterPlugin from "../Custom/MyUploadAdapterPlugin";
import "./editor.css";

export default function ckEditor({ value, setValue, titulo }) {
  const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
    resizeOptions: [
      {
        name: "resizeImage:original",
        value: null,
        label: "Original",
      },
      {
        name: "resizeImage:40",
        value: "40",
        label: "40%",
      },
      {
        name: "resizeImage:60",
        value: "60",
        label: "60%",
      },
    ],
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        'fontSize',
        'fontBackgroundColor',
        'fontColor',
        "|",
        "blockQuote",
        "insertTable",
        "|",
        "imageUpload",
        "undo",
        "redo",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    }
  };

  return (
    <div className="editor">
      <label>{titulo}</label>
      <CKEditor
        editor={CustomEditor}
        data={value}
        config={custom_config}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(data);          
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
}
