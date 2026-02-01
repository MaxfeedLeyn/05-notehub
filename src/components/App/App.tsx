import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import css from './App.module.css';
import { useState } from 'react';
function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  const totalPages = data ? data.totalPages : 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <input
          className={css.input}
          type="text"
          placeholder="Search notes"
          onChange={e => setQuery(e.target.value)}
        />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={selectedPage => setPage(selectedPage)}
          />
        )}
        <button className={css.button}>Create note +</button>
      </header>
      {data && data.notes.length > 0 && <NoteList noteList={data.notes} />}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching notes.</p>}
    </div>
  );
}

export default App;
