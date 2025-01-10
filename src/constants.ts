import {
  ghostIcon,
  happyIcon,
  smileIcon,
  upsideDownIcon,
} from "./assets/icons";

export const COLUMN_DATA = {
  todo: { id: "todo", title: "To Do", icon: happyIcon, buttonType: "add" },
  in_progress: { id: "in_progress", title: "In Progress", icon: smileIcon },
  review: { id: "review", title: "Review", icon: upsideDownIcon },
  done: { id: "done", title: "Done", icon: ghostIcon, buttonType: "remove" },
};
