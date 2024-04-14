import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export const useFormData = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useFormData must be used within an ActivityProvider");
  }
  return context;
};
