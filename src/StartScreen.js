function StartScreen({ dispatch }) {
  return (
    <div className="start">
      <h2>Welcome!</h2>{" "}
      <h3>
        To play this game you must drag the correct city onto the state -
        capitals only! You have very limited time - to win you must have 70% or
        higher correct guesses. Good luck.
      </h3>
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Go!
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "cheat" })}
        >
          Cheat Sheet
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
