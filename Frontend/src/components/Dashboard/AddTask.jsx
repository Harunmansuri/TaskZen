import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ setAddTaskDiv }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Start",
  });

  const changeHandler = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const addTask = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/add-task",
        task,
        { withCredentials: true }
      );
      alert(response.data.message);

      setAddTaskDiv(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="bg-white rounded px-6 py-5 w-[40%] shadow-lg">
      <h1 className="text-center font-semibold text-xl">Add Task</h1>
      <hr className="mb-4 mt-2" />

      <form onSubmit={addTask} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task Title"
          name="title"
          value={task.title}
          onChange={changeHandler}
          className="px-3 py-2 border rounded outline-none"
          required
        />

        <div className="flex gap-4">
          <div className="w-full">
            <h3 className="mb-1">Priority</h3>
            <select
              name="priority"
              value={task.priority}
              onChange={changeHandler}
              className="border px-2 py-2 rounded w-full"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="w-full">
            <h3 className="mb-1">Status</h3>
            <select
              name="status"
              value={task.status}
              onChange={changeHandler}
              className="border px-2 py-2 rounded w-full"
            >
              <option value="Start">Start</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={changeHandler}
          className="border px-3 py-2 rounded h-[20vh]"
          required
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setAddTaskDiv(false)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
