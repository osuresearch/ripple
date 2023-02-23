import React from 'react';
import { Group, Avatar, Chip, Text } from '@osuresearch/ui';

export type ProfileProps = {
  node: Thread | ThreadReply;
  showRole?: boolean;
};

export function Profile({ node, showRole }: ProfileProps) {
  return (
    <Group align="center" gap="xxs">
      <Avatar
        alt={node.person.name}
        size={24}
        name={node.person.name}
        opicUsername={node.person.username}
        style={{
          marginLeft: -28
        }}
      />

      <Text fw="bold" fs="sm">
        {node.person.name}
      </Text>

      {showRole && (
        <Chip variant="outline" c="blue">
          {node.role}
        </Chip>
      )}
    </Group>
  );
}
