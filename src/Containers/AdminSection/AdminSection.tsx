import React, { useEffect, useRef, useState } from "react";
import { Editor } from "../../Components/Editor/Editor";
import ImageCrop from "../../Components/ImageCrop/ImageCrop";
import "./AdminSection.scss";

const AdminSection: React.FC = () => {
  const [blogState, setBlogState] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Technology"); //Temporarily Hard Coded. Later have to be pulled from the list
  const [mainImage, setMainImage] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const handleBlogChange = (editor: any) => {
    setBlogState(editor);
  };
  const [tempSrc,setTempSrc] = useState<string>();
  const imageRef = useRef<HTMLImageElement>();
  const [crop,setCrop] = useState<any>({
    unit: '%',
    width: 30,
    aspect: 2 / 1,
  });
  const [cropping,setCropping] = useState("");
  const checkInputImageAuthor = (event: any) => {
    var reader = new FileReader();
    //Read the contents of Image File.
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (e: any) {
      //Initiate the JavaScript Image object.
      var image = new Image();

      //Set the Base64 string return from FileReader as source.
      image.src = e.target.result;

      //Validate the File Height and Width.
      image.onload = function () {
        var height = image.height;
        var width = image.width;
        if (height < 50 || width < 50) {
          alert("Height and Width must not be less than 50px.");
          return false;
        } 
        // else if (width / height !== 1) {
        //   alert("Ratio must be 1:1");
        //   return false;
        // }
        // setAuthorImage(e.target.result);
        imageRef.current = image;
        setTempSrc(image.src);
        setCrop({...crop, aspect:1/1});
        setCropping("author");
        return true;
      };
    };
  };
  const checkInputImageMain = (event: any) => {
    var reader = new FileReader();
    //Read the contents of Image File.
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (e: any) {
      //Initiate the JavaScript Image object.
      var image = new Image();

      //Set the Base64 string return from FileReader as source.
      image.src = e.target.result;

      //Validate the File Height and Width.
      image.onload = function () {
        var height = image.height;
        var width = image.width;
        if (height < 320 || width < 640) {
          alert(
            "Height and Width must not be less than 320px and 640px respectively."
          );
          return false;
        } 
        // else if (width / height !== 2) {
        //   alert("Ratio must be 2:1");
        //   return false;
        // }
        // console.log(e.target.result);
        // setMainImage(e.target.result);
        // return true;
        imageRef.current = image;
        setTempSrc(image.src);
        setCrop({...crop, aspect:2/1});
        setCropping("main");
        return true;
      };
    };
  };
  function handleSubmit(e:any){
    if(!mainImage || mainImage === ''){
      alert("Main Image is required");
    }
    else{
      e.preventDefault();
      e.stopPropagation();
      let exportObj = {
        author:author,
        author_icon:authorImage,
        img:mainImage,
        title:title,
        tag:category,
        createdAt:new Date(),
        html:String(blogState)
      }
      downloadObjectAsJson(exportObj,"testBlog"); //TODO:Used to download the json later this object can be sent to backend to create a blog
    }
  }
  //TODO:Function to download the json object(Only for testing purposes)
  function downloadObjectAsJson(exportObj:any, exportName:string){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  useEffect(()=>{
    window.scrollTo({top:0});
  },[])
  return (
    <div className="admin-section">
      <form action="">
        <fieldset>
          <legend>Blog Details</legend>
          <div className="row">
            <div className="col-25">
              <label htmlFor="title" className="required">
                Title(max 200 characters):
              </label>
            </div>
            <div className="col-75">
              <textarea
                name="title"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
              />
              <span className="length">{200 - title.length}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="name" className="required">
                Author Name:
              </label>
            </div>
            <div className="col-75">
              <textarea
                name="name"
                id="name"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={30}
              />
              <span className="length">{30 - author.length}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="category" className="required">
                Tag(Category):
              </label>
            </div>
            <div className="col-75">
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Technology">Technology</option>
                <option value="Fashion">Fashion</option>
                <option value="Science">Science</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="mainImage" className="required">
                Upload Main Image:
              </label>
            </div>
            <div className="col-75">
              <p>
                Images should be at least 640×320px (1280×640px for best
                display). Should be in 2:1 ratio.
              </p>
              <div className="blog-main-image-container">
                <div className="blog-main-image-wrapper">
                  <div
                    className="blog-main-image"
                    style={{ backgroundImage: `url(${mainImage})` }}
                  ></div>
                </div>
                <label htmlFor="mainImage" className="file">
                  Choose Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="mainImage"
                  id="mainImage"
                  required
                  onInput={(e) => checkInputImageMain(e)}
                  hidden
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="authorImage">Upload Author Image:</label>
            </div>
            <div className="col-75">
              <p>
                Images should be at least 50×50px (200 * 200px for best
                display). Should be in 1:1 ratio.
              </p>
              <div className="author-image-container">
                <div className="author-image-wrapper">
                  <div
                    className="author-image"
                    style={{ backgroundImage: `url(${authorImage})` }}
                  ></div>
                </div>
                <label htmlFor="authorImage" className="file">
                  Choose Image
                </label>
                {authorImage && authorImage !== "" ? (
                  <button
                    className="remove"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setAuthorImage("");
                    }}
                  >
                    Remove Image
                  </button>
                ) : null}
                <input
                  type="file"
                  accept="image/*"
                  name="authorImage"
                  id="authorImage"
                  onInput={(e) => checkInputImageAuthor(e)}
                  hidden
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="editor-container">
            <h3>Blog</h3>
            <Editor state={blogState} change={handleBlogChange}></Editor>
          </div>
          <input type="submit" value="Submit" onClick={handleSubmit}/>
        </fieldset>
      </form>
      {
        cropping === "main"?
        <ImageCrop src={tempSrc} crop={crop} imageRef={imageRef.current} save={(val:string)=>{setMainImage(val); setCropping("")}} cancel={()=>setCropping("")}/>
        :null
      }
      {
        cropping === "author"?
        <ImageCrop src={tempSrc} crop={crop} imageRef={imageRef.current} save={(val:string)=>{setAuthorImage(val); setCropping("")}} cancel={()=>setCropping("")}/>
        :null
      }
    </div>
  );
};

export default AdminSection;
