import React from "react";
import { useState } from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import { UseContextProvider } from "./StepperContext";
import Resources from "./steps/Resources";
import Details from "./steps/Details";
import Cost from "./steps/Cost";
import Final from "./steps/Final";

import '../Css/addres.css';

export default function AddResources() {
    const [currentStep, setCurrentStep] = useState(1);
    // console.log(sessionStorage.getItem('username'));
  const steps = [
    "Resources",
    "Details",
    "Cost",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Resources />;
      case 2:
        return <Details />;
      case 3:
        return <Cost />;
      case 4:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <div className="my-20 mx-auto rounded-2xl card pb-1 bg-white shadow-2xl border-solid border-2 border-blue-600 md:w-1/2 resource-card">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}
