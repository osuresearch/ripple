import React from 'react';
import { IconButton, Stack } from '@mui/material';

import { toggleComments } from '../../features';
import { useRippleSelector, useRippleDispatch } from '../../hooks';

export function Aside() {
  const showComments = useRippleSelector((state) => state.settings.showComments);
  const dispatch = useRippleDispatch();

  return (
    <Stack>
      <IconButton
        name="bars"
        size={24}
        label="Toggle navigation"
        onPress={() => dispatch(toggleComments(!showComments))}
      />

      {/* {showComments && (
        <ScrollArea
          h="100px"
          w="100%"
          miw={350}
          type="hover"
          style={{ flexGrow: 1 }}
          hideDelay={1000}
        >
          <Debugger />
        </ScrollArea>
      )} */}
    </Stack>
  );
}
