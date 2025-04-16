import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUpView = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
  
      const { accessToken, refreshToken } = response.data.data;
  
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
  
      toast.success('¡Cuenta creada exitosamente!');
  
      navigate("/auth/login"); 
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Error al registrarse';
      setError(message);
      toast.error(message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Crear cuenta</h2>
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/auth/login" className="text-indigo-600 hover:underline font-medium">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
