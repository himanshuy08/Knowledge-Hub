import React from "react";
import "./Scaffold.css";
import SideBar from "../SideBar/SideBar";
import { Divider } from "@mui/material";

const Scaffold = ({ children, sidebar = true, title, className = "" }) => {
  return (
    <div className="scaffoldRoot">
      {sidebar && (
        <div className="sidebarArea">
          <SideBar />{" "}
        </div>
      )}

      <main>
          <div className="mainTitle">

          {title}
          </div>
          <Divider/>
          <div className={className}>{children}</div>
        
      </main>
    </div>
  );
};

export default Scaffold;
