import React, { useState } from 'react'
import './ImageUpload.css'
const ImageUpload = ({ imgNo, setImagesArr, uploadImage, cloudnaryImages }) => {
    const [image, setImage] = useState();
    const [renderImage, setRenderImage] = useState();

    const insert = (arr, index, ...newItems) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted items
        ...newItems,
        // part of the array after the specified index
        ...arr.slice(index)
    ]

    const onImgUpload = async (e) => {
        await setImage(e.target.files[0]);
        setImagesArr(prevArr => insert(prevArr, imgNo, e.target.files[0]));
        setRenderImage(URL.createObjectURL(e.target.files[0]));

        // upload image on input change
        uploadImage(e.target.files[0], imgNo);
    }

    return (
        <div className='image_upload_wrapper'>
            {/* {
                renderImage && <div className="file_upload_preview">
                    <img width={150} height={100} id={`file-ip-${imgNo}-preview`} src={renderImage} />
                </div>
            } */}
            {
                cloudnaryImages && <div className="file_upload_preview">
                    <img width={150} height={100} id={`file-ip-${imgNo}-preview`} src={cloudnaryImages[imgNo]} />
                </div>
            }
            <label for={`file-ip-${imgNo}`}>Upload</label>
            <input type="file" id={`file-ip-${imgNo}`} accept="image/*" onChange={(e) => onImgUpload(e)} />
        </div>
    )
}

export default ImageUpload;