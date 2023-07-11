import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  Box,
  Divider,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Collapse,
  Button,
} from "@mui/material";
import { ExpandMore, ExpandLess, Logout } from "@mui/icons-material";
import { UploadFile, LibraryBooksOutlined } from "@mui/icons-material";

const sidebarData = [
  {
    id: 1,
    icon: <UploadFile />,
    text: "Video Upload",
    path: "/videoupload",
    isActive: false,
  },
  {
    id: 2,
    icon: <LibraryBooksOutlined />,
    text: "Material",
    path: "/MaterialAdmin",
    isActive: false,
  },
];

const SideBarAdmin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentPathname = window.location.pathname;
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebarRoot">
      <Card className="card">
        <Box sx={{ p: 3, display: "flex", alignItems: "center", flexDirection: "row", gap: 1 }}>
          <Avatar variant="rounded" sx={{ width: 60, height: 60, bgcolor: "#fe6532" }} >A</Avatar>
          <Stack spacing={0.5}>
            <Typography fontWeight={500} variant="h6">Admin</Typography>
          </Stack>
          <IconButton
            onClick={handleCollapse}
            aria-expanded={isCollapsed}
            aria-label="Toggle Collapse"
            size="small"
          >
            {isCollapsed ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </Box>
        <Divider />
        <Collapse in={isCollapsed}>
          <Box sx={{ p: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Logout />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Collapse>
      </Card>
      <ul className="sidebarUl">
        {sidebarData.map((item) => (
          <NavLink key={item.id} to={item.path} className={`sidebarNavLink ${currentPathname === item.path ? 'active' : ''}`}>
            <li className="sidebarLi">
              {item.icon}
              <span>{item.text}</span>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SideBarAdmin;
