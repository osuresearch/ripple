// Test suite of various structures and edge cases.

import { PageDefinition, FieldDefinition, ChoicesList, FormDefinition } from "../../types"

const Page1: PageDefinition = {
  title: 'Page 1',
  fields: {
    p1Field1: {
      type: 'Text',
      label: 'This is the first field you will ever see',
      description: 'Ain\'t it great?',
    }
  }
}

const Page2: PageDefinition = {
  title: 'Page 2',
  fields: {
    showConditionalPage1: {
      type: 'Boolean',
      label: 'Say yes to see the conditional page',
    }
  }
}

const ConditionalPage1: PageDefinition = {
  title: 'Conditionally displayed page',
  condition: 'showConditionalPage1',
  description: 'This page was displayed because you said yes on the previous page',
  fields: {
    cp1Field1: {
      type: 'Text',
      label: 'First field on conditional page 1',
    }
  }
}

const SimpleCollectionTemplate: PageDefinition = {
  title: 'Simple collection item',
  fields: {
    field1: {
      type: 'Text',
      label: 'First field on collection item',
      component: {
        props: {
          height: 1,
        }
      }
    },
    field2: {
      type: 'Text',
      label: 'Second field on collection item',
      component: {
        props: {
          height: 1,
        }
      }
    },
    field3: {
      type: 'Boolean',
      label: 'Third field on collection item',
    },
    field4: {
      condition: 'this.field3',
      type: 'Text',
      label: 'Fourth field on collection item',
    }
  }
}

const NestedCollectionItem: PageDefinition = {
  title: 'Nested collection item',
  fields: {
    field1: {
      type: 'Text',
      label: 'First field on collection item',
    },
    nestedSimpleCollection: {
      type: 'Collection',
      label: 'Nested collection',
      template: SimpleCollectionTemplate,
    },
    nestedSubpageCollection: {
      type: 'Collection',
      label: 'Nested subpage collection',
      template: SimpleCollectionTemplate,
      component: {
        props: {
          variant: 'subpage',
        }
      }
    }
  }
}

const ShortTextField: FieldDefinition = {
  label: '',
  type: 'Text',
  component: {
    props: {
      height: 1,
      layout: 'horizontal',
    }
  }
}

const LongCollectionTemplate: PageDefinition = {
  title: 'Long form data',
  fields: {
    datasetTitle: {
      type: 'Text',
      label: 'Dataset title',
      component: {
        props: {
          limit: 50,
          height: 1,
        }
      }
    },
    datasetSize: {
      type: 'Number',
      label: 'Size of the dataset',
      component: {
        props: {
          formatOptions: {
            style: 'unit',
            unit: 'megabyte',
          }
        }
      }
    },
    datasetRecords: {
      type: 'Number',
      label: 'Number of records',
    },
    datasetTags: {
      type: 'Text',
      label: 'Additional tags',
    },

    _contact: {
      type: 'Section',
      label: 'Contact information',
    },

    contactName: {
      ...ShortTextField,
      label: 'Contact name',
    },

    contactAddress1: {
      ...ShortTextField,
      label: 'Address 1',
    },
    contactAddress2: {
      ...ShortTextField,
      label: 'Address 2',
    },
    contactCity: {
      ...ShortTextField,
      label: 'City',
    },
    contactState: {
      ...ShortTextField,
      label: 'State',
    },
    contactZip: {
      ...ShortTextField,
      label: 'Zip',
    },
  }
}

const TabularDataItem: PageDefinition = {
  title: 'Tabular data',
  fields: {
    datasetTitle: {
      type: 'Text',
      label: 'Dataset title',
      component: {
        props: {
          height: 1,
        }
      }
    },
    datasetSize: {
      type: 'Number',
      label: 'Size of the dataset',
      component: {
        props: {
          formatOptions: {
            style: 'unit',
            unit: 'megabyte',
          }
        }
      }
    },
    datasetRecords: {
      type: 'Number',
      label: 'Number of records',
    },
    datasetTags: {
      type: 'Text',
      label: 'Additional tags',
      component: {
        props: {
          height: 1,
        }
      }
    },
  }
}

