import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = ({ isAuth }) => {
    const [title, setTitle] = useState();
    const [postText, setPostText] = useState();
    const [responseText, setResponseText] = useState("");  // 返答を格納するstate

    const navigate = useNavigate();

    const createPost = async () => {
        try {
            // 投稿後に返答を取得
            const response = await axios.post('http://localhost:5000/message', {
                text: postText
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

    const redirectToImagePost = () => {
        navigate("/imgpost"); // 別のページへ移動
    }


    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="createPostPage">
            <div className="postContainer">
                <h1>過去問を入力する</h1>
                <div className="inputPost">
                    <div>分野</div>
                    <input type="text" placeholder="分野を記入" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="inputPost">
                    <div>過去問</div>
                    <textarea placeholder="過去問を記入" onChange={(e) => setPostText(e.target.value)}></textarea>
                </div>
                <button className="postButton" onClick={createPost}>投稿</button>
                <button className="imgButton" onClick={redirectToImagePost}>写真で投稿</button>
            </div>
        </div>
    );
};

export default CreatePost;
