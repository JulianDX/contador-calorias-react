import { useFormData } from "../hooks/useContext";
import { Activity as ActivityType } from "../types";
import { PencilSquareIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

const Activity = () => {

  const {state, dispatch} = useFormData();

  const formatCategory = (category: ActivityType["category"]) => {
    if (category === 1) {
      return "Comida";
    } else {
      return "Ejercicio";
    }
  };

  return (
    <>
      <div className="space-y-5 px-2 md:px-0">
        {state.activities.map((activity) => {
          return (
            <div
              key={activity.id}
              className="bg-white border rounded-lg flex justify-between p-4"
            >
              <div className="text-left">
                <p
                  className={`text-white inline-block p-2 px-5 -mt-2 -ml-7 font-semibold ${
                    activity.category === 1 ? "bg-orange-600" : "bg-sky-600"
                  }`}
                >
                  {formatCategory(activity.category)}
                </p>
                <div className="py-2">
                  <h2 className="text-gray-700 text-3xl font-semibold">
                    {activity.activity}
                  </h2>
                  <p className="text-gray-700 text-xl font-semibold">
                    Calorías:{" "}
                    <span className="font-normal">{activity.calories}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <PencilSquareIcon
                  onClick={() => {
                    dispatch({
                      type: "setId",
                      payload: `${activity.id}`,
                    });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="h-8 w-8 text-blue-500 cursor-pointer"
                />
                <MinusCircleIcon
                  className="h-8 w-8 text-red-500 cursor-pointer"
                  onClick={() => {
                    dispatch({
                      type: "deleteActivity",
                      payload: `${activity.id}`,
                    });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Activity;
