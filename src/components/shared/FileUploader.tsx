import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState([]); ///////////////
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".svg", ".jpeg", ".jpg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex  flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5">
            <img src={fileUrl} alt="Image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img src="/drag-and-drop.png" alt="drop" width={96} height={77} />
          <h3 className="base-medium text-light-2 mb-2 mt-5">
            Drag your Photos here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG,PNG,JPG</p>
          <Button className="shad-button_dark_4">
            Select from your device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
