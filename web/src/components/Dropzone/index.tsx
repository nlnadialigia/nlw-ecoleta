import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {FiUpload} from "react-icons/fi";
import "./styles.css";

interface Props {
  onFileUploaded: (file: File) => void
}


const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
  const [selectFileUrl, setSelectedFileUrl] = useState("")

  const onDrop = useCallback((acceptedFiles: any )=> {
    const file = acceptedFiles[0]

    const fileUrl = URL.createObjectURL(file)

    setSelectedFileUrl(fileUrl)
    onFileUploaded(file)
  }, [onFileUploaded])
  
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {"image/*": []}
  })

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} accept="image/*" />
      {
        selectFileUrl
          ? <img src={selectFileUrl} alt="Imagem do estabelecimento"></img>
          : <p><FiUpload />Imagem do estabelecimento</p>
      }
    </div>
  )
}


export {Dropzone};
