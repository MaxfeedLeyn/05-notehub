import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import type { PostNote } from '../../types/note';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';

const CreateNoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title have to be at least 3 character')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: Yup.string()
    .min(3, 'Content have to be at least 3 character')
    .max(500, 'Content is too long'),
  tag: Yup.mixed()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Type has to be selected'),
});

const initialValues: PostNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteFormProps {
  onClose: () => void;
}

function NoteForm({ onClose }: NoteFormProps) {

  const queryClient = useQueryClient();

  const postMethod = useMutation({
    mutationFn: (note: PostNote) => {
      return createNote(note);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handlePost = (note: PostNote) => {
    postMethod.mutate(note);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handlePost}
      validationSchema={CreateNoteSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`title`}>Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor={`content`}>Content</label>
          <Field
            as="textarea"
            name="content"
            id="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor={`tag`}>Tag</label>
          <Field as="select" name="tag" id="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>
        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            CreateNote
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;
