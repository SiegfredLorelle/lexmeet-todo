const TASKS_STORAGE_KEY = 'tasks';

export const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};