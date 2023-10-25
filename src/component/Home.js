import React, { useState } from "react";
import "./Home.css";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [postList, setPostList] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(collection(db, "posts"));
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPosts();
    }, [])

    // 詳細ボタンがクリックされたときの処理
    const handleDetailClick = (postId) => {
        navigate(`/motetext/${postId}`);  // /motetext/:postId に遷移
    };

    return (    
        <div className="homePage">
            {postList.map((post, index) => {  // indexを受け取る
                return(
                    <div className="postContents" key={post.id}>
                        <div className="postHeader">
                            <h1>{post.title}</h1>  {/* indexを表示 */}
                        </div>
        
                        <div className="postTextContainer">
                            {post.postText}
                        </div>
                        <div className="nameAndDeleteButton">
                            <h3>作問者 {post.author.username}</h3>
                            <button onClick={() => handleDetailClick(post.id)}>詳細</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default Home;
