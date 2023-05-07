import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Form, FormProps } from '../components/Form/Form';

import { IBC } from './forms/osu-ibc';
import { IRB } from './forms/osu-irb';
import { RippleOptions } from '../hooks';

export default {
  title: 'OSU Research/Forms',
  component: Form,
  argTypes: {}
} as Meta<typeof Form>;

const options: Partial<RippleOptions> = {
  components: {
    // InvestigatorSearchField,
    // ApprovedResearchSiteSearchField
  }
};

export const OSUIBC: Story<FormProps> = () => (
  <Form form={IBC} options={options} autolayout />
);

export const OSUIRB: Story<FormProps> = () => (
  <Form form={IRB} options={options} autolayout />
);
