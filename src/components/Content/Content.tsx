import { Group, Heading, Divider, FormErrors, Text, Box } from '@osuresearch/ui';
import React from 'react';
import { Outlet } from 'react-router';
import { useRippleContext } from '../../hooks';
import { Aside } from '../Aside';
import { Navigation } from '../Navigation';

// Content container for the TOC, page(s), and comment(s)
export function Content() {
  const {
    form,
    handleSubmit,
    getValues,
    getPreviousPage,
    getNextPage,
    formState: { errors, dirtyFields, touchedFields, defaultValues }
  } = useRippleContext();

  return (
    <Group grow>
      <Navigation />
      <Box w="100%">
        <Heading level={1}>{form.title}</Heading>
        <Text fs="sm" c="dark">
          Version {form.version}
        </Text>
        <Divider />

        {/* TODO: FormErrors needs to be contextual based on view mode
          Agg of all vs single page fields */}
        <FormErrors errorMessages={errors} />

        {/* Outlet could be a single page or
          all pages at once depending on view mode */}
        <Outlet />

        {/* <Group justify="end">
          <Button variant="subtle">Cancel</Button>
          <SubmitButton />
        </Group> */}
      </Box>
      <Aside />
    </Group>
  );
}
