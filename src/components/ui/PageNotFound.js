import React from "react";
import NotFound from "../../images/404.png";
import { Button } from "@material-ui/core";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <img src={NotFound} alt="404" />
      <Button variant="contained" color="primary">
        Continue
      </Button>
    </div>
  );
};

export default PageNotFound;
