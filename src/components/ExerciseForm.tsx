import { useState } from "react";
import axios from "axios";


interface ExerciseFormProps {
    onSuccess?: () => void;
}

export function NewExerciseForm({ onSuccess }: ExerciseFormProps) {
    const [name, setName] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");

    async function handleSubmit(e:React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        
        try {
            await axios.post("http://localhost:8080/exercises", {
                name,
                muscleGroup,
            });

            setName("");
            setMuscleGroup("");
            onSuccess?.();
        } catch (err: unknown) {
            console.error("Erro ao criar exercício:", err);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nome do exercício</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
            </div>
            <div className="flex gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Grupo Muscular</label>
                    <input
                        type="text"
                        value={muscleGroup}
                        onChange={(e) => setMuscleGroup(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
                Adicionar Exercicio
            </button>
        </form>
    );
}