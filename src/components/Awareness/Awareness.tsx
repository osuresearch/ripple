import React, { useEffect, useState } from 'react';
import { AvatarGroup, Avatar } from '@osuresearch/ui';
import { provider } from '../../yjs';

export type AwarenessProps = {
  __noop?: boolean;
};

type AwarenessUser = {
  name: string;
  color: string;
};

export function Awareness(props: AwarenessProps) {
  const [users, setUsers] = useState<AwarenessUser[]>([]);

  useEffect(() => {
    const awareness = provider.awareness;

    const onAwarenessChange = (changes: any) => {
      // Whenever somebody updates their awareness information,
      // we log all awareness information from all users.
      console.log(Array.from(awareness.getStates().values()));

      const updatedUsers: AwarenessUser[] = [];
      awareness.getStates().forEach((value) => {
        updatedUsers.push(value.user);
      });

      setUsers(updatedUsers);
    };

    // You can observe when a user updates their awareness information
    awareness.on('change', onAwarenessChange);

    // You can think of your own awareness information as a key-value store.
    // We update our "user" field to propagate relevant user information.
    awareness.setLocalStateField('user', {
      // Define a print name that should be displayed
      name: 'Emmanuelle Charpentier',
      // Define a color that should be associated to the user:
      color: '#ffb61e' // should be a hex color
    });

    return () => {
      provider.awareness.off('change', onAwarenessChange);
    };
  }, []);

  return (
    <AvatarGroup>
      {users.map((user, idx) => (
        <Avatar key={idx} alt="" name={user.name} />
      ))}

      <Avatar alt="" name="Chase" opicUsername="mcmanning.1" />
    </AvatarGroup>
  );
}
