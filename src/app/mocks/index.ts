import { Person } from '@osuresearch/types';
import { IRB } from '../forms/osu-irb';

// Mock people
export const people: Record<string, Person> = {
  chase: {
    id: '1234',
    name: 'Chase McManning',
    username: 'mcmanning.1'
  },
  neil: {
    id: '4567',
    name: 'Neil Coplin',
    username: 'coplin.7'
  },
  brutus: {
    id: '7890',
    name: 'Brutus Buckeye',
    username: 'buckeye.1'
  }
};

// Mock threads on an IRB initial form
export const irbInitialThreads: Thread[] = [
  // Thread with replies
  {
    id: 'thread-1',
    person: people.chase,
    role: 'reviewer',
    message: 'This is a hot thread with replies',
    date: new Date().getUTCSeconds(),
    resolved: false,
    context: {
      field: 'activities'
    },
    replies: [
      {
        id: 'reply-1.1',
        person: people.chase,
        role: 'reviewer',
        message: 'Rabble rabble!',
        date: new Date().getUTCSeconds()
      },
      {
        id: 'reply-1.2',
        person: people.brutus,
        role: 'reviewer',
        message:
          'I agree with the rabble rabble. And also this is going to be a comment with a lot of content that should, ideally, fade out until we focus on the comment to see the rest.',
        date: new Date().getUTCSeconds()
      }
    ]
  },
  {
    id: 'thread-2',
    person: people.chase,
    role: 'reviewer',
    message:
      'This is a thread that no one replied to. And also this is going to be a comment with a lot of content that should, ideally, fade out until we focus on the comment to see the rest.',
    date: new Date().getUTCSeconds(),
    resolved: false,
    replies: [],
    context: {
      field: 'activities'
    }
  },
  {
    id: 'thread-3',
    person: people.neil,
    role: 'submitter',
    message: 'This is a thread that we resolved',
    date: new Date().getUTCSeconds(),
    resolved: true,
    context: {
      field: 'activities'
    },
    replies: [
      {
        id: 'reply-3.1',
        person: people.chase,
        role: 'reviewer',
        message: 'LGTM',
        date: new Date().getUTCSeconds()
      }
    ]
  }
];
