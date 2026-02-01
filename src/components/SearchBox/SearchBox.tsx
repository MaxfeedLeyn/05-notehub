import css from './SearchBox.module.css';
import { useDebouncedCallback } from 'use-debounce';

interface SearchBoxProps {
  onChange: (value: string) => void;
}

function SearchBox({ onChange }: SearchBoxProps) {
  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    1000
  );
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue=''
      onChange={handleChange}
    />
  );
}

export default SearchBox;
