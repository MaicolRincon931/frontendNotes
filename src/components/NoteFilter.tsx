import React from 'react';

interface NoteFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  showArchived: boolean;
  setShowArchived: (value: boolean) => void;
  onCreateNote: () => void;
}

const NoteFilter: React.FC<NoteFilterProps> = ({
  searchTerm,
  setSearchTerm,
  showArchived,
  setShowArchived,
  onCreateNote,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow mb-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4 md:mb-0">
        Mis Notas
      </h1>
      <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={() => setShowArchived(!showArchived)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 text-gray-700 select-none">
            Mostrar archivadas
          </label>
        </div>
        <button
          onClick={onCreateNote}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 shadow"
        >
          Nueva Nota
        </button>
      </div>
    </div>
  );
};

export default NoteFilter;
