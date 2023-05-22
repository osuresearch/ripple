import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Form } from '../components/Form/Form';
import { RippleOptions } from '../hooks';

import { IBC } from './forms/osu-ibc';
import { IRB } from './forms/osu-irb';
import { IACUC } from './forms/osu-iacuc';
import { COI } from './forms/osu-coi';
import { PA005 } from './forms/osu-pa005';

export default {
  title: 'OSU Research/Forms',
  component: Form,
  argTypes: {}
} as Meta<typeof Form>;

type Story = StoryObj<typeof Form>;

const options: Partial<RippleOptions> = {
  components: {
    // InvestigatorSearchField,
    // ApprovedResearchSiteSearchField
  }
};

export const PA005Initial: Story = {
  render: (args) => (
    <Form form={PA005} options={options} />
  ),
  args: {

  }
};

export const IRBInitial: Story = {
  render: (args) => (
    <Form form={IRB} options={options} />
  ),
  args: {

  }
};

export const IBCInitial: Story = {
  render: (args) => (
    <Form form={IBC} options={options} />
  ),
  args: {

  }
};

export const IACUCInitial: Story = {
  render: (args) => (
    <Form form={IACUC} options={options} />
  ),
  args: {

  }
};

export const ConflictOfInterest: Story = {
  render: (args) => (
    <Form form={COI} options={options} />
  ),
  args: {

  }
};
