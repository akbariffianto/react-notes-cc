import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import useAuth from "../auth/useAuth";
import NoteForm from "../components/NoteForm.jsx";
import NotesList from "../components/NoteList.jsx";

function NotesApp() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async () => {
    if (!judul.trim() || !deskripsi.trim() || !kategori.trim()) return;
    try {
      const response = await axios.post(`${BASE_URL}/notes/add-notes`, {
        judul, deskripsi, kategori
      });
      if (response.data.data) {
        setNotes([...notes, response.data.data]);
        setJudul(""); setDeskripsi(""); setKategori("");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/delete-notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const toggleEditMode = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isEditing: !note.isEditing } : note
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  const saveNote = async (id, newJudul, newDeskripsi, newKategori) => {
    try {
      const response = await axios.put(`${BASE_URL}/notes/update-notes/${id}`, {
        judul: newJudul,
        deskripsi: newDeskripsi,
        kategori: newKategori,
      });
      if (response.data.data) fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl w-full mx-auto p-8 bg-white shadow rounded-lg flex flex-col items-center">
        <div className="flex gap-5">
          <button className="bg-red-500 text-white p-2 rounded mb-4" onClick={handleLogout}>
            Logout
          </button>
          <button className="bg-blue-500 text-white p-2 rounded mb-4" onClick={fetchNotes}>
            Refresh
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">📒 Notes App</h1>
        <NoteForm
          judul={judul}
          deskripsi={deskripsi}
          kategori={kategori}
          setJudul={setJudul}
          setDeskripsi={setDeskripsi}
          setKategori={setKategori}
          onAdd={addNote}
        />
        <NotesList
          notes={notes}
          onEditToggle={toggleEditMode}
          onInputChange={handleInputChange}
          onSave={saveNote}
          onDelete={deleteNote}
        />
      </div>
    </div>
  );
}

export default NotesApp;
