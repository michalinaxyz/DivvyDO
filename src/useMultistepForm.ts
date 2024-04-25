import { useState, useCallback } from "react"; //custom hook od gemini :)

interface Step {
  title: string;
  component: React.ReactNode;
}

export function useMultistepForm(
  initialSteps: Step[]
): [
  currentStep: number,
  steps: Step[],
  goToStep: (newStep: number) => void,
  isFirstStep: boolean,
  isLastStep: boolean
] {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = initialSteps;

  const goToStep = useCallback(
    (newStep: number) => {
      if (newStep >= 0 && newStep < steps.length) {
        setCurrentStep(newStep);
      }
    },
    [steps]
  );

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return [currentStep, steps, goToStep, isFirstStep, isLastStep];
}
