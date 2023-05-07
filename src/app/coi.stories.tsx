import React from 'react';

import { ComponentMeta } from '@storybook/react';

import coi from './forms/osu-coi';

import { Form } from '../components/Form';
import { RippleOptions } from '../hooks';

export default {
  title: 'Demos / Conflict Of Interest',
};

const options: Partial<RippleOptions> = {
  components: {
    // InvestigatorSearchField,
    // ApprovedResearchSiteSearchField
  }
};

export const ConflictOfInterest = () => <>
  <Form form={coi} options={options} autolayout />
</>