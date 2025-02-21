import TaskCard from './TaskCard';
import { SortableContext } from '@dnd-kit/sortable';
import { useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

const TaskColumn = ({ category, title, tasks, selectedTasks, handleTaskSelection}) => {

  return (
    <div style={{ width: "300px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
    <h3>{title}</h3>
    <SortableContext items={tasks?.map((task) => task._id)} strategy={verticalListSortingStrategy}>
      {tasks.map((task) => ( 
        <TaskCard
          key={task._id}
          index={task.index}
          task={task}
          column={category}
          selected={selectedTasks.includes(task.category)}
          handleTaskSelection={handleTaskSelection}
        />
      ))}
    </SortableContext>
  </div>
  );
};

export default TaskColumn;
