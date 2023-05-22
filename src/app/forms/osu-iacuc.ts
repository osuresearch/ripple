
/*
agent administration consistent for each activity
  as a one (activity) to many (agents)

+ additional questions

each activity has an "agent administration" section that's tied to that activity + animal(s)
*/

import { FormDefinition, PageDefinition } from "../../types";

const Overview: PageDefinition = {
  title: 'Overview',
  description: 'TODO: Where is my iacuc form?',
  fields: {

  }
}

export const IACUC = {
  title: 'IACUC',
  version: '1.0',
  pages: {
    overview: Overview,
  }
} as const satisfies FormDefinition;
