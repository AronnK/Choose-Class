import React, { useState } from "react";

function StudentDisplay({ student, onComplete }) {
  const [marks, setMarks] = useState("");

  const handleMarksChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value <= 10)) {
      setMarks(value);
    }
  };

  const handleSubmit = () => {
    const newMarks = parseInt(marks, 10);
    if (!isNaN(newMarks) && newMarks >= 1 && newMarks <= 10) {
      onComplete(newMarks);
    }
  };

  return (
    <div>
      <h2>{student.Name}</h2>
      <input
        type="password"
        value={marks}
        onChange={handleMarksChange}
        placeholder="Enter marks (1-10)"
      />
      <button onClick={handleSubmit}>Submit Marks</button>
    </div>
  );
}

export default StudentDisplay;
