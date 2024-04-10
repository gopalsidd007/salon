import React, { useState } from "react";
import CustomLoader from "../CustomComponents/loader/CustomLoader";
import "./Training.css";

const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "35px",
  fontWeight: "bold",
};
const Training = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <CustomLoader loading={isLoading} />

      <div className="d-flex justify-content-end">
        <div className="form-header">
          <section className="piechartsBox_area">
            <div style={headLineStyle} className="page-headline">
              Add Training
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Training;
