import { useState } from "react";
import storyBeatsData from "./data/storyBeats.json"; // Importing your JSON data
import Beat from "./components/Beat"; // Import Beat component
import "./App.css";

export default function App() {
  // Convert the storyBeatsData object into an array of objects
  const storyBeatsArray = Object.keys(storyBeatsData).map((key) => ({
    name: key,
    ...storyBeatsData[key]
  }));


  // State to toggle visibility of the beats
  const [isVisible, setIsVisible] = useState(true);

  // Toggle visibility function
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

    // State to toggle visibility of the beats
    const [showAllInput, setShowAllInput] = useState(true);

    // Toggle visibility function
    const toggleText = () => {
      setShowAllInput(!showAllInput);
    };
  

  return (<div>
    <h1>Save the Cat! Outliner</h1>
    <div className="content">

<div class="buttons">
<button onClick={toggleVisibility}>
        {isVisible ? "Hide All Buttons" : "Show All Buttons"}
      </button>
      {isVisible && <button className="gap" onClick={toggleText}>Toggle Text</button>}</div>
      {storyBeatsArray.map((beat) => (
        <Beat
          key={beat.name}
          name={beat.name}
          description={beat.description}
          purpose={beat.purpose}
          isVisible={isVisible}
          showAllInput={showAllInput}
        />
      ))}
    </div>
    <div className="footerWrapper">
    <footer className="footer">
        <p>
          Inspired by "Save the Cat! Writes a Novel" by Jessica Brody
        </p>
      </footer>
    </div></div>
  );
}
