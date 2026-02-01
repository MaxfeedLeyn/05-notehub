import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';

interface CreateNoteValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const CreateNoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title have to be at least 3 character')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: Yup.string()
    .min(3, 'Content have to be at least 3 character')
    .max(500, 'Content is too long')
    .required('Content is required'),
  tag: Yup.mixed()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Type has to be selected'),
});

const initialValues: CreateNoteValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteFormProps {
    onClose: () => void;
    onPost: () => void;
}

function NoteForm({onClose, onPost}: NoteFormProps) {
  const handleSubmit = (
    values: CreateNoteValues,
    actions: FormikHelpers<CreateNoteValues>
  ) => {
    onPost();
    console.log('Post data: ', values);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CreateNoteSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`title`}>Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
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
