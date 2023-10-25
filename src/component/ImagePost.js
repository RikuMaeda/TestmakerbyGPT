import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ImagePost.css'

const ImagePost = ({ isAuth }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [title, setTitle] = useState();
  const [postText, setPostText] = useState();
  const [responseText, setResponseText] = useState("");  // 返答を格納するstate

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await axios.post("http://localhost:5000/img", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Image uploaded successfully.");
        console.log("OCR Text:", response.data.ocr_text);
        setOcrText(response.data.ocr_text);
        createPost(response.data.ocr_text)
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const createPost = async (sendText) => {
    try {
        // 投稿後に返答を取得
        const response = await axios.post('http://localhost:5000/message', {
            text: sendText
        });
        const responseData = response.data;
        console.log("Response from server:", responseData);
        
        // 返答をstateにセット
        setResponseText(responseData);

        // addDocの処理を行う
        await addDoc(collection(db, "posts"), {
            title: title,
            postText: responseData,  // ここではresponseTextを使う
            author: {
                username: auth.currentUser.displayName,
                id: auth.currentUser.uid
            }
        });

        navigate("/");
    } catch (error) {
        console.error("Error:", error);
    }
    };

    // useEffect(() => {
    //     if (!isAuth) {
    //         navigate("/login");
    //     }
    // }, []);

  return (
    <div className="ocrFile">
        <div className="inputPost">
            <div>分野</div>
            <textarea placeholder="分野を記入" onChange={(e) => setTitle(e.target.value)}></textarea>
        </div>        
        <div className="selectFile">
            <input type="file" onChange={handleFileChange} />
        </div>
        <div className="submitButton">
            <button onClick={handleUpload}>Upload</button>
        </div>
    </div>
  );
};

export default ImagePost;
