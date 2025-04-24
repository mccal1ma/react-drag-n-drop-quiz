import { useState } from "react";
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
  x,
}) {
  let city = stateObject.options[x];
  let capital = stateObject.correctOption;
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
        let capital = stateObject.correctOption;
        let city = stateObject.options[x];
        const newArray = shuffleArray([city, capital]);
        setShuffledArray(newArray);
        //this is the part that is not working
        //the shuffleArray function works but it does not pass in new values at first
        //instead it starts with stateObject[0] with stateObject[0].correctOption
        //then the next question is stateObject[1] with stateObject[0].correctOption
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
            className="btn btn-ui"
            onDragEnd={handleDragEnd}
            onDragStart={() => setActiveCard(shuffledArray[0])}
          >
            {shuffledArray[0]}
          </button>
        </div>
        <div>
          <button
            draggable
            className="btn btn-ui"
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
