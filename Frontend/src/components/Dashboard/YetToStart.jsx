import React from "react";
import TaskCard from "./TaskCard";


const YetToStart = ({ tasks = [], onTaskClick }) => {
  return (
    <div className="flex flex-col gap-2">
      {tasks.length ? (
        tasks.map(task => (
          <TaskCard
            key={task._id}
            data={task}
            onClick={onTaskClick}
          />
        ))
      ) : (
        <p className="text-sm text-gray-400">No tasks yet</p>
      )}
    </div>
  );
};
export default YetToStart;