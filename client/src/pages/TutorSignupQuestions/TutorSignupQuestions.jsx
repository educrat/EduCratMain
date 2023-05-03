import React, { useState, useEffect, useContext } from "react";
import allCategories from "../../data/allCategories";
import "./TutorSignupQuestions.css";
import axios from "axios";
import { backendURL } from "../../data/vars";
import AppUserContext from "../../context/AppUserContext";
import { useNavigate } from "react-router-dom";

const TutorSignupQuestions = () => {
  const { appUser } = useContext(AppUserContext);
  const navigate = useNavigate();

  const [isImageChanged, setIsImageChanges] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [from, setFrom] = useState("");
  const [status, setStatus] = useState();
  const [desc, setDesc] = useState("");
  const [website, setWebsite] = useState("");

  //certification script
  const [certTitle, setCertTitle] = useState("");
  const [certFrom, setCertFrom] = useState("");
  const [certYear, setCertYear] = useState("");
  const [certArr, setCertArr] = useState([]);

  const addCertToArr = () => {
    if (certTitle === "" || certFrom === "" || certYear === "") {
      return alert("Please select all fields");
    } else {
      setCertArr((prevData) => [
        ...prevData,
        { title: certTitle, from: certFrom, year: certYear },
      ]);
      setCertTitle("");
      setCertFrom("");
      setCertYear("");
    }
  };

  const renderCert = () => {
    return certArr.map((item, index) => (
      <>
        <tr className="selected-fields2" key={`plan_${index + 1}`}>
          <td className="sel-fel">{item.title}</td>
          <td className="sel-fel">{item.from}</td>
          <td className="sel-fel">{item.year}</td>
          <button
            type="button"
            onClick={(e) => removeCertFromArr(index)}
            className="delete-btn common-btn"
          >
            <img
              className="delete-img"
              src="https://cdn2.iconfinder.com/data/icons/250-perfect-vector-pictograms/48/9.4-1024.png"
              alt=""
            ></img>
          </button>
        </tr>
      </>
    ));
  };

  const removeCertFromArr = (index) => {
    setCertArr(certArr.filter((element, index2) => index2 !== index));
  };

  //skill script
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

  //add certificate script
  const [plan1, setPlan1] = useState("NA");
  const [planToCompare1, setPlanToCompare1] = useState("NA");
  const [data1, setData1] = useState([]);

  const addLangToArray = () => {
    // alert(plan)
    if (plan1 === "NA" || planToCompare1 === "NA") {
      return alert("Please select skill");
    } else {
      setData1((prevData) => [
        ...prevData,
        { skill: plan1, level: planToCompare1 },
      ]);
      setPlan1("NA");
      setPlanToCompare1("NA");
    }
  };

  const removeLangFromArr1 = (index) => {
    setData1(data1.filter((element, index2) => index2 !== index));
  };

  const renderData1 = () => {
    return data1.map((item, index) => (
      <>
        <tr className="selected-fields4" key={`plan_${index + 1}`}>
          <td className="sel-fel">{item.skill}</td>
          <td className="sel-fel">{item.level}</td>
          <button
            type="button"
            onClick={(e) => removeLangFromArr1(index)}
            className="delete-btn common-btn"
          >
            <img
              className="delete-img"
              src="https://cdn2.iconfinder.com/data/icons/250-perfect-vector-pictograms/48/9.4-1024.png"
              alt=""
            ></img>
          </button>
        </tr>
      </>
    ));
  };

  //add language script
  const [plan, setPlan] = useState("NA");
  const [planToCompare, setPlanToCompare] = useState("NA");
  const [data, setData] = useState([]);

  const addLangToArr = () => {
    // alert(plan)
    if (plan === "NA" || planToCompare === "NA") {
      return alert("Please select language");
    } else {
      setData((prevData) => [
        ...prevData,
        { lang: plan, level: planToCompare },
      ]);
      setPlan("NA");
      setPlanToCompare("NA");
    }
  };

  const removeLangFromArr = (index) => {
    setData(data.filter((element, index2) => index2 !== index));
  };

  const renderData = () => {
    return data.map((item, index) => (
      <>
        <tr className="selected-fields" key={`plan_${index + 1}`}>
          <td className="sel-fel">{item.lang}</td>
          <td className="sel-fel">{item.level}</td>
          <button
            type="button"
            onClick={(e) => removeLangFromArr(index)}
            className="delete-btn common-btn"
          >
            <img
              className="delete-img"
              src="https://cdn2.iconfinder.com/data/icons/250-perfect-vector-pictograms/48/9.4-1024.png"
              alt=""
            ></img>
          </button>
        </tr>
      </>
    ));
  };

  // image upload script
  const [image, setImage] = useState();
  const [cloundnaryImageURL, setCloundnaryImageURL] = useState("");
  const [renderImage, setRenderImage] = useState();
  const [hidePreview, setHidePreview] = useState(true);

  const uploadImageToCloudnary = async (currentImage) => {
    const formData = new FormData();
    formData.append("file", currentImage);
    formData.append("upload_preset", "educrat_preset");
    formData.append("cloud_name", "educrat");
    fetch("https://api.cloudinary.com/v1_1/educrat/image/upload/", {
      method: "post",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        console.log(data.url);
        setCloundnaryImageURL(data.url);
        return data.url;
      });
  };

  const onImgUpload = async (e) => {
    setIsImageChanges(true);
    await setImage(e.target.files[0]);
    setRenderImage(URL.createObjectURL(e.target.files[0]));
    uploadImageToCloudnary(e.target.files[0]);
  };

  const uploadOnlyData = () => {
    axios
      .post(backendURL + "/api/auth/signup-tutee", {
        userId: appUser.userId,
        fname,
        lname,
        desc,
        status,
        country: from,
        languages: data,
        skills: data1,
        website: website,
        storyLine: status,
        profileURL: cloundnaryImageURL,
        certification: certArr,
      })
      .then((res) => {
        if (res.status && res.status === "failed") {
          return alert(res.message);
        }
        console.log(res.data);
      })
      .then(() => {
        alert("hurrah! 🎉 Your now become a tutor.");
        navigate("/tutor-dashboard");
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(backendURL + "/api/alldetails/user/" + appUser.userId)
      .then((res) => {
        console.log(">>>", res.data);
        setFname(res.data.profile.fname);
        setLname(res.data.profile.lname);
        setFrom(res.data.profile.country);
        setStatus(res.data.profile.storyLine);
        setDesc(res.data.profile.desc);
        setWebsite(res.data.profile.linkedAccounts.website);
        setCertArr(res.data.profile.certification);
        setData(res.data.profile.languages); // setData is for languages Array
        setData1(res.data.profile.skills); // setData1 is for skills array
        setCloundnaryImageURL(res.data.profile.profileURL);
        setRenderImage(res.data.profile.profileURL);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [appUser]);

  return (
    <div className="signup-questions-page">
      <h1 className="heading">Your Personal Details</h1>
      <div className="form_wrapper">
        <form className="create_form">
          <div className="avatar-upload-div">
            <div
              onChange={(e) => hidePreview(e)}
              className="upload-image image_upload_wrapper"
            >
              {renderImage && (
                <div className="file-upload-preview">
                  <img
                    className="avatar-img"
                    id={`file-ip-${image}-preview`}
                    src={renderImage}
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className=" image_upload_wrapper">
              <label for={`file-ip-${image}`}>
                <img
                  className="upload-btn"
                  src="https://cdn1.iconfinder.com/data/icons/modern-universal/32/icon-17-1024.png"
                  alt=""
                />
              </label>
              <input
                required
                className="gig-input-cls"
                type="file"
                id={`file-ip-${image}`}
                accept="image/*"
                onChange={(e) => onImgUpload(e)}
              />
            </div>
          </div>
          <div className="name-div">
            <div className="fname-div">
              <div className="form_input_fname">
                First Name
                <input
                  required
                  maxLength={20}
                  className="name-input gig-input-cls"
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="Jhon"
                  //   value={title}
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="form_input_name">
                Last Name
                <input
                  required
                  className="gig-input-cls"
                  maxLength={20}
                  type="text"
                  placeholder="Doe"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  //   value={title}
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="form_input_name">
                From
                <input
                  required
                  className="gig-input-cls"
                  maxLength={20}
                  type="text"
                  placeholder="USA"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  //   value={title}
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form_input_status">
            Status / StoryLine
            <input
              required
              className="gig-input-cls"
              maxLength={70}
              type="text"
              placeholder="Describe yourself in one sentence"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              //   value={title}
              //   onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form_input_desc">
            Description
            <textarea
              required
              className="gig-input-cls"
              name=""
              maxLength={600}
              placeholder="It gives you a huge self-satisfaction when you look at your work and say, 'I made this!'. I love that feeling after I'm done working on something. When I lean back in my chair, look at the final result with a smile, and have this little 'spark joy' moment. It's especially satisfying when I know I just made $1,000."
              id=""
              cols="10"
              rows="5"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              //   value={desc}
            ></textarea>
            <span className="bottom-text">max. 600 characters</span>
          </div>

          <div className="dropdown1">
            <div className="form_input_title ">
              Languages
              <table>
                <thead>
                  <tr>
                    <div className="lang-table">
                      <th className="first-col">
                        <select
                          id="select1"
                          // dataChosen={plan}
                          onChange={(e) => setPlan(e.target.value)}
                        >
                          <option value={"NA"} disabled selected>
                            Language
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
                      </th>
                      <th className="second-col">
                        <select
                          id={"select2"}
                          // dataChosen={planToCompare}
                          onChange={(e) => setPlanToCompare(e.target.value)}
                        >
                          <option value={"NA"} disabled selected>
                            Language Level
                          </option>
                          <option value={"Beginner"}>Beginner</option>
                          <option value={"Intermediate"}>Intermediate</option>
                          <option value={"Expert"}>Expert</option>
                        </select>
                      </th>
                      <div className="add-div">
                        <button
                          onClick={addLangToArr}
                          type="button"
                          className="add-btn common-btn"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    <>
                      <tr className="selected-head">
                        <th className="sel-heading">Language</th>
                        <th className="sel-heading">Level</th>
                      </tr>
                      {renderData()}
                    </>
                  ) : null}
                </tbody>
              </table>
            </div>

            <div className="form_input_title cert-grid">
              Certification
              <table>
                <thead>
                  <tr>
                    <div className="cert-table">
                      <th className="certificate-input certificate-input1">
                        <input
                          className="gig-input-cls"
                          id="select-2"
                          value={certTitle}
                          type="text"
                          maxLength={20}
                          placeholder="Certificate or Award"
                          onChange={(e) => {
                            setCertTitle(e.target.value);
                          }}
                        ></input>
                      </th>
                      <th className="certificate-input certificate-input2">
                        <input
                          className="gig-input-cls"
                          id="select-3"
                          value={certFrom}
                          type="text"
                          maxLength={30}
                          placeholder="Certified From (E.G Udemy)"
                          onChange={(e) => {
                            setCertFrom(e.target.value);
                          }}
                        ></input>
                      </th>
                      <th className="certificate-input certificate-input3">
                        <input
                          className="gig-input-cls"
                          id="select-4"
                          value={certYear}
                          type="number"
                          placeholder="year"
                          onChange={(e) => {
                            setCertYear(e.target.value);
                          }}
                        ></input>
                      </th>
                      <div className="add-div">
                        <button
                          onClick={addCertToArr}
                          type="button"
                          className="add-btn2 common-btn"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </tr>
                </thead>
                <tbody>
                  {certArr.length > 0 ? (
                    <>
                      <tr className="selected-head2">
                        <th className="sel-heading">Title</th>
                        <th className="sel-heading">Certified From</th>
                        <th className="sel-heading">Year</th>
                      </tr>
                      {renderCert()}
                    </>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dropdown2">
            <div className="form_input_title grid-one">
              Personal Website
              <div className="website-table">
                <th className="website-input">
                  <input
                    className="gig-input-cls"
                    id="input1"
                    type="text"
                    maxLength={100}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Provide a link to your own Website"
                  ></input>
                </th>
              </div>
            </div>

            <div className="form_input_title grid-two">
              Skills
              <table>
                <thead>
                  <tr>
                    <div className="lang-table">
                      <th className="first-col">
                        <select
                          className="skill-select"
                          id="select1"
                          onChange={(e) => setPlan1(e.target.value)}
                        >
                          <option value={"NA"} disabled selected>
                            Add Skill (E.G Maths)
                          </option>

                          {allSkillsOptions
                            .sort(dynamicSort("title"))
                            .map((skill, index) => {
                              return (
                                <option key={index} value={skill.title}>
                                  {skill.title}
                                </option>
                              );
                            })}
                        </select>
                      </th>
                      <th className="second-col">
                        <select
                          id={"select2"}
                          onChange={(e) => setPlanToCompare1(e.target.value)}
                        >
                          <option value={"NA"} disabled selected>
                            Skill Level
                          </option>
                          <option value={"Beginner"}>Beginner</option>
                          <option value={"Intermediate"}>Intermediate</option>
                          <option value={"Expert"}>Expert</option>
                        </select>
                      </th>
                      <div className="add-div">
                        <button
                          onClick={addLangToArray}
                          type="button"
                          className="add-btn common-btn"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </tr>
                </thead>
                <tbody>
                  {data1.length > 0 ? (
                    <>
                      <tr className="selected-head4">
                        <th className="sel-heading">Skill</th>
                        <th className="sel-heading">Level</th>
                      </tr>
                      {renderData1()}
                    </>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <button className="submit-btn" type="button" onClick={uploadOnlyData}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorSignupQuestions;
