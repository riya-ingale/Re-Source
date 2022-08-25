import React, { useState, useEffect, useRef } from "react";
import {mobile} from "../Css/responsive";
import {mobileL} from "../Css/responsive";
import {tabet} from "../Css/responsive";
import styled from "styled-components";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    console.log(newSteps);
    let count = 0;
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      //step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-teal-600">
          <div
            className={`text-blue rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3  ${
              step.selected
                ? "bg-blue-600 text-white font-bold border border-blue-600 "
                : ""
            }`}
          >
            {step.completed ? (
              <span className="text-white font-bold text-xl ">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`absolute top-0 text-center mt-16 w-19 text-xs font-medium uppercase ${
              step.highlighted ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
            step.completed ? "border-blue-600" : "border-gray-300 "
          }  `}
        ></div>
      </div>
    );
  });
  
    
 const AddResourceSteps = styled.div`
  flex-direction: row;
  ${mobile({ flexDirection: "column" })}
 `;

  return (
    <div className="mx-1 p-4 flex items-center AddResoureSteps">
      {stepsDisplay}
    </div>
  );
};
export default Stepper;
