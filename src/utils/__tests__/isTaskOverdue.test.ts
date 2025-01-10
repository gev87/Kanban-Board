import { ITask, TaskType } from "../../types";
import { isTaskOverdue } from "../helpers";

describe("isTaskOverdue utility function", () => {
  const mockToday = new Date("2025-01-01").getTime();

  it("returns true for overdue tasks", () => {
    const task: ITask = {
      id: 1,
      type: TaskType.TODO,
      startDay: mockToday - 86400000,
      endDay: mockToday - 43200000,
      text: "Test overdue task",
    };

    expect(isTaskOverdue(task, mockToday)).toBe(true);
  });

  it("returns false for non-overdue tasks", () => {
    const task: ITask = {
      id: 2,
      type: TaskType.IN_PROGRESS,
      startDay: mockToday,
      endDay: mockToday + 86400000,
      text: "Test active task",
    };

    expect(isTaskOverdue(task, mockToday)).toBe(false);
  });

  it("returns false for completed tasks even if overdue", () => {
    const task: ITask = {
      id: 3,
      type: TaskType.DONE,
      startDay: mockToday - 86400000,
      endDay: mockToday - 43200000,
      text: "Completed task",
    };

    expect(isTaskOverdue(task, mockToday)).toBe(false);
  });
});
