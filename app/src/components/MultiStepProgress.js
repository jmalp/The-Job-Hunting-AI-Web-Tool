import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./MultiStepProgress.css";

export const MultiStepProgressBar = (props) => {
  return (
    <ProgressBar
        percent={((props.step - 1) * 100) / 2}
        filledBackground="linear-gradient(to right, #bdc3c7, #2980b9)"
      >
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              className={`step ${accomplished ? "completed" : null}`}
            >
              1
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              className={`step ${accomplished ? "completed" : null}`}
            >
              2
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              className={`step ${accomplished ? "completed" : null}`}
            >
              3
            </div>
          )}
        </Step>
      </ProgressBar>
  )
};