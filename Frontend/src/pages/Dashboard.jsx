import React, { useState } from "react";
import Header from "../components/Dashboard/Header.jsx";
import AddTask from "../components/Dashboard/AddTask.jsx";

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState(false);

  return (
    <div className="w-full relative">
      <Header setAddTaskDiv={setAddTaskDiv} />

      {/* Overlay */}
      {addTaskDiv && (
        <>
          <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-60 z-40"></div>

          <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
            <AddTask setAddTaskDiv={setAddTaskDiv} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
