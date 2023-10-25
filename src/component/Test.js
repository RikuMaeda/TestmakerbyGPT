import React, { useState, useEffect } from 'react';
import './Test.css'; // CSS ファイルをインポート

const LikeButtonWithLocalStorage = () => {
  const initialLiked = localStorage.getItem('liked') === 'true';
  const [liked, setLiked] = useState(initialLiked);

  const handleLikeClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    localStorage.setItem('liked', newLiked);
  };

  useEffect(() => {
    localStorage.setItem('liked', liked);
  }, [liked]);

  return (
    <div className="like-button-container">
      <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
        {liked ? 'いいね済み' : 'いいね'}
      </button>
      <p className="like-count">{liked ? '1人がいいねしました' : 'まだ誰もいいねしていません'}</p>
    </div>
  );
};

export default LikeButtonWithLocalStorage;
