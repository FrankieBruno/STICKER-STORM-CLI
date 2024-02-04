// Modify your NavBar.js component to conditionally render links
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by looking for the "st_token" in localStorage
  const isLoggedIn = localStorage.getItem("st_token") !== null;

  return (
    <>
      {isLoggedIn && (
        <div className="navbarContainer">
          <div className="menuLinks">
            <Link className="menuLinkItems" to="/stickers">
              HOME
            </Link>

            <Link className="menuLinkItems" to="/stickers/new">
              Create Sticker
            </Link>
          </div>

          <div className="logoutBtnContainer">
            <button
              className="logoutBtn"
              onClick={() => {
                localStorage.removeItem("st_token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>

        </div>
      )}
    </>
  );
};
