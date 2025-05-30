import { useEffect, useState } from "react";
import Timer from "./Timer";

//const randomChoice = Math.floor(Math.random() * 5);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

function Question({
  stateObject,
  imgPath,
  dispatch,
  secondsRemaining,
  index,
  capital,
  x,
}) {
  const city = stateObject.options[x];
  let initialArray = [capital, city];
  let initialState = {
    backgroundColor: "#fff",
  };
  let wrongAnswer = {
    backgroundColor: "red",
  };
  let rightAnswer = {
    backgroundColor: "green",
  };
  const [activeCard, setActiveCard] = useState(null);
  const [showDrop, setShowDrop] = useState(initialState);
  const [move, setMove] = useState("no");
  const [shuffledArray, setShuffledArray] = useState(initialArray);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    shuffleArray(initialArray);
    setShuffledArray(initialArray);
  }, [stateObject]);
  /* eslint-disable react-hooks/exhaustive-deps */

  const handleDragOver = (event) => {
    event.preventDefault();
    if (activeCard === capital) {
      setShowDrop(rightAnswer);
    }
    if (activeCard !== capital) {
      setShowDrop(wrongAnswer);
    }
    setMove("yes");
  };

  const handleDragEnd = (event) => {
    event.preventDefault();
    if (move === "yes") {
      setShowDrop(initialState);
      dispatch({ type: "newAnswer", payload: activeCard });

      //if you are on the LAST QUESTION
      //go to the finish screen, otherwise you go to the next question
      if (index === 49) {
        dispatch({ type: "finish" });
      } else {
        dispatch({ type: "nextQuestion" });
      }
    }
  };

  //
  return (
    <div className="start">
      <div className="stackDiv">
        <h3>Which city is the capital of {stateObject.stateAlt}?</h3>
      </div>
      <div
        style={showDrop}
        className="stateDisplay"
        onDragOver={handleDragOver}
      >
        <img src={imgPath + stateObject.stateImg} alt={stateObject.stateAlt} />
      </div>

      <div className="stackDiv">
        {" "}
        <div>
          <button
            draggable
            className="btn btn-ui draggable"
            onDragEnd={handleDragEnd}
            onDragStart={() => setActiveCard(shuffledArray[0])}
          >
            {shuffledArray[0]}
          </button>
        </div>
        <div>
          <button
            draggable
            className="btn btn-ui draggable"
            onDragEnd={handleDragEnd}
            onDragStart={() => setActiveCard(shuffledArray[1])}
          >
            {shuffledArray[1]}
          </button>
        </div>
      </div>
      <div>
        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
      </div>
      <h4>{index + 1} out of 50 states</h4>
    </div>
  );
}

export default Question;
