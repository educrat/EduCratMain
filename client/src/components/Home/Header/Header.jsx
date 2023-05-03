import './Header.css';
import {Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className='home_header'>
                <div className="right_side">
                    <div className='header_title'>Learn with expert anytime anywhere</div>
                    <p>
                        Our mision is to help people to find the best tutor online and learn with expert anytime, anywhere.
                    </p>
                    <Link to={"/signup"}>
                    <button>Join EduCrat</button>

                    </Link>
                </div>
                <div className="left_side ">
                    <img  src="/images/hero-thumb1.jpg" alt="" />
                </div>
            </div>
        </>
    )
}

export default Header