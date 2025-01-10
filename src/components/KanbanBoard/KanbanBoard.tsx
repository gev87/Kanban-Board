import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../Column";
import { COLUMN_DATA } from "../../constants";
import { ITask, ITaskGroup, TaskType } from "../../types";
import { filterTasks, loadInitialTasks } from "../../utils/helpers";
import * as styles from "./KanbanBoard.module.css";


interface KanbanBoardProps {
  searchQuery: string;
  clearSearch: () => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  searchQuery,
  clearSearch,
}) => {
  const [tasks, setTasks] = useState<ITask[]>(loadInitialTasks());

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      return;
    }
    if (destination.droppableId === "trash") {
      setTasks((prev) => prev.filter((t) => t.id != draggableId));
      return;
    }

    setTasks((prev) => {
      const updated = [...prev];
      const movedTask = prev.find((t) => t.id == draggableId) as ITask;

      const columnType = destination.droppableId as ITask["type"];
      movedTask.type = columnType;
      updated.sort((a, b) => a.endDay - b.endDay);
      return updated;
    });
  };

  const deleteAllDone = () => {
    setTasks((prev) => prev.filter((task) => task.type !== "done"));
  };

  const addNewTask = () => {
    clearSearch();
    setTasks((prev) => {
      const newTask: ITask = {
        id: window.crypto.randomUUID(),
        // id: prev.length + 1,
        type: TaskType.TODO,
        startDay: Date.now(),
        endDay: Date.now(),
        text: "Новая задача",
        isNew: true,
      };
      return [newTask, ...prev];
    });
  };

  const updateCurrentTask = (updatedTask: ITask) => {
    setTasks((prev) =>
      prev
        .map((task) =>
          task.id === updatedTask.id ? { ...updatedTask, isNew: false } : task
        )
        .sort((a, b) => a.startDay - b.startDay)
    );
  };

  const filteredTasks = filterTasks(tasks, searchQuery);

  const taskGroups: ITaskGroup = Object.groupBy(
    filteredTasks,
    ({ type }) => type
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.boardContainer}>
        <div className={styles.columnsWrapper}>
          <Column
            tasks={taskGroups.todo || []}
            {...COLUMN_DATA.todo}
            handleAddTask={addNewTask}
            handleUpdateTask={updateCurrentTask}
          />
          <Column
            tasks={taskGroups.in_progress || []}
            {...COLUMN_DATA.in_progress}
          />
          <Column tasks={taskGroups.review || []} {...COLUMN_DATA.review} />
          <Column
            tasks={taskGroups.done || []}
            {...COLUMN_DATA.done}
            handleDeleteAll={deleteAllDone}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
