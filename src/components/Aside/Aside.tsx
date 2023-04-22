import React from 'react';
import { Stack, IconButton, ScrollArea, Text } from '@osuresearch/ui';
import { toggleComments } from '../../features/settings';
import { useRippleContext } from '../../hooks';
import { Debugger } from '../Debugger';

export function Aside() {
  const { selector, dispatch } = useRippleContext();
  const showComments = selector((state) => state.settings.showComments);
  const dispatcher = dispatch();

  return (
    <Stack p="md" align="end">
      <IconButton
        name="bars"
        size={24}
        label="Toggle navigation"
        onPress={() => dispatcher(toggleComments(!showComments))}
      />

      {showComments &&
      <ScrollArea h="100px" w="100%" miw={350} type="hover" style={{ flexGrow: 1 }} hideDelay={1000}>
        <Debugger />
        {/* <Stack gap={0}>
          <Text c="dark" fw="bold" fs="sm">Comments</Text>
          <Text>Content here.</Text>
        </Stack> */}
      </ScrollArea>
      }
    </Stack>
  )
}
