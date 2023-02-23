import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

// Shared connection. Can only be instantiated once per application.
export const ydoc = new Y.Doc();
export const provider = new WebrtcProvider('demo-room', ydoc, {
  signaling: ['ws://localhost:4444']
});

// TODO: Remove side effect
