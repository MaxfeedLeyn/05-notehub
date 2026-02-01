import type { Note } from '../types/note';
import axios from 'axios';

const API_URL = import.meta.env.VITE_NOTEHUB_TOKEN;

interface HTTPResponse {
  notes: Note[];
  totalPages: number;
}

async function fetchNotes(query: string, page: number) {
  const response = await axios.get<HTTPResponse>(
    'https://notehub-public.goit.study/api/',
    {
      headers: {
        Authorization: `Bearer ${API_URL}`,
      },
      params: {
        search: query,
        page,
      },
    }
  );
  return response.data;
}

async function createNote(title: string, content: string, tag: string) {
  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/',
    {
      headers: {
        Authorization: `Bearer ${API_URL}`,
      },
      params: {
        title,
        content,
        tag,
      },
    }
  );
  return response.data;
}

async function deleteNote(id: string) {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/`,
    {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${API_URL}`,
      },
    }
  );
  return response.data;
}

export default fetchNotes;
