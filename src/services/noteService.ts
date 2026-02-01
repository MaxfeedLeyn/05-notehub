import type { Note } from '../types/note';
import type { PostNote } from '../types/note';
import axios from 'axios';

const API_URL = import.meta.env.VITE_NOTEHUB_TOKEN;

interface HTTPResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(query: string, page: number) {
  const response = await axios.get<HTTPResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      headers: {
        Authorization: `Bearer ${API_URL}`,
      },
      params: {
        search: query,
        page,
        perPage: 12,
      },
    }
  );
  return response.data;
}

export async function createNote(note: PostNote) {
  const response = await axios.post(
    'https://notehub-public.goit.study/api/notes', note, 
    {
      headers: {
        Authorization: `Bearer ${API_URL}`,
      },
    }
  );
}

export async function deleteNote(id: string) {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${API_URL}`,
      },
    }
  );
}