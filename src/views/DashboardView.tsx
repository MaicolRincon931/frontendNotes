import React, { useState, useEffect, FormEvent } from 'react';
import axiosInstance from '../lib/axios';
import NoteCard, { Note } from '../components/NoteCard';
import NoteFilter from '../components/NoteFilter';
import CategoryPanel, { Category } from '../components/CategoryPanel';
import NoteForm from '../components/NoteForm';
import toast from 'react-hot-toast';

const DashboardView: React.FC = () => {
  // Estados
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [filterCategories, setFilterCategories] = useState<number[]>([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategories, setNewNoteCategories] = useState<number[]>([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedCategories, setEditedCategories] = useState<number[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');


  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get('/note/get-notes');
      setNotes(res.data.data || []);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setNotes([]);
      } else {
        console.error(err);
        setError(err.response?.data?.message || 'Error al cargar las notas.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        title: newNoteTitle,
        content: newNoteContent,
        categories: newNoteCategories,
      };
      const res = await axiosInstance.post('/note/create-note', payload);
      setNotes([res.data.data, ...notes]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setNewNoteCategories([]);
      setShowCreateModal(false);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al crear la nota.');
    }
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setEditedCategories(note.categories ? note.categories.map(c => c.id) : []);
    setShowEditModal(true);
  };

  const handleUpdateNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingNote) return;
    try {
      const payload = {
        title: editedTitle,
        content: editedContent,
        categoryIds: editedCategories,
      };
      const res = await axiosInstance.put(`/note/update-note/${editingNote.id}`, payload);
      toast.success('Nota Creada')
      setNotes(notes.map(n => (n.id === editingNote.id ? res.data.data : n)));
      setShowEditModal(false);
      setEditingNote(null);
      
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al actualizar la nota.');
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (!window.confirm('¿Eliminar esta nota?')) return;
    try {
      await axiosInstance.delete(`/note/delete-note/${id}`);
      setNotes(notes.filter(n => n.id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al eliminar la nota.');
    }
  };

  const handleToggleArchive = async (note: Note) => {
    try {
      const res = await axiosInstance.put(`/note/archived-note/${note.id}`, {
        archived: !note.archived,
      });
      setNotes(notes.map(n => (n.id === note.id ? res.data.data : n)));
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al archivar la nota.');
    }
  };

  // Categorías
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get('/category/get-categories');
      setCategories(res.data.data || []);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al cargar las categorías.');
    }
  };

  const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      const res = await axiosInstance.post('/category/create-category', { name: newCategoryName });
      setCategories([...categories, res.data.data]);
      setNewCategoryName('');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al crear la categoría.');
    }
  };

  const handleUpdateCategory = async (id: number) => {
    if (!editingCategoryName.trim()) return;
    try {
      const res = await axiosInstance.put(`/category/update-category/${id}`, {
        name: editingCategoryName,
      });
      setCategories(categories.map(cat => (cat.id === id ? res.data.data : cat)));
      setEditingCategoryId(null);
      setEditingCategoryName('');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al actualizar la categoría.');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;
    try {
      await axiosInstance.delete(`/category/delete-category/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
      setFilterCategories(filterCategories.filter(catId => catId !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al eliminar la categoría.');
    }
  };

  const toggleFilterCategory = (categoryId: number) => {
    setFilterCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, []);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchived = showArchived ? note.archived : !note.archived;
    const matchesCategory =
      filterCategories.length === 0 ||
      note.categories?.some(cat => filterCategories.includes(cat.id));
    return matchesSearch && matchesArchived && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-600">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <NoteFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showArchived={showArchived}
          setShowArchived={setShowArchived}
          onCreateNote={() => setShowCreateModal(true)}
        />
        <CategoryPanel
          categories={categories}
          filterCategories={filterCategories}
          toggleFilterCategory={toggleFilterCategory}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          onCreateCategory={handleCreateCategory}
          editingCategoryId={editingCategoryId}
          editingCategoryName={editingCategoryName}
          setEditingCategoryName={setEditingCategoryName}
          setEditingCategoryId={setEditingCategoryId}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={openEditModal}
              onToggleArchive={handleToggleArchive}
              onDelete={handleDeleteNote}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg mt-8">
            No hay notas que coincidan con los filtros.
          </div>
        )}
      </main>

      {/* Modal Crear */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Crear Nueva Nota
            </h2>
            <NoteForm
              mode="create"
              title={newNoteTitle}
              setTitle={setNewNoteTitle}
              content={newNoteContent}
              setContent={setNewNoteContent}
              selectedCategories={newNoteCategories}
              setSelectedCategories={setNewNoteCategories}
              categories={categories}
              onSubmit={handleCreateNote}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {showEditModal && editingNote && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Editar Nota
            </h2>
            <NoteForm
              mode="edit"
              title={editedTitle}
              setTitle={setEditedTitle}
              content={editedContent}
              setContent={setEditedContent}
              selectedCategories={editedCategories}
              setSelectedCategories={setEditedCategories}
              categories={categories}
              onSubmit={handleUpdateNote}
              onCancel={() => {
                setShowEditModal(false);
                setEditingNote(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
