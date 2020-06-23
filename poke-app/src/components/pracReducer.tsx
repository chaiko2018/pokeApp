import React, { useReducer } from "react";
/*
const correctValue = [1, 3, 4, 5, 2, 8, 7, 9, 6];

enum ActionType {
  ACTION_SUCCESS = "ACTION_SUCCESS",
  ACTION_FAILURE = "ACTION_FAILURE",
}

interface inputState {
  inputValue: number[];
}

interface inputAction {
  type: ActionType;
  clickNumber?: number;
}

const initialState = {
  inputValue: [],
};

const reducer: React.Reducer<inputState, inputAction> = (
  state: inputState,
  action: inputAction
) => {
  switch (action.type) {
    case ActionType.ACTION_SUCCESS:
      return [];
    case ActionType.ACTION_FAILURE:
      return [];
    default:
      return;
  }
};

export default function PracReducer() {
  const [inputValue, dispatch] = useReducer(reducer, initialState);

  const handleOnClick = (num: any) => {
    for (let index = 0; index < 9; index++) {
      if (!correctValue[index]) {
      }
    }
    return;
  };

  return (
    <div>
      {correctValue.map((_, index) => (
        <button onClick={() => handleOnClick(index + 1)}>{index + 1}</button>
      ))}
    </div>
  );
}
*/
const initialState = { count: 0 };

interface countState {
  count: number;
}

interface countAction {
  type: ActionType;
}

enum ActionType {
  ACTION_INCREMENT = "ACTION_INCREMENT",
  ACTION_DECREMENT = "ACTION_DECREMENT",
}

function reducer(state: countState, action: countAction) {
  switch (action.type) {
    case ActionType.ACTION_INCREMENT:
      return { count: state.count + 1 };
    case ActionType.ACTION_DECREMENT:
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export default function PracReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: ActionType.ACTION_INCREMENT })}>
        +
      </button>
      <button onClick={() => dispatch({ type: ActionType.ACTION_DECREMENT })}>
        -
      </button>
    </>
  );
}
