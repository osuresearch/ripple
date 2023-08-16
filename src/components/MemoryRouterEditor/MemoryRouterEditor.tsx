import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { Icon } from '@osuresearch/ui';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Mocks a browser navigation bar for React Router's `MemoryRouter`.
 *
 * Used for testing and mocking routing within Storybook.
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
  };

  const forward = () => {
    navigate(1);
  };

  const go = () => {
    value && navigate(value);
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton aria-label="Back" onClick={back}>
        <Icon name="chevron" rotate={180} />
      </IconButton>

      <IconButton aria-label="Back" onClick={forward}>
        <Icon name="chevron" />
      </IconButton>

      <OutlinedInput value={value} onChange={(e) => setValue(e.currentTarget.value)} />
      <Button onClick={go}>Go</Button>
    </Stack>
  );
}
