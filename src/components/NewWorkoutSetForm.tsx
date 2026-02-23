import { useEffect, useState } from "react";
import axios from "axios";

interface NewWorkoutSetFormProps {
    workoutId: number;
    onSuccess?: () => void;
}

interface ExerciseDTO {
    id: number;
    name: string;
}

export function NewWorkoutSetForm({ workoutId, onSuccess }: NewWorkoutSetFormProps) {
    const [sets, setSets] = useState<number | "">("");
    const [reps, setReps] = useState<number | "">("");
    const [weight, setWeight] = useState<number | "">("");
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [exerciseId, setExerciseId] = useState<number | "">("");

    useEffect(() => {
        axios.get("http://localhost:8080/exercises")
            .then((res) => setExercises(res.data));
    }, []);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/workout-sets", {
                exerciseId,
                sets: Number(sets),
                reps: Number(reps),
                weight: Number(weight),
                workoutId
            });
            
            setSets(0);
            setReps(0);
            setWeight(0);
            onSuccess?.();
        } catch (err: unknown) {
            console.error("Erro ao adicionar série:", err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Exercício</label>
                <select
                    value={exerciseId}
                    onChange={(e) => setExerciseId(Number(e.target.value))}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
                >
                    <option value="">Selecione...</option>
                    {exercises.map((ex) => (
                        <option key={ex.id} value={ex.id}>
                            {ex.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Séries</label>
                    <input
                        type="number"
                        value={sets}
                        onChange={(e) => setSets(e.target.value === "" ? "" : Number(e.target.value))}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Repetições</label>
                    <input
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(e.target.value === "" ? "" : Number(e.target.value))}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
                Adicionar Série
            </button>
        </form>
    );
}