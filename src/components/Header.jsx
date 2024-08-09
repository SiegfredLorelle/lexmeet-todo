import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      </header>
    </>
  );
};

export default Header;
