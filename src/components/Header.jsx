import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({ toggleListsSection }) => {
  return (
    <>
      <header className="header">
        <div className="header-left">
          {/* <button className="hamburger-menu" onClick={toggleListsSection}>
            <FontAwesomeIcon icon={faBars} />
          </button> */}
          <a href="/" className="header-link">
            <img src="logo.png" alt="Logo" />
            <h1 className="header-title">ToDo DuDu</h1>
          </a>
        </div>
        <div className="header-right">
          <a href="https://github.com/SiegfredLorelle" target="_blank" rel="noopener noreferrer" className="header-icon">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/siegfred-lorelle-mina" target="_blank" rel="noopener noreferrer" className="header-icon">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
