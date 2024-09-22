import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./Profile.module.css";
import BuyCoin from "./../../assets/svg/buyCoin-logo.svg";
import ProfileModal from "./ProfileModal/ProfileModal"; // import the modal component
import { instance } from "../axios";

const Profile = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null); // State to store the image file
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({}); // State to store user data
  const [isEditing, setIsEditing] = useState(false);
  const [initialUserData, setInitialUserData] = useState({}); // Store initial user data
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    english_score: "",
    major: "",
    hobby: "",
    email: "", // Ensure email and other fields are initialized
    math_score: "", // Ensure math_score is initialized
    password: "", // Initialize password
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get("/users/me");
        const data = response.data;
        setUserData(data);
        setInitialUserData(data); // Save initial user data

        // Extracting first_name and last_name from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const firstNameParam = urlParams.get("first_name");
        const lastNameParam = urlParams.get("last_name");

        // Setting initial input values from URL parameters or fetched data
        setInputValues({
          first_name: firstNameParam || data.first_name || "",
          last_name: lastNameParam || data.last_name || "",
          phone_number: data.phone_number || "",
          english_score: data.english_score || "",
          major: data.major || "",
          hobby: data.hobby || "",
          email: data.email || "", // Ensure email is initialized
          math_score: data.math_score || "", // Ensure math_score is initialized
          password: "", // Initialize password as empty
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the fetchUserData function
  }, []);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Store the image file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      console.log("Submitted image data:", inputValues.image);

      // Create a FormData object
      const formData = new FormData();
      formData.append("first_name", inputValues.first_name);
      formData.append("last_name", inputValues.last_name);
      formData.append("phone_number", inputValues.phone_number);
      formData.append("english_score", inputValues.english_score);
      formData.append("major", inputValues.major);
      formData.append("hobby", inputValues.hobby);
      formData.append("password", inputValues.password);
      formData.append("email", inputValues.email); // Ensure email is included
      formData.append("math_score", inputValues.math_score); // Ensure math_score is included
      if (imageFile) {
        formData.append("image", imageFile); // Append the image file
      }

      try {
        // Save profile changes logic here
        await instance.put("/users/me", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIsEditing(false); // Disable editing mode after saving
        setInitialUserData(inputValues); // Update initial user data after saving
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
    [inputValues, imageFile]
  );

  const handleEdit = useCallback(() => {
    setIsEditing(true); // Enable editing mode
    setInputValues(userData); // Set input values to current user data
  }, [userData]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false); // Disable editing mode
    setInputValues(initialUserData); // Reset input values to initial user data
  }, [initialUserData]);

  const handleInputChange = useMemo(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    return debounce((event) => {
      const { name, value } = event.target;
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [name]: value,
      }));
    }, 300); // Adjust delay as necessary
  }, []);

  const triggerFileInput = useCallback(() => {
    document.getElementById("fileInput").click();
  }, []);

  const handleLogOut = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleConfirmLogOut = useCallback(() => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to the main page
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className={styles.main_profile}>
      <div className={styles.container}>
        <img src={BuyCoin} alt="buyCoin" className={styles.logo_image} />
        <h1 className={styles.container_heading}>Profile Settings</h1>
        <form className={styles.form_profile} onSubmit={handleSubmit}>
          <div className={styles.uploadPictureDiv}>
            <div className={styles.upload_picture}>
              {imageSrc && (
                <img src={imageSrc} alt="Profile" className={styles.images} />
              )}
            </div>
            <input
              id="fileInput"
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <button
              type="button"
              className={styles.customUploadButton}
              onClick={triggerFileInput}
            >
              Upload a picture
            </button>
            <p className="text-[12px] text-[gray] leading-1">
              Image size should be until 1MB
            </p>
          </div>
          <div className={styles.name_form}>
            <div>
              <h2>First Name</h2>
              <input
                type="text"
                name="first_name"
                value={inputValues.first_name || ""}
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h2>Last Name</h2>
              <input
                type="text"
                name="last_name"
                value={inputValues.last_name || ""}
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.name_form}>
            <div>
              <h2>Email</h2>
              <input
                type="email"
                name="email"
                value={inputValues.email || ""}
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h2>Phone number</h2>
              <input
                type="text"
                name="phone_number"
                value={inputValues.phone_number || ""}
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.name_form}>
            <div>
              <h2>Password</h2>
              <input
                type="password"
                name="password"
                value={inputValues.password || ""}
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h2>Hobby</h2>
              <input
                type="text"
                name="hobby"
                value={inputValues.hobby || ""}
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.profile_button}>
            <button
              type="button"
              className={styles.cancel_button}
              onClick={handleLogOut}
            >
              Log Out
            </button>
            {isEditing ? (
              <>
                <button
                  type="button"
                  className={styles.cancel_button}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button className={styles.finish_button} type="submit">
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                className={styles.cancel_button}
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>
        </form>
        <ProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmLogOut}
        />
      </div>
    </div>
  );
};

export default Profile;
