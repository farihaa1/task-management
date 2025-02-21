import { useContext, useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import AddTask from "./AddTask";
import useAxiosPublic from "../../useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";
import TaskColumn from "./TaskColumn";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const TaskPage = () => {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState({
    doing: [],
    progress: [],
    done: [],
  });
  const [selectedTasks, setSelectedTasks] = useState([]);

  const toggleAddTaskVisibility = () => {
    setIsAddTaskVisible((prevVisibility) => !prevVisibility);
  };

  useEffect(() => {
    axiosPublic.get(`/tasks/${user.email}`).then((res) => {
      const tasks = res.data;
      const categorizedTasks = {
        doing: tasks.filter((task) => task.category === "doing"),
        progress: tasks.filter((task) => task.category === "progress"),
        done: tasks.filter((task) => task.category === "done"),
      };
      setTasks(categorizedTasks);
    });
  }, []);

  const handleTaskSelection = (taskId) => {
    console.log("from dandle selection", taskId);
    setSelectedTasks((prevSelected) => {
      console.log(prevSelected, "prev");
      if (prevSelected.includes(taskId)) {
        return prevSelected.filter((id) => id !== taskId);
      } else {
        return [...prevSelected, taskId];
      }
    });
  };

  // Handle task movement (multi-item drag-and-drop)
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // If no column is hovered, do nothing
    if (!over) {
      console.log("Invalid drop: Over is null.");
      return;
    }

    // If item is dropped on itself, do nothing (this is for the same item drop)
    if (active.id === over.id) {
      console.log("Item dropped on itself.");
      return;
    }

    const sourceColumn = active.data.current.column;
    const destinationColumn = over.data.current.column;

    // If the source and destination columns are different, move the task
    if (sourceColumn !== destinationColumn) {
      const taskToMove = tasks[sourceColumn].find(
        (task) => task.totalIndex === active.id
      );

      if (taskToMove) {
        setTasks((prevTasks) => {
          // Remove the task from the source column
          const updatedSourceColumn = prevTasks[sourceColumn].filter(
            (task) => task.totalIndex !== active.id
          );

          // Add the task to the destination column
          const updatedDestinationColumn = [
            ...prevTasks[destinationColumn],
            taskToMove,
          ];

          console.log(taskToMove._id, "id")
          // Update the task in the database
         const res= axiosPublic.patch(`/tasks/${taskToMove._id}`, {
            column: destinationColumn, // Moving to a new column
          });
          console.log(res ,"frm api")

          return {
            ...prevTasks,
            [sourceColumn]: updatedSourceColumn,
            [destinationColumn]: updatedDestinationColumn,
          };
        });
      }
    }
    // If the task is dropped within the same column (sorting)
    else {
      const taskToMove = tasks[sourceColumn].find(
        (task) => task.totalIndex === active.id
      );
      if (taskToMove) {
        // Sort tasks within the same column
        const sortedTasks = [...tasks[sourceColumn]];
        const currentIndex = sortedTasks.findIndex(
          (task) => task.totalIndex === active.id
        );
        const targetIndex = sortedTasks.findIndex(
          (task) => task.totalIndex === over.id
        );

        // Remove the task from the source and insert it in the correct position
        sortedTasks.splice(currentIndex, 1);
        sortedTasks.splice(targetIndex, 0, taskToMove);

        setTasks((prevTasks) => ({
          ...prevTasks,
          [sourceColumn]: sortedTasks,
        }));
        console.log(taskToMove, "move")
        // Optionally, update the database (if needed)
        axiosPublic.patch(`/tasks/${taskToMove._id}`, {
         
          column: sourceColumn, // This remains the same since we are sorting within the same column
        });
      }
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));
  console.log(tasks, "tasks");

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <TaskColumn
          category="doing"
          title="Doing"
          tasks={tasks?.doing || []}
          selectedTasks={selectedTasks}
          handleTaskSelection={handleTaskSelection}
        />
        <TaskColumn
          category="progress"
          title="In Progress"
          tasks={tasks?.progress || []}
          selectedTasks={selectedTasks}
          handleTaskSelection={handleTaskSelection}
        />
        <TaskColumn
          category="done"
          title="Done"
          tasks={tasks?.done || []}
          selectedTasks={selectedTasks}
          handleTaskSelection={handleTaskSelection}
        />
      </div>
    </DndContext>
  );
};

export default TaskPage;
