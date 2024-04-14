import { useMemo } from "react";
import { useFormData } from "../hooks/useContext";



export const Resumen = () => {
  const {state} = useFormData();
  const {activities} = state;
  const calorias = useMemo(() => {
    if (activities.length) {
      return activities.reduce((total, activity) => {
        if (activity.category === 1) {
          return total + activity.calories;
        }
        return total;
      }, 0);
    } else {
      return 0;
    }
  }, [activities]);

  const ejercicio = useMemo(() => {
    if (activities.length) {
      return activities.reduce((total, activity) => {
        if (activity.category === 2) {
          return total + activity.calories;
        }
        return total;
      }, 0);
    } else {
      return 0;
    }
  }, [activities]);

  const restante = useMemo(() => {
    return calorias - ejercicio;
  }, [activities]);

  return (
    <div className="grid md:grid-cols-3 max-w-7xl mx-auto text-center px-4">
      <div className="p-4">
        <h3 className="text-white text-7xl font-semibold text-center">
          {calorias}
        </h3>
        <p className="text-white text-xl font-semibold">Consumidas</p>
      </div>
      <div className="p-4">
        <h3 className="text-white text-7xl font-semibold text-center">
          {ejercicio}
        </h3>
        <p className="text-white text-xl font-semibold">Ejercicio</p>
      </div>
      <div className="p-4">
        <h3 className="text-white text-7xl font-semibold text-center">
          {restante}
        </h3>
        <p className="text-white text-xl font-semibold">Por Quemar</p>
      </div>
    </div>
  );
};
