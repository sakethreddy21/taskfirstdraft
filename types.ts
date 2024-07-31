export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
}

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
  description: string;
  status: string;
  deadline: string;
  timepassed: string;
}