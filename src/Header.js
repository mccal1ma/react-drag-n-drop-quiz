function Header({ dispatch }) {
  return (
    <header
      className="app-header"
      onClick={() => dispatch({ type: "restart" })}
    >
      <img src="./states/arizona.png" alt="alabama" />
      <h1>Drag N Drop with State Capitals</h1>
    </header>
  );
}

export default Header;
