import React from 'react';

import { ComponentMeta } from '@storybook/react';

import iacuc from './forms/osu-iacuc';

import { Form } from '../components/Form';
import { RippleOptions } from '../hooks';

export default {
  title: 'Demos / IACUC',
};

const options: Partial<RippleOptions> = {
  components: {
    // InvestigatorSearchField,
    // ApprovedResearchSiteSearchField
  }
};

export const IACUC = () => <>
  <Form form={iacuc} options={options} autolayout />
</>