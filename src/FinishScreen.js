function FinishScreen({
  index,
  points,
  maxPossiblePoints,
  dispatch,
  wrongStates,
  stateCapitals,
}) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);
  let winningMsg;
  let statesWrongMsg;
  if (percentage === 100) {
    winningMsg = <p>PERFECT SCORE! 😇</p>;
  } else if (percentage >= 70) {
    winningMsg = <p>You win! 🏆</p>;
    statesWrongMsg = "Here are the states you got wrong:";
  } else if (percentage > 0) {
    winningMsg = <p>Try again. 😞</p>;
    statesWrongMsg = "Here are the states you got wrong:";
  } else {
    statesWrongMsg = <p>You got them all wrong 🤦‍♀️</p>;
  }

  let missingStates;
  if (index === 49) {
    missingStates = <p>You answered all questions</p>;
  } else {
    missingStates = <p>You didn't complete all the questions</p>;
  }

  const slicedStates = stateCapitals.slice(index + 1);

  return (
    <div>
      <h2>{winningMsg}</h2>

      <h4>
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {percentage} %)
      </h4>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
      <p>{statesWrongMsg}</p>
      <ul>
        {wrongStates.map((x, index) => (
          <li key={index}>{x}</li>
        ))}
      </ul>
      <br />
      <h4>{missingStates}</h4>
      {slicedStates.length > 0 && (
        <p>Here are the states you did not get to:</p>
      )}

      <ul>
        {slicedStates.map((x) => (
          <li key={index}>{x.stateAlt}</li>
        ))}
      </ul>
    </div>
  );
}

export default FinishScreen;
