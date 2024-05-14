export const local = (key, value = undefined) => {
  try {
    if (value !== undefined) {
      if (typeof value === "string") {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } else {
      const item = localStorage.getItem(key);
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
};
