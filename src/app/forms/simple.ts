import { FormDefinition, PageDefinition } from "../../types";

const Main: PageDefinition = {
  title: 'Main page',
  fields: {
    textField1: {
      type: 'Text',
      label: 'Text field 1',
    },
    textField2: {
      type: 'Text',
      label: 'Text field 2',
    },
    booleanField: {
      type: 'Boolean',
      label: 'Boolean field'
    },
    dateField: {
      type: 'Date',
      label: 'Date field',
    },
    keyField: {
      type: 'Key',
      label: 'Key field',
      choices: {
        a: 'Choice A',
        b: 'Choice B',
        c: 'Choice C',
      }
    }
  }
}

export const SimpleForm: FormDefinition = {
  title: 'Simple test form',
  version: '1.0',
  pages: {
    Main,
  }
}

export default SimpleForm;
