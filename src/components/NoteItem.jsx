import { FaTrash, FaEdit } from "react-icons/fa";
import { format } from "date-fns";

const NoteItem = ({ note, onEditToggle, onInputChange, onSave, onDelete }) => {
  const created = format(new Date(note.createdAt), "yyyy-MM-dd HH:mm:ss");
  const updated = format(new Date(note.updatedAt), "yyyy-MM-dd HH:mm:ss");

  return (
    <div className="bg-white p-4 shadow rounded-lg w-full flex flex-col items-start">
      {note.isEditing ? (
        <>
          <input
            className="w-full p-2 border rounded mb-2"
            type="text"
            value={note.judul}
            onChange={(e) => onInputChange(note.id, "judul", e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded mb-2"
            value={note.deskripsi}
            onChange={(e) => onInputChange(note.id, "deskripsi", e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-2"
            type="text"
            value={note.kategori}
            onChange={(e) => onInputChange(note.id, "kategori", e.target.value)}
          />
          <button
            className="bg-green-500 text-white p-2 rounded mt-2 w-full"
            onClick={() => {
              onSave(note.id, note.judul, note.deskripsi, note.kategori);
              onEditToggle(note.id);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-1">{note.judul}</h2>
          <p className="text-gray-700 mb-2">{note.deskripsi}</p>
          <span className="bg-gray-200 text-sm text-gray-600 px-2 py-1 rounded-full mb-2">{note.kategori}</span>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>📅 Created At: {created}</span>
            <span></span>
            <span>📅 Updated At: {updated}</span>
          </div>
        </>
      )}
      <div className="flex gap-2 mt-2 w-full justify-end">
        <button onClick={() => onEditToggle(note.id)} className="text-yellow-500">
          <FaEdit />
        </button>
        <button onClick={() => onDelete(note.id)} className="text-red-500">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
