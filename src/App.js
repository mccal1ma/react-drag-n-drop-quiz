import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import CheatSheet from "./CheatSheet";
import Footer from "./Footer";
import FinishScreen from "./FinishScreen";

const initialState = {
  stateCapitals: [],
  wrongStates: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const SEC_PER_Q = 1.5;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, stateCapitals: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.stateCapitals.length * SEC_PER_Q,
      };
    case "cheat":
      return { ...state, status: "cheat" };
    case "newAnswer":
      const currentQuestion = state.stateCapitals.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + 1
            : state.points,
        wrongStates:
          action.payload !== currentQuestion.correctOption
            ? state.wrongStates.concat(currentQuestion.stateAlt)
            : state.wrongStates,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initialState,
        stateCapitals: state.stateCapitals,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("action unknown");
  }
}

function App() {
  const [
    {
      stateCapitals,
      status,
      index,
      answer,
      points,
      wrongStates,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const maxPossiblePoints = stateCapitals.length;
  const imgPath = "./states/";

  useEffect(function () {
    fetch("https://states-and-capitals.vercel.app/stateCapitals")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const x = Math.floor(Math.random() * 4);
  return (
    <div>
      <Header dispatch={dispatch} />

      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Question
              stateObject={stateCapitals[index]}
              imgPath={imgPath}
              answer={answer}
              dispatch={dispatch}
              points={points}
              index={index}
              x={x}
              secondsRemaining={secondsRemaining}
            />
          </>
        )}
        {status === "cheat" && (
          <CheatSheet
            stateCapitals={stateCapitals}
            imgPath={imgPath}
            dispatch={dispatch}
          />
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
            wrongStates={wrongStates}
            index={index}
            stateCapitals={stateCapitals}
          />
        )}
      </Main>
      <Footer />
    </div>
  );
}

export default App;
