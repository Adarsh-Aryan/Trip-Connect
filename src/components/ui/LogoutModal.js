import React, { useContext } from "react";
import { Modal, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TripContext } from "../../context/TripContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    top: "35%",
    left: "35%",
    borderRadius: "10px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LogoutModal = () => {
  const classes = useStyles();
  const { openLogout, setOpenLogout } = useContext(TripContext);

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Are you sure want to logout?</h2>
      <div
        style={{
          display: "flex",
          margin: "1rem 0rem",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setOpenLogout(false);
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userInfo");
            window.location = "/login";
          }}
          color="secondary"
        >
          Yes,Logout
        </Button>
        <Button variant="contained" color="primary" onClick={handleCloseLogout}>
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      open={openLogout}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default LogoutModal;