const CollectionPage: PageDefinition = {
  title: 'Collection fields',
  fields: {
    defaultCollection: {
      type: 'Collection',
      label: 'Default collection',
      description: `
        The default configuration of collections will render responses
        inline on the page in a horizontal flex layout. Useful for
        short response forms.
      `,
      template: SimpleCollectionTemplate,
    },
    disclosureCollection: {
      type: 'Collection',
      label: 'Disclosure collection',
      description: `
        \`DisclosureCollection\` should be used for longer response forms. Each
        form is contained within a collapsible disclosure component.

        The \`summary\` config is used as the title for each instance. Note that tags
        are stripped from responses prior to being sent to the summary markdown parser.
      `,
      summary: (res) => `
        ${res.datasetTitle ?? '-'}
        ${res.datasetRecords ? '(' + res.datasetRecords + ' records)' : ''}
      `,
      template: LongCollectionTemplate,
      component: {
        name: 'DisclosureCollection',
      }
    },

    _experiments: {
      type: 'Section',
      label: 'Experimental variants',
    },

    tabularCollection: {
      type: 'Collection',
      label: 'Tabular collection',
      description: `
        \`TableCollection\` renders a row per item and headers render
        the render the template field labels.

        Component props can be used to customize the per-column behaviour.
      `,
      template: TabularDataItem,
      component: {
        name: 'TableCollection',
        props: {
          widths: [
            '40%', // title
            '20%', // records
            '20%', // size
            '20%', // tags
          ]
        }
      }
    },
    summarizedCollection: {
      type: 'Collection',
      label: 'Summarized collection',
      description: `
        The \`SummarizedCollection\` component will render a markdown
        summary per instance. Editing instances will take the user to a
        subpage.

        Important: If you do not summarize all the fields, then information
        may be missing that requires access to the subpage. This may impact
        diffing, printing, etc ... depending on how far we get on features.
      `,
      template: LongCollectionTemplate,
      summary: (res) => `
        **Dataset:** ${res.datasetTitle ?? 'Unnamed'}

        |Size (MB)|# of Records|Tags
        |---|---|---
        |${res.datasetSize ?? '—'}|${res.datasetRecords ?? '—'}|${res.datasetTags ?? '—'}

        **Contact:** ${res.contactName ?? '*No contact*'}

        **Address**

        ${res.contactAddress1 ?? '*No address*'}
        ${res.contactAddress2 ?? ''}
        ${res.contactCity ?? ''} ${res.contactState ?? ''} ${res.contactZip ?? ''}
      `,
      component: {
        name: 'SummarizedCollection',
      }
    },

    // customSummaryCollection: {
    //   type: 'Collection',
    //   label: 'Collection with custom summary',
    //   description: `
    //     A custom function can be used to convert responses into
    //     markdown for rendering each instance on this page.

    //     We use markdown to ensure any accessibility issues are
    //     handled automatically through the markdown parser.
    //   `,
    //   template: SimpleCollectionTemplate,
    // },

    // nestedCollection: {
    //   type: 'Collection',
    //   label: 'Nesting collections',
    //   template: NestedCollectionItem,
    // },
    // customDataDrivenSummary: {
    //   type: 'Collection',
    //   label: 'Custom data driven summary',
    //   summary: (res) => `
    //     Dataset: ${res.datasetTitle}

    //     |Size (MB)|# of Records|Tags
    //     |---|---|---
    //     |${res.datasetSize}|${res.datasetRecords}|${res.datasetTags}

    //     Contact ${res.contactName}
    //     Address:
    //     ${res.contactAddress1}
    //     ${res.contactAddress2}
    //     ${res.contactCity} ${res.contactState}, ${res.contactZip}
    //   `,
    //   template: TabularDataItem,
    // },
    // subpageCollection: {
    //   type: 'Collection',
    //   label: 'Collection rendered as subpages',
    //   template: NestedCollectionItem,
    //   component: {
    //     props: {
    //       variant: 'subpage',
    //     }
    //   }
    // },
  }
}

const ExampleChoices: ChoicesList = {
  first: 'First choice',
  second: 'Second choice **with ~~formatting~~**',
  third: `
    Third choice with **formatting** and additional markdown:
    - like
    - these
    - lists

    Or [a link](https://github.com/osuresearch).
  `,
  fourth: 'Fourth choice'
}

