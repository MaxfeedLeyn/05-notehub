import css from './NoteList.module.css';
import type { Note } from '../../types/note';

interface NoteListProps {
  noteList: Note[];
  onDelete: (id: string) => void;
}

function NoteList({ noteList, onDelete }: NoteListProps) {
  const handleDelete = (id: string) => {
    onDelete(id);
  };
  return (
    <ul className={css.list}>
      {noteList.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
