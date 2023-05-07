import React from 'react';

import { ComponentMeta } from '@storybook/react';

import irb from './forms/osu-irb';

import { Form } from '../components/Form';
import { RippleOptions } from '../hooks';

export default {
  title: 'Demos / IRB Initial',
};

const options: Partial<RippleOptions> = {
  components: {
    // InvestigatorSearchField,
    // ApprovedResearchSiteSearchField
  }
};

export const IRBInitial = () => <>
  <Form form={irb} options={options} autolayout />
</>
