import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard"

const TaskColumn = ({ id, category, title, tasks, selectedTasks, handleTaskSelection }) => {
  console.log(category, "task column")
  const { setNodeRef } = useDroppable({ id: category });
  

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "300px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        minHeight: "400px", // Ensures the column is always droppable
      }}
    >
      <h3>{title}</h3>
      <SortableContext
         items={tasks.length ? tasks.map((task) => task.totalIndex) : ["placeholder"]}
        strategy={verticalListSortingStrategy}
      >
        {tasks.length ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              index={task.index}
              task={task}
              column={category}
              selected={selectedTasks.includes(task.category)}
              handleTaskSelection={handleTaskSelection}
            />
          ))
        ) : (
          <div
            style={{
              padding: "10px",
              margin: "5px 0",
              backgroundColor: "#f0f0f0",
              color: "#999",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            Drop tasks here
          </div>
        )}
      </SortableContext>
    </div>
  );
};

export default TaskColumn;
