import { useEffect, useState } from "react";
import axios from "axios";
import { WorkoutCard, type WorkoutDTO } from "./components/WorkoutCard";
import { NewWorkoutForm } from "./components/NewWorkoutForm";
import { NewExerciseForm } from "./components/ExerciseForm";
import { Login } from "./components/Login";

interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

type View = "list" | "new" | "exercise";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const [workouts, setWorkouts] = useState<WorkoutDTO[]>([]);
  const [view, setView] = useState<View>("list");

  function fetchWorkouts() {
    axios
      .get<Page<WorkoutDTO>>("http://localhost:8080/workouts/user/1?page=0&linesPerPage=10")
      .then((response) => setWorkouts(response.data.content))
      .catch((error) => console.error("Error fetching workouts:", error));
  }
  useEffect(() => {
    if (isAuthenticated) {
      fetchWorkouts();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  function handleWorkoutCreated() {
    fetchWorkouts();
    setView("list");
  }
  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-4xl font-extrabold text-blue-600">
            Ironlog
          </h1>
          <button
            onClick={handleLogout}
            className="text-red-500 font-bold hover:text-red-700 text-sm transition"
          >
            Sair da Conta
          </button>
        </div>
        <div className="flex justify-end mb-6">
          {view !== "list" ? (
            <button
              onClick={() => setView("list")}
              className="text-gray-500 hover:text-gray-700 font-medium transition"
            >
              ← Voltar
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setView("exercise")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-5 py-2 rounded-xl transition"
              >
                + Exercício
              </button>
              <button
                onClick={() => setView("new")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl transition"
              >
                + Novo Treino
              </button>
            </div>
          )}
        </div>
        {view === "new" ? (
          <NewWorkoutForm userId={1} onSuccess={handleWorkoutCreated} />
        ) : view === "exercise" ? (
          <NewExerciseForm onSuccess={() => setView("list")} />
        ) : workouts.length === 0 ? (
          <p className="text-gray-500 text-lg text-center animate-pulse">
            Nenhum treino encontrado ou a carregar...
          </p>
        ) : (
          <div className="space-y-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} onUpdate={fetchWorkouts}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default App;