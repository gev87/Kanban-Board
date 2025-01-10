import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard";
import IconButton from "../Buttons";
import { blueTrashIcon, trashIcon } from "../../assets/icons";
import { ITask } from "../../types";
import * as styles from "./Column.module.css";


interface ColumnProps {
  id: string;
  title: string;
  tasks: ITask[];
  icon: string;
  buttonType?: string;
  handleDeleteAll?: () => void;
  handleUpdateTask?: (updatedTask: ITask) => void;
  handleAddTask?: () => void;
}

const Column: React.FC<ColumnProps> = ({
  id,
  title,
  tasks,
  icon,
  buttonType,
  handleDeleteAll,
  handleUpdateTask,
  handleAddTask,
}) => {
  return (
    <div className={styles.column}>
      <h2 className={styles.columnTitle}>
        <img src={icon} alt="icon" />
        {title}
      </h2>
      {buttonType === "add" && (
        <button className={styles.addButton} onClick={handleAddTask}>
          +Добавить
        </button>
      )}
      {buttonType === "remove" && (
        <Droppable droppableId="trash">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.trashBin}
            >
              <IconButton
                altText="remove icon"
                defaultIcon={trashIcon}
                hoverIcon={blueTrashIcon}
                onClick={handleDeleteAll as () => void}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className={styles.droppableArea}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id.toString()}
                draggableId={task.id.toString()}
                index={index}
                isDragDisabled={!!task.isNew}
              >
                {(providedInner) => (
                  <div
                    className={styles.draggableItem}
                    ref={providedInner.innerRef}
                    {...providedInner.draggableProps}
                    {...providedInner.dragHandleProps}
                  >
                    <TaskCard
                      task={task}
                      onUpdateTask={
                        handleUpdateTask as (updatedTask: ITask) => void
                      }
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
