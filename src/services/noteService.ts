import type { Note } from '../types/note';
import type { PostNote } from '../types/note';
import axios from 'axios';

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

interface HTTPResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(query: string, page: number) {
  const response = await axios.get<HTTPResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
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

export async function createNote(note: PostNote): Promise<Note> {
  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes', note, 
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return response.data;
}