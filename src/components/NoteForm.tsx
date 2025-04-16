import React from 'react';
import { Category } from './CategoryPanel';

interface NoteFormProps {
  mode: 'create' | 'edit';
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  selectedCategories: number[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
  categories: Category[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  mode,
  title,
  setTitle,
  content,
  setContent,
  selectedCategories,
  setSelectedCategories,
  categories,
  onSubmit,
  onCancel,
}) => {

  const toggleCategorySelection = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Campo Título */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
      </div>
  
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Contenido</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        ></textarea>
      </div>
  
      <div>
        <span className="block text-gray-700 font-semibold mb-2">Categorías</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleCategorySelection(cat.id)}
              className={`px-3 py-1 rounded-full text-sm border transition 
                ${
                  selectedCategories.includes(cat.id)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-200 text-gray-800 border-gray-200 hover:bg-blue-600 hover:text-white'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
  
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition"
        >
          {mode === 'create' ? 'Guardar' : 'Actualizar'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
