import { useState } from "react";
import { NewWorkoutSetForm } from "./NewWorkoutSetForm";
import axios from "axios";

export interface WorkoutSetDTO {
  id: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface WorkoutDTO {
  id: number;
  title: string;
  date: string;
  sets: WorkoutSetDTO[];
}

interface WorkoutCardProps {
  workout: WorkoutDTO;
  onUpdate?: () => void;
}

export function WorkoutCard({ workout, onUpdate }: WorkoutCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleDeleteSet = async (setId: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta série?")) {
      try {
        await axios.delete(`http://localhost:8080/workout-sets/${setId}`);
        onUpdate?.();
      } catch (error) {
        console.error("Erro ao excluir série:", error);
        alert("Ocorreu um erro ao excluir a série. Por favor, tente novamente.")
      }
    }
  }
  const handleDeleteWorkout = async () => {
    if (window.confirm("Tem certeza que deseja excluir este treino?")) {
      try {
        await axios.delete(`http://localhost:8080/workouts/${workout.id}`);
        onUpdate?.();
      } catch (error) {
        console.error("Erro ao excluir treino:", error);
        alert("Ocorreu um erro ao excluir o treino. Por favor, tente novamente.")
      }
    }
  }
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
      <h2 className="text-2xl font-bold text-gray-800">{workout.title}</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {new Date(workout.date).toLocaleDateString()}
          </span>
          <button
            onClick={handleDeleteWorkout}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Excluir Treino"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {workout.sets && workout.sets.length > 0 ? (
        <ul className="space-y-3">
          {workout.sets.map((set) => (
            <li key={set.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100 group transition-all hover:bg-red-50">
              <span className="font-bold text-gray-700 text-lg">{set.exerciseName}</span>
              <div className="text-gray-600 text-sm flex gap-4">
                <span>{set.sets}x{set.reps} reps</span>
                <span className="font-extrabold text-blue-600 w-16 text-right">{set.weight} kg</span>
                <button
                  onClick={() => handleDeleteSet(set.id)}
                  className="text-red-400 hover:text-red-600 font-extrabold px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Excluir Série"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400 italic">Nenhuma série registrada neste treino.</p>
      )}

      <div className="mt-5 pt-4 border-t border-gray-100">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="text-sm text-blue-600 font-bold hover:text-blue-800 transition flex items-center gap-1"
          >
            + Adicionar Série
          </button>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nova Série</span>
              <button 
                onClick={() => setIsAdding(false)}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Cancelar
              </button>
            </div>
            
            <NewWorkoutSetForm 
              workoutId={workout.id} 
              onSuccess={() => {
                setIsAdding(false); 
                onUpdate?.(); 
              }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}