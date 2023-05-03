import React, { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import './SearchBox.css'
import axios from "axios";
import { backendURL } from "../../data/vars";

const SearchBox = () => {
  let suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vechiles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to became Freelancer",
    "How to became Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
    
];
 
   const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);
  const [query, setQuery] = useState(null);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const searchRef = useRef(null);

  const searchOnClickListner = () => {
    
    if (query !== '') {
      navigate('/search?q=' + query);
    } else {
      alert("Please enter value");
    }
    setIsActive(false)
  }
  // if user press any key and release
  const onChangeHandler = (e)=>{
   
    let text=e.target.value
  let emptyArray;
  if(text.length>0){
    setQuery(text)
    if (e.key === 'Enter') {
      searchOnClickListner()
  }
  
      emptyArray = suggestions.filter((d)=>{
          return d.toLocaleLowerCase().startsWith(text.toLocaleLowerCase());
      });
     console.log(emptyArray)
      if(emptyArray.length>5){
        emptyArray= emptyArray.slice(0, 5);
      }
      setData(emptyArray)
      setIsActive(true); //show autocomplete box
     
  }
  else{
    setQuery(null)
    setIsActive(false); //hide autocomplete box

  }
}


const select = (item)=>{
  setQuery(item)
  setIsActive(false)
}

  useEffect(() => {
   console.log("gelo")
  }, []);
 
//   const onChangeHandler = (text) => {
//     setQuery(text)
//     let matches = []
//     if (text.length > 0) {
//     matches = data.filter(data => {
//     const regex = new RegExp(`${text}`, "gi");
//     setData(data.keyword.match(regex))
//     });
//   }
// }

const handleKeyDown = async(event) => {
  if (event.key === 'ArrowDown') {
    if (selectedIndex === null || selectedIndex === data.length - 1) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(selectedIndex + 1);
    }
  } else if (event.key === 'ArrowUp') {
    if (selectedIndex === null || selectedIndex === 0) {
      setSelectedIndex(data.length - 1);
    } else {
      setSelectedIndex(selectedIndex - 1);
    }
  }
  else if (event.key === 'Enter') {
    if (selectedIndex === null || (selectedIndex < data.length - 1 && selectedIndex >=0)) {
      setQuery(data[selectedIndex])
    
      
    } 
  }
};

  return (
    // <div className="searchBox">
    
    //   <input className="searchInput" type="text" name="" placeholder="What are you looking for today?"
    //     value={query} onChange={(e) => onChangeHandler(e.target.value)}
    //     onKeyPress={(e) => {
    //       if (e.keyCode === 13) {
    //         console.log("Enter key pressed");
    //       }
    //     }}
    //   />
    //   <button className="searchButton" href="#" onClick={searchOnClickListner}>
    //     <img src="./Images/Icons/search_icon1.png" height={24} width={24} alt="" />
    //   </button>
    // </div>
    <div class="wrapper">
      <div  className={isActive ? 'search-input active' : 'search-input'} id="search-input">
        <a href="" target="_blank" hidden></a>
        <input id="input" type="text" placeholder="Type to search.."
          value={query}
         onChange={(e) => onChangeHandler(e)}
         ref={searchRef} onKeyDown={handleKeyDown}
          />
        <div class="autocom-box">
          <ul  >
            { data ? data.map((item,index) =>(
              <li key={item} className={index === selectedIndex ? 'selected' : ''}
               onClick={() => select(item)} value={item}>{item}</li>)):
        <li></li>
      }
          </ul>
         
        </div>
        {/* <div class="icon"><i class="fas fa-search"></i></div> */}
        <button class="icon" href="#" onClick={searchOnClickListner}>
        <img src="./Images/Icons/search_icon1.png" height={24} width={24} alt="" />
     </button>
      </div>
    </div>
  );
};

export default SearchBox;
