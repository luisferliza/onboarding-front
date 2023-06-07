import { putToS3, uploadImageURL } from "../Api/files.api";
import { getFileType } from "../Utils/utilities";

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export default MyCustomUploadAdapterPlugin;

class MyUploadAdapter {
  constructor(props) {
    this.loader = props;    
  }

  // Starts the upload process.
  async upload() {
    return new Promise(async (resolve, reject) => {
      try {
        this.loader.file.then(async (file) => {
          const { type, ext } = getFileType(file);
          const fileName = `${new Date().getTime()}.${ext}`;
          const {status, body} = await uploadImageURL({ fileName, type, ext });
          if (status !== 200) {
            throw new Error("Error al solicitad el presigned URL");
          }          
          const result = await putToS3(file, body.url, file.type);
          if (result) {
            resolve({ default: body.url.split("?")[0] });
          } else {
            throw new Error("Error al cargar el archivo a S3");
          }
        });
      } catch (error) {
        console.error(error);
        reject({ error });
      }
    });
  }
}
