import React from "react";
import SideBarAdmin from "../Admin/SideBarAdmin";
import { Divider } from "@mui/material";

const ScaffoldAdmin = ({ children, sidebar = true, title, className = "" }) => {
  return (
    <div className="scaffoldRoot">
      {sidebar && (
        <div className="sidebaradminArea">
          <SideBarAdmin />{" "}
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

export default ScaffoldAdmin;
