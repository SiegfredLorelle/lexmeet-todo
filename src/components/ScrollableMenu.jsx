const ScrollableMenu = ({ commands }) => {
  return (
    <ul className="scrollable-menu">
      {commands.map((command, index) => (
        <li key={index}>
          <button
            onClick={() => command.action()}
            className="scrollable-menu-button"
          >
            {command.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default ScrollableMenu