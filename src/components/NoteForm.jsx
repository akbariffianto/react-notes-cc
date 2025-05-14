import React from "react";

const NoteForm = ({ judul, deskripsi, kategori, setJudul, setDeskripsi, setKategori, onAdd }) => (
  <div className="bg-white p-4 shadow rounded-lg mb-4 w-full">
    <input
      className="w-full p-2 border rounded mb-2"
      type="text"
      placeholder="Judul"
      value={judul}
      onChange={(e) => setJudul(e.target.value)}
    />
    <textarea
      className="w-full p-2 border rounded mb-2"
      placeholder="Deskripsi"
      value={deskripsi}
      onChange={(e) => setDeskripsi(e.target.value)}
    />
    <input
      className="w-full p-2 border rounded mb-2"
      type="text"
      placeholder="Kategori"
      value={kategori}
      onChange={(e) => setKategori(e.target.value)}
    />
    <button
      className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
      onClick={onAdd}
    >
      Add Note
    </button>
  </div>
);

export default NoteForm;
