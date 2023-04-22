import { Group, Heading, Divider, FormErrors, Text, Box, Paper, Chip } from '@osuresearch/ui';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useRippleContext } from '../../hooks';
import { Aside } from '../Aside';
import { Debug } from '../Debug';
import { MemoryRouterEditor } from '../MemoryRouterEditor';
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
    <Group bgc="light" grow align="stretch" gap={0} mih="100vh">
      <Navigation />
      <Paper w={815} miw={815} bgc="light-tint" my="xxl" p="xxl" shadow="sm">
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
    </Group>
  );
}
