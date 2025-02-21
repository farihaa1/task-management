import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ index, task, column, selected, handleTaskSelection }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id:task.totalIndex,
      data: { column },
    });
   
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        padding: "10px",
        margin: "5px 0",
        backgroundColor: selected ? "#f39c12" : "#3498db",
        color: "white",
        borderRadius: "5px",
        cursor: "grab",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      initial={{ opacity: 0, x: -50 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 50 }} 
      transition={{ duration: 0.3 }} 
      onClick={() => handleTaskSelection(index)} 
    >
      <strong>{task.title}</strong>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
