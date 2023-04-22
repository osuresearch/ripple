import { Button, Stack, IconButton, TextField, Text } from '@osuresearch/ui';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Mocks a browser navigation bar for React Router's MemoryRouter.
 *
 * Mostly for testing and mocking routing within Storybook.
 */
export function MemoryRouterEditor() {
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState<string | undefined>();

  useEffect(() => {
    const url = location.pathname + location.search + location.hash;
    if (url !== value) {
      setValue(url);
    }
  }, [location]);

  const back = () => {
    navigate(-1);
  }

  const forward = () => {
    navigate(1);
  }

  const go = () => {
    value && navigate(value);
  }

  return (
    <Stack gap={0} pb="md">
      <Text fs="xs">MemoryRouter Navigation</Text>
      <TextField w="100%" name="address" aria-label="Address" value={value} onChange={setValue}
        leftSlot={
          <div>
            <IconButton name="chevron" iconProps={{ rotate: 180 }} label="Back" onPress={back} size={32} />
            <IconButton name="chevron" label="Forward" onPress={forward} size={32} />
          </div>
        }
        leftWidth={80}
        rightSlot={
          <Button h="100%" onPress={go}>Go</Button>
        }
      />
    </Stack>
  );
}
