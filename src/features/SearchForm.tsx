import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';

interface SearchFormProps {
  initialValue?: string;
}

export function SearchForm({ initialValue = '' }: SearchFormProps) {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ search: initialValue }}
      onSubmit={({ search }, { setSubmitting }) => {
        router.push(`search?q=${search}`);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="search" name="search" />
          <button type="submit" disabled={isSubmitting}>
            검색
          </button>
        </Form>
      )}
    </Formik>
  );
}
