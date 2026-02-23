import { useState } from "react";
import { NewWorkoutSetForm } from "./NewWorkoutSetForm";

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

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h2 className="text-2xl font-bold text-gray-800">{workout.title}</h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {new Date(workout.date).toLocaleDateString()}
        </span>
      </div>

      {workout.sets && workout.sets.length > 0 ? (
        <ul className="space-y-3">
          {workout.sets.map((set) => (
            <li key={set.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="font-bold text-gray-700 text-lg">{set.exerciseName}</span>
              <div className="text-gray-600 text-sm flex gap-4">
                <span>{set.sets}x{set.reps} reps</span>
                <span className="font-extrabold text-blue-600 w-16 text-right">{set.weight} kg</span>
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