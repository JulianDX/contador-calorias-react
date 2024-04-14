import { Activity, formDataState } from "../types";

export type formDataActions =
  | { type: "saveActivity"; payload: Activity }
  | { type: "setId"; payload: string }
  | { type: "updateActivity"; payload: Activity }
  | { type: "deleteActivity"; payload: string }
  | { type: "loadActivitiesFromLS"; payload: Activity[] }
  | { type: "resetActivities"; payload: [] };

const localActivities = () => {
  const activities = localStorage.getItem("activities");
  if (activities) {
    const storage = JSON.parse(activities);
    return storage;
  } else {
    return [];
  }
};

export const initialState: formDataState = {
  activities: localActivities(),
  activeId: "",
};

export const formDataReducer = (
  state: typeof initialState,
  action: formDataActions
) => {
  switch (action.type) {
    case "saveActivity":
      const newActivity: Activity = action.payload;
      return {
        ...state,
        activities: [...state.activities, newActivity],
      };
    case "setId":
      return {
        ...state,
        activeId: action.payload,
      };
    case "updateActivity":
      const activityToUpdate: Activity = action.payload;
      const updatedActivities: Activity[] = state.activities.map(
        (activity: Activity) => {
          if (activity.id === activityToUpdate.id) {
            return activityToUpdate;
          }
          return activity;
        }
      );
      return {
        ...state,
        activities: updatedActivities,
      };
    case "deleteActivity":
      const activityToDelete: string = action.payload;
      const updatedActivities2: Activity[] = state.activities.filter(
        (activity: Activity) => activity.id !== activityToDelete
      );
      return {
        ...state,
        activities: updatedActivities2,
      };
    case "loadActivitiesFromLS":
      const activitiesFromLS: Activity[] = action.payload;
      return {
        ...state,
        activities: activitiesFromLS,
      };
    case "resetActivities":
      return {
        ...state,
        activeId: "",
        activities: action.payload,
      };
    default:
      return state;
  }
};
