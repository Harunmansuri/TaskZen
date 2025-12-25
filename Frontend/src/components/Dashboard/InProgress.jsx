import React from "react";
import TaskCard from "./TaskCard";

const InProgress = ({ tasks = [], onTaskClick }) => {
  if (tasks.length === 0) {
    return <p className="text-sm text-gray-400">No tasks yet</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          data={task}
          onClick={onTaskClick}   // ✅ yahi missing tha
        />
      ))}
    </div>
  );
};

export default InProgress;
