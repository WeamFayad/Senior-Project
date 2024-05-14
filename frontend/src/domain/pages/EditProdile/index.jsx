import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { local } from "../../../core/helpers/localstorage";
import { userDataSource } from "../../../core/dataSource/remoteDataSource/users";
import { loggedIn } from "../../../core/dataSource/localDataSource/user";

function Editprofile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting user information from redux
  const user = useSelector((state) => {
    return state.User;
  });

  // User info states
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPicture, setNewPicture] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //Check if user is logged in
  useEffect(() => {
    const token = local("token");

    if (!token) {
      navigate("/login");
    }
  }, [user]);

  //reset message and error
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 2000);
  }, [message, error]);

  //Function to update picture
  const updatePicture = async () => {
    const type = local("type");
    const token = local("token");
    const headers = {
      Authorization: `${type} ${token}`,
    };
    try {
      const formData = new FormData();

      formData.append("image", newPicture);

      const response = await fetch("http://127.0.0.1:8000/users/", {
        method: "PUT",
        body: formData,
        headers: {
          ...headers,
        },
      });
      setMessage("Picture updated");
      // dispatch(loggedIn({ ...user, image: newPicture }));
      setNewPicture("");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  // Function to update user name
  const updateName = async () => {
    const trimmedName = newName.trim();
    const hasValidName = /^\S(.*\s+.*)*\S$/.test(trimmedName);
    if (!hasValidName) {
      setError("Please enter your full name");
      return;
    } else {
      const nameParts = trimmedName.split(" ");
      const capitalizedNames = nameParts.map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1)
      );
      let sendName = capitalizedNames.join(" ");
      try {
        const response = await userDataSource.updateUser({ name: sendName });
        setMessage("Name updated");
        dispatch(loggedIn({ ...user, name: newName }));
        setNewName("");
      } catch (err) {
        setError(err);
      }
    }
  };

  // Function to update user address
  const updateaddress = async () => {
    if (newAddress.length < 10) {
      setError("Address must be more detailed");
      return;
    } else {
      try {
        const response = await userDataSource.updateUser({
          address: newAddress,
        });
        setMessage("Address updated");
        dispatch(loggedIn({ ...user, address: newAddress }));
        setNewAddress("");
      } catch (err) {
        setError(err);
      }
    }
  };

  // Function to update user phone
  const updatephone = async () => {
    if (newPhone.length < 8) {
      setError("Please Enter a valid phone number");
      return;
    } else {
      try {
        const response = await userDataSource.updateUser({
          phone: newPhone,
        });
        setMessage("Phone updated");
        dispatch(loggedIn({ ...user, phone: newPhone }));
        setNewPhone("");
      } catch (err) {
        setError(err);
      }
    }
  };

  return (
    <div className="edit-section">
 
      <div className="edit-profile">
        <img
          src={`http://localhost:8000/images/users/${user.image}`}
          alt="user_img"
        />

        <div className="user-info">
          <div className="edit-profile-value">
            <p>Change profile picture:</p>

            <input
              type="file"
              onChange={(e) => setNewPicture(e.target.files[0])}
              required
            />
            <button
              onClick={() => {
                updatePicture();
              }}
              className="btn update-picture-btn"
            >
              Submit picture
            </button>
          </div>
          <div className="edit-profile-value">
            <p>Change name:</p>

            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={user.name}
              required
            />
            <button
              onClick={() => {
                updateName();
              }}
              className="btn update-name-btn"
            >
              Submit name
            </button>
          </div>
          <div className="edit-profile-value">
            <p>Change address:</p>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder={user.address}
              required
            />

            <button
              onClick={() => {
                updateaddress();
              }}
              className="btn update-address-btn"
            >
              Submit address
            </button>
          </div>
          <div className="edit-profile-value">
            <p>Change phone number:</p>
            <input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder={user.phone}
              required
            />

            <button
              onClick={() => {
                updatephone();
              }}
              className="btn update-phone-btn"
            >
              Submit number
            </button>
          </div>
          <button
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </button>
        </div>
      </div>
      <div className={`edit-status-messages ${error || message ? "" : "hide"}`}>
        <p className="error">{error}</p>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default Editprofile;
