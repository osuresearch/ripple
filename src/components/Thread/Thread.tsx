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
  Icon
} from '@osuresearch/ui';
import React from 'react';

export type ThreadProps = {
  node: Thread;
};

type ReplyProps = {
  node: ThreadReply;
};

/**
 * Render a comment as a reply to another comment
 */
const Reply = React.forwardRef<HTMLDivElement, ReplyProps>(({ node }, ref) => (
  <Paper mx="sm" mt="sm">
    <Avatar
      alt={node.person.name}
      size={24}
      name={node.person.name}
      opicUsername={node.person.username}
      style={{
        float: 'left',
        marginLeft: -22
      }}
    />

    <Stack align="stretch" gap="xxs" pl="xs">
      <Group justify="apart">
        <Text fw="bold" fs="sm">
          {node.person.name}{' '}
          <Chip variant="outline" c="blue">
            {node.role}
          </Chip>
        </Text>
        {/* Only on hover  */}
        {/* <div>
          <IconButton size={16} name="edit" label="Edit comment" />
          <IconButton size={16} name="dots" label="More actions" />
        </div> */}
      </Group>

      <Text fs="sm">{node.message}</Text>
      <Text c="dark" fs="xs">
        {node.date.toLocaleString()}
      </Text>
    </Stack>
  </Paper>
));

//
export const Thread = React.forwardRef<HTMLDivElement, ThreadProps>(({ node }, ref) => {
  const { resolved, replies } = node;

  return (
    <Paper withBorder p="xs">
      <Avatar
        alt={node.person.name}
        size={24}
        name={node.person.name}
        opicUsername={node.person.username}
        style={{
          float: 'left',
          marginLeft: -22,
          marginTop: 4
        }}
      />

      <Stack align="stretch" gap="xxs" pl="xs">
        <Group justify="apart" align="center">
          <Text fw="bold" fs="sm">
            {node.person.name}{' '}
            <Chip variant="outline" c="blue">
              {node.role}
            </Chip>
          </Text>
          <div>
            <IconButton size={16} iconProps={{ p: 'xxs' }} name="edit" label="Edit comment" />
            <Menu label="More actions" asMoreOptions>
              <Item key="link">Link to comment</Item>
              <Item key="resolve">Resolve thread</Item>
              <Item key="delete">Delete thread</Item>
            </Menu>
          </div>
        </Group>

        <Text fs="sm">{node.message}</Text>

        {!resolved && (
          <Text c="dark" fs="xs">
            {node.date.toLocaleString()}
          </Text>
        )}

        {resolved && replies && (
          <Text fw="bold" fs="sm">
            {replies.length < 2 ? '1 more reply' : replies.length + ' more replies'}
          </Text>
        )}

        {!resolved && replies?.map((reply) => <Reply key={reply.id} node={reply} />)}

        {!resolved && <TextAreaField aria-label="Reply" rows={1} placeholder="@mention or reply" />}
      </Stack>
    </Paper>
  );
});