const TextEntryKitchenSink: PageDefinition = {
  title: 'Text entry fields',
  description: `
    Text entry is the core of forms and where
    Ripple's more advanced markup features come into play.
  `,
  fields: {
    defaultTextField: {
      type: 'Text',
      label: `
        Out of the box, the \`Text\` field supports our
        full suite of markup with no limitation on how
        much content may be added by the user.
      `,
    },
    limitedTextField: {
      type: 'Text',
      label: `
        The \`limit\` prop can be used to set a maximum number
        of characters for a particular field.

        Character count is based on **visible** characters,
        and does not account for newlines or markup. Thus
        the amount of bytes saved for this field will
        potentially exceed this limit.
      `,
      component: {
        props: {
          limit: 500,
        }
      }
    },
    shortTextField: {
      type: 'Text',
      label: `
        Setting the \`height\` prop will allow you to
        create single line styled inputs. However, this
        is just a **suggestion** for formatting. Text
        will still wrap on the page and users may still enter
        newlines or other markdown like other text fields.

        This adheres to the Ripple philosophy of treating forms
        as if they were Word documents: all user generated content
        should be visible and scannable regardless of view mode.
      `,
      component: {
        props: {
          limit: 50,
          height: 1,
        }
      }
    },
    longTextField: {
      type: 'Text',
      label: `
        If you expect your users to write an essay
        for a particular question, make it big.
      `,
      component: {
        props: {
          height: 50,
        }
      }
    }
  }
}

const ChoicesKitchenSink: PageDefinition = {
  title: 'Simple choice fields',
  fields: {
    booleanField: {
      type: 'Boolean',
      label: 'Example `Boolean` field',
    },
    flagField: {
      type: 'Flag',
      label: 'Example `Flag` field',
      choices: ExampleChoices
    },
    flagArrayField: {
      type: 'FlagArray',
      label: 'Example `FlagArray` field',
      choices: ExampleChoices
    },
    keyField: {
      type: 'Key',
      label: 'Example `Key` field',
      choices: ExampleChoices
    },
    keyArrayField: {
      type: 'KeyArray',
      label: 'Example `KeyArray` field',
      choices: ExampleChoices
    },

  }
}

const DataEntryKitchenSink: PageDefinition = {
  title: 'Misc data entry fields',
  fields: {
    dateField: {
      type: 'Date',
      label: 'Example `Date` field',
    },
    numberField: {
      type: 'Number',
      label: 'Example `Number` field',
    },
    numberRangeField: {
      type: 'NumberRange',
      label: 'Example `NumberRange` field',
    },
    moneyField: {
      type: 'Number',
      label: `
        Use the \`Number\` field with currency formatting for monetary input.
      `,
      description: `
        See [Research UI 5's example of currency formatting](https://osuresearch.github.io/ui/docs/?path=/docs/forms-numberfield--overview#currency)
        for more information on configurability.
      `,
      component: {
        props: {
          formatOptions: {
            currency: 'USD',
            currencySign: 'accounting',
            style: 'currency',
          }
        }
      }
    },
    attachmentField: {
      type: 'Attachment',
      label: 'Example `Attachment` field',
    },
    signatureField: {
      type: 'Signature',
      label: 'Example `Signature` field',
    }
  }
}

const CommonPatterns: PageDefinition = {
  title: 'Common design patterns',
  description: `
    Examples of common design patterns for fields and questions
    that we've observed during development of complex forms.
  `,
  fields: {
    textEntry: {
      type: 'Text',
      label: 'Foo bar'
    },
    textEntryNotApplicable: {
      type: 'Flag',
      label: 'Not applicable',
    },
    // Don't really know how to do this one. I think the "not applicable"
    // honestly should be a feature of the text field itself that can
    // be toggled (similar to the length counter)
  }
}

export const TestForm: FormDefinition = {
  title: 'Test form',
  version: '1.0',
  pages: {
    Page1,
    Page2,
    ConditionalPage1,
    CollectionPage,
    TextEntryKitchenSink,
    ChoicesKitchenSink,
    DataEntryKitchenSink,
    CommonPatterns,
  }
}

export default TestForm;
