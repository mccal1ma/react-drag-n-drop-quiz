function CheatSheet({ stateCapitals, imgPath, dispatch }) {
  return (
    <div
      style={{ display: "grid", gridTemplateRows: "auto auto", gap: "10px" }}
    >
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Start Quiz
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Main Screen
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: "10px",
        }}
      >
        {stateCapitals.map((x, index) => (
          <div className="stateDisplay">
            <div className="numberState">{index + 1}</div>
            <img src={imgPath + x.stateImg} />
            <p>
              <h4>
                <strong>State capital: </strong>
                {x.correctOption}
              </h4>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheatSheet;
