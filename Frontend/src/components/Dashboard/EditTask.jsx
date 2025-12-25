import React, { useState } from "react";
import axios from "axios";

const EditTask = ({ task, setEditTaskDiv, refreshTasks }) => {
  const [formData, setFormData] = useState(task);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateTask = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:3000/api/v1/edit-task/${task._id}`,
      formData,
      { withCredentials: true }
    );
    refreshTasks();
    setEditTaskDiv(false);
  };

  const deleteTask = async () => {
    await axios.delete(
      `http://localhost:3000/api/v1/delete-task/${task._id}`,
      { withCredentials: true }
    );
    refreshTasks();
    setEditTaskDiv(false);
  };

  return (
    <div className="bg-white rounded px-6 py-5 w-[40%] shadow-lg">
      <h1 className="text-xl font-semibold text-center">Edit Task</h1>
      <hr className="my-3" />

      <form onSubmit={updateTask} className="flex flex-col gap-4">
        <input
          name="title"
          value={formData.title}
          onChange={changeHandler}
          className="border px-3 py-2 rounded"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={changeHandler}
          className="border px-3 py-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={changeHandler}
          className="border px-3 py-2 rounded"
        >
          <option>Start</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={changeHandler}
          className="border px-3 py-2 rounded"
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={deleteTask}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditTaskDiv(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
