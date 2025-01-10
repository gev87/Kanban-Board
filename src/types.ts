export enum TaskType {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  DONE = "done",
}

export interface ITask {
  id: number | string;
  type: TaskType;
  startDay: number;
  endDay: number;
  text: string;
  isNew?: boolean;
}

export interface ITaskGroup {
  [TaskType.TODO]?: ITask[];
  [TaskType.IN_PROGRESS]?: ITask[];
  [TaskType.REVIEW]?: ITask[];
  [TaskType.DONE]?: ITask[];
}
