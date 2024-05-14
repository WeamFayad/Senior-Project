
import "./styles.css";
import { Link } from "react-router-dom";
import { local } from "../../../../../core/helpers/localstorage";
import { useDispatch } from "react-redux";
import { cleanData } from "../../../../../core/dataSource/localDataSource/user";


const UserProfileBtn = ({
  isProfileMenuHidden,
  setIsProfileMenuHidden,
  setLogoutTrigger,
}) => {
  const dispatch = useDispatch();

  //when user clicks on logout handler
  const handleOnClick = async () => {
    //empty log in tokens
    local("token", "");
    local("type", "");

    //clear the user slice in redux
    dispatch(cleanData());

    //toggle the state that displays the profile and menu buttons in nav
    setIsProfileMenuHidden(true);

    //toggle the state of the hook loggedIn
    setLogoutTrigger((prev) => prev + 1);
  };
  
  return (
    <div
      className={
        isProfileMenuHidden ? "pfp-drop-down" : "pfp-drop-down pfp-show"
      }
    >
      <Link to={"/edit"} className="pfp-drop-down-item">
        Edit Profile
      </Link>
      <Link className="pfp-drop-down-item" onClick={handleOnClick}>
        Log out
      </Link>
    </div>
  );
};

export default UserProfileBtn;
