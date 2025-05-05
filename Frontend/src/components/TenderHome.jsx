import React from "react";
import NotLogin from "./NotLogin";

const TenderHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <NotLogin />;
  return <div>tender</div>;
};

export default TenderHome;
