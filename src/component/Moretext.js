import React from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useState, useEffect } from 'react';
import "./Moretext.css"

const Moretext = () => {
    const { postId } = useParams();
    const [postData, setPostData] = useState({});
    const [postText, setPostText] = useState();

    useEffect(() => {
        const getPostData = async () => {
            const postRef = doc(db, "posts", postId); // ドキュメントの参照を作成
            const docSnap = await getDoc(postRef); // ドキュメントのデータを取得
            if (docSnap.exists()) {
                setPostData(docSnap.data());
                console.log(docSnap.data());
            } else {
                console.log("Document not found");
            }
        };

        getPostData();
    }, []);

    const initialLiked = localStorage.getItem(postId) === 'true';
    const [liked, setLiked] = useState(initialLiked);
  
    const handleLikeClick = () => {
      const newLiked = !liked;
      setLiked(newLiked);
      localStorage.setItem(postId, newLiked);
    };
  
    useEffect(() => {
      localStorage.setItem(postId, liked);
    }, [liked]);

    const createCommentPost = async () => {
        try {
            // addDocの処理を行う
            await addDoc(collection(db, "comment", postId), {
                postText: postText,  // ここではresponseTextを使う
                author: {
                    username: auth.currentUser.displayName,
                    id: auth.currentUser.uid
                }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };
  

    return (
        <div className="allMoreText">
            <div className="moreText">
            <div className="moreTitle">
                <h2>{postData.title}</h2>
            </div>
            <div className="morePostText">
                <p>{postData.postText}</p>
            </div>
            <div className="like-button-container">
                <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                    {liked ? '良問！！' : '良問'}
                </button>
                <p className="like-count">{liked ? '1人が良問判定しました' : 'まだ誰も良問判定していません'}</p>
            </div>
            </div>
            <h3>コメント</h3>
            <div className="commentPost">
                <textarea className="commentTextArea"　placeholder="コメントを記入" onChange={(e) => setPostText(e.target.value)}></textarea>
                <button className="commentSubmit" onClick={createCommentPost}>コメントの提出</button>
            </div>
        </div>
    );
};

export default Moretext;

