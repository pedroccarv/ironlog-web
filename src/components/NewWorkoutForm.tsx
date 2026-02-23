import { useState } from "react";
import axios from "axios";

interface NewWorkoutFormProps {
  userId: number;
  onSuccess?: () => void;
}

export function NewWorkoutForm({ userId, onSuccess }: NewWorkoutFormProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/workouts", {
        title: title,
        date: new Date(date + "T00:00:00Z").toISOString(),
        user: { id: userId } 
      });

      setTitle("");
      setDate("");
      onSuccess?.();
    } catch (err: unknown) {
        if(axios.isAxiosError(err)) {
            setError(err.response?.data?.message || "Erro ao criar treino. Tente novamente.");
        } else {
            setError("Erro ao criar treino. Tente novamente.");
        }
    } finally {
        setLoading(false); 
    }
  }

  return (
    <div className="flex items-start justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-md">

        {/* Header */}
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Novo Treino</h2>
          <p className="text-sm text-gray-500 mt-1">Preencha as informações do treino</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nome do treino</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Treino A - Peito e Tríceps"
              required
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 rounded-xl transition"
          >
            {loading ? "Salvando..." : "Criar Treino"}
          </button>

        </form>
      </div>
    </div>
  );
}