const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-left">
          <button className="menu-button">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h1 className="header-title">ToDo dudu </h1>
        </div>
        <div className="header-right">
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header