import React, { useState, useEffect } from "react";
import Dice from "./components/Dice";
import Confetti from "./components/Confetti";
import StudentDisplay from "./components/StudentDisplay";
import { supabase } from "./supabase";
import goatStatic from "./assets/goatStatic.png";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const topics = [
    "Aptitude",
    "Debugging",
    "Coding objective",
    "Code explanation",
    "Seminar",
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase.from("AIDS-A").select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setStudents(data);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000); // Adjust duration if needed
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleStudentRollComplete = () => {
    const studentsWithMaxWeight = students.filter(
      (student) => student.Weight === 10
    );
    const eligibleStudents = students.filter((student) => student.Weight > 0);

    if (studentsWithMaxWeight.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * studentsWithMaxWeight.length
      );
      const selected = studentsWithMaxWeight[randomIndex];
      setSelectedStudent(selected);
    } else if (eligibleStudents.length > 0) {
      const sortedStudents = eligibleStudents.sort(
        (a, b) => b.Weight - a.Weight
      );
      const weightedStudents = sortedStudents.flatMap((student) =>
        Array(student.Weight * 2).fill(student)
      );
      const randomIndex = Math.floor(Math.random() * weightedStudents.length);
      const selected = weightedStudents[randomIndex];
      setSelectedStudent(selected);
    }

    setSelectedTopic(null);
    setShowConfetti(true);
  };

  const handleTopicRollComplete = () => {
    if (topics.length > 0) {
      const randomIndex = Math.floor(Math.random() * topics.length);
      const selected = topics[randomIndex];
      setSelectedTopic(selected);
      setShowConfetti(true);
    }
  };

  const handleComplete = async (newMarks) => {
    if (selectedStudent) {
      let newWeight;

      if (newMarks === 10 || newMarks === 9) {
        newWeight = 0; // Set to 1 if full marks
      } else {
        newWeight = Math.max(1, 10 - Math.floor(newMarks / 2));
      }

      const updatedStudents = students.map((student) =>
        student.id === selectedStudent.id
          ? {
              ...student,
              Marks: newMarks,
              Weight: newWeight,
              Topic: selectedTopic, // Update the Topic here
            }
          : student
      );

      const { error } = await supabase
        .from("AIDS-A")
        .update({ Marks: newMarks, Weight: newWeight, Topic: selectedTopic })
        .eq("id", selectedStudent.id);

      if (error) {
        console.error("Error updating student:", error);
      }

      setStudents(updatedStudents);
      setSelectedStudent(null);
      setSelectedTopic(null);
    }
  };

  return (
    <div className="App">
      <img
        src={goatStatic}
        alt="Goat"
        style={{
          width: "650px",
          height: "300px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <h1>Today's Scape Goat</h1>
      <h1>Indriya Bali Aadu</h1>
      <div className="dice-container">
        <div className="student-section">
          <Dice onRollComplete={handleStudentRollComplete} />
          {selectedStudent && (
            <StudentDisplay
              student={selectedStudent}
              onComplete={(newMarks) => handleComplete(newMarks)}
            />
          )}
        </div>
        <div className="topic-section">
          {selectedStudent && <Dice onRollComplete={handleTopicRollComplete} />}
          {selectedTopic && (
            <div>
              <h2>Topic: {selectedTopic}</h2>
            </div>
          )}
        </div>
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
}

export default App;
