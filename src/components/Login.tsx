import { useState } from "react";
import axios from "axios";

interface LoginProps {
  onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState(false); 
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isRegistering) {
        await axios.post("http://localhost:8080/auth/register", {
          name,
          email,
          password
        });
        alert("Conta criada com sucesso! Faça o login agora.");
        setIsRegistering(false); 
        setPassword("");
        
      } else {
        const response = await axios.post("http://localhost:8080/auth/login", {
          email,
          password
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        onLoginSuccess();
      }
    } catch (err) {
        console.error("Erro na autenticação:", err);
        if (axios.isAxiosError(err)) {
          if (isRegistering) {
            setError(typeof err.response?.data === 'string' 
              ? err.response.data 
              : "Erro ao criar conta. O e-mail já pode estar em uso.");
          } else {
            setError("E-mail ou senha incorretos. Tente novamente.");
          }
        } else {
          setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
      } finally {
        setIsLoading(false);
      }
  };

  const inputClass = "w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 focus:text-gray-900 bg-white focus:bg-white";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {isRegistering ? "Criar Conta" : "IronLog"}
          </h1>
          <p className="text-gray-500 mt-2">
            {isRegistering 
              ? "Preencha os seus dados para começar" 
              : "Faça login para acessar os seus treinos"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {isRegistering && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegistering}
                autoComplete="off"
                className={inputClass}
                placeholder="Seu nome"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              className={inputClass}
              placeholder="pedro@teste.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className={inputClass}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center font-medium animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {isLoading ? "A carregar..." : (isRegistering ? "Cadastrar" : "Entrar")}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
            }}
            className="text-sm text-blue-600 font-semibold hover:underline"
          >
            {isRegistering 
              ? "Já tem uma conta? Faça login aqui." 
              : "Não tem uma conta? Cadastre-se aqui."}
          </button>
        </div>

      </div>
    </div>
  );
}