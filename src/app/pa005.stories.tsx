import React from 'react';

import { ComponentMeta } from '@storybook/react';

import pa005 from './forms/osu-pa005';

import { Form } from '../components/Form';
import { RippleOptions } from '../hooks';

export default {
  title: 'Demos / PA005',
};

const options: Partial<RippleOptions> = {
  components: {
    // InvestigatorSearchField,
    // ApprovedResearchSiteSearchField
  }
};

export const PA005 = () => <>
  <Form form={pa005} options={options} autolayout />
</>