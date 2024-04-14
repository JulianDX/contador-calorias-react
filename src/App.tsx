import { useEffect, useMemo } from "react";
import Form from "./components/Form";
import Activity from "./components/Activity";
import { Activity as ActivityT } from "./types";
import { Resumen } from "./components/Resumen";
import { useFormData } from "./hooks/useContext";

function App() {
  const { state, dispatch } = useFormData();

  useEffect(() => {
    saveLocalStorage(state.activities);
  }, [state.activities]);

  const saveLocalStorage = (activities: ActivityT[]) => {
    localStorage.setItem("activities", JSON.stringify(activities));
  };

  useEffect(() => {
    let activities = localStorage.getItem("activities");
    if (activities !== null) {
      let activitiesToLoad = JSON.parse(activities);
      dispatch({ type: "loadActivitiesFromLS", payload: activitiesToLoad });
    }
  }, []);

  const reiniciarApp = () => {
    dispatch({ type: "resetActivities", payload: [] });
  };

  const canRestart = useMemo(() => {
    if (state.activities.length === 0) {
      return true;
    } else {
      return false;
    }
  }, [state]);

  return (
    <>
      <div className="bg-sky-950">
        <header className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between py-4">
          <h1 className="text-white text-3xl font-semibold mx-auto md:mx-0">
            Contador de Calorías
          </h1>
        </header>
      </div>

      <section className="bg-sky-600 px-2">
        <div className="max-w-4xl mx-auto py-20">
          <Form />
        </div>
      </section>

      <section className="bg-gray-900 py-10">
        <h2 className="text-white text-4xl font-semibold text-center mb-10">
          Resumen Calórico
        </h2>
        <Resumen />
      </section>

      <section className="bg-gray-100">
        <div className="max-w-2xl mx-auto py-10">
          <div className="flex flex-col md:flex-row justify-between">
            <h2 className="text-gray-700 text-3xl font-semibold text-center mb-10">
              Comida y Ejercicio
            </h2>
            <div className="w-3/4 mx-auto md:w-auto md:mx-0">
              <button
                onClick={reiniciarApp}
                className="w-full text-white md:w-auto md:rounded bg-red-700 hover:bg-red-800 transition ease-linear p-2 px-4 font-semibold my-7 md:my-0 border-b-4 border-red-600 md:border-transparent hover:border-red-600 hover:border-b-4 disabled:opacity-20 disabled:border-transparent disabled:bg-red-800"
                disabled={canRestart}
              >
                Borrar Todo
              </button>
            </div>
          </div>
          {state.activities.length === 0 && (
            <p className="text-xl text-center">
              Aún no hay Actividades o Comidas agregadas
            </p>
          )}
          <Activity />
        </div>
      </section>
    </>
  );
}

export default App;
