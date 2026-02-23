import { useState } from "react";
import { NewWorkoutSetForm } from "./NewWorkoutSetForm";
import axios from "axios";

export interface WorkoutSetDTO {
  id: number;
  exerciseId: number;
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

  const [editingSetId, setEditingSetId] = useState<number | null>(null);
  const [editSets, setEditSets] = useState<number | "">("");
  const [editReps, setEditReps] = useState<number | "">("");
  const [editWeight, setEditWeight] = useState<number | "">("");
  const [editExerciseId, setEditExerciseId] = useState<number>(0);

  const handleDeleteSet = async (setId: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta série?")) {
      try {
        await axios.delete(`http://localhost:8080/workout-sets/${setId}`);
        onUpdate?.();
      } catch (error) {
        console.error("Erro ao excluir série:", error);
        alert("Ocorreu um erro ao excluir a série. Por favor, tente novamente.");
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
        alert("Ocorreu um erro ao excluir o treino. Por favor, tente novamente.");
      }
    }
  }

  const handleSaveEdit = async (setId: number) => {
    try {
      await axios.put(`http://localhost:8080/workout-sets/${setId}`, {
        sets: Number(editSets),
        reps: Number(editReps),
        weight: Number(editWeight),
        workoutId: workout.id,
        exerciseId: editExerciseId
      });
      
      setEditingSetId(null); 
      onUpdate?.(); 
    } catch (error) {
      console.error("Erro ao atualizar série:", error);
      alert("Erro ao atualizar a série. Tente novamente.");
    }
  };

  const inputClass = "border border-gray-300 rounded p-1 text-sm text-center bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none";

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
            <li key={set.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100 group transition-all hover:bg-blue-50">
              
              {editingSetId === set.id ? (
                <div className="flex items-center gap-3 w-full justify-between animate-fade-in">
                  <span className="font-bold text-gray-700 text-sm truncate w-1/3">{set.exerciseName}</span>
                  <div className="flex gap-2 items-center">
                    <input type="number" value={editSets} onChange={e => setEditSets(Number(e.target.value))} className={`w-12 ${inputClass}`} title="Séries" />
                    <span className="text-gray-400 text-sm">x</span>
                    <input type="number" value={editReps} onChange={e => setEditReps(Number(e.target.value))} className={`w-12 ${inputClass}`} title="Repetições" />
                    <input type="number" step="0.5" value={editWeight} onChange={e => setEditWeight(Number(e.target.value))} className={`w-16 ${inputClass}`} title="Peso (kg)" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleSaveEdit(set.id)} className="text-green-600 font-bold hover:text-green-800 text-sm transition">Salvar</button>
                    <button onClick={() => setEditingSetId(null)} className="text-gray-400 hover:text-gray-600 text-sm transition">Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="font-bold text-gray-700 text-lg">{set.exerciseName}</span>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-gray-600 text-sm flex gap-4">
                      <span>{set.sets}x{set.reps} reps</span>
                      <span className="font-extrabold text-blue-600 w-16 text-right">{set.weight} kg</span>
                    </div>
                    
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingSetId(set.id);
                          setEditSets(set.sets);
                          setEditReps(set.reps);
                          setEditWeight(set.weight);
                          setEditExerciseId(set.exerciseId);
                        }}
                        className="text-blue-400 hover:text-blue-600 font-extrabold px-1 transition-colors"
                        title="Editar Série"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDeleteSet(set.id)}
                        className="text-red-400 hover:text-red-600 font-extrabold px-1 transition-colors"
                        title="Excluir Série"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </>
              )}
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