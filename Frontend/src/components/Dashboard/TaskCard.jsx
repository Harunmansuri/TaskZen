const TaskCard = ({ data, onClick }) => {
  if (!data) return null;

  return (
    <button
      onClick={() => onClick(data)}
      className="bg-white rounded px-4 py-3 w-full hover:shadow transition-all duration-300 text-left"
    >
      <div className="flex justify-between">
        <h1 className="text-lg font-medium truncate">{data.title}</h1>

        <span
          className={`text-xs px-3 py-1 rounded-full
            ${data.priority === "High"
              ? "bg-red-100 text-red-600"
              : data.priority === "Medium"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"}
          `}
        >
          {data.priority}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-2">{data.description}</p>
    </button>
  );
};

export default TaskCard;
