import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";
import { TripContext } from "../../context/TripContext";
import LogoutModal from "../ui/LogoutModal";

function Header() {
  const [user, setUser] = useState();
  const { openLogout, setOpenLogout } = useContext(TripContext);
  const history = useHistory();

  const getUser = async () => {
    if (!sessionStorage.getItem("token")) {
      return;
    }

    const response = await fetch(
      "https://trip-connect-api.herokuapp.com/api/auth/getUser",
      {
        method: "GET",
        headers: {
          "auth-token": sessionStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();

    setUser(data);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="header">
      <Link to="/">
        <h1>TripConnect</h1>
      </Link>
      {openLogout && <LogoutModal />}
      <nav>
        <ul>
          {!sessionStorage.getItem("token") ? (
            <li id="login-route">
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <>
              <li>Hi {user?.name.split(" ")[0]}</li>
              <li
                onClick={() => {
                  setOpenLogout(true);
                }}
              >
                LogOut
              </li>
              <li
                onClick={() => {
                  history.push("/allBookings");
                }}
              >
                All Bookings
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
