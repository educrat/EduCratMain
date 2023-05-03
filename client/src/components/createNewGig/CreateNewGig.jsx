import './CreateNewGig.css'
import { BiPlusCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';

const CreateNewGig = () => {
    return (
        <Link to={"/create-new-gig"} className="new_gig_link">
            <div className='create_new_gig_section'>
                {/* <div> */}
                <div><BiPlusCircle size={25} /> </div>
                <div>Create New Gig</div>
                {/* </div> */}
            </div>
        </Link>
    )
}

export default CreateNewGig