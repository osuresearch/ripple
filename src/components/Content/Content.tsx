import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRippleContext } from '../../hooks';
import { Debug } from '../Debug';
import { TableOfContents } from '../TableOfContents';
import { Paper, Stack } from '@mui/material';
import { MemoryRouterEditor } from '../MemoryRouterEditor';
import { Aside } from '../Aside';

/**
 * Content container for the TOC, page(s), and comment(s)
 */
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
    // <Stack direction="row" bgc="light" grow align="stretch" gap={0} mih="100vh">
    <Stack direction="row">
      <TableOfContents />
      <Paper sx={{ width: 815, minWidth: 815 }}>
        a{/* bgc="light-tint" my="xxl" p="xxl" shadow="sm" */}
        {/* <Heading level={1}>{form.title}</Heading>
        <Text fs="sm" c="dark">
          Version {form.version}
        </Text> */}
        <Debug>
          <MemoryRouterEditor />
        </Debug>
        {/* TODO: FormErrors needs to be contextual based on view mode
          Agg of all vs single page fields */}
        {/* <FormErrors errorMessages={errors} /> */}
        {/* Outlet could be a single page or
          all pages at once depending on view mode */}
        <Outlet />
      </Paper>
      <Aside />
    </Stack>
  );
}
