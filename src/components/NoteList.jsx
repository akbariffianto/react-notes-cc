import NoteItem from "./NoteItem";

const NotesList = ({ notes, onEditToggle, onInputChange, onSave, onDelete }) => (
  <div className="space-y-4 w-full">
    {Array.isArray(notes) && notes.length > 0 ? (
      notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onEditToggle={onEditToggle}
          onInputChange={onInputChange}
          onSave={onSave}
          onDelete={onDelete}
        />
      ))
    ) : (
      <p className="text-center text-gray-500">No notes available</p>
    )}
  </div>
);

export default NotesList;
