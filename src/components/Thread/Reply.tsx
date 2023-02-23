import {
  Avatar,
  Text,
  Stack,
  Group,
  TextField,
  TextAreaField,
  Paper,
  IconButton,
  Menu,
  Item,
  Chip,
  Icon,
  Link
} from '@osuresearch/ui';
import React, { useEffect, useState } from 'react';
import { useThread } from '../../hooks/useThread';
import { EditableMessage } from './EditableMessage';
import { Profile } from './Profile';
import { ReadOnlyMessage } from './ReadOnlyMessage';

export type ReplyProps = {
  thread: Thread;
  node: ThreadReply;
};

/**
 * Render a comment as a reply to a thread
 */
export const Reply = React.forwardRef<HTMLDivElement, ReplyProps>(({ thread, node }, ref) => {
  const { focused, updateReply, removeReply, recoverReply } = useThread(thread.id);

  const [isEditing, setEditing] = useState(false);

  const onAction = (key: React.Key) => {
    if (key === 'delete') {
      removeReply(node.id);
    }

    return true;
  };

  const onSave = (message: string) => {
    updateReply(node.id, message);
    setEditing(false);
  };

  // The first comment from an individual in a thread gets
  // a role chip. The rest don't to reduce UI noise.
  // TODO: Clean this up. It's just a hack atm.
  let isFirstFromPerson = node.person.id !== thread.person.id;
  let found = false;
  thread.replies?.forEach((r) => {
    if (found) {
      return;
    }

    if (r.id === node.id) {
      found = true;
      return;
    }

    if (r.person.id === node.person.id) {
      isFirstFromPerson = false;
    }
  });

  const resolved = !!thread.resolved;

  // Recoverable deleted replies get a placeholder to undo
  if (node.deleted && node.recoverable) {
    return (
      <Text p="xs" fs="sm">
        Deleted reply.{' '}
        <Link as="button" onClick={() => recoverReply(node.id)}>
          (undo)
        </Link>
      </Text>
    );
  }

  // Non-recoverable deleted replies are just hidden.
  if (node.deleted) {
    return null;
  }

  return (
    <Paper ml="sm" mt="sm">
      <Stack align="stretch" gap={0} pl="xs" tabIndex={0}>
        <Group justify="apart" align="center">
          <Profile node={node} showRole={!isFirstFromPerson} />

          {!resolved && (
            <div>
              <IconButton
                size={16}
                iconProps={{ p: 'xxs' }}
                name="edit"
                label="Edit reply"
                onPress={() => setEditing(true)}
              />

              <Menu label="More actions" asMoreOptions onAction={onAction}>
                <Item key="delete">Delete reply</Item>
              </Menu>
            </div>
          )}
        </Group>

        {isEditing ? (
          <EditableMessage
            defaultValue={node.message}
            onSave={onSave}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <ReadOnlyMessage message={node.message} />
        )}

        {focused && !isEditing && (
          <Text c="dark" fs="xs">
            {new Date(node.date).toLocaleString()}
          </Text>
        )}
      </Stack>
    </Paper>
  );
});
