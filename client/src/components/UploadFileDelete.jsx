import React, { useState } from 'react'
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:8000");

const UploadFileDelete = () => {
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    // socket.emit("join_room", "abcdxyz12345");

    // const socketFunc = async () => {
    //     await socket.emit("send_message", {name: "Parshuram Nikam", time: new Date()});
    // }

    const uploadImage = () => {
        // socketFunc()
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "educrat_preset")
        data.append("cloud_name", "educrat")
        fetch("https://api.cloudinary.com/v1_1/educrat/image/upload/", {
            method: "post",
            body: data
        }).then(resp => resp.json())
            .then(data => {
                console.log(data);
                setUrl(data.url)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>
                <button onClick={uploadImage}>Upload</button>
            </div>
            <div>
                <h1>Uploaded image will be displayed here</h1>
                <img src={url} />
            </div>
        </div>
    )
}

export default UploadFileDelete