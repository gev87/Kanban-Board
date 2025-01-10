import React, { useState } from "react";
import IconButton from "../Buttons";
import {
  blueEditIcon,
  checkIcon,
  crossIcon,
  editIcon,
} from "../../assets/icons";
import { ITask } from "../../types";
import { isTaskOverdue } from "../../utils/helpers";
import * as styles from "./TaskCard.module.css";


interface TaskCardProps {
  task: ITask;
  onUpdateTask: (updatedTask: ITask) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(!!task.isNew); 
  const initialEdit = {
    text: task.text,
    startDay: task.startDay,
    endDay: task.endDay,
  };

  const [edit, setEdit] = useState(initialEdit);

   const today = Date.now();
   const isOverdue = isTaskOverdue(task, today);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdateTask({ ...task, ...edit });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEdit(initialEdit);
    setIsEditing(false);
    if (task.isNew) {
      onUpdateTask(task);
    }
  };

  if (!isEditing) {
    return (
      <div className={styles.taskCard}>
        <div>
          Начало:{" "}
          <strong>{new Date(task.startDay).toLocaleDateString("ru-RU")}</strong>
        </div>
        <div>
          Окончание:{" "}
          <strong className={isOverdue ? styles.expired : ""}>
            {new Date(task.endDay).toLocaleDateString("ru-RU")}
          </strong>
        </div>
        <div>
          Описание: <strong>{task.text}</strong>
        </div>
        {task.type === "todo" && (
          <IconButton
            className={styles["add-button"]}
            defaultIcon={editIcon}
            hoverIcon={blueEditIcon}
            onClick={handleEditClick}
            hasCircle
          />
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.taskCard}>
        <div>
          Начало:{" "}
          <input
            type="date"
            value={new Date(edit.startDay).toISOString().split("T")[0]}
            onChange={(event) =>
              setEdit((edit) => ({
                ...edit,
                startDay: new Date(event.target.value).getTime(),
              }))
            }
            className={styles.dateInput}
          />
        </div>
        <div>
          Окончание:{" "}
          <input
            type="date"
            value={new Date(edit.endDay).toISOString().split("T")[0]}
            onChange={(event) =>
              setEdit((edit) => ({
                ...edit,
                endDay: new Date(event.target.value).getTime(),
              }))
            }
            className={styles.dateInput}
          />
        </div>
        <div>
          Описание:{" "}
          <textarea
            value={edit.text}
            onChange={(event) =>
              setEdit((edit) => ({ ...edit, text: event.target.value }))
            }
            rows={1}
            className={styles.multilineInput}
          />
        </div>
        <div className={styles.buttonRow}>
          <IconButton
            className={styles["add-button"]}
            defaultIcon={crossIcon}
            onClick={handleCancelClick}
            hasCircle
          />
          <IconButton
            className={styles["add-button"]}
            defaultIcon={checkIcon}
            onClick={handleSaveClick}
            hasCircle
          />
        </div>
      </div>
    );
  }
};

export default TaskCard;
