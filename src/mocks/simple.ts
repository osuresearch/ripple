import { FormDefinition, PageDefinition } from "../types";

const Main: PageDefinition = {
  title: 'Main page',
  description: `
    This page contains a set of simple fields using common data types
  `,
  fields: {
    textField1: {
      type: 'Text',
      label: 'Text field 1',
      required: 'You must fill out text field 1',
    },
    textField2: {
      type: 'Text',
      label: 'Text field 2',
    },
    booleanField: {
      type: 'Boolean',
      label: 'Boolean field',
      required: 'You must specify yes or no',
    },
    dateField: {
      type: 'Date',
      label: 'Date field',
    },
    keyField: {
      type: 'Key',
      label: 'Key field',
      required: 'You must select either A, B, or C',
      choices: {
        a: 'Choice A',
        b: 'Choice B',
        c: 'Choice C',
      }
    }
  }
}

export const SimpleForm = {
  title: 'Simple test form',
  version: '1.0',
  pages: {
    Main,
  }
} as const satisfies FormDefinition
