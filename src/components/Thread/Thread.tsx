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
  Link,
  cx
} from '@osuresearch/ui';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FocusScope } from 'react-aria';
import { useThread } from '../../hooks/useThread';
import { EditableMessage } from './EditableMessage';
import { Reply } from './Reply';
import { StartReply } from './StartReply';
import { ReadOnlyMessage } from './ReadOnlyMessage';
import { isInViewport } from '../../react/utils';
import { Profile } from './Profile';

export type ThreadProps = {
  node: Thread;
};

export function Thread({ node }: ThreadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { focused, focus, updateComment, resolve, reopen, remove, recover } = useThread(node.id);

  const [isEditing, setEditing] = useState(false);
  const [isAutofocus, setAutofocus] = useState(false);

  const { resolved, replies } = node;

  // An initial thread is one where the user hasn't added any
  // content yet to the main thread comment.
  const isInitial = node.message.trim().length < 1;

  // If this thread needs to be focused immediately on mount,
  // and we don't have any content (e.g. someone just started
  // a new thread) - force it into focus mode.
  useLayoutEffect(() => {
    if (!ref.current) return;

    if (focused && isInitial) {
      setEditing(true);
      setAutofocus(true);
    }

    const rect = ref.current.getBoundingClientRect();
    if (!isInViewport(window, rect)) {
      window.scrollTo(rect.x, rect.y - 100);
    }
  }, [focused, isInitial]);

  // Scroll this comment into view if not already.
  useEffect(() => {
    if (!ref.current || !focused) return;

    const rect = ref.current.getBoundingClientRect();
    if (!isInViewport(window, rect)) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [focused, ref]);

  const onAction = (key: React.Key) => {
    if (key === 'resolve') {
      resolve();
    } else if (key === 'delete') {
      remove();
    }
    return true;
  };

  const onSave = (message: string) => {
    // Nothing was saved.
    if (message.trim() === '<p></p>') {
      message = '';
    }

    updateComment(message);
    setEditing(false);

    if (!message.length && node.message.length < 1) {
      remove(false);
    }
  };

  const onCancel = () => {
    setEditing(false);

    // If the thread has no comment or replies, we delete it entirely.
    // This may have been a thread that was started by accident, or
    // the user decided to scrub it.
    if (node.message.length < 1 && node.replies.length < 1) {
      remove(false);
    }
  };

  // Recoverable deleted threads get a placeholder to undo
  if (node.deleted && node.recoverable) {
    return (
      <Paper withBorder p="xs">
        Deleted thread.{' '}
        <Link as="button" onClick={recover}>
          (undo)
        </Link>
      </Paper>
    );
  }

  // Non-recoverable deleted threads are just hidden.
  if (node.deleted) {
    return null;
  }

  return (
    <FocusScope>
      <Paper
        p="xs"
        ml="sm"
        ref={ref}
        tabIndex={0}
        onClick={focus}
        className={cx({
          'rui-border-2': true,
          'rui-border-light': !focused,
          'rui-border-blue': focused
        })}
      >
        <Stack align="stretch" gap={0} pl="xs">
          {resolved && (
            <Group justify="apart" align="center">
              <Profile node={node} />

              <Group align="center">
                <Chip variant="outline" c="green">
                  <Icon name="check" /> resolved
                </Chip>
                <IconButton
                  size={16}
                  iconProps={{ p: 'xxs' }}
                  name="rotate"
                  label="Reopen"
                  onPress={reopen}
                />
              </Group>
            </Group>
          )}

          {!resolved && (
            <Group justify="apart" align="center">
              <Profile node={node} showRole />
              <div>
                <IconButton
                  size={16}
                  iconProps={{ p: 'xxs' }}
                  name="edit"
                  label="Edit comment"
                  onPress={() => setEditing(true)}
                />
                <Menu label="More actions" asMoreOptions onAction={onAction}>
                  <Item key="link">Link to thread</Item>
                  <Item key="resolve">Resolve thread</Item>
                  <Item key="delete">Delete thread</Item>
                </Menu>
              </div>
            </Group>
          )}

          {isEditing ? (
            <EditableMessage
              defaultValue={node.message}
              autosave={isAutofocus}
              onSave={onSave}
              onCancel={onCancel}
            />
          ) : (
            <ReadOnlyMessage message={node.message} />
          )}

          {focused && !isEditing && (
            <Text c="dark" fs="xs">
              {new Date(node.date).toLocaleString()}
            </Text>
          )}

          {resolved && replies.length > 0 && !focused && (
            <Text fs="xs" fw="bold">
              {replies.length === 1 ? '1 more reply' : replies.length + ' more replies'}
            </Text>
          )}

          {(!resolved || focused) &&
            replies?.map((reply) => <Reply key={reply.id} thread={node} node={reply} />)}

          {!resolved && !isInitial && <StartReply thread={node} />}
        </Stack>
      </Paper>
    </FocusScope>
  );
}
