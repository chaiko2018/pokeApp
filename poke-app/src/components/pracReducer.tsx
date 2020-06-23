import React, { useReducer } from "react";

const correctValue = [1, 3, 4, 5, 2, 8, 7, 9, 6];

enum ActionType {
  ACTION_SUCCESS = "ACTION_SUCCESS",
  ACTION_FAILURE = "ACTION_FAILURE",
}

export default function PracReducer() {
  const [inputValue, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case ActionType.ACTION_SUCCESS:
        return [...state];
      case ActionType.ACTION_FAILURE:
        return [];
      default:
        return;
    }
  });

  const handleOnClick = (num: any) => {
    inputValue[inputValue.length] = num;

    for (let index = 0; index < inputValue.length; index++) {
      if (inputValue[index] !== correctValue[index]) {
        dispatch({ type: "failure" });
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
