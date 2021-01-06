import React,{useState, useRef} from "react";
import "./ImageCrop.scss";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCrop = (props) => {
  const [crop, setCrop] = useState(props.crop);
  const [croppedImageUrl, setCroppedImageUrl] = useState();
  const [imageRef, setImageRef] = useState(props.imageRef);

  async function makeClientCrop(tempCrop) {
    if (imageRef.height && tempCrop.width && tempCrop.height) {
      const croppedImage = await getCroppedImg(
        imageRef,
        tempCrop
      );
      setCroppedImageUrl(croppedImage);
    }
  }
  function getCroppedImg(image, tempCrop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = tempCrop.width;
    canvas.height = tempCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      tempCrop.x * scaleX,
      tempCrop.y * scaleY,
      tempCrop.width * scaleX,
      tempCrop.height * scaleY,
      0,
      0,
      tempCrop.width,
      tempCrop.height
    );
    

    return new Promise((resolve, reject) => {
      // canvas.toBlob((blob) => {
      //   if (!blob) {
      //     //reject(new Error('Canvas is empty'));
      //     console.error("Canvas is empty");
      //     return;
      //   }
      //   blob.name = fileName;
      //   window.URL.revokeObjectURL(fileUrl);
      //   fileUrl = window.URL.createObjectURL(blob);
      //   resolve(fileUrl);
      // }, "image/jpeg");
      let src = canvas.toDataURL();
      if(src){
        setCroppedImageUrl(src);
      }
    });
  }

  const onCropComplete = (tempCrop) => {
    makeClientCrop(tempCrop);
  };

  const onCropChange = (tempCrop, percentCrop) => {
    setCrop(tempCrop);
  };

  const save = ()=>{
    props.save(croppedImageUrl);
  }
  function onImageLoaded(image){
    if(image)
      setImageRef(image);
  };

  return (
    <div className="image-crop-container">
      <div className="image-crop-wrapper">
        {
          props.src && (
            <ReactCrop
              src={props.src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
          )
        }
      </div>
      <div className="buttons">
        <button onClick={props.cancel}>Cancel</button>
        <button onClick={save}>Save</button>
      </div>
    </div>
  );
};

export default ImageCrop;
