import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  const handleChange = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 1000);

  const totalPages = data ? data.totalPages : 1;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={selectedPage => setPage(selectedPage)}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching notes.</p>}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
