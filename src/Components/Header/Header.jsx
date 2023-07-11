import React from "react";
import { Container, Button } from "reactstrap";
import NavLogo from "../../assets/logo.png";
import "../Header/header.css";
import { Link } from "react-router-dom";
const navLinks = [
  {
    display: "Home",
    url: "#",
  },

];

const Header = () => {

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="nav-logo">
            <img src={NavLogo} alt="logo" className="nav-logo" />
          </div>

          <div className="nav d-flex align-items-center ">
            <div className="nav__menu">
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ml-4" style={{ marginLeft: 30}}>
             <Link to ='/CategorySelection'> <Button className="login-btn" style={{ backgroundColor: "#fe6532" , borderRadius:50 , width:100 , border:0}} >LOG IN</Button></Link>
            </div>
          </div>

          <div className="mobile__menu" >
            <span>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
