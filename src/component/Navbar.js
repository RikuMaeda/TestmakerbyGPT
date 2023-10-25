import React from "react";
import { Link } from "react-router-dom"
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faHouse, faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ isAuth }) => {
    return (    
    <nav>
        <div className="siteTitle">
            <h2>きみ過去問もってる？</h2>
        </div>
        <Link to='/'>
            <FontAwesomeIcon icon={faHouse} />
            ホーム</Link>
        {!isAuth ?  (
            <Link to='/login'>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            ログイン</Link>
        ) : (
            <>
            <Link to='/createpost'>
            <FontAwesomeIcon icon={faFilePen} />
                過去問投稿</Link>
            <Link to='/logout'>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            ログアウト</Link>
            </>
        )}
    </nav>
    );
};

export default Navbar;