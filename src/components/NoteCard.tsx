import React from 'react';

export interface Category {
  id: number;
  name: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  categories: Category[];
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onToggleArchive: (note: Note) => void;
  onDelete: (noteId: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onToggleArchive, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:scale-105 transform transition duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h2>
      <p className="text-gray-700 mb-4">{note.content}</p>
      {/* Etiquetas de categorías */}
      <div className="flex flex-wrap gap-2 mb-4">
        {note.categories?.map(cat => (
          <span key={cat.id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {cat.name}
          </span>
        ))}
      </div>
      {/* Botones de acción */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => onEdit(note)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Editar
        </button>
        <button
          onClick={() => onToggleArchive(note)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          {note.archived ? 'Desarchivar' : 'Archivar'}
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
