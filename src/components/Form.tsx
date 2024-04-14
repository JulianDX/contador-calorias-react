import { Activity, Category } from "../types";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { v4 as uuid } from "uuid";
import { useFormData } from "../hooks/useContext";

const categories: Category[] = [
  { id: 1, name: "Comida" },
  { id: 2, name: "Ejercicio" },
];

const initialState: Activity = {
  id: "",
  category: 1,
  activity: "",
  calories: 0,
};

const Form = () => {
  const [formData, setFormData] = useState<Activity>(initialState);

  const {state, dispatch} = useFormData();

  useEffect(() => {
    if (state.activities.length && state.activeId !== "") {
      const itemEditing = state.activities.filter((activity) => {
        return activity.id === state.activeId;
      });
      if (itemEditing) {
        setFormData(itemEditing[0]);
      }
    }
  }, [state]);

  const [button, setButton] = useState(true);

  useEffect(() => {
    formData.activity.trim() !== "" && formData.calories > 0
      ? setButton(false)
      : setButton(true);
  }, [formData]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.activeId === "") {
      dispatch({
        type: "saveActivity",
        payload: { ...formData, id: uuid() },
      });
    } else {
      dispatch({
        type: "updateActivity",
        payload: formData,
      });
    }
    reiniciarFormulario();
  };

  const reiniciarFormulario = () => {
    setFormData(initialState);
    dispatch({
      type: "setId",
      payload: "",
    });
  };

  const validateCalories = (e: ChangeEvent<HTMLInputElement>) => {
    const number = parseInt(e.target.value);
    if (!isNaN(number)) {
      setFormData({ ...formData, calories: number });
    } else {
      setFormData({ ...formData, calories: 0 });
    }
  };

  return (
    <form
      className="bg-white rounded-lg p-10 shadow-lg space-y-5"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block pb-3 font-bold" htmlFor="category">
          Categoría
        </label>
        <select
          className="w-full p-2 border rounded-lg border-slate-400"
          name="category"
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: +e.target.value })
          }
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block pb-3 font-bold" htmlFor="activity">
          {`${formData.category === 2 ? "Actividad" : "Alimento"}`}
        </label>
        <input
          className="w-full p-2 border rounded-lg border-slate-400"
          type="text"
          id="activity"
          placeholder={`${
            formData.category === 2
              ? "Correr, Gimnasio, Fútbol..."
              : "Hamburguesa, Manzana, Soda..."
          }`}
          name="activity"
          value={formData.activity}
          onChange={(e) =>
            setFormData({ ...formData, activity: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block pb-3 font-bold" htmlFor="calories">
          Calorías
        </label>
        <input
          className="w-full p-2 border rounded-lg border-slate-400"
          type="tel"
          id="calories"
          name="calories"
          value={formData.calories}
          onChange={(e) => validateCalories(e)}
        />
      </div>
      <input
        className="bg-black text-white py-3 w-full font-bold cursor-pointer disabled:bg-opacity-30 disabled:cursor-auto"
        type="submit"
        value={`Guardar ${formData.category === 1 ? "Comida" : "Ejercicio"}`}
        disabled={button}
      />
    </form>
  );
};

export default Form;
