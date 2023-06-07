import React from "react";
import { toast } from "react-toastify";
import {
  putToS3,
  getPresignedUrl,
  getFilePresignedUrl,
  getFileAsBlob,
} from "../Api/files.api";
import { NodoContext } from "../Context/nodoContext";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Divider, Fab, IconButton, Tooltip } from "@mui/material";
import { createFile, getFiles } from "../Api/vistaInforme.api";
import { useEffect } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export function FileUpload({ tabId, informeId, autenticado, aumentarContador }) {
  const filesRef = React.useRef(null);
  const { setLoading, setLoadingMessage } = React.useContext(NodoContext);
  const [files, setFiles] = React.useState([]);

  useEffect(() => {
    if (tabId && informeId) {
      updateFiles();
    }
  }, [tabId, informeId]);

  function updateFiles() {
    getFiles(informeId, tabId).then((response) => {
      if (response.status === 200) {
        const fileNames = response.body.map((file) => file.Medium);
        setFiles(fileNames);
      } else {
        toast.error("Error al recuperar los archivos");
      }
    });
  }

  function getFileType(file) {
    return { type: file.type.split("/")[0], format: file.type.split("/")[1] };
  }

  async function askForPresignedUrl({ name, type, format }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await getPresignedUrl({ name, type, format });
        if (response.status !== 200) {
          toast.error(`Error uploading ${name}`);
          reject();
        }
        resolve({ url: response.body.url, key: response.body.key });
      } catch (error) {
        reject(error);
      }
    });
  }

  async function uploadFileToS3(file, url) {
    return new Promise(async (resolve, reject) => {
      try {
        const uploadSuccess = await putToS3(file, url, file.type);
        if (!uploadSuccess) {
          toast.error(`Error uploading ${file.name}`);
          reject();
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function getUploadPercentage(uploadResponses, files) {
    return ((uploadResponses.length / files.length) * 100).toFixed(0) + "%";
  }

  function filesAreSelected(files) {
    return files.length !== 0;
  }

  function getFileMetadata(internalFileName, visibleFileName) {
    return {
      internalFileName,
      visibleFileName,
      informeId,
      tabId,
    };
  }

  function checkForCompleted(uploadResponses, files) {
    if (uploadResponses.length === files.length) {
      toast.success(
        `Se cargaron correctamente ${
          uploadResponses.filter(Boolean).length
        } archivos!`
      );
      aumentarContador(files.length, tabId);
      handleFilesUploaded();
    }
  }

  async function uploadFiles() {
    console.log({ tabId });
    const files = filesRef.current.files;
    if (!filesAreSelected(files)) {
      return toast.error("Please first choose the file(s)...");
    }
    const uploadResponses = [];
    setLoading(true);
    for (let t = 0; t < files.length; t++) {
      const file = files[t];
      try {
        const { type, format } = getFileType(file);
        const { url, key } = await askForPresignedUrl({
          name: file.name,
          type,
          format,
        });
        await uploadFileToS3(file, url);        
        await createFile(getFileMetadata(key, file.name));
        uploadResponses.push(true);
        setLoadingMessage(getUploadPercentage(uploadResponses, files));
        checkForCompleted(uploadResponses, files);
      } catch (error) {
        toast.error("Error uploading ", file.name);
        console.error(error);
        uploadResponses.push(false);
        continue;
      }
    }
  }

  async function handleFilesUploaded(filesMetadata) {
    try {
      updateFiles();
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error, por favor intente nuevamente");
    }
  }

  async function download({ visibleFileName, internalFileName }) {
    try {
      const response = await getFilePresignedUrl(internalFileName);
      if (response.status !== 200) {
        return toast.error(response.message);
      }
      const blob = await getFileAsBlob(response.body.url);
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;
      a.style = "display: none";
      a.download = visibleFileName;
      document.body.appendChild(a);
      a.click();
    } catch (error) {
      toast.error("Ocurrió un error al intentar descargar el archivo");
    }
  }

  return (
    <div>
      {files.map((archivo) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "100%",
              }}
            >
              <div style={{ maxWidth: "300px" }}>
                <b
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    download({
                      visibleFileName: archivo.visibleFileName,
                      internalFileName: archivo.internalFileName,
                    });
                  }}
                >
                  {archivo.visibleFileName}
                </b>
              </div>

              <Tooltip title="Descargar">
                <IconButton
                  onClick={() => {
                    download({
                      visibleFileName: archivo.visibleFileName,
                      internalFileName: archivo.internalFileName,
                    });
                  }}
                >
                  <FileDownloadIcon sx={{ color: "#aebd36" }} />
                </IconButton>
              </Tooltip>
            </div>

            <div style={{ width: "100%", justifyContent: "center" }}>
              <Divider sx={{ width: "96%", marginLeft: "2%" }} />
            </div>
          </>
        );
      })}
      {autenticado && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => filesRef.current.click()}
          //onClick={() => console.log({tabId})}
          size="small"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
        >
          <input
            ref={filesRef}
            type="file"
            name="myfile"
            onChange={uploadFiles}
            multiple
            style={{ visibility: "hidden", width: 0, height: 0 }}
          />
          <FileUploadIcon />
        </Fab>
      )}
    </div>
  );
}
