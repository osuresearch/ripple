import {
  Avatar,
  Text,
  Stack,
  Group,
  TextField,
  TextAreaField,
  Paper,
  IconButton
} from '@osuresearch/ui';
import React from 'react';

export type CommentProps = {
  name?: string;
  username?: string; // for OPIC support
  comment?: string; // concrete data type with reference info? We have this defined already in Review.
};

/**
 * Render a comment as a reply to another comment
 */
const Reply = React.forwardRef<HTMLDivElement, CommentProps>((props, ref) => (
  <Paper mx="sm">
    <Avatar
      alt="Chase McManning"
      size={24}
      name="Chase"
      opicUsername="mcmanning.1"
      style={{
        float: 'left',
        marginLeft: '-22px'
      }}
    />

    <Stack align="stretch">
      <Group justify="apart">
        <Text fw="bold">Chase McManning</Text>
        <div>📝 ...</div>
      </Group>
      <Text>blah blah blah lipsum goes here</Text>
      <Text c="dark" fs="sm">
        January 1, 2023, 12:00 PM
      </Text>
    </Stack>
  </Paper>
));

export const Comment = React.forwardRef<HTMLDivElement, CommentProps>((props, ref) => (
  <Paper withBorder p="xs">
    <Avatar
      alt="Chase McManning"
      size={24}
      name="Chase"
      opicUsername="mcmanning.1"
      style={{
        float: 'left',
        marginLeft: '-22px'
      }}
    />

    <Stack align="stretch">
      <Group justify="apart">
        <Text fw="bold">Chase McManning</Text>
        <div>📝 ...</div>
      </Group>
      <Text>blah blah blah lipsum goes here</Text>
      <Text c="dark" fs="sm">
        January 1, 2023, 12:00 PM
      </Text>
      <Reply />
      <Reply />
      <TextAreaField aria-label="Reply" rows={1} placeholder="@mention or reply" />
    </Stack>
  </Paper>
));
