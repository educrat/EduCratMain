import axios from "axios";
import React, { useCallback, useState, useContext, useEffect } from "react";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import { backendURL } from "../../data/vars";
import "./CreateNewGigPage.css";
import allCategories from "../../data/allCategories";
import AppUserContext from "../../context/AppUserContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const CreateNewGigPage = () => {
  const insert = (arr, index, ...newItems) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted items
    ...newItems,
    // part of the array after the specified index
    ...arr.slice(index + 1),
  ];

  const { appUser } = useContext(AppUserContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [paramsGig_id, setParamsGig_id] = useState(null);
  const [dbGigData, setDbGigData] = useState(null);

  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [video, setVideo] = useState();
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("NA");
  const [plan1, setPlan1] = useState("NA");

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");

  //add Prerequisites script
  const [certTitle2, setCertTitle2] = useState("");
  const [certArr2, setCertArr2] = useState([]);

  const addCertToArr2 = () => {
    if (certTitle2 === "") {
      return alert("Please fill the field");
    } else {
      setCertArr2((prevData) => [...prevData, certTitle2]);
      setCertTitle2("");
    }
  };

  const renderCert2 = () => {
    return certArr2.map((item, index) => (
      <div className="selected-fields2" key={`plan_${index + 1}`}>
        <div className="sel-fel">
          <div className="dot"></div> {item}
        </div>
        <button
          type="button"
          onClick={(e) => removeCertFromArr2(index)}
          className="delete-btn"
        >
          <img
            className="delete-img"
            src="https://cdn2.iconfinder.com/data/icons/250-perfect-vector-pictograms/48/9.4-1024.png"
            alt=""
          ></img>
        </button>
      </div>
    ));
  };

  const removeCertFromArr2 = (index) => {
    setCertArr2(certArr2.filter((element, index2) => index2 !== index));
  };

  //add For Whom script
  const [certTitle1, setCertTitle1] = useState("");
  const [certArr1, setCertArr1] = useState([]);

  const addCertToArr1 = () => {
    if (certTitle1 === "") {
      return alert("Please fill the field");
    } else {
      setCertArr1((prevData) => [...prevData, certTitle1]);
      setCertTitle1("");
    }
  };

  const arrToStr = (array) => {
    console.log(array.join(","));
    return array.join(", ");
  };

  useEffect(() => {
    if (searchParams.get("gig_id")) {
      setParamsGig_id(searchParams.get("gig_id"));
      console.log(searchParams.get("gig_id"));

      axios
        .get(backendURL + "/api/gig/" + searchParams.get("gig_id"))
        .then((res) => {
          console.log(res.data.gig);
          setDbGigData(res.data.gig);
          setTitle(res.data.gig.title);
          setSubtitle(res.data.gig.subtitle);
          setDesc(res.data.gig.desc);
          setCategory(arrToStr(res.data.gig.category));
          setKeywords(arrToStr(res.data.gig.keywords));
          setPlan1(res.data.gig.plan1);
          setCloundnaryImages(res.data.gig.images);
          setPricing(res.data.gig.pricing.actualPrice);
          setDiscount(res.data.gig.pricing.discount);
          setLanguage(res.data.gig.language);
          setLevel(res.data.gig.level);
          setCertArr(res.data.gig.learnings);
          setCertArr1(res.data.gig.toWhom);
          setCertArr2(res.data.gig.prerequisites);
        })
        .catch((err) => console.log(err));
    }
  }, [searchParams, appUser]);

  const renderCert1 = () => {
    return certArr1.map((item, index) => (
      <div className="selected-fields2" key={`plan_${index + 1}`}>
        <div className="sel-fel">
          <div className="dot"></div> {item}
        </div>
        <button
          type="button"
          onClick={(e) => removeCertFromArr1(index)}
          className="delete-btn"
        >
          <img
            className="delete-img"
            src="https://cdn2.iconfinder.com/data/icons/250-perfect-vector-pictograms/48/9.4-1024.png"
            alt=""
          ></img>
        </button>
      </div>
    ));
  };

  const removeCertFromArr1 = (index) => {
    setCertArr1(certArr1.filter((element, index2) => index2 !== index));
  };

  //add learnings script
  const [certTitle, setCertTitle] = useState("");
  const [certArr, setCertArr] = useState([]);

  const addCertToArr = () => {
    if (certTitle === "") {
      return alert("Please fill the field");
    } else {
      setCertArr((prevData) => [...prevData, certTitle]);
      setCertTitle("");
    }
  };

  const renderCert = () => {
    return certArr.map((item, index) => (
      <div className="selected-fields2" key={`plan_${index + 1}`}>
        <div className="sel-fel">
          <div className="dot"></div> {item}
        </div>
        <button
          type="button"
          onClick={(e) => removeCertFromArr(index)}
          className="delete-btn"
        >
          <img
            className="delete-img"
            src="https://cdn2.iconfinder.com/data/icons/250-perfect-vector-pictograms/48/9.4-1024.png"
            alt=""
          ></img>
        </button>
      </div>
    ));
  };

  const removeCertFromArr = (index) => {
    setCertArr(certArr.filter((element, index2) => index2 !== index));
  };

  //skill(category) script
  const [allSkillsOptions, setAllSikllsOptions] = useState([
    ...allCategories.AccountingFinance,
    ...allCategories.Architecture,
    ...allCategories.ArtDesign,
    ...allCategories.BusinessAdministration,
    ...allCategories.BusinessManagement,
    ...allCategories.EconomicsEconometrics,
    ...allCategories.EngineeringTechnology,
    ...allCategories.FilmCinematicsPhotography,
    ...allCategories.Geography,
    ...allCategories.Law,
    ...allCategories.Medicine,
    ...allCategories.Science,
  ]);

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  const [keywords, setKeywords] = useState("");
  const [pricing, setPricing] = useState(null);
  const [discount, setDiscount] = useState(null);

  const [imagesArr, setImagesArr] = useState([]);
  const [cloudnaryImages, setCloundnaryImages] = useState([]);
  const [isImagesUploaded, setIsImagesUploaded] = useState(false);
  const [imageUploadingIndex, setImageUploadingIndex] = useState(0);

  const uploadImage = (image, imgNo) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "educrat_preset");
    data.append("cloud_name", "educrat");
    fetch("https://api.cloudinary.com/v1_1/educrat/image/upload/", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // setImageUploadingIndex((prevIndex) => prevIndex + 1);
        console.log(data);
        // setCloundnaryImages((prevImg) => [...prevImg, data.url]);
        setCloundnaryImages((prevArr) => insert(prevArr, imgNo, data.url));
      })
      .catch((err) => console.log(err));
  };

  const extractKeywords = () => {
    return keywords
      .split("-")
      .map((element) => element.trim())
      .filter((element) => element !== "");
  };

  const discountedPrice = async () => {
    return await Number((pricing - pricing * (discount / 100)).toFixed(2));
  };

  const addNewGigToDB = async () => {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(async (res) => {
    //     console.log(await res.json());
    //     await imagesArr.map(async image => await uploadImage(image));
    //   })
    //   .then(() => {
    //     setTimeout(() => {
    axios
      .post(backendURL + "/api/add/gig", {
        userId: appUser.userId,
        title,
        desc,
        subtitle: subTitle,
        keywords: extractKeywords(),
        category: category,
        pricing: {
          actualPrice: Number(pricing),
          discount: Number(discount),
          currentPrice: Number(
            (pricing - pricing * (discount / 100)).toFixed(2)
          ),
        },
        learnings: certArr,
        toWhom: certArr1,
        prerequisites: certArr2,
        images: cloudnaryImages,
        language: language,
        level: level,
      })
      .then((res) => {
        console.log(res.data);
        alert("Gig created successfully!");
        navigate("/tutor-gig/" + res.data.newGig._id);
      })
      .catch((err) => console.log(err));
    //   }, 6000);
    // })
  };

  const updateGigToDB = async () => {
    if (appUser.userId === dbGigData.userId) {
      await axios
        .post(backendURL + "/api/update/gig", {
          userId: appUser.userId,
          gig_id: paramsGig_id,
          title,
          desc,
          subtitle: subTitle,
          keywords: extractKeywords(),
          category: category,
          pricing: {
            actualPrice: Number(pricing),
            discount: Number(discount),
            currentPrice: Number(
              (pricing - pricing * (discount / 100)).toFixed(2)
            ),
          },
          learnings: certArr,
          toWhom: certArr1,
          prerequisites: certArr2,
          images: cloudnaryImages,
          language: language,
          level: level,
        })
        .then((res) => {
          console.log(res.data);
          alert("Gig Updated successfully!");
          navigate("/tutor-gig/" + paramsGig_id);
        })
        .catch((err) => console.log(err));
    } else {
      alert("You are not authorized to edit this gig!");
    }
  };

  return (
    <div className="create_new_gig_page page_container">
      <div className="form_wrapper">
        <form className="create_form">
          <div className="form_input_title">Gig Title</div>
          <input
            required
            className="gig-input-cls"
            type="text"
            placeholder="The Complete Digital Marketing Course"
            value={title}
            minLength={60}
            maxLength={80}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="form_input_title">Sub Title</div>
          <input
            required
            className="gig-input-cls"
            type="text"
            maxLength={100}
            value={subTitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Learn to design websites with Figma and build with Webflow."
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
          />

          <div className="form_input_title">Banner Images</div>
          <div className="images_input_container">
            <div className="form_input_title-upload">
              Upload Images in the resolution of (1920x1080) for best results.
              (only 3 Images)
            </div>
            {/* <input type="file" multiple={true} onChange={(e) => multipleFileInputHandler(e)} name="" id="" accept="image/*" /> */}
            <div className="images_wrapper">
              <ImageUpload
                imgNo={0}
                setImagesArr={setImagesArr}
                uploadImage={uploadImage}
                cloudnaryImages={cloudnaryImages}
              />
              <ImageUpload
                imgNo={1}
                setImagesArr={setImagesArr}
                uploadImage={uploadImage}
                cloudnaryImages={cloudnaryImages}
              />
              <ImageUpload
                imgNo={2}
                setImagesArr={setImagesArr}
                uploadImage={uploadImage}
                cloudnaryImages={cloudnaryImages}
              />
            </div>
          </div>

          {/* <div className="form_input_title-video">Video</div>
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => setVideo(e.target.files[0])}
          /> */}

          <div className="form_input_title">Description</div>
          <textarea
            name=""
            required
            placeholder="It gives you a huge self-satisfaction when you look at your work and say, 'I made this!'. I love that feeling after I'm done working on something. When I lean back in my chair, look at the final result with a smile, and have this little 'spark joy' moment. It's especially satisfying when I know I just made $1,000."
            id=""
            cols="30"
            rows="10"
            value={desc}
            maxLength={2500}
            onChange={(e) => setDesc(e.target.value)}
            className="gig-input-cls"
          ></textarea>

          <div className="form_input_title cert-grid">
            Learnings from the Course:
            <div className="cert-wrapper">
              <input
                required
                id="select-2"
                value={certTitle}
                type="text"
                maxLength={150}
                placeholder="You will learn how to design beautiful websites using Figma, an interface design tool used by designers at Uber, Airbnb and Microsoft."
                onChange={(e) => {
                  setCertTitle(e.target.value);
                }}
                className="gig-input-cls"
              ></input>
              <div className="add-div">
                <button
                  onClick={addCertToArr}
                  type="button"
                  className="add-btn2"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="render-data">
            {certArr.length > 0 ? <>{renderCert()}</> : null}
          </div>

          <div className="form_input_title cert-grid">
            For whom the Course is for:
            <div className="cert-wrapper">
              <input
                required
                id="select-2"
                value={certTitle1}
                type="text"
                maxLength={100}
                placeholder="This course is for those who want to launch a Freelance Web Design career."
                onChange={(e) => {
                  setCertTitle1(e.target.value);
                }}
                className="gig-input-cls"
              ></input>
              <div className="add-div">
                <button
                  onClick={addCertToArr1}
                  type="button"
                  className="add-btn2"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="render-data">
            {certArr1.length > 0 ? <>{renderCert1()}</> : null}
          </div>

          <div className="form_input_title cert-grid">
            Prerequisites for the Course:
            <div className="cert-wrapper">
              <input
                required
                id="select-2"
                value={certTitle2}
                type="text"
                maxLength={100}
                placeholder="should know basics of html, css, javascript"
                onChange={(e) => {
                  setCertTitle2(e.target.value);
                }}
                className="gig-input-cls"
              ></input>
              <div className="add-div">
                <button
                  onClick={addCertToArr2}
                  type="button"
                  className="add-btn2"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="render-data">
            {certArr2.length > 0 ? <>{renderCert2()}</> : null}
          </div>

          <div className="form_input_title">Category</div>
          <select
            name="gigCategory"
            id="gigCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="skill-select"
            // id="select1"
            // onChange={(e) => setPlan1(e.target.value)}
          >
            <option value={"NA"} disabled selected>
              Add Skill (E.G Maths)
            </option>

            {allSkillsOptions.sort(dynamicSort("title")).map((skill, index) => {
              return (
                <option key={index} value={skill.title}>
                  {skill.title}
                </option>
              );
            })}
          </select>

          <div className="prizing-container">
            <div className="form_input_title price-wrap">
              Actual Pricing
              <input
                required
                type="number"
                className="gig-input-cls"
                name="A_price"
                placeholder="$300"
                min={0}
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
              />
            </div>

            <div className="form_input_title prize-wrap">
              Discount
              <input
                required
                className="gig-input-cls"
                type="number"
                name="discount"
                placeholder="36%"
                min={0}
                max={100}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>

          <div className="prizing-container">
            <div className="form_input_title price-wrap">
              Course Level
              <select
                name="level"
                placeholder="Intermediate"
                value={level}
                onChange={(e) => {
                  if (e.target.value !== "NA") {
                    setLevel(e.target.value);
                  }
                }}
              >
                <option value={"NA"} selected>
                  Skill Level
                </option>
                <option value={"Beginner"}>Beginner</option>
                <option value={"Intermediate"}>Intermediate</option>
                <option value={"Expert"}>Expert</option>
              </select>
            </div>

            <div className="form_input_title prize-wrap">
              Language
              <select
                name="language"
                placeholder="English"
                value={language}
                onChange={(e) => {
                  if (e.target.value !== "NA") {
                    setLanguage(e.target.value);
                  }
                }}
              >
                <option value={"NA"} selected>
                  Select Language
                </option>
                <option value={"English"}>English</option>
                <option value={"French"}>French</option>
                <option value={"German"}>German</option>
                <option value={"Spanish"}>Spanish</option>
                <option value={"Arabic"}>Arabic</option>
                <option value={"Russian"}>Russian</option>
                <option value={"Portuguese"}>Portuguese</option>
                <option value={"Chinese"}>Chinese</option>
                <option value={"Japanese"}>Japanese</option>
                <option value={"Italian"}>Italian</option>
              </select>
            </div>
          </div>

          <div className="form_input_title">Keywords ( ',' separated )</div>
          <input
            required
            type="text"
            value={keywords}
            className="gig-input-cls"
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="marketing, digital media, social skills"
          />

          <button
            type="button"
            className="submit-btn"
            onClick={searchParams.get("gig_id") ? updateGigToDB : addNewGigToDB}
          >
            {searchParams.get("gig_id") ? "Update Gig" : "Create Gig"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewGigPage;
