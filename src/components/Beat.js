import React, { useState, useEffect } from "react";

export default function Beat({
  name,
  description,
  purpose,
  isVisible,
  showAllInput,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState("Your text goes here.");
  const [showInput, setShowInput] = useState(false);

  // Check localStorage for existing input and load it when component mounts
  useEffect(() => {
    const savedInput = localStorage.getItem(name);
    if (savedInput) {
      setInputText(savedInput); // Load saved input if it exists
    }
  }, [name]);

  // Handle input changes
  const handleChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    localStorage.setItem(name, text); // Save input to localStorage as user types
  };

  // Handle delete action
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your input?");
    if (confirmDelete) {
      setInputText("Your text goes here."); // Reset to default text
      localStorage.setItem(name, "Your text goes here."); // Save default text to localStorage
    }
  };

  useEffect(() => {
    setShowInput(showAllInput);
  }, [showAllInput]);

  // Toggle between user input and explanation
  const toggleInputExplanation = () => {
    setShowInput(!showInput);
  };

  // Toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (!isVisible) {
      setIsEditing(false);
    }
  }, [isVisible]);

  return (
    <div className="story-beat">
      <div className="story-beat-header">
        <h2>{name}</h2>
        {isVisible && (
          <button onClick={toggleInputExplanation}>
            {showInput ? "Show Explanation" : "Show My Input"}
          </button>
        )}
      </div>

      {/* Show either user input or explanation */}
      {showInput ? (
        isEditing ? (
          <div>
            <textarea
              value={inputText}
              onChange={handleChange}
              rows="8"
              cols="125"
            />
            {isVisible && (
              <>
                <button className="saveButton" onClick={toggleEditing}>Save</button>
                <button className="deleteButton gap" onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        ) : (
          <div>
            <p>{inputText}</p>
            {isVisible && (
                <button onClick={toggleEditing}>Edit</button>
            )}
          </div>
        )
      ) : (
        <div>
          <p><strong>Explanation:</strong> {description}</p>
          <p><strong>Purpose:</strong> {purpose}</p>
        </div>
      )}
    </div>
  );
}
