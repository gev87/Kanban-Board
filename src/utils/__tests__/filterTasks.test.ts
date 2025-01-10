import { ITask, TaskType } from "../../types";
import { filterTasks } from "../helpers";

const mockTasks: ITask[] = [
  {
    id: 1,
    type: TaskType.TODO,
    startDay: new Date("2025-01-01").getTime(),
    endDay: new Date("2025-01-02").getTime(),
    text: "Task 1",
  },
  {
    id: 2,
    type: TaskType.IN_PROGRESS,
    startDay: new Date("2025-01-03").getTime(),
    endDay: new Date("2025-01-04").getTime(),
    text: "Important Task",
  },
  {
    id: 3,
    type: TaskType.DONE,
    startDay: new Date("2025-01-05").getTime(),
    endDay: new Date("2025-01-06").getTime(),
    text: "Task 3",
  },
];

describe("filterTasks utility function", () => {
  it("returns all tasks when the search query is empty", () => {
    const result = filterTasks(mockTasks, "");
    expect(result).toEqual(mockTasks);
  });

  it("filters tasks by text", () => {
    const result = filterTasks(mockTasks, "important");
    expect(result).toEqual([mockTasks[1]]);
  });

  it("filters tasks by startDay date", () => {
    const result = filterTasks(mockTasks, "01.01.2025");
    expect(result).toEqual([mockTasks[0]]);
  });

  it("filters tasks by endDay date", () => {
    const result = filterTasks(mockTasks, "06.01.2025");
    expect(result).toEqual([mockTasks[2]]);
  });

  it("returns no tasks if the query doesn't match anything", () => {
    const result = filterTasks(mockTasks, "Nonexistent");
    expect(result).toEqual([]);
  });
});
