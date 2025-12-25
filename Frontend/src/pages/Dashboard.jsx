import React, { useEffect, useState } from "react";
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";
import StackTitle from "../components/Dashboard/StackTitle";
import YetToStart from "../components/Dashboard/YetToStart";
import InProgress from "../components/Dashboard/InProgress";
import Completed from "../components/Dashboard/Completed";
import EditTask from "../components/Dashboard/EditTask";
import axios from "axios";

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState(false);
  const [editTaskDiv, setEditTaskDiv] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [tasks, setTasks] = useState({
    yetToStart: [],
    inProgress: [],
    completed: [],
  });

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/users/userDetails",
        { withCredentials: true }
      );
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Header setAddTaskDiv={setAddTaskDiv} />

      {/* Add Task Modal */}
      {addTaskDiv && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <AddTask setAddTaskDiv={setAddTaskDiv} />
          </div>
        </>
      )}

      {/* Edit Task Modal */}
      {editTaskDiv && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <EditTask
              task={selectedTask}
              setEditTaskDiv={setEditTaskDiv}
              refreshTasks={fetchTasks}
            />
          </div>
        </>
      )}

      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh]">
        <div className="w-1/3">
          <StackTitle title="Yet To Do" />
          <YetToStart
            tasks={tasks.yetToStart}
            onTaskClick={(task) => {
              setSelectedTask(task);
              setEditTaskDiv(true);
            }}
          />
        </div>

        <div className="w-1/3">
          <StackTitle title="In Progress" />
          <InProgress
            tasks={tasks.inProgress}
            onTaskClick={(task) => {
              setSelectedTask(task);
              setEditTaskDiv(true);
            }}
          />
        </div>

        <div className="w-1/3">
          <StackTitle title="Completed" />
          <Completed
            tasks={tasks.completed}
            onTaskClick={(task) => {
              setSelectedTask(task);
              setEditTaskDiv(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
