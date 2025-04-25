import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import styled from 'styled-components';

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
        <StyledForm>
          <StyledField type="search" name="search" />
          <StyledButton type="submit" disabled={isSubmitting}>
            검색
          </StyledButton>
        </StyledForm>
      )}
    </Formik>
  );
}

const StyledField = styled(Field)`
  width: 100%;
  margin-right: 10px;
`;

const StyledForm = styled(Form)`
  display: flex;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  width: 80px;
`;
