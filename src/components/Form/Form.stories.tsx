import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Form, FormProps } from '../Form/Form';

import IRBInitial from '../../app/forms/osu-irb-initial';
import { Page } from '../Page';
import { Field } from '../Field';

import { Item, TabPanel, NumberField } from '@osuresearch/ui';
import { RippleOptions } from '../../hooks/useRipple';
import { InvestigatorSearchField } from '../../app/components/InvestigatorSearchField';
import { ApprovedResearchSiteSearchField } from '../../app/components/ApprovedResearchSiteSearchField';

export default {
  title: 'Components/Form',
  component: Form,
  argTypes: {}
} as Meta<typeof Form>;

const options: Partial<RippleOptions> = {
  components: {
    InvestigatorSearchField,
    ApprovedResearchSiteSearchField
  }
};

export const Template: Story<FormProps> = (args) => (
  <Form {...args} form={IRBInitial} options={options}>
    {/*
    Notice this is basically the same as an autolayout component
    that just iterates pages/fields and dumps components.

    I want combinations of both possible. From autolayout of pages,
    autolayout of entire forms, to customization on a per page per
    form basis to add custom content and layout configurations.

    */}

    <Page name="team">
      <Field name="team" />
    </Page>

    {/* Autolayout */}
    <Page name="activities" autolayout />

    {/*
      Explicit layout - a developer can customize content between pages.
      However custom content may not be included in final printouts.
    */}
    {/* <Page name="multiSiteStudy">
      <Field name="isTest1" />

      <Field name="isMultiSite" />
      <Field name="isPILeadInvestigator" />
      <Field name="communicationPlan" />
      <Field name="leadInstitution" />
      <Field name="leadInstitutionApproval" />
      <Field name="coordinatingCenter" />
      <Field name="isOhioStateIRBOfRecord" />
      <Field name="siteCommunications" />
    </Page> */}

    <Page name="locations" autolayout />
  </Form>
);

export const Autolayout: Story<FormProps> = (args) => (
  <Form {...args} form={IRBInitial} options={options} autolayout />
);

export const CustomizingLayout: Story<FormProps> = (args) => (
  <Form {...args} form={IRBInitial}>
    <TabPanel>
      <Item title="Multi-Site Study">
        <Page name="multiSiteStudy">
          <Field name="isMultiSite" />
          <Field name="isPILeadInvestigator" />
          <Field name="communicationPlan" />
          <Field name="leadInstitution" />
          <Field name="leadInstitutionApproval" />
          <Field name="coordinatingCenter" />
          <Field name="isOhioStateIRBOfRecord" />
          <Field name="siteCommunications" />
        </Page>
      </Item>
      <Item title="Locations">
        <Page name="locations">
          <Field name="approved" />
        </Page>
      </Item>
      <Item title="New Study Team Member">
        <Page name="newTeamMember">
          <Field name="person" />
          <Field name="designation" />
          <Field name="activities" />
        </Page>
      </Item>
    </TabPanel>
  </Form>
);

// export const CustomizingLayout: Story<FormProps> = (args) => (
//   <Form {...args} form={IRBInitial}>
//     <Stack>
//       <Page name="multiSiteStudy">
//         <Field name="isMultiSite" />
//         <Field name="isPILeadInvestigator" />
//         <Field name="communicationPlan" />
//         <Field name="leadInstitution" />
//         <Field name="leadInstitutionApproval" />
//         <Field name="coordinatingCenter" />
//         <Field name="isOhioStateIRBOfRecord" />
//         <Field name="siteCommunications" />
//       </Page>
//       <Page name="locations">
//         <Field name="approved" />
//       </Page>
//       <Page name="newTeamMember">
//         <Field name="person" />
//         <Field name="designation" />
//         <Field name="activities" />
//       </Page>
//     </Stack>
//   </Form>
// );
