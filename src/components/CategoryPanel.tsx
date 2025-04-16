import React from 'react';

export interface Category {
  id: number;
  name: string;
}

interface CategoryPanelProps {
  categories: Category[];
  filterCategories: number[];
  toggleFilterCategory: (categoryId: number) => void;
  newCategoryName: string;
  setNewCategoryName: (value: string) => void;
  onCreateCategory: (e: React.FormEvent<HTMLFormElement>) => void;
  editingCategoryId: number | null;
  editingCategoryName: string;
  setEditingCategoryName: (value: string) => void;
  setEditingCategoryId: (value: number | null) => void;
  onUpdateCategory: (id: number) => void;
  onDeleteCategory: (id: number) => void;
}

const CategoryPanel: React.FC<CategoryPanelProps> = ({
  categories,
  filterCategories,
  toggleFilterCategory,
  newCategoryName,
  setNewCategoryName,
  onCreateCategory,
  editingCategoryId,
  editingCategoryName,
  setEditingCategoryName,
  setEditingCategoryId,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  return (
    <div className="mt-6 pt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Categorías</h2>
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => toggleFilterCategory(cat.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer 
              transition duration-200 ease-in-out shadow 
              ${filterCategories.includes(cat.id)
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 border border-gray-300 hover:bg-blue-600 hover:text-white'}`}
          >
            {editingCategoryId === cat.id ? (
              <>
                <input
                  type="text"
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-24 px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateCategory(cat.id);
                  }}
                  className="text-lg font-bold hover:text-green-300 transition"
                >
                  ✔
                </button>
              </>
            ) : (
              <>
                <span className="font-medium">{cat.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCategoryId(cat.id);
                    setEditingCategoryName(cat.name);
                  }}
                  className="text-lg hover:text-yellow-400 transition"
                  title="Editar categoría"
                >
                  ✎
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategory(cat.id);
                  }}
                  className="text-lg hover:text-red-400 transition"
                  title="Eliminar categoría"
                >
                  🗑
                </button>
              </>
            )}
          </div>
        ))}
        {/* Formulario para crear nueva categoría */}
        <form onSubmit={onCreateCategory} className="flex items-center">
          <input
            type="text"
            placeholder="Nueva categoría"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button type="submit" className="ml-2 text-2xl text-green-500 hover:text-green-600 transition">
            ➕
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryPanel;
