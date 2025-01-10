import { ITask } from "../types";
import tasksData from "../data/tasks.json";


export function isTaskOverdue(
  task: ITask,
  today: number = Date.now()
): boolean {
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);
  return task.type !== "done" && task.endDay < startOfToday.getTime();
}

export function filterTasks(tasks: ITask[], searchQuery: string): ITask[] {
  if (searchQuery.trim() === "") return tasks;

  const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
  const match = searchQuery.match(dateRegex);

  if (match) {
    const [_, day, month, year] = match;
    const inputDate = new Date(Number(year), Number(month) - 1, Number(day));
    const inputTime = inputDate.setHours(0, 0, 0, 0);

    return tasks.filter((task) => {
      const startTime = new Date(task.startDay).setHours(0, 0, 0, 0);
      const endTime = new Date(task.endDay).setHours(0, 0, 0, 0);
      return startTime === inputTime || endTime === inputTime;
    });
  } else {
    return tasks.filter((task) =>
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}

export function loadInitialTasks(): ITask[] {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as ITask[];
      return parsed.sort((a, b) => a.startDay - b.startDay);
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
    }
  }
  return [...(tasksData as ITask[])].sort((a, b) => a.startDay - b.startDay);
}
