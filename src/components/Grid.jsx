import { useState, useEffect } from "react";
import { workoutProgram as trainingPlan } from "../utils/index.js";
import WorkoutCard from "./WorkoutCard.jsx";

export default function Grid() {
  const [savedWorkouts, setSavedWorkouts] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const completedWorkouts = Object.keys(savedWorkouts || {}).filter((key) => {
    const entry = savedWorkouts[key];
    return entry?.isComplete;
  }); // Placeholder for completed workouts logic

  function handleSave(index, data) {
    const newObj = {
      ...savedWorkouts,
      [index]: {
        ...data,
        isComplete:
          !!data.isComplete || // Ensure isComplete is set to false if not provided
          !!savedWorkouts?.[index]?.isComplete,
      },
    };
    setSavedWorkouts(newObj);
    localStorage.setItem("brogram", JSON.stringify(newObj));
    setSelectedWorkout(null);
  }

  function handleComplete(index, data) {
    const newObj = { ...data, isComplete: true };
    handleSave(index, newObj);
  }

  /* Loads previously saved workout data from localStorage when the component mounts
     and initializes the savedWorkouts state with that data (if it exists).*/
  useEffect(() => {
    if (!localStorage) {
      return;
    }
    let savedData = {};
    if (localStorage.getItem("brogram")) {
      savedData = JSON.parse(localStorage.getItem("brogram"));
    }
    setSavedWorkouts(savedData);
  }, []);

  return (
    <div className="training-plan-grid">
      {Object.keys(trainingPlan).map((workoutName, workoutIndex) => {
        const isLocked =
          workoutIndex === 0
            ? false
            : !completedWorkouts.includes(`${workoutIndex - 1}`);

        const types = ["Push", "Pull", "Legs"];
        const type = types[workoutIndex % 3];

        const dailyWorkout = trainingPlan[workoutIndex];
        const dayNum = String(workoutIndex + 1).padStart(2, "0");

        // Determine the icon based on workout type
        const icon =
          type === "Push" ? (
            <i className="fa-solid fa-dumbbell"></i>
          ) : type === "Pull" ? (
            <i className="fa-solid fa-weight-hanging"></i>
          ) : (
            <i className="fa-solid fa-bolt"></i>
          );

        // Show the detailed workout card if this workout is selected
        if (workoutIndex === selectedWorkout) {
          return (
            <WorkoutCard
              key={workoutIndex}
              trainingPlan={dailyWorkout}
              type={type}
              workoutIndex={workoutIndex}
              dayNum={dayNum}
              icon={icon}
              handleSave={handleSave}
              handleComplete={handleComplete}
              savedWeights={savedWorkouts?.[workoutIndex]?.weights}
            />
          );
        }

        // Otherwise, render the normal button
        return (
          <button
            onClick={() => {
              if (isLocked) {
                return;
              }
              setSelectedWorkout(workoutIndex);
            }}
            className={"card plan-card " + (isLocked ? "inactive" : "")}
            key={workoutIndex}
          >
            <div className="plan-card-header">
              <p>Day {dayNum}</p>
              {isLocked ? <i className="fa-solid fa-lock"></i> : icon}
            </div>

            <div className="plan-card-header">
              <strong>{type}</strong>
            </div>
          </button>
        );
      })}
    </div>
  );
}
