import { ChoicesList, PageDefinition, FieldDefinition, FormDefinition } from "../../types"

import { PageDefinition, ChoicesList, FormDefinition } from "../../types"

// More IRB to waste time.

// I feel like 'summary' should be at PageDefinition.
// E.g. if we want to display a shorthand summary view of a page
// without all of the content. Applicable to collections, but it
// could be applicable to other pages in some at-a-glance way.

const Identification: PageDefinition = {
  title: 'Identification',
  fields: {
    principalInvestigator: {
      type: 'Person',
      label: 'Principal Investigator',
      description: `
        Please enter the full name or lastname.# of the principal
        investigator, then select the name from the list that appears.
        Investigators not appearing on the list must register first.
        To register, have the principal investigator follow the
        [instructions provided](https://go.osu.edu/erik-web-app-registration)
        to complete the user registration form. Only they may complete the
        registration form. For assistance contact the
        [help desk](mailto:orhelpdesk@osu.edu).

        Failure to choose a name from the list will prevent you from
        moving forward in the submission process.

        For eligibility, see [qualifications for service as a principal investigator](http://go.osu.edu/pi-qualifications).
      `
    },
    department: {
      type: 'Key', // Department lookup
      label: 'Study Department',
      description: `
        Look up a department by ID or name. If the PI's department is
        known, this will be filled out for you.
      `
    },
    // There's then a big informational block about the Principal Investigator
    // which shows their contact info, training status, and a bunch of
    // additional content.
  }
}

const TypeOfResearch: PageDefinition = {
  title: 'Type of Research',
  description: `
    Select the appropriate option below based on the type of
    review required for the research.

    **Exempt research:** This option should be selected for research
    that involves human subjects that is not subject to regulations
    requiring IRB review and approval. Final determination is made by
    ORRP staff.

    **Expedited or full IRB-reviewed research:** This option should be
    selected for review by the Biomedical Sciences, Behavioral and Social
    Sciences, or Cancer IRBs at Ohio State including research reviewed
    through either expedited or full board processes. This option should
    also be selected for any research which will be ceded to another
    non-Ohio State IRB, such as WCG IRB, NCI CIRB, or another external
    institution.

    **Don't know:** This option should be selected if the investigator
    is uncertain whether the research is exempt or should be reviewed
    by an IRB.
  `,
  fields: {
    studyType: {
      type: 'Key',
      label: 'What type of review is required for your project?',
      choices: {
        Exempt: 'Exempt research',
        NonExempt: 'IRB-reviewed research (includes WCG IRB, NCI, CIRB, and other external IRB review)',
        Unknown: 'Don\'t know (screening questions to determine if exempt)',
      }
    }
  }
}

const ExemptScreening: PageDefinition = {
  title: 'Exempt Screening Questions',
  description: `
    Answer the following questions to help determine if your research
    potentially qualifies for exemption from federal regulations
    requiring IRB review. Please see [IRB Exemption Categories](https://go.osu.edu/categoriesexemptfromirbreview)
    for the list of exempt categories and their descriptions.
    Final determination will be made by designated ORRP staff.
  `,
  fields: {
    involvesPrisoners: {
      type: 'Boolean',
      label: `
        Will prisoners (or their data and/or specimens) be participants
        in the research?
      `,
    },
    // Note that all of these are Yes/No/Not Applicable
    abnormalPractices: {
      type: 'Key',
      label: `
        For research proposed under category 1, will the research be
        conducted outside of commonly accepted educational settings or
        deviate from normal educational practices?
      `,
      choices: {
        yes: 'Yes',
        no: 'No',
        na: 'Not applicable',
      },
    },
    surveysChildren: {
      type: 'Key',
      label: `
        For research proposed under category 2, will the research
        involve surveys or interview procedures with children?
      `,
      choices: {
        yes: 'Yes',
        no: 'No',
        na: 'Not applicable',
      },
    },
    observesChildren: {
      type: 'Key',
      label: `
        For research proposed under category 2, will the research
        involve observations of the public behavior of children,
        during which an investigator participates in the activities
        being observed?
      `,
      choices: {
        yes: 'Yes',
        no: 'No',
        na: 'Not applicable',
      },
    },
    interventionsWithChildren: {
      type: 'Key',
      label: `
        For research proposed under category 3, will benign behavioral
        interventions be conducted with children?
      `,
      choices: {
        yes: 'Yes',
        no: 'No',
        na: 'Not applicable',
      },
    },
    subjectToFda: {
      type: 'Key',
      label: `
        For research proposed under categories 1-5, is the research
        subject to FDA regulations?
      `,
      choices: {
        yes: 'Yes',
        no: 'No',
        na: 'Not applicable',
      },
    },
  }
}

// Note that there's a custom alert after the screening like:
//  Your study does not qualify for exempt status and has been
//  flagged as Not Exempt. If you have questions, review the Exempt
//  Research Policy or contact exemptinfo@osu.edu. You will now be
//  directed to complete the IRB application.

const ReviewBoard: PageDefinition = {
  title: 'Review Board',
  description: `
    Research at Ohio State involving human subjects that requires
    Institutional Review Board (IRB) review is reviewed by one of three
    university IRBs or one of multiple external IRBs, including WIRB-Copernicus
    Group IRB, National Cancer Institute Central IRB (CIRB), Nationwide
    Children's Hospital (NCH) IRB, and Advarra IRB. Board assignments are
    made to ensure that proposed research receives appropriate scientific or
    scholarly review by individuals with the qualifications to determine that
    the rights and welfare of research participants are protected. Final board
    assignment is determined by ORRP.

    Selection of one of the three Ohio State IRBs below will connect to the
    initial review of human subjects research.

    Selection of one of the external (non-Ohio State) IRBs will connect
    to an external review application which provides the necessary information
    for ORRP staff to perform pre-screening of the application to determine
    that institutional requirements have been met (e.g., COI disclosure,
    education) and that the research meets the conditions necessary to be
    forwarded for external IRB review.

    >Final board assignment is determined by ORRP.
    TODO: This is an info admonition. Would be nice to be able to add in markdown.
  `,
  fields: {
    reviewBoardId: {
      type: 'Key',
      label: 'Select the board to review this research',
      choices: {
        'Ohio State Behavioral and Social Sciences IRB': 'Ohio State Behavioral and Social Sciences IRB',
        'Ohio State Biomedical Sciences IRB': 'Ohio State Biomedical Sciences IRB',
        'Ohio State Cancer IRB': 'Ohio State Cancer IRB',
        'National Cancer Institute Central IRB (CIRB)': 'National Cancer Institute Central IRB (CIRB)',
        'Nationwide Children\'s Hospital IRB': 'Nationwide Children\'s Hospital IRB',
        'WIRB-Copernicus Group IRB': 'WIRB-Copernicus Group IRB',
        'Advarra IRB': 'Advarra IRB',
        'Other external IRB': 'Other external IRB',
      }
    }
  }
}

const MultiSiteStudy: PageDefinition = {
  title: 'Multi-site Study',
  description: `
    Multi-site research includes projects or studies that involve
    collaboration with sites or individuals external to Ohio State.
    The IRB must determine whether external sites or personnel need
    IRB approval in order to participate in study activities.

    EXAMPLES OF MULTI-SITE RESEARCH:
    - Ohio State is the lead institution of a group of sites participating
      in the same research project, where all sites are recruiting subjects
      and administering research interventions
    - An Ohio State investigator is participating in a research project,
      where another institution is the lead institution.
    - Ohio State is the IRB of record for one or more other sites
      participating in a research project

    EXAMPLES OF NON-MULTI-SITE RESEARCH:
    - An Ohio State investigator is conducting research at a local
      elementary school that involves recruiting participants and performing
      study interventions, where no school employees are engaged in the research.
    - An Ohio State investigator and research staff interact with clients
      at a local pharmacy, and a letter of support from the pharmacy is in place.
  `,
  fields: {
    isMultiSite: {
      type: 'Boolean',
      label: 'Is this a multi-site study?'
    },
    // If Yes, asks question below and enables multi-site accrual goal question on Number of Participants page.
    // Applies to all below.
    isOsuProjectLead: {
      type: 'Boolean',
      condition: 'isMultiSite',
      label: `
        Is the Ohio State PI the lead investigator or is The Ohio State
        University the lead site for collaborative research?
      `
    },
    isOsuIrbOfRecord: {
      type: 'Boolean',
      condition: 'isMultiSite',
      label: `
        Will Ohio State be IRB of record for any other institution/location?
      `
    },
    multiLocationCommunication: {
      condition: 'isOsuProjectLead or isOsuIrbOfRecord',
      type: 'Text',
      label: `
        Describe the communication between sites that might be relevant
        to the protection of participants, such as unanticipated problems,
        interim results, and protocol modifications.
      `
    },
    leadInstitution: {
      condition: 'isMultiSite and not isOsuProjectLead',
      type: 'Text',
      label: 'Provide the name of the lead institution directing the research.'
    },
    nonOsuApprovalFiles: {
      condition: 'isMultiSite and not isOsuProjectLead',
      type: 'Attachment',
      label: `
        Provide the IRB or ethics board approval from the lead institution,
        as applicable.
      `
    },
    coordinatingCenterDescription: {
      condition: 'isMultiSite',
      type: 'Text',
      label: `
        If a separate data coordinating center exists (different from lead
        institution) provide the name.
      `
    },
  }
}

// Used for both domestic and international research sites
const PotentialLocationActivities: ChoicesList = {
  0: 'Protocol development/study design',
  1: 'Participant recruitment',
  2: 'Obtaining consent/parental permission/assent',
  3: 'Research interventions and subject interactions (administer questionnaires/interviews/surveys)',
  4: 'Specimen collection',
  5: 'Data collection/entry/coding',
  6: 'Access participant protected health information (PHI)',
  7: 'Manuscript preparation',
  8: 'Reporting results',
  9: 'Coordinating center',
}

/**
 * Collection template on the Location of Research page
 */
const ApprovedResearchSite: PageDefinition = {
  title: 'Ohio State Approved Research Site',
  description: `
    Select the appropriate Ohio State approved research site by typing
    the building name or address in the search field below.

    If you are adding a county extension office as a research location,
    enter the county name first when searching. If you are performing
    research in ALL county extension offices, select "Ohio State
    University Extension".

    To add a Columbus campus location, begin typing an academic
    building name below or enter "Ohio State Columbus Campus" in
    the search field and select that option when it appears.

    If the specific Ohio State site is not listed,
    [contact ORRP](mailto:irbinfo@osu.edu) for assistance.
  `,
  fields: {
    approvedSiteKey: {
      type: 'Key',
      component: {
        name: 'ApprovedResearchSiteSearchField',
        props: {
          endpoint: 'https://example.com/api'
        }
      },
      label: 'Search for a location',
      description: `
        Search for the location by name, address, or keyword and
        click on the name that appears below the search input to
        select the specified approved location.
      `
    },
    // These will autocomplete based on lookup results.
    // But some results may leave this as editable.
    // There's also admonition text missing:

    // Provide the location address. If the location does not
    // have an address, provide a description of the research
    // location under 'Address line 1', such as The Oval, Mirror Lake,
    // or on High Street.
    address1: {
      type: 'Text',
      label: 'Address line 1',
    },
    address2: {
      type: 'Text',
      label: 'Address line 2',
    },
    city: {
      type: 'Text',
      label: 'City',
    },
    state: {
      type: 'Text',
      label: 'State',
    },
    zip: {
      type: 'Text',
      label: 'Zip',
    }
  }
}

/**
 * Collection template on the Location of Research page
 */
const DomesticResearchSite: PageDefinition = {
  title: 'Non-Ohio State Domestic Research Site',
  description: `
    Please provide the following information about the
    non-Ohio State domestic research site.
  `,
  fields: {
    locationName: {
      type: 'Text',
      label: 'Location name/description'
    },
    address1: {
      type: 'Text',
      label: 'Address line 1'
    },
    address2: {
      type: 'Text',
      label: 'Address line 2'
    },
    city: {
      type: 'Text',
      label: 'City'
    },
    state: {
      type: 'Text',
      label: 'State'
    },
    personnelActivities: {
      type: 'Key',
      label: 'Indicate who is performing research activities at this location:',
      choices: {
        osu: 'Ohio State personnel only',
        nonOsu: 'Site personnel only (non-Ohio State staff)',
        both: 'Both Ohio State and site personnel',
      }
    },
    potentialActivities: {
      type: 'KeyArray',
      label: 'Potential activities for this location (check all that apply)',
      choices: PotentialLocationActivities,
    },
    otherActivity: {
      type: 'Text',
      label: 'Other activity description',
    },
    approvalDocuments: {
      type: 'Attachment',
      label: `
        A letter of support and/or another IRB\'s approval should
        be provided, as necessary.
        [Contact ORRP](mailto:irbinfo@osu.edu) for more information.
      `
    }
  }
};

/**
 * Collection template on the Location of Research page
 */
const InternationalResearchSite: PageDefinition = {
  title: 'International Research Site',
  description: `
    Provide information about the local context in which the research will
    be conducted. For more information, see HRPP policy
    [Research Performance Sites and Collaborative Off-Site Research](https://go.osu.edu/hrpppolicy40).

    Procedures:
    * Determine if local research and/or ethics reviews are also required.
      If so, attach a copy of the approval/review.
    * Provide local letters of support from host or participating organizations,
      if applicable.

    For information about federal requirements for IRB review of international
    research, see [45 CFR 46.107](https://go.osu.edu/hhs45cfr46-107) and
    the [OHRP International Program](https://go.osu.edu/ohrpinternational).

    For a list of regulations, laws, and guidelines pertaining to
    international human subjects research for selected countries,
    see [International Compilation of Human Research Protections](https://go.osu.edu/orhpinternationalcompilation).

    For information about international travel health, safety, and security,
    see [The Ohio State University Department of Public Safety](https://go.osu.edu/deptpublicsafety)
    and [Office of International Affairs - International Travel Health and Safety](https://go.osu.edu/iths).
  `,
  fields: {
    description: {
      type: 'Text',
      label: 'Location name and description',
    },
    contactName: {
      type: 'Text',
      label: 'Local contact name',
    },
    contactPhone: {
      type: 'Text',
      label: 'Local contact phone',
    },
    contactEmail: {
      type: 'Text',
      label: 'Local contact email',
    },

    _activities: {
      type: 'Section',
      label: 'Activities',
    },

    personnelActivities: {
      type: 'Key',
      label: 'Indicate who is performing research activities at this location:',
      choices: {
        osu: 'Ohio State personnel only',
        nonOsu: 'Site personnel only (non-Ohio State staff)',
        both: 'Both Ohio State and site personnel',
      }
    },
    potentialActivities: {
      type: 'KeyArray',
      label: 'Potential activities for this location (check all that apply)',
      choices: PotentialLocationActivities,
    },
    otherActivity: {
      type: 'Text',
      label: 'Other activity description',
    },

    _languages: {
      type: 'Section',
      label: 'Languages',
    },

    languages: {
      type: 'KeyArray',
      label: `
        List the language(s) in which the research will be conducted
        (list all applicable languages)
      `,
      description: 'Search for a language',
      // specialized language lookup. For now, just a hardcoded demo.
      choices: {
        'English': 'English',
        'Spanish': 'Spanish',
        'Chinese (Mandarin)': 'Chinese (Mandarin)',
        'Japanese': 'Japanese',
      },
    },
    hasFluentTeamMember: {
      type: 'Boolean',
      label: `
        Is a team member fluent in the language of
        the potential participants?
      `,
    },
    translationProcess: {
      condition: 'not hasFluentTeamMember',
      type: 'Text',
      label: `
        Describe the provisions in place to provide translation
        services throughout the duration of the study.
      `
    },

    internationalInfluences: {
      type: 'Text', // with Not Applicable
      label: `
        Describe any cultural, political, religious, or other local influences
        that may affect conduct of the proposed research and how these will
        be addressed (e.g., issues posing potential threats, requiring changes
        in recruitment methods, etc.).
      `
    },
    localConsentExceptions: {
      type: 'Text', // with Not Applicable
      label: `
        Describe any local exceptions to the required consent process
        (e.g., the age at which legally effective informed consent can
        be provided, a request from an outsider to sign documents would
        be treated with suspicion based on customs, etc.). Provide a
        plan for addressing these differences.
      `
    },
    // hasLocalConsentExceptions: {
    //   // this is the not applicable checkbox.
    // },
    hasChildren: {
      type: 'Boolean',
      label: 'Will children be enrolled in the study?'
    },
    localChildConsentExceptions: {
      condition: 'hasChildren',
      type: 'Text',
      label: `
        Describe any local exceptions regarding the requirements for
        adult permission and child assent and how these will be addressed
      `
    },
    hasCompensationPlan: {
      type: 'Boolean',
      label: 'Will compensation be offered?',
    },
    compensationPlan: {
      condition: 'hasCompensationPlan',
      type: 'Text',
      label: 'Provide the amount and explain its appropriateness for the setting.',
    },
    communityBenefit: {
      type: 'Text',
      label: `
        Explain any benefits to the local community that will remain with
        the community once the research is complete.
      `
    },
    relatedRegionalTraining: {
      type: 'Text',
      label: `
        Describe the researchers' training/experience with conducting
        research (or studying or residing) in the research setting, including
        any relationship(s) with the community from which participants will
        be recruited.
      `
    },

    _consultants: {
      type: 'Section',
      label: 'Consultant Contacts',
      description: `
        Provide contact details for two individuals who are **not affiliated**
        with the research (or researchers), are knowledgeable about the
        location and population, and could serve as a consultant(s) regarding
        the proposed research.

        ADMONITION:
        Note: It is not required that these individuals reside or work in
        the research location
      `
    },

    // first consultant contact heading

    // TODO: Figure out how to split this up in some smart way.
    // I really don't want more DOM being added here.

    firstContactName: {
      type: 'Text',
      label: `
      **First consultant contact**

      Full name
      `,
    },
    firstContactTitle: {
      type: 'Text',
      label: 'Title',
    },
    firstContactPhone: {
      type: 'Text',
      label: 'Phone',
    },
    firstContactEmail: {
      type: 'Text',
      label: 'Email',
      description: `
        You must fill out either the contact phone or contact email.
      `
    },

    // second consultant contact heading

    secondContactName: {
      type: 'Text',
      label: `
      **Second consultant contact**

      Full name
      `,
    },
    secondContactTitle: {
      type: 'Text',
      label: 'Title',
    },
    secondContactPhone: {
      type: 'Text',
      label: 'Phone',
    },
    secondContactEmail: {
      type: 'Text',
      label: 'Email',
      description: `
        You must fill out either the contact phone or contact email.
      `
    },
    dataManagementPlan: {
      type: 'Text',
      label: `
        Describe procedures for data storage in the local setting
        and for transfer of data to Ohio State.
      `
    },
    hasMedicalProcedures: {
      type: 'Boolean',
      label: `
        Will the research involve medical procedures and/or treatment?
      `
    },
    standardProcedures: {
      condition: 'hasMedicalProcedures',
      type: 'Text',
      label: `
        Indicate if any planned research procedures are considered to
        be standard of care in the country or location.
      `
    },
    emergencyTreatmentPlan: {
      condition: 'hasMedicalProcedures',
      type: 'Text',
      label: `
        Describe provisions for emergency treatment that are
        available in the location.
      `
    },
    internationalSiteFiles: {
      type: 'Attachment',
      label: `
      **Approval Documents**

      A letter of support, reliance agreement, and/or another IRB's approval
      should be provided, as necessary. [Contact ORRP](mailto:IRBAgreements@osu.edu)
      for more information.
      `
    },
  }
}

const LocationOfResearch: PageDefinition = {
  title: 'Location of Research',
  description: `
    Research to be conducted at locations other than approved performance
    sites may require a letter of support or another institution's approval
    if personnel are engaged. See [OHRP Engagement Guidance](https://go.osu.edu/ohrpengagementguidance)
    or contact ORRP at [irbinfo@osu.edu](mailto:irbinfo@osu.edu)
    or [614-688-8457](tel:614-688-8457) for more information.
  `,
  fields: {
    approved: {
      type: 'Collection',
      label: 'Ohio State Approved Research Sites',
      // placeholder: 'You have listed no Ohio State approved research sites.',
      // summary: '{{ approvedSite.name }} and address info under it.',
      template: ApprovedResearchSite,
    },
    domestic: {
      type: 'Collection',
      label: 'Domestic Research Sites - Non-Ohio State Locations',
      // placeholder: 'You have listed no alternate domestic research sites.',
      template: DomesticResearchSite,
    },
    international: {
      type: 'Collection',
      label: 'International Research Sites',
      // placeholder: 'You have listed no international research sites.',
      template: InternationalResearchSite,
    }
  }
};

const TeamMemberActivities: ChoicesList = {
  'Protocol development/study design': 'Protocol development/study design',
  'Recruitment': 'Recruitment',
  'Assess participant eligibility': 'Assess participant eligibility',
  'Obtain consent/parental permission/assent': 'Obtain consent/parental permission/assent',
  'Interview participants/administer surveys': 'Interview participants/administer surveys',
  'Process biological specimens': 'Process biological specimens',
  'Conduct follow-up visits': 'Conduct follow-up visits',
  'Data collection/entry/coding': 'Data collection/entry/coding',
  'Data analysis/interpretation': 'Data analysis/interpretation',
  'Reporting results': 'Reporting results',
  'Manuscript preparation': 'Manuscript preparation',
  'Maintain regulatory documentation': 'Maintain regulatory documentation',
  'Access participant Protected Health Information (PHI)': 'Access participant Protected Health Information (PHI)',
};

const ResearchActivities: ChoicesList =  {
  'Anesthesia or sedation': 'Anesthesia (general or local) or sedation',
  'Audio, video, digital, or image recordings': 'Audio, video, digital, or image recordings',
  'Biohazards': 'Biohazards (e.g., rDNA, infectious agents, select agents, toxins)',
  'Biological sampling (other than blood)': 'Biological sampling (other than blood)',
  'Blood drawing': 'Blood drawing',
  'Coordinating center': 'Coordinating center',
  'Data repositories': 'Data repositories (future unspecified use, including research databases)', // Enables Data Repositories page
  'Data, not publicly available': 'Data, not publicly available',
  'Data, publicly available': 'Data, publicly available',
  'Deception': 'Deception', // Enables Deception page
  'Devices': 'Devices', // Enables Devices page
  'Diet, exercise, or sleep modifications': 'Diet, exercise, or sleep modifications',
  'Drugs or biologics': 'Drugs or biologics (including dietary supplements/ingredients)', // Enables Drugs or Biologics page and Drugs (Supplemental Questions) page
  'Emergency research': 'Emergency research',
  'Focus groups': 'Focus groups',
  'Food supplements': 'Food supplements',
  'Gene transfer': 'Gene transfer',
  'Genetic testing': 'Genetic testing', // Enables Genetic Testing page
  'Internet or e-mail data collection': 'Internet or e-mail data collection',
  'Magnetic resonance imaging': 'Magnetic resonance imaging (MRI)',
  'Materials that may be considered sensitive, offensive, threatening, or degrading':
    'Materials that may be considered sensitive, offensive, threatening, or degrading',
  'Non-invasive medical procedures': 'Non-invasive medical procedures (e.g., EKG, Doppler)',
  'Observation of participants': 'Observation of participants (including field notes)',
  'Oral history': 'Oral history (does not include dental or medical history)',
  'Placebo': 'Placebo',
  'Pregnancy testing': 'Pregnancy testing',
  'Umbrella Protocol': 'Program Protocol (Umbrella Protocol)',
  'Radiation': 'Radiation (e.g., CT or DEXA scans, X-rays, nuclear medicine procedures)', // Enables Radiation, Radiation Exams/Procedures, and Radiation Dosage Totals pages
  'Randomization': 'Randomization',
  'Record review': 'Record review (which may include PHI)',
  'Specimen research': 'Specimen research',
  'Stem cell research': 'Stem cell research',
  'Storage of biological materials':
    'Storage of biological materials (future unspecified use, including repositories)', // Enables Storage of Biological Materials page
  'Surgical procedures': 'Surgical procedures (including biopsies)',
  'Group surveys': 'Surveys, questionnaires, or interviews (group)',
  'One-on-one surveys': 'Surveys, questionnaires, or interviews (one-on-one)',
  'Other': 'Other (Specify)' // If Yes Specify the other activity
}

/**
 * Collection template on Team page
 */
const TeamMember: PageDefinition = {
  title: 'New Study Team Member',
  fields: {
    person: {
      type: 'Person',
      label: 'Team member search',
      description: `
        Please enter the full name or lastname.# of the team member,
        then select the name from the list that appears. Study team members
        not appearing on the list must register first. To register,
        have the team member follow the [instructions provided](https://go.osu.edu/erik-web-app-registration)
        to complete the user registration form. Only they may
        complete the registration form. For assistance contact the
        [help desk](mailto:orhelpdesk@osu.edu).
      `,
      // Example of providing a custom React component.
      // Add a mapping between component type and the
      // name in the useRipple hook options.
      component: {
        name: 'InvestigatorSearchField',
        props: {
          // You can also specify props to pass to your component.
          // Use case: reusable components that have different
          // behaviours across different fields.
          iconName: 'user',
          endpoint: 'https://example.com/api'
        }
      }
    },
    role: {
      type: 'Key',
      label: 'Team member designation',
      choices: {
        'Co-Investigator': 'Co-Investigator',
        'Key Personnel': 'Key Personnel',
        'Additional Contact': 'Additional Contact (receives study correspondence from ORRP)'
      }
    },
    // TODO: the original form allows checking both Co-I and Key Personnel
    // but there's an error checker. Realistically, this should be split
    // into a ternary radio and add a checkbox when they don't pick
    // additional contact to also label the individual as an additional contact.
    activities: {
      condition: 'this.designation in ("Co-Investigator", "Key Personnel")',
      type: 'FlagArray',
      label: 'Research role/activities performed for study',
      choices: TeamMemberActivities,
    },
    otherActivities: {
      condition: 'this.designation in ("Co-Investigator", "Key Personnel")',
      type: 'Text',
      label: 'Other activity description',
    }
  }
};

const Team: PageDefinition = {
  title: 'Study Personnel',
  description: `
    Enter all Ohio State study team members below. External collaborators will
    be entered on a different page. Study team members should only be listed
    in one category (i.e., PI, co-investigator, or key personnel).

    Co-investigators and key personnel are defined as individuals who
    participate in the design, conduct, or reporting of human subjects
    research. At a minimum, include individuals who recruit participants,
    obtain consent, or who collect study data.

    Additional contacts can also serve in another role on the project.

    All individuals listed as Ohio State study team members will have
    access to all submitted information, including completion status of
    team members' administrative and training requirements (CITI, RCR, COI
    disclosure), and may edit submissions on behalf of the principal investigator.

    Electronic signatures are required of all Ohio State investigators
    named on the submission.

    ADMONITION:
    The individual entering the new study will automatically be entered
    as an additional contact (if not designated as the principal investigator).
    This individual must click the edit icon to edit his/her role if an
    additional role (i.e., co-investigator or key personnel) is also applicable.
  `,
  fields: {
    team: {
      type: 'Collection',
      label: 'Study Team',
      // placeholder: 'You have listed no study personnel.',
      template: TeamMember
    }
  }

  // There's training information displayed at the bottom of the page.
  // Has their contact info, academic info, COI/HSP/RCR/GCP/SBS.

  // There's also an alert for CITI training.
};

/**
 * Collection template on External Collaborators page
 */
const ExternalCollaborator: PageDefinition = {
  title: 'New External (non-Ohio State) Co-Investigators & Key Personnel',
  description: `
    If the external collaborator has a sponsored guest account with Ohio
    State, you can add him/her by searching in the box below. If he/she does
    not appear or does not have a sponsored guest account, complete the
    requested contact information in the form below. At the time of
    screening of the submission, ORRP staff will work with the investigator
    to execute any necessary agreements for the addition of this external
    collaborator.
  `,
  fields: {
    person: {
      type: 'Person',
      label: 'Person search',
      description: `
        Please enter the full name or lastname.# of the team member
        then select them from the list that appears. If the team member
        does not appear in the provided list, please instead fill in
        their contact information in the form below.
      `,
      component: {
        name: 'InvestigatorSearchField',
        props: {
          iconName: 'user',
          endpoint: 'https://example.com/api'
        }
      },
      // Note that a result should also autofill contact info
      // in the rest of the form. Some fields get turned to readonly,
      // some are editable.
    },

    _contact: {
      type: 'Section',
      label: 'Contact Information',
    },

    firstName: {
      type: 'Text',
      label: 'First name',
    },
    lastName: {
      type: 'Text',
      label: 'Last name',
    },
    organization: {
      type: 'Text',
      label: 'Organization',
    },
    phone: {
      type: 'Text',
      label: 'Phone',
    },
    osuEmail: {
      type: 'Text',
      label: 'Ohio Statee Email',
      // TODO: readonly, will autofill from lookup.
    },
    email: {
      type: 'Text',
      label: 'Preferred Email',
    },
    credential: {
      type: 'Text',
      label: 'Credential (degree and/or certifications)'
    },
    title: {
      type: 'Text',
      label: 'Title',
    },
    address1: {
      type: 'Text',
      label: 'Address Line 1',
    },
    address2: {
      type: 'Text',
      label: 'Address Line 2',
    },
    city: {
      type: 'Text',
      label: 'City',
    },
    state: {
      type: 'Text',
      label: 'State', // NOTE: This is a dropdown. Not a dropdown in other places.
    },
    country: {
      type: 'Text',
      label: 'Country',
    },
    // TODO: Country AFTER city/state is a bit awkward.
    // Should standardize this some more.

    _involvement: {
      type: 'Section',
      label: 'Research Involvement',
    },

    role: {
      type: 'Key',
      label: 'Study team designation',
      choices: {
        'Co-Investigator': 'Co-Investigator',
        'Key Personnel': 'Key Personnel',
      }
    },
    activities: {
      condition: 'this.designation in ("Co-Investigator", "Key Personnel")',
      type: 'FlagArray',
      label: 'Research role/activities performed for study',
      choices: TeamMemberActivities,
    },
    otherActivities: {
      condition: 'this.designation in ("Co-Investigator", "Key Personnel")',
      type: 'Text',
      label: 'Other activity description',
    },

    teamCVFiles: {
      type: 'Attachment',
      label: `
        Provide the external collaborator's resume/CV. This document
        is required in order for a reliance agreement to be drafted.
        Provide the external agreement when directed by ORRP staff.
        [Contact ORRP](mailto:irbagreements@osu.edu) with questions.
      `
    }

    // And then there's a block that shows their training, contact info, etc
    // at the bottom of the page. Seems like "Person with training data"
    // should always just inline their training data in the lookup match.
  }
}

const ExternalCollaborators: PageDefinition = {
  title: 'External Co-Investigators & Key Personnel',
  description: `
    Enter the names of external collaborators who are engaged in the research.
    Only external personnel whose activities will be covered by an Ohio State
    IRB should be included.

    "Engaged" individuals are those who intervene or interact with participants
    in the context of the research or who will obtain individually identifiable
    private information for research funded, supervised, or coordinated by
    Ohio State University. See [OHRP Engagement Guidance](https://go.osu.edu/ohrpengagementguidance)
    or contact ORRP at [irbagreements@osu.edu](mailto:irbagreements@osu.edu)
    or [614-688-8457](tel:614-688-8457) for more information.

    ADMONITION:
    If there are no external collaborators, click "Continue" to proceed.
  `,
  fields: {
    externalCollaborators: {
      type: 'Collection',
      label: 'External Collaborators',
      // placeholder: 'You have listed no external collaborators.',
      template: ExternalCollaborator
    }
  }
}

const Funding: PageDefinition = {
  title: 'Funding and Financial Conflicts',
  description: `
    If the research is federally funded and involves a subcontract
    to or from another entity, an IRB Authorization Agreement may be
    required. [Contact ORRP](mailto:irbinfo@osu.edu) for more information.
  `,
  fields: {
    hasFunding: {
      type: 'Key',
      label: 'Is the research funded or has funding been requested?',
      choices: {
        'Yes': 'Yes',
        'No': 'No',
        'Pending': 'Pending',
      }
    },
    additionalSponsors: {
      condition: 'hasFunding in ("Yes", "Pending")',
      type: 'KeyArray',
      label: 'Add a sponsor',
      description: `
        Lookup a sponsor by name. If a sponsor to be added does not appear
        in the search, please [contact ORRP](mailto:irbinfo@osu.edu) to
        have the sponsor added to the system. Multiple sponsors can be
        added. For funding sources internal to Ohio State (e.g.,
        departmental funds, start-up funds), select 'internal funds' as
        the funding source. If Ohio State is the recipient of a sub-award,
        select both the sponsor and the primary awardee as sponsors.
      `,
      // TODO: Custom sponsor lookup
      choices: {
        microsoft: 'Microsoft',
        apache: 'Apache',
      }
    },
    hasNonmonetarySupport: {
      type: 'Key',
      label: `
        Is any support other than monetary (e.g., drugs, equipment, etc.)
        being provided for the study?
      `,
      choices: {
        'Yes': 'Yes',
        'No': 'No',
        'Pending': 'Pending',
      }
    },
    supportAndProvider: {
      condition: 'hasNonmonetarySupport in ("Yes", "Pending")',
      type: 'Text',
      label: 'Please specify the support and provider'
    },
    grantFiles: {
      type: 'Attachment',
      label: 'Provide a copy of the grant application or funding proposal.'
    },

    _coi: {
      type: 'Section',
      label: 'Financial Conflict of Interest',
      description: `
        All Ohio State investigators and key personnel must have a current
        COI disclosure (updated as necessary for the proposed research) before
        IRB review. Examples of financial interests that must be disclosed
        include (but are not limited to) consulting fees or honoraria; stocks,
        stock options or other ownership interests; and patents, copyrights
        and royalties from such rights. For more information, see Office of
        Research Compliance [COI Overview](https://go.osu.edu/coi-policy)
        and [eCOI](http://go.osu.edu/coi-process).
      `
    },

    membersWithCOI: {
      type: 'KeyArray',
      label: `
        Please indicate if any Ohio State University investigator
        (including principal or co-investigator), key personnel, or
        their immediate family members has a financial conflict
        (including salary or other payments for services, equity
        interests, or intellectual property rights) that would
        reasonably appear to be affected by the research, or a
        financial interest in any entity whose financial interest
        would reasonably appear to be affected by the research.
        Select 'none' if no financial conflicts exist.
      `,
      // TODO: This one is interesting.
      // We need to pull the list of team members and have
      // a checkbox associated with each. OR A "None" box.
      // Might be another custom lookup - maybe one that
      // can target form data itself for populating results
    }
  }
}

const OtherIRB: PageDefinition = {
  condition: 'reviewBoardId == "Other external IRB"',
  title: '"Other" External IRB Review',
  description: `
    An IRB Authorization Agreement is required for research ceded to
    an external IRB other than those listed on the last page. See
    HRPP policy [Research Performance Sites and Collaborative Off-Site Research](https://go.osu.edu/hrpppolicy40)
    or contact ORRP for more information.
  `,
  fields: {
    externalIrbName: {
      type: 'Text',
      label: 'Specify the external IRB that will provide review',
    },

    _investigator: {
      type: 'Section',
      label: 'External Investigator',
    },

    externalInvestigatorName: {
      type: 'Text',
      label: 'Name (Last, First, MI)', // TODO: Don't like this label.
    },
    externalInvestigatorEmail: {
      type: 'Text',
      label: 'Email',
    },
    externalInvestigatorDegree: {
      type: 'Text',
      label: 'Degree', // TODO: Don't like this. We had "Credential" elsewhere.
    },
    externalInvestigatorPhone: {
      type: 'Text',
      label: 'Phone',
    },

    _contact: {
      type: 'Section',
      label: 'External IRB Contact',
    },

    externalIrbContactName: {
      type: 'Text',
      label: 'Name (Last, First, MI)', // TODO: Don't like this label.
    },
    externalIrbContactEmail: {
      type: 'Text',
      label: 'Email',
    },
    externalIrbContactDegree: {
      type: 'Text',
      label: 'Degree', // TODO: Don't like this. We had "Credential" elsewhere.
    },
    externalIrbContactPhone: {
      type: 'Text',
      label: 'Phone',
    },
    // TODO: Look, another address box with city required!
    externalIrbContactAddress1: {
      type: 'Text',
      label: 'Address Line 1',
    },
    externalIrbContactAddress2: {
      type: 'Text',
      label: 'Address Line 2',
    },
    externalIrbContactCity: {
      type: 'Text',
      label: 'City',
    },
    externalIrbContactState: {
      type: 'Text',
      label: 'State', // TODO: Another pick list
    },
    externalIrbContactZip: {
      type: 'Text',
      label: 'Zip',
    }
  }
}

const WesternIRB: PageDefinition = {
  condition: 'reviewBoardId == "WIRB-Copernicus Group IRB"',
  title: 'Western IRB Review',
  fields: {
    hasNonOSUProtocolDesign: {
      type: 'Boolean',
      label: `
        Is the protocol designed and written by the sponsor or lead
        site and without any scientific contribution by Ohio State faculty?
      `
    },
    hasForProfitSponsor: {
      type: 'Boolean',
      label: `
        Is the sponsor of the research a "for-profit" entity/company?
      `
    },
    hasNonProfitSponsor: {
      type: 'Boolean',
      label: `
        Does the proposed research involve funds from a federal
        or other not-for-profit funding agency?
      `
    }
  }
}

const InstitutionalApprovals: PageDefinition = {
  title: 'Institutional Approvals',
  description: `
    Check all that apply and provide applicable documentation.

    See websites listed below for information on obtaining approvals.
    IRB review cannot be conducted until required institutional approvals
    or exemptions are obtained, except as noted.
  `,
  fields: {
    // TODO: Some of these aren't visible based on the prior questions.
    // E.g. my test study just shows CCC and IBC.

    hasNoApproval: {
      type: 'Boolean', // TODO: Checkbox not Yes/No
      label: 'No institutional approval',
    },
    hasCCCApproval: {
      type: 'Boolean', // TODO: Checkbox not Yes/No
      label: '[Comprehensive Cancer Center (CCC) Clinical Scientific Review Committee (CSRC)](https://go.osu.edu/orrpcsrc)',
      description: `
        Approval or exemption required prior to IRB review for
        all cancer-related research.
      `
    },
    hasIBCApproval: {
      type: 'Boolean', // TODO: Checkbox not Yes/No
      label: '[Institutional Biosafety Committee (IBC)](https://go.osu.edu/ibc)',
      description: `
        Approval required prior to IRB review for research involving
        biohazards (recombinant DNA, infectious or select agents, viruses,
        toxins), gene transfer, or xenotransplantation.

        Note: Laboratories processing clinical research samples (e.g.,
        blood, serum, tissue, urine, feces, saliva, bile), must be registered
        with the IBC. As applicable, contact [IBCinfo@osu.edu](mailto:ibcinfo@osu.edu)
        to confirm laboratory registration.
      `
    },
    hasHGTApproval: {
      condition: 'hasIBCApproval',
      type: 'Boolean', // TODO: Checkbox not Yes/No
      label: '[Human Gene Transfer (HGT) Institutional Review](https://go.osu.edu/hgt-policy)',
      description: `
        IBC approval required before IRB approval can be granted.
        HGT institutional review occurs after IRB approval.
      `
    },
    hasMFWCApproval: {
      type: 'Boolean', // TODO: Checkbox not Yes/No
      label: '[Maternal-Fetal Welfare Committee](https://go.osu.edu/orrpmfw)',
      description: `
        Approval required for some greater than minimal risk research
        involving pregnant women and fetuses.
      `
    },
    hasHSRCApproval: {
      type: 'Boolean', // TODO: Checkbox not Yes/No
      label: '[Human Subject Radiation Committee (HSRC)](https://go.osu.edu/hsrc)',
      description: `
        Approval required for research involving radiologic procedures
        for research purposes (e.g., non-clinical care X-rays, DEXA or
        CT scans, nuclear medicine procedures, etc.).
      `
    },
    institutionalApprovalFiles: {
      condition: `
        hasCCCApproval or
        hasIBCApproval or
        hasMFWCApproval or
        hasHSRCApproval
      `,
      type: 'Attachment',
      label: 'Upload approval letters for all applicable committees above.',
    }
  }
}

const ResearchMethodsAndActivities: PageDefinition = {
  title: 'Research Methods & Activities',
  description: `
    Use the boxes provided below to provide information on all interventions and activities that are to be
    performed in the research. Based on the selections chosen in the list of activities and components,
    completion of additional form pages may be necessary to provide required information for IRB review.
  `,

  // Note that the list of activities is DRAMATICALLY reduced
  // to just drugs/radiation/other in my form..?
  // was it based on some prior page logic?

  // TODO:
  // Only drugs & radiation are available for "Other external IRB", Advarra, WIRB, etc.
  // Not sure how to conditionally change activities unless it's
  // coming from an external source *or* we split the field so that
  // certain activities are always selectable (drugs, devices) and the
  // rest are a checklist of things for non-external IRBs. Probably the
  // better route IMO.
  fields: {
    activities: {
      type: 'FlagArray',
      label: `
        Identify and describe all interventions and interactions that are to be performed
        solely for the research study.
      `,
      description: 'Check all research activities and/or components that apply.',
      choices: ResearchActivities,
    },
    otherActivities: {
      condition: '"Other" in activities',
      type: 'Text',
      label: 'Specify the other activities'
    },
    dataCollectionFiles: {
      type: 'Attachment',
      label: `
        Provide data collection forms, subject material, subject diaries,
        and/or other instruments, if applicable. Do not include case report
        forms for multi-site industry-initiated or cooperative group studies.
      `
    },
    surveyQuestionnaireFiles: {
      type: 'Attachment',
      label: `
        Provide surveys, questionnaires, interview guides, and/or focus
        group guides, if applicable.
      `
    },
    subjectInformationFiles: {
      condition: `
        reviewBoardId in (
          "Ohio State Behavioral and Social Sciences IRB",
          "Ohio State Biomedical Sciences IRB",
          "Ohio State Cancer IRB"
        )
      `,
      type: 'Attachment',
      label: `
        Provide subject information, such as newsletters, instruction
        sheets, appointment reminder cards, drug/device information,
        if applicable.
      `
    }
  }
};

const ExpeditedReview: PageDefinition = {
  // condition: 'TODO?',
  title: 'Conditions required for expedited IRB review',
  description: `
    The Federal Regulations establish two main criteria
    for an expedited review:

    1. The research may not involve more than "minimal risk."
      "Minimal risk" means that “the probability and magnitude of harm
      or discomfort anticipated in the research are not greater in and
      of themselves than those ordinarily encountered in daily life or
      during the performance of routine physical or psychological
      examinations or tests” ([45 CFR 46.102](https://go.osu.edu/hhs45cfr46-102)(i)
      and [21 CFR 56.102](https://go.osu.edu/fda21cfr56-102)(i)).
    2. The entire research project must be consistent with one or more
      of the federally defined categories.

    The expedited review procedure may not be used where identification
    of the participants and/or their responses would reasonably place
    them at risk of criminal or civil liability or be damaging to the
    participant's financial standing, employability, insurability,
    reputation, or be stigmatizing, unless reasonable and appropriate
    protections will be implemented so that risks related to invasion
    of privacy and breach of confidentiality are no greater than minimal.

    The expedited review procedure may not be used for classified research
    involving human subjects.

    Investigators are reminded that the standard requirements for informed
    consent (or its waiver, alteration, or exception) apply regardless of
    the type of review (i.e., expedited or convened) utilized by the IRB.

    Protocols involving the collection, storage, and/or distribution of
    data and/or specimens for future research uses do not qualify for
    expedited IRB review. Convened review is required.

    For more information regarding the expedited review procedures,
    see the [Expedited Review Procedures](https://go.osu.edu/HRPPpolicy14)
    policy.
  `,
  fields: {
    requestingExpeditedReview: {
      type: 'Boolean',
      label: 'Are you requesting **Expedited Review**?',
    }
  }
}

const ExpeditedReviewCategories: PageDefinition = {
 title: 'Expedited Review Categories',
 description: `
  Select the appropriate category(ies) for expedited review that
  describe the proposed research. Check all that apply. If the research
  meets the conditions for expedited review, the review of the protocol
  will be carried out by the IRB chairperson or by one or more
  experienced reviewers designated by the chairperson from among
  members of the IRB. See [45 CFR 46](https://go.osu.edu/hhs45cfr46)
  and [21 CFR 56](https://go.osu.edu/fda21cfr56) for more information.

  The categories in this list apply regardless of the age of the
  participants, except as noted.

  ADMONITION
  Select ALL categories that apply.
 `,
 fields: {
  category1: {
    // TODO: If behavioral:
    // Category #1 may not be used with Ohio State Behavioral and Social Sciences IRB.
    type: 'Boolean',
    label: `
      **Category #1**


    `
  },
  category2: {
    type: 'Boolean',
    label: `
      **Category #2**

      Collection of blood samples by finger stick, heel stick, ear stick,
      or venipuncture as follows:

      1. From healthy, non-pregnant adults who weigh at least 110 pounds.
        For these participants, the amounts drawn may not exceed 550 ml
        in an 8 week period and collection may not occur more frequently
        than 2 times per week.
      2. From other adults and children (defined as persons who have
        not attained the legal age for consent to treatments or procedures
        involved in the research, under the applicable law of the
        jurisdiction in which the research will be conducted. [45 CFR 46.402](https://go.osu.edu/hhs45cfr46-102)(a)),
        considering the age, weight, and health of the participants, the
        collection procedure, the amount of blood to be collected, and
        the frequency with which it will be collected. For these participants,
        the amount drawn may not exceed the lesser of 50 ml or 3 ml per kg
        in an 8 week period and collection may not occur more frequently
        than 2 times per week.
    `
  },
  category3: {
    type: 'Boolean',
    label: `
      **Category #3**

      Prospective collection of biological specimens for research purposes
      by non-invasive means.

      Examples:
      - hair and nail clippings in a nondisfiguring manner;
      - deciduous teeth at time of exfoliation or if routine patient
        care indicates a need for extraction;
      - permanent teeth if routine patient care indicates a need for extraction;
      - excreta and external secretions (including sweat);
      - uncannulated saliva collected either in an unstimulated fashion or
        stimulated by chewing gumbase or wax or by applying a dilute citric
        solution to the tongue;
      - placenta removed at delivery;
      - amniotic fluid obtained at the time of rupture of the membrane prior
        to or during labor;
      - supra- and subgingival dental plaque and calculus, provided the
        collection procedure is not more invasive than routine prophylactic
        scaling of the teeth and the process is accomplished in accordance
        with accepted prophylactic techniques;
      - mucosal and skin cells collected by buccal scraping or swab, skin
        swab, or mouth washings;
      - sputum collected after saline mist nebulization
    `
  },
  category4: {
    type: 'Boolean',
    label: `
      **Category #4**

      Collection of data through noninvasive procedures (not involving
      general anesthesia or sedation) routinely employed in clinical
      practice, excluding procedures involving x-rays or microwaves. Where
      medical devices are employed, they must be cleared/approved for
      marketing. (Studies intended to evaluate the safety and effectiveness
      of the medical device are not generally eligible for expedited review,
      including studies of cleared medical devices for new indications.)

      Examples:
      - physical sensors that are applied either to the surface of the
        body or at a distance and do not involve input of significant
        amounts of energy into the participant or an invasion of the
        participant's privacy;
      - weighing or testing sensory acuity;
      - magnetic resonance imaging;
      - electrocardiography, electroencephalography, thermography,
        detection of naturally occurring radioactivity, electroretinography,
        ultrasound, diagnostic infrared imaging, doppler blood flow,
        and echocardiography;
      - moderate exercise, muscular strength testing, body composition
        assessment, and flexibility testing where appropriate given
        the age, weight, and health of the individual
    `
  },
  category5: {
    type: 'Boolean',
    label: `
      **Category #5**

      Research involving materials (data, documents, records, or
      specimens) that have been collected or will be collected solely
      for nonresearch purposes (such as medical treatment or diagnosis).

      ADMONITION
      (NOTE: Some research in this category may be exempt from the HHS
      regulations for the protection of human subjects [45 CFR 46.101(b)(4)](https://go.osu.edu/hhs45cfr46-101).
      This listing refers only to research that is not exempt.)
    `
  },
  category6: {
    type: 'Boolean',
    label: `
      **Category #6**

      Collection of data from voice, video, digital or image recordings
      made for research purposes.
    `
  },
  category7: {
    type: 'Boolean',
    label: `
      **Category #7**

      Research made on individual or group characteristics or behavior
      (including, but not limited to, research on perception, cognition,
      motivation, identity, language, communication, cultural beliefs or
      practices, and social behavior) or research employing survey,
      interview, oral history, focus group, program evaluation, human
      factors evaluation, or quality assurance methodologies.

      ADMONITION
      Note: Some research in this category may be exempt from the
      HHS regulations for the protection of human subjects [45 CFR 46.101](https://go.osu.edu/hhs45cfr46-101)
      (b)(2) and (b)(3). This listing refers only to research that
      is not exempt.
    `
  }
 },
}

const Summary: PageDefinition = {
  title: 'Summary, Background, and Objectives',
  fields: {
    summaryBackgroundNontech: {
      type: 'Text',
      label: `
        Summarize the proposed research using **non-technical** language
        that can be readily understood by someone outside the discipline.
        **Use complete sentences (limit 300 words)**.
      `
    },
    summaryBackgroundSupport: {
      type: 'Text',
      label: `
        Summarize existing knowledge and previous work that support
        the expectation of obtaining useful results without undue
        risk to human subjects. **Use complete sentences (limit 300 words)**.
      `,
    },
    summaryBackgroundAims: {
      type: 'Text',
      label: `
        List the objectives and/or specific scientific or scholarly
        aims of the research study.
      `
    },
    protocolFiles: {
      type: 'Attachment',
      label: 'Upload research protocol',
      description: `
        A research protocol provides information such as the study
        objectives, background, detailed plan for conducting the research,
        and discussion of how the research findings will be analyzed.

        For more information, see [Guidelines for Writing a Research Protocol](https://go.osu.edu/irbprotocolguidelines)
        and/or [Guidelines for Writing a Banking Protocol](https://go.osu.edu/irbprotocolguidelines-banking).
      `
    }
  }
}

const DataRepositories: PageDefinition = {
  title: 'Data Repositories',
  description: `
    Complete fields below to request approval to obtain and store
    participants' data for future, as yet unspecified, research. Do not
    complete this form for short-term, study-specific data collection
    and analysis (limited to the current research study) or if the
    research solely involves use of previously existing data.
    The consent process should address possible future uses.
    For more information, see HRPP policy
    [Research Involving Data and/or Biological Specimens](https://go.osu.edu/hrpppolicy31).

    The questions below refer to storage of participants' data only
    (not samples). See the page [Storage of Biological Materials](https://orapps.osu.edu/buck-irb/edit/storage-biological/study/41635)
    to provide answers regarding storage of samples.
  `,
  fields: {
    collectedDataDetails: {
      type: 'Text',
      label: 'Describe the type(s) of data to be collected and stored.',
    },
    dataCollectionFiles: {
      type: 'Attachment',
      label: 'Provide a copy of the data collection form(s).',
    },
    dataFormat: {
      type: 'KeyArray',
      label: 'Indicate the format of the data (check all that apply)',
      choices: {
        'Electronic': 'Electronic (including video, digital, etc.)',
        'Hard Copy': 'Hard Copy',
      }
    },
    dataStorageMethod: {
      type: 'Key',
      label: 'Indicate whether the data to be stored will be (check one)',
      choices: {
        identifiable: `
          Identifiable - Personal identifiers (one or more) are included
          with the data and/or specimens.
        `,
        coded: `
          Coded - Direct personal identifiers have been  removed (e.g.,
          from data or specimens) and replaced with words, letters, figures,
          symbols, or a combination of these for purposes of protecting
          the identity of the source, but the original identifiers are
          retained in such a way that they can still be traced back to
          the source. Note: A code is sometimes also referred to as a
          key, link, or map.
        `,
        deidentified: `
          De-identified - All direct personal identifiers are permanently
          removed from the data/specimen, no code or key exists to link
          the data/specimen to the original source or to the individual,
          and the remaining information cannot be used to reasonably
          identify the individual.
        `
      }
    },
    dataStorageHasPHI: {
      condition: 'dataStorageMethod in ("identifiable", "coded")',
      type: 'Boolean',
      label: `
        Will the information include individually identifiable
        protected health information (PHI)?
      `,
      description: `
        HIPAA Authorization is required for storage of data that includes PHI
      `
    },
    dataDeidentificationProcess: {
      condition: 'dataStorageMethod == "deidentified"',
      type: 'Text',
      label: 'Describe the process to de-identify the data',
    },
    dataCollectionSourcesSummary: {
      type: 'Text',
      label: `
        Describe the source(s) and circumstances of the data collection.
        Explain whether data will be obtained directly from participants
        or from a secondary source.
      `
    },
    dataCollectionJustification: {
      type: 'Text',
      label: 'Describe the purpose of collecting and storing the data.',
    },
    dataHasLimitedFutureUse: {
      type: 'Boolean',
      label: `
        Will there be limits on the data's intended future use
        (e.g., for cancer research only)?
      `
    },
    dataFutureUseJustification: {
      type: 'Text',
      label: 'Explain why or why not.'
    },
    dataWithdrawProcess: {
      type: 'Text',
      label: `
        Specify the procedures by which participants can withdraw
        their data from storage for future research.
      `
    },
    releasesData: {
      type: 'Boolean',
      label: 'Will data be released to other investigators?'
    },
    dataReleaseDetails: {
      condition: 'releasesData',
      type: 'Text',
      label: `
        List those with whom data may be shared, including whether
        or not this could include non-Ohio State researchers.
      `
    },
    dataReleaseFormat: {
      condition: 'releasesData',
      type: 'Key',
      label: 'Indicate whether data to be released will be (select one)',
      choices: {
        identifiable: 'Identifiable',
        coded: 'Coded',
        deidentified: 'De-identified',
        aggregate: 'Aggregate data only (no individual data elements)',
      }
    },
    dataReleaseProcess: {
      condition: 'releasesData',
      type: 'Text',
      label: `
        Describe the process for requesting and releasing data.
        If applicable, state the individual(s) responsible for verifying
        IRB approval (or exemption) before data release and his/her
        qualifications or training.
      `
    },
    dataReleaseFiles: {
      condition: 'releasesData',
      type: 'Attachment',
      label: `
        Provide copies of all applicable forms/agreements that will
        be used to request and release data.
      `
    },

    // Physical location stuff.
    dataStorageDetails: {
      type: 'Text',
      label: `
        Describe the physical location/equipment where data will be stored.
      `
    },
    dataSecurityDetails: {
      type: 'Text',
      label: `
        Describe the procedures for securing data (e.g., locked file
        cabinet, secure network, password access, and encryption)
        including devices for temporary transport of data.
      `
    },
    dataManagementDetails: {
      type: 'Text',
      label: 'Explain who will manage the stored data'
    },
    dataStorageDuration: {
      type: 'Key',
      label: 'Indicate how long the data will be stored',
      choices: {
        'Indefinitely': 'Indefinitely',
        'Other': 'Other',
      }
    },
    otherDataStorageDetails: {
      condition: 'dataStorageDuration == "Other"',
      type: 'Text',
      label: 'Please specify'
    },
    specimenDestructionProcess: {
      type: 'Text',
      label: `
        Describe the process for destruction or de-identification
        of identified/coded specimens at the end of the retention period
        (as applicable) or if the PI leaves the university.
      `
    }
  }
}

const Deception: PageDefinition = {
  title: 'Deception',
  description: `
    Complete the fields below to request the use of deception in the
    proposed research. Additional guidance regarding deception can be
    found at the [American Psychological Association](https://go.osu.edu/americanpsychologicalassociation)
    website and within the [APA Ethical Principles of Psychologists and Code of Conduct](https://go.osu.edu/apaethicscode).

    Deception - A procedure in which investigators deliberately mislead
    participants during research by withholding information or providing
    false information. As a result, participants are not fully informed
    about the research when they consent to participate.
  `,
  fields: {
    withheldDetails: {
      type: 'Text',
      label: `
        Describe which aspects of the research procedures will be
        withheld from the participants.
      `
    },
    deceitJustification: {
      type: 'Text',
      label: `
        Provide the scientific rationale for deceiving the participants.
      `
    },
    revealTruthProcess: {
      type: 'Text',
      label: `
        Describe how and when the participants will be told the
        true purpose of the research and the reason for the deception.
      `
    },
    informantDetails: {
      type: 'Text',
      label: 'State who will inform the participants about the deception.'
    },
    withdrawProcess: {
      type: 'Text',
      label: `
        Explain the opportunities for participants to discuss their
        responses to the deception and/or to withdraw the use of their
        data from the research.
      `
    },

    // note: was consentType
    deceptionConsentType: {
      type: 'Key',
      label: `
      **Alteration/Waiver of the consent process**

      Please indicate the type of consent process document to be used.
      `,
      choices: {
        alteration: 'Alteration of Consent Process',
        waiver: 'Waiver of Consent Process',
      }
    },
  }
}

/**
 * Collection template on the Devices page
 */
const ApprovedDevice: PageDefinition = {
  title: 'FDA Approved Devices',
  description: `
    Devices cleared for marketing and used according to intended use.
  `,
  fields: {
    deviceName: {
      type: 'Text',
      label: 'Name of device'
    },
    regulatoryStatus: {
      type: 'Key',
      label: 'Regulatory status',
      choices: {
        '510(k)': '510(k) (i.e., "substantially equivalent" to a marketed device)',
        '510(k) exempt': '510(k) exempt',
        'PMA': 'PMA (pre-market approval)',
      }
    },
    classification: {
      type: 'Key',
      label: 'Device classification',
      choices: {
        1: 'I (e.g., bandages, examination gloves, hand-held surgical instruments)',
        2: 'II (e.g., wheelchairs, infusion pumps, surgical drapes)',
        3: 'III (e.g., replacement heart valves, silicone breast implants, implanted stimulators)'
      }
    },
    proposedUseSummary: {
      type: 'Text',
      label: 'Proposed use'
    },
    deviceSummary: {
      type: 'Text',
      label: 'Provide a brief description of the device',
    },
    useJustification: {
      type: 'Text',
      label: `
        Provide the proposed rationale for choice of the device (compared
        to other devices that could have been used).
      `
    },
    adverseEffectsSummary: {
      type: 'Text',
      label: `
        Summarize the potential adverse effects (including serious
        warnings and more common adverse effects).
      `
    },
    fdaLabelingFiles: {
      type: 'Attachment',
      label: `
        Provide a copy of the device manufacturer's approved labeling
        (e.g., package insert, device label, descriptive and
        informational literature, operations manual, etc.).
      `
    }
  }
}

/**
 * Collection template on the Devices page
 */
const InvestigationalDevice: PageDefinition = {
  title: 'Investigational Devices or Investigational Use of Approved Devices',
  description: `
    Devices that are investigational, modified, or proposed new intended uses.
  `,
  fields: {

    approvedDevicesX: {
      type: 'Collection',
      label: 'FDA Approved Devices',
      // placeholder: 'You have listed no FDA Approved Devices.',
      template: ApprovedDevice,
    },

    deviceName: {
      type: 'Text',
      label: 'Name of device',
    },
    manufacturer: {
      type: 'Text',
      label: 'Manufacturer',
    },
    approvalStatus: {
      type: 'Key',
      label: 'Device status',
      choices: {
        'Investigational': 'Investigational',
        'Approved, but its use in this research is investigational': 'Approved, but its use in this research is investigational'
      }
    },
    proposedUseSummary: {
      type: 'Text',
      label: 'Proposed use',
    },

    // ---

    classification: {
      type: 'Key',
      label: `
        This device research should be determined to be (complete one):
      `,
      choices: {
        'Significant Risk': `
          Significant Risk (SR) - (e.g, sutures, cardiac pacemakers,
          hydrocephalus shunts, orthopedic implants)
        `,
        'Non-significant Risk': `
          Non-significant Risk (NSR) - (e.g., daily-wear contact lenses,
          lens solutions, dental scalers, foley catheters). Provide
          supporting documentation from sponsor regarding why the device
          does not pose a significant risk.
        `,
        'IDE Exempt': 'IDE Exempt',
      }
    },

    ideNumber: {
      condition: 'classification == "Significant Risk"',
      type: 'Text',
      label: 'Investigational Device Exemption (IDE) number:'
    },
    ideHolder: {
      condition: 'classification == "Significant Risk"',
      type: 'Text',
      label: 'State who holds the IDE (i.e., sponsor, investigator, other)'
    },
    investigationalIdeFiles: {
      condition: 'classification == "Significant Risk"',
      type: 'Attachment',
      label: `
        Provide protocol-specific documentation (e.g., sponsor's protocol
        cover sheet, FDA or sponsor correspondence, etc.) of the IDE number.
      `,
      description: `
        IRB approval cannot be granted until documentation of the
        IDE (for SR device studies) has been provided.
      `
    },
    managementProcess: {
      condition: 'classification == "Significant Risk"',
      type: 'Text',
      label: `
        Describe the process for investigational device accountability,
        storage, and recordkeeping to ensure that the device will be
        used according to the approved protocol, under the direction
        of approved investigator(s).
      `
    },
    complianceProcess: {
      condition: 'classification == "Significant Risk"',
      type: 'Text',
      label: `
        For an investigator-held IDE, describe the process for
        assuring compliance with FDA regulations pertaining to
        sponsors (e.g., recordkeeping, reporting).
      `
    },

    // ---

    investigationalNsrFiles: {
      condition: 'classification == "Non-significant Risk"',
      type: 'Attachment',
      label: `
        Provide supporting documentation from sponsor regarding
        why the device does not pose a significant risk.
      `,
    },

    // ---

    exemptionCategory: {
      condition: 'classification == "IDE Exempt"',
      type: 'Number',
      label: 'Category (1-7)',
      description: `
        See attachment I in the Ohio State HRPP policy
        [Research Involving Medical Devices](https://go.osu.edu/hrpppolicy30)
        for a description of the categories.
      `
    },
    exemptionJustification: {
      condition: 'classification == "IDE Exempt"',
      type: 'Text',
      label: `
        Explain how the device is exempt from the requirements of
        [21 CFR 812.2(c)](https://go.osu.edu/fda21cfr812)
        for this research.
      `
    },

    // ---

    deviceSummary: {
      type: 'Text',
      label: 'Provide a brief description of the device',
    },
    useJustification: {
      type: 'Text',
      label: `
        Provide the proposed rationale for choice of the device
        (compared to other devices that could have been used)
      `
    },
    adverseEffectsSummary: {
      type: 'Text',
      label: `
        Summarize the potential adverse effects (including
        serious warnings and more common adverse effects).
      `
    },
    investigationalApprovalFiles: {
      type: 'Attachment',
      label: `
        Provide documentation of all applicable FDA approvals/exemptions
        for the investigational or research use of the devices. Copies
        of any correspondence to and from the FDA must be provided to the
        IRB. Final IRB approval cannot be granted until regulatory status
        is confirmed.
      `
    },
    investigationalLabelingFiles: {
      type: 'Attachment',
      label: `
        Provide a copy of the device manufacturer's approved labeling
        (e.g., package insert, device label, descriptive and informational
        literature, operations manual, etc.).
      `
    }
  }
}

/**
 * Collection template on the Devices page
 */
const HumanitarianDevice: PageDefinition = {
  title: 'Humanitarian Use Devices',
  description: `

  `,
  fields: {
    deviceName: {
      type: 'Text',
      label: 'Name of device',
    },
    manufacturer: {
      type: 'Text',
      label: 'Manufacturer',
    },
    hdeNumber: {
      type: 'Text',
      label: 'Humanitarian Device Exemption (HDE) #:',
    },
    hdeHolder: {
      type: 'Text',
      label: 'Holder of the HDE (i.e., sponsor, investigator, other)',
    },
    humanitarianApprovalFiles: {
      type: 'Attachment',
      label: 'Provide letter from FDA granting HDE approval.',
    },
    proposedUseSummary: {
      type: 'Text',
      label: 'Proposed use',
    },
    deviceSummary: {
      type: 'Text',
      label: 'Provide a brief description of the device and approved indications.',
    },
    useJustification: {
      type: 'Text',
      label: `
        Provide the proposed rationale for choice of the device (compared
        to other devices that could have been used)
      `
    },
    adverseEffectsSummary: {
      type: 'Text',
      label: `
        Summarize the potential adverse effects (including serious warnings
        and more common adverse effects).
      `
    },
    humanitarianLabelingFiles: {
      type: 'Text',
      label: 'Provide a copy of the FDA approved patient labeling.',
    }
  }
}

const Devices: PageDefinition = {
  title: 'Devices',
  description: `
    Select from the options below to request inclusion of medical devices
    (e.g., instruments, implants, in vitro reagents, etc.) in the proposed
    research or to request approval for a Humanitarian Use device. Include
    only those devices that are to be used as part of the research protocol
    (except for Humanitarian Use devices), i.e., not those used for routine
    care or evaluation. Enter as many devices as required for the research.

    For more information on the requirements for conducting research
    involving medical devices, see HRPP policy [Research Involving Medical Devices](https://go.osu.edu/hrpppolicy30)
    or [Device Advice](https://go.osu.edu/fdadeviceadvice) on FDA website.
  `,
  fields: {
    approvedDevices: {
      type: 'Collection',
      label: 'FDA Approved Devices',
      // placeholder: 'You have listed no FDA Approved Devices.',
      template: ApprovedDevice,
    },
    investigationalDevices: {
      type: 'Collection',
      label: 'Investigational Devices or Investigational Use of Approved Devices',
      // placeholder: 'You have listed no Investigational Devices.',
      template: InvestigationalDevice,
    },
    humanitarianDevices: {
      type: 'Collection',
      label: 'Humanitarian Use Devices',
      // placeholder: 'You have listed no Humanitarian Use Devices.',
      template: HumanitarianDevice,
    },

  }
}

/**
 * Collection template on the Drugs and Biologics page
 */
const ApprovedProduct: PageDefinition = {
  title: `
    Investigational Drugs/Biologics or Investigational/Research
    Use of FDA Approved Product
  `,
  description: `
    Includes drugs or biologics that are not approved for this
    indication, route/dose, or study population.
  `,
  fields: {
    drugName: {
      type: 'Text',
      label: 'Name of drug or biologic',
    },
    genericName: {
      type: 'Text',
      label: 'Generic name or active ingredient',
    },
    brandName: {
      type: 'Text',
      label: 'Brand name',
    },
    manufacturer: {
      type: 'Text',
      label: 'Manufacturer',
    },

    drugType: {
      type: 'Key',
      label: 'The drug/biologic is (select one)',
      choices: {
        'Investigational': 'Investigational',
        'Approved, but its use in this research is investigational': 'Approved, but its use in this research is investigational'
      }
    },

    drugLabelingFiles: {
      type: 'Attachment',
      label: `
        Provide a copy of the drug or biologic manufacturer's
        approved labeling (i.e., package insert).
      `
    },

    dosage: {
      type: 'Text',
      label: 'Dose and dosage form (e.g., 10mg tablet)',
    },
    adminstrativeSummary: {
      type: 'Text',
      label: 'Frequency and route of administration',
    },
    drugSummary: {
      type: 'Text',
      label: `
        Provide a brief description of the drug/biologic
        (e.g., drug class, mode of action).
      `
    },

    hasIndNumber: {
      type: 'Boolean',
      label: `
        Does the drug/biologic have an Investigational New
        Drug (IND) number?
      `,
      description: `
        IRB approval cannot be granted until documentation of
        the IND (or exemption) has been provided
      `
    },

    indNumber: {
      condition: 'hasIndNumber',
      type: 'Text',
      label: 'Investigational New Drug #',
    },

    indHolder: {
      condition: 'hasIndNumber',
      type: 'Text',
      label: 'State who holds the IND (sponsor, investigator, other)',
    },

    managementProcess: {
      condition: 'hasIndNumber',
      type: 'Text',
      label: `
        Describe the process for investigational drug accountability,
        storage, and recordkeeping to ensure that the drug will be used
        according to the approved protocol, under the direction of
        approved investigator(s).
      `,
      description: `
        Indicate if these responsibilities will be delegated to the
        OSUMC Department of Pharmacy, as applicable.
      `
    },

    complianceProcess: {
      condition: 'hasIndNumber',
      type: 'Text',
      label: `
        For an investigator-held IND, describe the process for assuring
        compliance with FDA regulations pertaining to sponsors (e.g.,
        recordkeeping, reporting).
      `,
    },

    studyPhase: {
      type: 'Key',
      label: 'Study phase',
      choices: {
        1: 'Phase I',
        2: 'Phase II',
        3: 'Phase III',
        4: 'Phase IV (post marketing)',
        other: 'Other',
      }
    },
    useJustification: {
      type: 'Text',
      label: `
        Provide the proposed rationale for choice of this agent
        in the research (compared to other drugs that could have
        been used).
      `,
    },
    sideEffectsSummary: {
      type: 'Text',
      label: `
        Summarize the potential side effects (including serious
        warnings and more common side effects).
      `,
    },
    hasPreparationProcess: {
      type: 'Boolean',
      label: `
        Is preparation or repackaging of the supplied product
        necessary before administration or dispensing?
      `
    },
    preparationProcess: {
      condition: 'hasPreparationProcess',
      type: 'Text',
      label: `
        State who will perform these activities and where
        they will be performed.
      `
    },
  }
}

/**
 * Collection template on the Drugs and Biologics page
 */
const InvestigationalProduct: PageDefinition = {
  title: 'FDA Approved Products',
  description: `
    Includes drugs or biologics approved for this indication,
    route/dose, or study population.
  `,
  fields: {
    drugName: {
      type: 'Text',
      label: 'Name of drug or biologic',
    },
    genericName: {
      type: 'Text',
      label: 'Generic name or active ingredient',
    },
    brandName: {
      type: 'Text',
      label: 'Brand name',
    },
    dosage: {
      type: 'Text',
      label: `
        Dose and dosage form (e.g., 10mg tablet)
      `
    },
    adminstrativeSummary: {
      type: 'Text',
      label: 'Frequency and route of administration',
    },
    drugSummary: {
      type: 'Text',
      label: `
        Provide a brief description of the drug/biologic
        (e.g., drug class, mode of action).
      `
    },
    useJustification: {
      type: 'Text',
      label: `
        Provide the proposed rationale for choice of this agent in
        the research (compared to other drugs that could have been used).
      `
    },
    sideEffectsSummary: {
      type: 'Text',
      label: `
        Summarize the potential side effects (including serious
        warnings and more common side effects).
      `
    },
    hasPreparationProcess: {
      type: 'Boolean',
      label: `
        Is preparation or repackaging of the supplied product
        necessary before administration or dispensing?
      `
    },
  }
}

const DrugsOrBiologics: PageDefinition = {
  title: 'Drugs or Biologics',
  description: `
    Select from the options below to request inclusion of drugs or
    biologics (e.g., vaccines, cellular products, blood- or plasma-derived
    products) in the proposed research. Include only those drugs or
    biologics that are to be administered as part of the research protocol
    (i.e., not those administered for routine care or evaluation). Enter
    as many drugs or biologics as required for the research.

    For assistance with drug accountability and recordkeeping procedures,
    contact the OSUMC Department of Pharmacy at [614-293-3358](tel:614-293-3358).
    For more information on the requirements for conducting research involving
    investigational drugs or biologics, see HRPP policy
    [Research Involving Investigational Drugs](https://go.osu.edu/hrpppolicy29).
  `,
  fields: {
    approvedProducts: {
      type: 'Collection',
      label: 'FDA Approved Products',
      // placeholder: 'You have listed no FDA approved products.',
      template: ApprovedProduct,
    },
    investigationalProducts: {
      type: 'Collection',
      label: `
        Investigational Drugs/Biologicals or Investigational/Research
        use of FDA Approved Product
      `,
      // placeholder: 'You have listed no investigational products.',
      template: InvestigationalProduct,
    },
  }
}

const DrugsSupplemental: PageDefinition = {
  title: 'Drugs (Supplemental Questions)',
  fields: {
    hasBotulinumToxin: {
      type: 'Boolean',
      label: `
        Does the research involve the use of Botox, Xeomin, Dysport
        or any formulation containing botulinum toxin at any dose?
      `
    },
    // TODO:
    // YES adds an alert:
    // You will be contacted by a representative of the Institutional
    // Biosafety Committee (IBC) for further information.
  }
}

const GeneticTesting: PageDefinition = {
  title: 'Genetic Testing',
  description: `
    Complete the questions below to request the use of genetic
    testing in the proposed research.
  `,
  fields: {
    testingTypes: {
      type: 'KeyArray',
      label: 'What type(s) of genetic testing will be performed?',
      choices: {
        germline: 'Germline (inherite mutation or genotype)',
        somatic: 'Somatic (non-inherited mutation expected to be present only in the tissue being studied)',
        unknown: 'Unknown',
      }
    },
    testedGenesSummary: {
      type: 'Text',
      label: `
        Which gene(s) will be tested? If micro-array is used, summarize
        the types of genes to be tested.
      `
    },
    hereditaryDiseaseRiskSummary: {
      type: 'Text',
      label: `
        List any genes (being tested) that are known to cause hereditary
        diseases if present as a germline mutation.
      `
    },
    testingJustification: {
      type: 'Text',
      label: `
        Specify the purpose of the gene testing.
      `
    },
    hasAvailableAssays: {
      type: 'Boolean',
      label: 'Are any proposed tests also clinically available assays?',
    },
    availableAssays: {
      condition: 'hasAvailableAssays',
      type: 'Text',
      label: 'Please specify:',
    },
    hasPotentialUnintendedFindings: {
      type: 'Boolean',
      label: `
        Could proposed testing result in incidental
        (i.e., unintended) findings?
      `
    },
    potentialUnintendedFindings: {
      condition: 'hasPotentialUnintendedFindings',
      type: 'Text',
      label: 'Explain:',
    },

    // ---

    releasesResults: {
      type: 'Boolean',
      label: `
        Will participants be informed of gene testing results?
      `
    },
    releaseJustification: {
      type: 'Text',
      label: 'Explain why or why not:'
    },
    releaseProcess: {
      condition: 'releasesResults',
      type: 'Text',
      label: `
        Describe the plan for informing participants of
        gene testing results.
      `
    },
    releaseOptOutProcess: {
      condition: 'releasesResults',
      type: 'Text',
      label: `
        Specify the procedures that afford participants a way to
        opt out of receiving their gene testing results.
      `
    },
    hasClinicalSignificance: {
      condition: 'releasesResults',
      type: 'Boolean',
      label: 'Will the results have clinical significance for participants?',
    },
    clinicalSignificance: {
      condition: 'hasClinicalSignificance',
      type: 'Text',
      label: 'Explain:',
    },
    hasImplicationsForOthers: {
      condition: 'releasesResults',
      type: 'Boolean',
      label: `
        Could the results have implications for others
        (e.g., family members)?
      `
    },
    implicationsForOthers: {
      condition: 'hasImplicationsForOthers',
      type: 'Text',
      label: 'Explain:',
    },

    // ---

    hasCounseling: {
      type: 'Boolean',
      label: `
        Will counseling, pre- and/or post-, be provided
        to the participants?
      `
    },
    counselingDetails: {
      condition: 'hasCounseling',
      type: 'Text',
      label: `
        Describe, specifying who will perform counseling and
        the counselor's qualifications.
      `,
    },
    hasCounselingCosts: {
      condition: 'hasCounseling',
      type: 'Boolean',
      label: `
        Will the participants (or their insurers) incur any
        costs for the counseling?
      `
    },

    // ---

    releasesChanges: {
      type: 'Boolean',
      label: 'Will participants be informed of new developments?',
    },
    releasesChangesJustification: {
      type: 'Text',
      label: 'Explain why or why not'
    },

    // ---

    hasFamilyData: {
      type: 'Boolean',
      label: `
        Will family members (or their data) be involved
        in the research?
      `
    },
    hasIdentifiableFamilyData: {
      condition: 'hasFamilyData',
      type: 'Boolean',
      label: `
        Will family member(s) be readily identifiable?
      `
    },
    identifiableFamilyDataJustification: {
      condition: 'hasFamilyData',
      type: 'Text',
      label: `
        Explain why or why not
      `,
    },
    hasPrivateFamilyInformation: {
      condition: 'hasFamilyData',
      type: 'Boolean',
      label: `
        Will the primary participant be asked to provide any private
        information (e.g., health status, health or behavior history)
        about his/her family member(s)?
      `
    },
    familyRecruitingProcess: {
      condition: 'hasPrivateFamilyInformation',
      type: 'Text',
      label: `
        Specify methods for recruiting family members (e.g., how,
        when, where and by whom).
      `
    },
    familyConsentProcess: {
      condition: 'hasPrivateFamilyInformation',
      type: 'Text',
      label: `
        Specify methods for obtaining the informed consent of
        family members (e.g., how, when, where and by whom).
      `
    },
    familyDataCollectionProcess: {
      condition: 'hasPrivateFamilyInformation',
      type: 'Text',
      label: `
        Specify data and/or specimens to be collected and
        proposed collection methods (e.g., how, when, where
        and by whom).
      `
    }
  }
}

const Radiation: PageDefinition = {
  title: 'Radiation',
  description: `
    All research involving use of radioactive materials and/or
    radiation-producing equipment is subject to review by the [Human Subject
    Radiation Committee (HSRC)](https://go.osu.edu/hsrc). For more information,
    see Human Subject Radiation Committee and HRPP policy
    [Research Involving Radiation](https://go.osu.edu/hrpppolicy41).

    Complete the questions below to request inclusion of diagnostic imaging
    procedures involving radiation (including x-ray, CT, fluoroscopy,
    DEXA, dental, and nuclear medicine imaging (including PET or SPECT)).
    Therapeutic procedures involving radiation (including radioactive drug
    therapies (e.g., radium-223, iodine-131, lutetium-177, yttrium-90) and
    oncologic use of radiation (including external beam, gamma knife and
    radioactive seed implants)) in the proposed research should be included.

    The patient-specific radiation dose for most routine imaging studies
    (including x-ray, CT studies, fluoroscopy, DEXA, and nuclear medicine
    imaging) may be obtained from the [RADAR Medical Procedure Radiation
    Dose Calculator and Consent Language Generator](https://go.osu.edu/radardoseriskcalc).
    These calculations of effective doses are approximations.
    Values obtained from the calculator may require adjustment during
    HSRC review to more accurately reflect the procedures completed at
    Ohio State. For other assistance contact the Office of Environmental
    Health and Safety (614-292-1284). To request adding a procedure to
    the list [contact ORRP](IRBInfo@osu.edu).

    An additional resource is available at [Effective Doses in Radiology
    and Diagnostic Nuclear Medicine](https://go.osu.edu/rsnaradiology).

    Insert the radiation risk language generated by the dose calculator
    into applicable consent, assent, and/or parental permission forms
    prior to HSRC review. If necessary, the radiation risk language
    generated by the dose calculator should be revised to lay language.

    ADMONITION:
    PLEASE NOTE: The radiation dose estimate online calculators do not
    provide consent form language for patient radiation dose involving
    therapeutic use of radiation, such as radiopharmaceutical therapy,
    external beam (SBRT) and radioactive seed implants. When radiation
    is used as therapy in research/investigational studies (not standard
    of care), study team should provide a brief description of the
    therapeutic use of radiation and estimates of radiation dose, when
    available.
  `,
  fields: {
    // TODO: Locations is a bit complicated. It's a pick list of
    // approved research sites we have. If we don't pick any that
    // are acceptable, it gives an error message with the list of
    // approved locations.
    radiologicProcedureSites: {
      type: 'KeyArray',
      label: `
        Provide the locations where the radiologic procedure(s)
        will be performed:
      `,
      description: `
        If the specific location for imaging is not listed,
        return to the Location of Research section to add the
        approved locations where imaging will occur.
      `
    },

    // Previously: lowestAge, highestAge,
    ageRange: {
      type: 'NumberRange',
      label: `
        Specify the age(s) of participants who will receive
        radiation exposure in years.
      `
    },
    totalParticipants: {
      type: 'Number',
      label: `
        Provide the total number of participants (receiving
        radiation exposure) for whom you are seeking approval.
      `
    },
    participantPopulation: {
      type: 'KeyArray',
      label: `
        Specify the participant population(s) to be included
        (check all that apply):
      `,
      choices: {
        'Children': 'Children',
        'Healthy volunteers': 'Healthy volunteers',
        'Pregnant women': 'Pregnant women',
        'Women of childbearing potential': 'Women of childbearing potential',
        'Other': 'Other(s) not listed above',
      }
    },
    fetusExposureDetails: {
      // TODO: I think this condition won't work
      condition: 'participantPopulation == "Pregnant women"',
      type: 'Text',
      label: 'Provide an estimate of the radiation exposure to the fetus',
    },
    otherPopulation: {
      condition: 'participantPopulation == "Other"',
      type: 'Text',
      label: 'Specify other population',
    },

    // ---

    pregnancyTestType: {
      type: 'Key',
      label: `
        Indicate the type of pregnancy testing that will be used
        to exclude pregnant women.
      `,
      description: `
        A serum pregnancy test must be used if the study involves
        greater than 100 mrem or the ovaries are in the radiation field.
      `,
      choices: {
        'Serum BHCG test': 'Serum BHCG test',
        'Other': 'Other pregnancy testing',
      }
    },
    otherPregnancyTest: {
      condition: 'pregnancyTestType == "Other"',
      type: 'Text',
      label: 'Specify and provide justification',
    },

    // ---

    hsrcReviewType: {
      type: 'Key',
      label: 'Indicate the type of HSRC review requested for this research:',
      choices: {
        administrative: `
          **Administrative** - Protocols involving effective doses of 500
          mrem or less for all proposed radiologic procedures (including
          repeat procedures) - for all populations.
        `,
        expedited: `
          **Expedited (Subcommittee)** - Protocols involving effective doses
          greater than 500 mrem, but not greater than 5000 mrem (5 Rem) -
          for all populations except children and pregnant women.
        `,
        full: `
          **Full (Convened) Committee** - Protocols involving children and
          pregnant women receiving greater than 500 mrem; and protocols
          involving effective doses greater than 5000 mRem (5 Rem) for
          all other populations
        `,
      }
    }
  }
}

const NuclearMedicineProcedure: PageDefinition = {
  title: 'Add Nuclear Medicine Exam / Procedure',
  description: `
    Include only exams/procedures that are administered for research purposes
    (i.e., not being performed as standard medical care).
  `,
  fields: {
    procedureName: {
      type: 'Key',
      label: 'Search for an exam/procedure',
      // TODO: Search: procedures
      description: `
        Search for the procedure by name or keyword and click on the name that
        appears below the search input to select the specified procedure.
        [Contact ORRP](mailto:irbinfo@osu.edu) to add an exam to this list.
      `
    },
    procedureJustification: {
      type: 'Text',
      label: 'Justification for radiation exposure',

    },
    proceduresPerYear: {
      type: 'Number',
      label: 'Maximum number of procedures per year',
    },
    nuclearChemicalForm: {
      type: 'Text',
      label: 'Radionuclide and chemical form',
    },
    nuclearActivityPerAdministration: {
      type: 'Text',
      label: 'Activity per administration (Bq, mCi)',
    },
    proceduresPerParticipant: {
      type: 'Number',
      label: 'Total number of procedures per participant',
    },
    effectiveDose: {
      type: 'Text',
      label: 'Effective dose (mrem or mSv)',
    }
  }
}

const XRayProcedure: PageDefinition = {
  title: 'Add Regular X-Ray & DEXA Exam / Procedure',
  description: `
    Include only exams/procedures that are administered for research purposes
    (i.e., not being performed as standard medical care).
  `,
  fields: {
    procedureName: {
      type: 'Key',
      label: 'Search for an exam/procedure',
      // TODO: Search: procedures
      description: `
        Search for the procedure by name or keyword and click on the name that
        appears below the search input to select the specified procedure.
        [Contact ORRP](mailto:irbinfo@osu.edu) to add an exam to this list.
      `
    },
    procedureJustification: {
      type: 'Text',
      label: 'Justification for radiation exposure',
    },
    proceduresPerYear: {
      type: 'Number',
      label: 'Maximum number of procedures per year',
    },
    proceduresPerParticipant: {
      type: 'Number',
      label: 'Total number of procedures per participant',
    },
    effectiveDose: {
      type: 'Text',
      label: 'Effective dose (mrem or mSv)',
    }
  }
}

const FluroscopyProcedure: PageDefinition = {
  title: 'Add Fluoroscopy Exam / Procedure',
  description: `
    Include only exams/procedures that are administered for research purposes
    (i.e., not being performed as standard medical care).
  `,
  fields: {
    procedureName: {
      type: 'Key',
      label: 'Search for an exam/procedure',
      // TODO: Search: procedures
      description: `
        Search for the procedure by name or keyword and click on the name that
        appears below the search input to select the specified procedure.
        [Contact ORRP](mailto:irbinfo@osu.edu) to add an exam to this list.
      `
    },
    procedureJustification: {
      type: 'Text',
      label: 'Justification for radiation exposure',
    },
    proceduresPerYear: {
      type: 'Number',
      label: 'Maximum number of procedures per year',
    },
    proceduresPerParticipant: {
      type: 'Number',
      label: 'Total number of procedures per participant',
    },
    effectiveDose: {
      type: 'Text',
      label: 'Effective dose (mrem or mSv)',
    }
  }
}

const CTProcedure: PageDefinition = {
  title: 'Add Computed Tomography Exam / Procedure',
  description: `
    Include only exams/procedures that are administered for research purposes
    (i.e., not being performed as standard medical care).
  `,
  fields: {
    procedureName: {
      type: 'Key',
      label: 'Search for an exam/procedure',
      // TODO: Search: procedures
      description: `
        Search for the procedure by name or keyword and click on the name that
        appears below the search input to select the specified procedure.
        [Contact ORRP](mailto:irbinfo@osu.edu) to add an exam to this list.
      `
    },
    procedureJustification: {
      type: 'Text',
      label: 'Justification for radiation exposure',
    },
    proceduresPerYear: {
      type: 'Number',
      label: 'Maximum number of procedures per year',
    },
    proceduresPerParticipant: {
      type: 'Number',
      label: 'Total number of procedures per participant',
    },
    effectiveDose: {
      type: 'Text',
      label: 'Effective dose (mrem or mSv)',
    }
  }
}

const RadiationTherapy: PageDefinition = {
  title: 'Add Radiation Therapy Procedure',
  description: `
    Include only exams/procedures that are administered for research purposes
    (i.e., not being performed as standard medical care).
  `,
  fields: {
    procedureDescription: {
      type: 'Text',
      label: 'Description of radiation therapy procedure',
      description: `
        (e.g., brachytherapy, gamma knife, external beam, radiopharmaceutical therapy)
      `
    },
    exposureSummary: {
      type: 'Text',
      label: 'Summarize radiation exposure',
    },
    proceduresPerYear: {
      type: 'Number',
      label: 'Maximum number of procedures per year',
    },
    proceduresPerParticipant: {
      type: 'Number',
      label: 'Total number of procedures per participant',
    },
    effectiveDose: {
      type: 'Text',
      label: 'Effective dose (mrem or mSv)',
    }
  }
}

const RadiationProcedures: PageDefinition = {
  title: 'Radiation Exams / Procedures',
  description: `
    Describe exams/procedures involving radiation and provide
    justification for each exposure. For each research participant,
    indicate the number of procedures administered per year and the
    total number of procedures for all years of the participant's
    exposure. **Include only exams/procedures that are administered for
    research purposes (i.e., not being performed as standard medical care)**.
    For radiation oncology procedures, provide a summary of radiation
    exposure based on study protocol or other available data. The
    radiation dose estimate online calculators do not provide consent
    form language for patient radiation dose involving therapeutic use
    of radiation such as radiopharmaceutical therapy, external beam
    (SBRT) and radioactive seed implants.
  `,
  fields: {
    nuclearMedicineProcedures: {
      type: 'Collection',
      label: 'Nuclear Medicine',
      // placeholder: 'You have listed no nuclear medicine exams/procedures',
      template: NuclearMedicineProcedure,
    },
    xrayProcedures: {
      type: 'Collection',
      label: 'Regular X-Ray & DEXA',
      // placeholder: 'You have listed no regular x-ray or DEXA exams/procedures',
      template: XRayProcedure,
    },
    fluoroscopyProcedures: {
      type: 'Collection',
      label: 'Fluoroscopy',
      // placeholder: 'You have listed no fluoroscopy exams/procedures',
      template: FluroscopyProcedure,
    },
    ctProcedures: {
      type: 'Collection',
      label: 'Computed Tomography',
      // placeholder: 'You have listed no computed tomography exams/procedures',
      template: CTProcedure,
    },
    radiationTherapy: {
      type: 'Collection',
      label: 'Radiation Therapy',
      // placeholder: 'You have listed no radiation therapy procedures',
      template: RadiationTherapy,
    }
  }
}

const RadiationDosageTotals: PageDefinition = {
  title: 'Summary of all research-related radiation procedures',
  description: `
    Complete sections below to describe the radiation dose administered
    to participants for research purposes. **NOTE: 100 mrem = 1 mSv**.
  `,
  fields: {
    totalEffectiveDosePerYear: {
      type: 'Text',
      label: `
        **Total Effective Dose Per Year**

        Effective dose (mrem or mSv):
      `,
      description: `
        Sum of all nuclear medicine and x-ray procedures for
        research purposes per year
      `,
    },
    totalEffectiveDoseInStudy: {
      type: 'Text',
      label: `
        **Total Effective Dose for All Years of the Study**

        Effective dose (mrem or mSv):
      `,
      description: `
        Sum of all procedures performed for research purposes for all years
      `,
    },
    doseCalculationFiles: {
      type: 'Attachment',
      label: `
        Attach a copy of dose calculations (i.e., printout from [online dose calculator](https://go.osu.edu/radardoseriskcalc),
        including recommended consent language). Also remember to insert the
        recommended dose calculation into the relevant consent, assent
        and/or parent permission forms that are uploaded on the Informed
        Consent Process page.
      `
    }
  }
}

const BiologicalStorage: PageDefinition = {
  title: 'Storage of Biological Materials (Repository)',
  description: `
    Complete the fields below to request approval to collect and store blood,
    tissue, or other human biological materials for future, as yet unspecified,
    research. Do not complete this form for short-term, study-specific collection
    and analysis (limited to the current research study) or if the research solely
    involves use of previously existing stored specimens. The consent process should
    address possible future uses. For more information, see HRPP policy
    [Research Involving Data and/or Biological Specimens](https://go.osu.edu/hrpppolicy31).

    The questions below refer to storage of biological material only (not data).
    See the page **Data Repositories** to provide answers regarding storage of
    participant data.
  `,
  fields: {
    collectedSpecimenDetails: {
      type: 'Text',
      label: 'Describe the type(s) of specimens to be collected and stored.',
    },
    specimenStorageMethod: {
      type: 'Key',
      label: 'Indicate whether the specimens to be stored will be:',
      choices: {
        identifiable: `
          Identifiable - Personal identifiers (one or more) are included with the
          data and/or specimens.
        `,
        coded: `
          Coded - Direct personal identifiers have been  removed (e.g., from data
          or specimens) and replaced with words, letters, figures, symbols,
          or a combination of these for purposes of protecting the identity of the
          source, but the original identifiers are retained in such a way that
          they can still be traced back to the source. Note: A code is sometimes
          also referred to as a key, link, or map.
        `,
        deidentified: `
          De-identified - All direct personal identifiers are permanently removed
          from the data/specimen, no code or key exists to link the data/specimen
          to the original source or to the individual, and the remaining information
          cannot be used to reasonably identify the individual.
        `
      }
    },
    // NOTE: These fields are duped from data storage.
    // Need unique names or an error checker to detect this
    // as a *potential* issue (otherwise they overlap the same data point)
    // I've renamed hasPHI/deidentificationProcess on both pages for now.
    specimenStorageHasPHI: {
      condition: 'specimenStorageMethod in ("identifiable", "coded")',
      type: 'Boolean',
      label: `
        Will the information include individually identifiable
        protected health information (PHI)?
      `,
      description: `
        HIPAA Authorization is required for storage of data that includes PHI
      `
    },
    specimenDeidentificationProcess: {
      condition: 'specimenStorageMethod == "deidentified"',
      type: 'Text',
      label: 'Describe the process to de-identify the data',
    },

    specimenCollectionSourcesSummary: {
      type: 'Text',
      label: `
        Describe the source(s) and circumstances of the specimen collection.
        Explain whether specimens will be obtained directly from participants
        or from a secondary source.
      `
    },
    specimenCollectionJustification: {
      type: 'Text',
      label: 'Describe the purpose of collecting and storing the specimens.',
    },
    specimenHasLimitedFutureUse: {
      type: 'Boolean',
      label: `
        Will there be limits on the specimen's intended future use
        (e.g., for cancer research only)?
      `
    },
    specimenFutureUseJustification: {
      type: 'Text',
      label: 'Explain why or why not.'
    },
    specimenWithdrawProcess: {
      type: 'Text',
      label: `
        Specify the procedures by which participants can withdraw
        their specimens from storage for future research.
      `
    },
    releasesSamples: {
      type: 'Boolean',
      label: 'Will samples be released to other investigators?'
    },
    sampleReleaseDetails: {
      condition: 'releasesSamples',
      type: 'Text',
      label: `
        List those with whom samples may be shared, including whether
        or not this could include non-Ohio State researchers.
      `
    },
    sampleReleaseFormat: {
      condition: 'releasesSamples',
      type: 'Key',
      label: 'Indicate whether samples to be released will be (select one)',
      choices: {
        identifiable: 'Identifiable',
        coded: 'Coded',
        deidentified: 'De-identified',
      }
    },
    sampleReleaseProcess: {
      condition: 'releasesSamples',
      type: 'Text',
      label: `
        Describe the process for requesting and releasing samples.
        If applicable, state the individual(s) responsible for verifying
        IRB approval (or exemption) before sample release and his/her
        qualifications or training.
      `
    },
    biologicalReleaseFiles: {
      condition: 'releasesSamples',
      type: 'Attachment',
      label: `
        Provide copies of all applicable forms/agreements that will
        be used to request and release samples.
      `
    },

    // Physical location stuff.
    specimenStorageDetails: {
      type: 'Text',
      label: `
        Describe the physical location/equipment and security provisions
        where the specimens will be stored.
      `
    },
    specimenManagementDetails: {
      type: 'Text',
      label: 'Explain who will manage the stored specimens'
    },
    specimenStorageDuration: {
      type: 'Key',
      label: 'Indicate how long the specimens will be stored',
      choices: {
        'Indefinitely': 'Indefinitely',
        'Other': 'Other',
      }
    },
    otherSpecimenStorageDetails: {
      condition: 'specimenStorageDuration == "Other"',
      type: 'Text',
      label: 'Please specify'
    },
    dataDestructionProcess: {
      type: 'Text',
      label: `
        Describe the process for destruction or de-identification
        of identified/coded data at the end of the retention period
        (as applicable) or if the PI leaves the university.
      `
    }
  }
}

const Duration: PageDefinition = {
  title: 'Duration',
  fields: {
    // TODO: Separate not applicable option?
    timeRequiredPerParticipant: {
      type: 'Text',
      label: `
        Estimate the time required from each participant, including individual
        interactions, total time commitment, and long-term follow-up, if any.
        For studies with no subject time involvement, such as record review
        studies with a waiver of consent or observational studies, enter
        'not applicable.'
      `
    }
  }
}

const NumberOfParticipants: PageDefinition = {
  title: 'Number of Participants',
  description: `
    The number of participants is defined as the number of individuals who
    agree to participate (i.e., those who provide consent or whose records
    are accessed, etc.) even if all do not prove to be eligible or complete
    the study. The total number of research participants may be increased
    only with prior IRB approval.
  `,
  fields: {
    participantGroups: {
      type: 'Text',
      label: `
        Provide the total number of participants (or number of participant
        records, specimens, etc.) for whom you are seeking Ohio State
        University approval.
      `,
      description: 'Example: 15 healthy controls, 15 patients, 200 students, 30 teachers.',
    },
    // NOTE: Buck-IRB called this hasNoPopulationNumbers
    hasUnlimitedParticipants: {
      type: 'Flag',
      label: 'Unlimited participant numbers',
    },
    totalParticipants: {
      type: 'Number',
      // TODO: Computed value from participantGroups
      label: 'Total number of participants',
      // NOTE: This was an admonition above the field
      description: `
        The total number of participants (or participant records, specimens, etc.)
        includes the research required goal number AND any additional participants
        (or records, specimens, etc) that withdraw or prove ineligible.
      `
    },
    totalParticipantDetails: {
      type: 'Text',
      label: `
        Explain how this number was derived (e.g., statistical rationale,
        attrition rate, etc.).
      `
    },
    totalCrossSiteParticipants: {
      type: 'Number',
      label: `
        Indicate the total number of participants to be enrolled across all sites
      `
    },
    // NOTE: Buck-IRB called this hasNoCrossSitePopulationNumbers
    hasUnlimitedCrossSiteParticipants: {
      type: 'Flag',
      label: 'Unlimited participant numbers across all sites',
    }
  }
}

const ParticipantPopulation: PageDefinition = {
  title: 'Participant Population',
  fields: {
    ageRange: {
      type: 'Text',
      label: `
        Specify the age(s) of the individuals who may be
        included in the research
      `,
      description: `
        If multiple age ranges are required, separate them
        with a comma. Example: 20-24 years, 40-45 years.
      `
    },
    participantTypes: {
      type: 'KeyArray',
      label: `
        Specify the participant population(s). Check all
        participant groups that apply.
      `,
      choices: {
        adults: 'Adults',
        impairedAdults: 'Adults with impaired decision-making ability',
        children: 'Children',
        neonates: 'Neonates (uncertain viability/nonviable)',
        nonEnglish: 'Non-English speaking',
        pregnancies: 'Pregnant women/fetuses - only if pregnant women will be intentionally recruited and/or studied.',
        prisoners: 'Prisoners',
        students: 'Student research pools (e.g., psychology, linguistics)',
        unknown: 'Unknown (e.g., research using secondary data/specimens, non-targeted surveys, program protocols)',
      },
    },
    studentPopulation: {
      type: 'KeyArray',
      label: 'Specify the student research pool(s)',
      choices: {
        'CREP (Communications)': 'CREP (Communications)',
        'Economics': 'Economics',
        'ESSREP (Environmental & Social Sustainability': 'ESSREP (Environmental & Social Sustainability',
        'Fisher Marketing Pool': 'Fisher Marketing Pool',
        'LOC (Linguistics)': 'LOC (Linguistics)',
        'Music': 'Music',
        'Political Science': 'Political Science',
        'REP (Psychology) - Columbus Campus': 'REP (Psychology) - Columbus Campus',
        'REP (Psychology) - Mansfield Campus': 'REP (Psychology) - Mansfield Campus',
        'REP (Psychology) - Newark Campus': 'REP (Psychology) - Newark Campus',
        'REP (Psychology) - Lima Campus': 'REP (Psychology) - Lima Campus',
      }
    },
    populationCharacteristics: {
      type: 'Text',
      label: `
        Describe the characteristics of the proposed participants, and explain
        how the nature of the research requires/justifies their inclusion.
      `
    },
    hasPopulationExclusions: {
      type: 'Boolean',
      label: `
        Will any participants be excluded based on age, gender, race/ethnicity,
        pregnancy status, language, education, or financial status?
      `
    },
    exclusionJustification: {
      condition: 'hasPopulationExclusions',
      type: 'Text',
      label: `
        Explain the criteria and reason(s) for each exclusion.
      `,
      description: `
        Consider the study's scientific or scholarly aims and risks.
      `
    },
    hasVulnerableParticipants: {
      type: 'Boolean',
      label: `
        Are any of the participants likely to be vulnerable to
        coercion or undue influence?
      `,
      description: `
        Consider students, employees, terminally ill persons, or others
        who may have limited autonomy.
      `
    },
    vulnerabilityProtectionPlan: {
      type: 'Text',
      label: `
        Describe additional safeguards to protect participants'
        rights and welfare.
      `,
      description: 'Consider strategies to ensure voluntary participation.',
    },
  }
}

const ChildrenPopulation: PageDefinition = {
  title: 'Children',
  description: `
    Complete the questions below to request inclusion of participants who are
    considered children. The inclusion of children as participants in research
    requires that the investigator comply with the additional protections
    provided in [45 CFR 46 Subpart D](https://go.osu.edu/hhs45cfr46-d) and
    [21 CFR 50 Subpart D](https://go.osu.edu/fda21cfr50-d). For more information,
    see the HRPP policy [Research Involving Children](https://go.osu.edu/hrpppolicy27).
    For information on parental permission, assent and waivers, see HRPP policy
    [Assent and Parental Permission](https://go.osu.edu/hrpppolicy21).

    *Children/Child — Person(s) who have not attained the legal age for consent to
    treatments or procedures involved in the research, under the applicable law of
    the jurisdiction in which the research will be conducted. For purposes of HRPP
    policy, individuals under 18 years of age are considered children in Ohio unless
    they meet the definition of emancipated minors.*
  `,
  fields: {
    riskType: {
      // TODO: This field may be an error based on another page's response
      //  with the following verbage:
      //
      //  Since expedited review was chosen on the 'Expedited Review' page,
      //  the research must be minimal risk. Either change risk level answer
      //  on 'Monitoring' page to 'no' or revise answer on 'Expedited Review' page.

      type: 'Key',
      label: `
        Select the category that best describes the research and provide the
        corresponding information:
      `,
      choices: {
        1: '(Category 1 (404)): Not greater than minimal risk',
        2: `
          (Category 2 (405)): More than minimal risk is presented by an
          intervention or procedure that holds the prospect of direct benefit
          for the individual child, or by a monitoring procedure that is likely
          to contribute to the child's well-being
        `,
        3: `
          (Category 3 (406)): More than minimal risk is presented by an intervention
          or procedure that **does not**  hold the prospect of direct benefit for the
          individual child, or by a monitoring procedure that is not likely to
          contribute to the child's well-being.
        `
      },
    },

    // Minimal
    minimalRiskJustification: {
      condition: 'riskType == 1',
      type: 'Text',
      label: `
        Provide rationale for why the intervention is not greater than minimal
        risk (i.e., the probability and magnitude of harm or discomfort anticipated
        in the research are not greater in and of themselves than those ordinarily
        encountered in daily life or during the performance of routine physical
        exams or tests).
      `
    },

    // Beneficial
    beneficialRiskJustification: {
      condition: 'riskType == 2',
      type: 'Text',
      label: `
        Explain how the risk is justified by the anticipated
        benefit to the individual child.
      `
    },
    riskSubjectBenefitsSummary: {
      condition: 'riskType == 2',
      type: 'Text',
      label: `
        Explain how the relation of the anticipated benefit to the risk is
        at least as favorable to the child as that which would be presented
        by available alternative approaches (e.g., other treatments).
      `
    },

    // Non-beneficial
    nonbeneficialRiskJustification: {
      condition: 'riskType == 3',
      type: 'Text',
      label: `
        Explain how the risk represents a minor increase over minimal risk.
      `
    },
    riskExperienceBenefitsSummary: {
      condition: 'riskType == 3',
      type: 'Text',
      label: `
        Explain how the intervention or procedure presents experiences to
        children that are reasonably commensurate with those inherent in
        their actual or expected medical, dental, psychological, social, or
        educational situations.
      `
    },
    riskKnowledgeBenefitsSummary: {
      condition: 'riskType == 3',
      type: 'Text',
      label: `
        Explain how the intervention or procedure is likely to yield
        generalizable knowledge about the child's disorder or condition
        that is of vital importance for the understanding or amelioration
        of the child's disorder or condition.
      `
    },

    hasAssent: {
      type: 'Boolean',
      label: 'Will assent be obtained?',
    },
    assentNoDescriptions: {
      condition: 'not hasAssent',
      type: 'KeyArray',
      label: 'If no, indicate why from the descriptions below:',
      choices: {
        'Child participants are not capable of providing assent based on age, maturity, or psychological state': 'Child participants are not capable of providing assent based on age, maturity, or psychological state',
        'The participants\' capability is so limited that they cannot reasonably be consulted': 'The participants\' capability is so limited that they cannot reasonably be consulted',
        'Assent will be waived using the same criteria as for waiver of informed consent': 'Assent will be waived using the same criteria as for waiver of informed consent',
      }
    },
    assentProcess: {
      type: 'Text',
      label: `
        Explain the process of obtaining assent/parental permission from
        children and their parents (i.e., will parents and children be
        approached separately or together?).
      `
    },
    hasGuardiansPresent: {
      type: 'Boolean',
      label: `
        Will the parents or guardians be present with the child during
        other discussions of the research?
      `
    },
    hasIncentives: {
      type: 'Boolean',
      label: `
        Will incentives be offered to the research participants?
      `
    },
    incentiveDetails: {
      condition: 'hasIncentives',
      type: 'Text',
      label: 'Specify the incentives',
    },
    incentivesOffered: {
      condition: 'hasIncentives',
      type: 'KeyArray',
      label: 'The incentives will be offered to:',
      choices: {
        'Child': 'Child',
        'Parent': 'Parent',
      },
    },

    hasFullDisclosureToGuardian: {
      type: 'Boolean',
      label: `
        Will sensitive or private information (e.g., questionnaires,
        test results) be shared with the parents/guardians?
      `
    },
    fullDisclosureSummary: {
      condition: 'hasFullDisclosureToGuardian',
      type: 'Text',
      label: 'Please explain',
    },

    reconsentProcess: {
      type: 'Text',
      label: `
        If participation is to continue beyond the time that the child is
        the age of majority, describe the process to be used to re-consent
        the participant.
      `
      // NOTE: There's a Not Applicable here as: hasReconsentProcessNA
    },
    hasStateWards: {
      type: 'Boolean',
      label: `
        Is there a possibility that any of the research participants will
        be wards of the State or any other agency or institution?
      `
    },
    riskConditions: {
      condition: 'hasStateWards and riskType == 3',
      type: 'KeyArray',
      label: `
        Children who are wards may be included in research involving greater
        than minimal risk without the prospect of direct benefit only if
        one of the following conditions applies. Select the appropriate condition
        for this research:
      `,
      description: `
        If children who are wards of the state may be included in research
        that is more than minimal risk without the prospect of direct benefit,
        an advocate must be appointed. See [the policy on Children](https://go.osu.edu/hrpppolicy27) f
        or more information.
      `,
      choices: {
        'The research is related to their status as wards': 'The research is related to their status as wards',
        'The research will be conducted in schools, camps, hospitals, institutions, or similar settings in which the majority of children involved as participants are not wards.': 'The research will be conducted in schools, camps, hospitals, institutions, or similar settings in which the majority of children involved as participants are not wards.',
      }
    }
  }
}

const ImpairedPopulation: PageDefinition = {
  title: 'Adults with Impaired Decision-Making Ability',
  description: `
    Complete the questions below to request inclusion of adult participants with
    impaired decision-making ability. Adults with impaired decision-making
    ability may be unable to provide valid informed consent to participate
    in research, e.g., as a result of trauma, intellectual disability, certain
    mental illnesses, cognitive impairment, or dementia.
    *Note: Decisional impairment/diminished decision-making capacity may be
    temporary, permanent, progressive, or fluctuating during research participation.*

    For research involving GREATER than minimal risk, an independent assessment
    of the potential participant's capacity to consent (e.g., subjective
    assessment by a qualified professional independent of the research team,
    use of a valid objective instrument designed to evaluate capacity, etc.)
    should be performed, except in unusual circumstances.

    For more information, see HRPP policy [Vulnerable Populations: Students, Employees, and Adults Unable to Provide Consent](https://go.osu.edu/hrpppolicy28)
    and [Assent and Parental Permission](https://go.osu.edu/hrpppolicy21).
  `,
  fields: {
    impairmentSummary: {
      type: 'Text',
      label: 'Describe the expected range of participant impairment.'
    },
    consentProcess: {
      type: 'Text',
      label: `
        Explain how, and by whom, the capacity to consent/assent
        will be determined.
      `
    },
    assentProcess: {
      type: 'Text',
      label: `
        Indicate whether assent will be obtained and if so, describe
        the process. If assent will not be obtained, explain.
      `
    },
    ongoingConsentProcess: {
      type: 'Text',
      label: `
        If capacity is expected to fluctuate during research participation,
        describe the process for ensuring ongoing consent.
      `
    },
    riskType: {
      type: 'Key',
      label: `
        Select the category that best describes the research and provide
        the corresponding information:
      `,
      //NOTE: IRB has this as an admonition
      description: `
        For research involving GREATER than minimal risk, an independent
        assessment of the potential participant's capacity to consent
        (e.g., subjective assessment by a qualified professional independent
          of the research team, use of a valid objective instrument designed
          to evaluate capacity, etc.) should be performed, except in unusual
          circumstances.
      `,
      choices: {
        'Minimal risk': 'Minimal risk',
        'Beneficial risk': 'Greater than minimal risk *with* the prospect of direct benefit for the individual',
        'Nonbeneficial risk': 'Greater than minimal risk *without* the prospect of direct benefit for the individual',
      }
    },
    // NOTE: Was `riskJustification` in Buck-IRB
    beneficialRiskJustification: {
      condition: 'riskType == "Minimal risk"',
      type: 'Text',
      label: `
        Explain how anticipated benefits, compared to risks, are as favorable as
        the alternatives (e.g., other treatments).
      `,
    },
    // NOTE: Was 'minimalRisk' in Buck-IRB
    nonbeneficialRiskJustification: {
      condition: 'riskType == "Nonbeneficial risk"',
      type: 'Text',
      label: `
        Explain how the risk represents a minor increase over minimal risk.
      `,
    },
  }
}

const NonEnglishPopulation: PageDefinition = {
  title: 'Non-English Speaking Participants',
  description: `

  `,
  fields: {
    languages: {
      type: 'KeyArray',
      label: `
        List the language(s) in which the research will be conducted
      `,
      description: 'Search for a language',
      // specialized language lookup. For now, just a hardcoded demo.
      choices: {
        'English': 'English',
        'Spanish': 'Spanish',
        'Chinese (Mandarin)': 'Chinese (Mandarin)',
        'Japanese': 'Japanese',
      },
    },

    // Buck-IRB has this as 'fluencyCheck'.
    // TODO: There might be some autocomplete logic from international sites.
    hasFluentTeamMember: {
      type: 'Boolean',
      label: `
        Is a team member fluent in the language of
        the potential participants?
      `,
    },

    fluentPersonnel: {
      type: 'KeyArray',
      label: `
        List any investigator(s) and/or key personnel who are fluent in the
        language(s) of the participants
      `,
      // TODO: Checkbox set of all investigators
      description: `
        If the study team member is not listed here, please make sure to
        include them in the Study Team section of this form.
      `
    },

    recruitmentTranslationProcess: {
      type: 'Text',
      label: `
        Describe the provisions in place to provide translation services
        during the participant recruitment and consent processes.
      `
    },
    studyTranslationProcess: {
      type: 'Text',
      label: `
        Describe the provisions in place to provide translation services
        throughout the participants' duration in the study.
      `
    },
    // NOTE: Was emergencyContactPerson in Buck-IRB.
    emergencyContactProcess: {
      type: 'Text',
      label: `
        Describe the provisions in place to handle emergency contacts
        (i.e., questions, problems) from non-English speaking participants.
      `
    },
  },
}

const PregnantWomenPopulation: PageDefinition = {
  title: 'Pregnant Women and Fetuses',
  description: `
    Complete the questions below to request inclusion of participants who are
    pregnant or fetuses in the proposed research. The inclusion of these
    groups as participants in research requires that the investigator
    comply with the additional protections provided in [45 CFR 46 Subpart B](https://go.osu.edu/hhs45cfr46-b).
    Research involving pregnant women and fetuses may require approval by the
    [Maternal-Fetal Welfare Committee](https://go.osu.edu/orrpmfw).
    For more information see HRPP policy
    [Research Involving Pregnant Women, Fetuses, or Neonates](https://go.osu.edu/HRPPpolicy25).

    For children who are pregnant, assent and parental permission are required.

    Do not request inclusion of pregnant women in the participant population
    unless pregnant women will be intentionally recruited and/or studied.
  `,
  fields: {
    riskSummary: {
      type: 'Text',
      label: `
        Describe preclinical studies (including studies on pregnant animals)
        and clinical studies (including studies on non-pregnant women), where
        scientifically appropriate, that provide data for assessing potential
        risks to pregnant women and fetuses.
      `
    },
    directBenefit: {
      type: 'Key',
      label: 'Indicate for whom the prospect of **direct benefit** exists:',
      description: `
        The father's consent must be obtained for research that holds the
        prospect of direct benefit solely to the fetus, unless he is unable
        to consent because of unavailability, incompetence, or temporary
        incapacity or the pregnancy resulted from rape or incest.
      `,
      choices: {
        'Pregnant woman': 'Pregnant woman',
        'Fetus': 'Fetus',
        'Both': 'Both',
        'Neither': 'Neither',
      },
    },
    // NOTE: Was riskType in Buck-IRB
    fetusRiskType: {
      // TODO: This field may be an error based on another page's response
      //  with the following verbage:

      type: 'Key',
      label: `
        Select the category that best describes the research and provide the
        corresponding information:
      `,
      choices: {
        1: `
          Not greater than minimal risk - prospect of direct benefit
          for the woman and/or fetus
        `,
        2: `
          Not greater than minimal risk - without prospect of direct
          benefit but the purpose of the research is development of
          important knowledge that cannot be obtained by any other means
        `,
        3: `
          Greater than minimal risk - caused solely by procedures that hold
          the prospect of direct benefit for the woman and/or fetus
        `
      },
    },
    // NOTE: Was riskJustification in Buck-IRB
    fetusRiskJustification: {
      type: 'Text',
      label: `
        Explain how the risks are the least possible for achieving
        the objectives of the research.
      `
    }
  }
}

const NeonatesPopulation: PageDefinition = {
  title: 'Neonates',
  description: `
    Complete the questions below to request inclusion of participants who
    are neonates of uncertain viability and nonviable neonates in the
    proposed research. The inclusion of these groups as participants in
    research requires that the investigator comply with the additional
    protections provided in [45 CFR 46 Subpart B](https://go.osu.edu/hhs45cfr46-b).
    For more information see HRPP policy
    [Research Involving Pregnant Women, Fetuses, or Neonates](https://go.osu.edu/HRPPpolicy25).
  `,
  fields: {
    // NOTE: Was viabilitySummary in Buck-IRB
    neonatesViabilitySummary: {
      type: 'Text',
      label: `
        State who (other than investigators and key personnel) will determine
        the viability of a neonate and what procedures will be used to determine
        viability.
      `
    },
    // NOTE: Was riskSummary in Buck-IRB
    neonatesRiskSummary: {
      type: 'Text',
      label: `
        Describe preclinical studies and clinical studies, where scientifically
        appropriate, that provide data for assessing potential risks to neonates.
      `,
    },
    neonatesViability: {
      type: 'Key',
      label: 'The viability of neonates to be involved in the research is:',
      choices: {
        'Uncertain': 'Uncertain viability',
        'Nonviable': 'Nonviable',
        'Both': 'Both',
      }
    },
    uncertainViabilityRiskType: {
      condition: 'neonatesViability in ("Uncertain", "Both")',
      type: 'Key',
      label: `
        For neonates of uncertain viability, the risk to the neonate is:
      `,
      description: `
        The consent of either parent or either parent's legally authorized
        representative (if neither parent is able to consent because of
        unavailability, incompetence, or temporary incapacity) is required,
        except that the consent of the father (or his legally authorized
        representative) need not be obtained if the pregnancy resulted from
        rape or incest.
      `,
      choices: {
        'Least possible': `
          The least possible and the research holds the prospect of
          enhancing the probability of survival to the point of viability
        `,
        'No added risk': `
          No added risk will result from the research and the purpose of
          the research is development of important knowledge that cannot
          be obtained by other means
        `
      }
    },
    uncertainViabilityRiskJustification: {
      condition: 'neonatesViability in ("Uncertain", "Both")',
      type: 'Text',
      label: `
        For neonates of uncertain viability, explain how the research meets
        one of the two conditions above.
      `
    },

    nonviableNonNewRiskJustification: {
      condition: 'neonatesViability in ("Nonviable", "Both")',
      type: 'Text',
      label: `
        For nonviable neonates, explain why there will be no added risk to
        the neonate resulting from the research.
      `
    },
    nonviableRiskJustification: {
      condition: 'neonatesViability in ("Nonviable", "Both")',
      type: 'Text',
      label: `
        For nonviable neonates, provide a description or justification for
        why the purpose of the research is the development of important knowledge
        that cannot be obtained by other means.
      `,
      description: `
        The consent of both parents is required. The consent of a legally
        authorized representative of either or both of the parents of a nonviable
        neonate will not suffice. If either parent is unable to consent because
        of unavailability, incompetence, or temporary incapacity, the consent of
        one parent will suffice, except that the consent of the father need not
        be obtained if the pregnancy resulted from rape or incest.
      `
    },
  }
}

const PrisonersPopulation: PageDefinition = {
  title: 'Prisoners',
  description: `
    Complete the questions below to request inclusion of prisoners in the proposed
    research. The inclusion of prisoners as participants in research requires
    that the investigator comply with the additional protections provided in
    [45 CFR 46 Subpart C](https://go.osu.edu/hhs45cfr46-c). The requirements of
    45 CFR 46 Subpart C also apply when a participant becomes a prisoner during
    the research. Note: The Ohio Department of Rehabilitation and Correction
    (ODRC) [Human Subject Research Review Committee](https://go.osu.edu/drc-hsrp)
    (HSRRC) must also review research projects involving the ODRC offender population
    or correctional staff.

    *Prisoner — An individual involuntarily confined or detained in a penal
    institution (e.g., prison, jail, or juvenile offender facility), with
    restricted ability to leave the institution. The term is intended to
    encompass individuals sentenced to such an institution under a criminal or
    civil statute, individuals detained in other facilities by virtue of statutes
    or commitment procedures that provide alternatives to criminal prosecution
    or incarceration in a penal institution, and individuals detained pending
    arraignment, trial, or sentencing.

    For more information see HRPP policy [Research Involving Prisoners](https://go.osu.edu/HRPPpolicy26).
  `,
  fields: {
    // NOTE: was 'category' in Buck-IRB
    prisonerCategories: {
      type: 'KeyArray',
      label: `
        Indicate the category(ies) that best describes the involvement of
        prisoners in the research:
      `,
      choices: {
        0: `
          This research will examine the possible causes, effects, or
          processes of incarceration and/or criminal behavior, provided
          the study presents no more than minimal risk or inconvenience
          to the participants.
        `,
        1: `
          This research will examine prisons as institutional structures
          or prisoners as incarcerated persons, provided the study presents
          no more than minimal risk or inconvenience to the participants.
        `,
        2: `
          This research will examine a condition(s) particularly affecting
          prisoners as a class of people (for example, vaccine trials
          and other research on hepatitis which is much more prevalent
          in prisons than elsewhere; and research on social and psychological
          problems such as alcoholism, drug addiction, and sexual assaults).
        `,
        3: `
          This research will examine practices, both innovative and accepted,
          which have the intent and reasonable probability of improving the
          health or well-being of the participant.
        `,
        4: `
          This research is an epidemiologic study (1) to describe the
          prevalence or incidence of a disease by identifying all cases,
          or (2) to examine potential risk factor associations for a disease,
          provided the study presents no more than minimal risk or
          inconvenience to the participants and prisoners are not a particular
          focus of the research.
        `
      },
    },
    // note: was facilityLocation
    prisonerFacilities: {
      type: 'Text',
      label: `
        Provide the name, type of facility and location of each local,
        state, or federal facility to be used.
      `
    },
    institutionSupportFiles: {
      type: 'Attachment',
      label: `
        Upload a letter of support if the institution is not covered by the
        Ohio Department of Rehabilitation and Correction (ODRC) Human
        Subject Research Review Committee (HSRRC).
      `
    },

    possibleAdvantages: {
      type: 'Text',
      label: `

      `,
    },
    // NOTE: was possibleAdvantages
    prisonerAdvantages: {
      type: 'Text',
      label: `
        Describe the possible advantages to participating prisoners
        (i.e., compared to the general living conditions, medical care,
        quality of food, amenities, and opportunity for earnings in
        the prison).
      `,
    },
    // NOTE: was undueInfluence
    prisonerUndueInfluence: {
      type: 'Text',
      label: `
        Describe any additional steps that will be taken to avoid undue
        influence (i.e., considering the limited choice environment
          of the prison).
      `,
    },
    // NOTE: was similarRisks
    similarPrisonerRisks: {
      type: 'Text',
      label: `
        Explain how the risks involved in the research are similar to risks
        that would be accepted by non-prisoner volunteers.
      `,
    },

    // NOTE: was selectionAssignment
    prisonerSelectionProcess: {
      type: 'Text',
      label: `
        Explain how prisoners will be selected for the study and/or
        assigned to treatment groups
      `,
      description: `
        The selection of participants within the prison and procedures
        for assignment to various groups within the research (e.g.,
        experimental vs. control groups) should be designed to be
        fair to all prisoners and immune from arbitrary intervention
        by prison authorities or prisoners
      `
    },
    // NOTE: was safeguardsParole
    prisonerParoleSafeguards: {
      type: 'Text',
      label: `
        Describe safeguards in place to provide assurances that parole
        boards will not take into account a prisoner's participation
        in the research when making decisions regarding parole
      `,
      // NOTE: was admonition
      description: `
        Prisoners must be clearly informed in advance that participation
        in the research will have no effect on their parole.
      `
    },
    // NOTE: was afterCare
    prisonerFollowupProcess: {
      type: 'Text',
      label: `
        Describe follow-up examinations or care of participants to be
        provided after their participation has ended (including frequency
        and duration they will be available), as applicable, taking
        into account the varying lengths of individual prisoners' sentences.
      `
    },
  }
}

const ParicipantIdentification: PageDefinition = {
  title: 'Participant Identification, Recruitment and Selection',
  fields: {
    _identification: {
      type: 'Section',
      label: 'Participant Identification',
    },
    successfulRecruitmentProcess: {
      type: 'Text',
      label: `
        Provide evidence that you will be able to recruit the necessary
        number of participants to complete the study.
      `
    },
    // NOTE: was identificationMethod
    participantIdentificationMethod: {
      type: 'Text',
      label: `
        Describe how potential participants will be identified (e.g.,
        advertising, individuals known to the investigators, record
        review). Explain how the investigator(s) will gain access
        to this population, as applicable.
      `
    },

    _recruitment: {
      type: 'Section',
      label: 'Participant Recruitment and Selection',
    },

    // NOTE: was personnelRecruit
    recruitmentPersonnel: {
      type: 'KeyArray',
      label: `
        Select investigator(s) and/or key personnel who will recruit
        participants or identify records and/or specimens.
      `,
      // TODO: Checkbox set of all investigators.
      // Ones with the recruitment activity are pre-checked.
      description: `
        If the study team member is not listed here, please make sure to
        include them in the Study Team section of this form.
      `
    },
    eligibilityProcess: {
      type: 'Text',
      label: `
        Describe the process that will be used to determine participant
        eligibility.
      `
    },
    recruitmentProcess: {
      type: 'Text',
      label: `
        Describe the recruitment process, including the setting in which
        recruitment will take place. Enter 'not applicable' if the research
        involves only record review and no participant interaction.
      `
    },
    // Warning admonition here:
    // The final versions of recruitment materials will be required before IRB approval.

    privacyProtectionJustification: {
      type: 'Text',
      label: `
        Explain how the recruitment process respects potential
        participants' privacy.
      `
    },
    recruitmentFiles: {
      type: 'Attachment',
      label: `
        Provide copies of proposed recruitment materials (e.g., ads,
        fliers, website postings, and recruitment letters).
      `
    },
    // NOTE: was consentFiles
    recruitmentConsentFiles: {
      type: 'Attachment',
      label: `
        Provide copies of consent materials used during the recruitment
        process (e.g., oral/written scripts).
      `
    },
  }
}

const ParticipantIncentives: PageDefinition = {
  title: 'Incentives to Participate',
  description: `
    For more information regarding incentives for participation,
    see the ORRP policy, [Recruiting Methods, Recruiting Materials, and Participant Compensation](https://go.osu.edu/hrpppolicy17).
  `,
  fields: {
    hasIncentives: {
      type: 'Boolean',
      label: `
        Will participants receive compensation or other incentives (e.g.,
        free services, cash payments, gift certificates, classroom credit)
        to participate in the research study?
      `,
      // NOTE: this was an admonition
      description: `
        Compensation plans should be pro-rated (not contingent upon study
        completion) and should consider participation withdrawals, as applicable.
      `
    },
    incentiveDetails: {
      condition: 'hasIncentives',
      type: 'Text',
      label: `
        Describe the incentive, including the amount and timing of all
        payments, the form of payment (e.g., cash, check, gift card)
        and how payment will be received (e.g., mailed, in person, online).
      `
    }
  }
}

const ParticipationAlternatives: PageDefinition = {
  title: 'Alternatives to Study Participation',
  fields: {
    hasAlternativeParticipation: {
      type: 'Boolean',
      label: `
        Other than choosing not to participate, are there any alternatives
        to participating in the research?
      `
    },
    alternativeParticipation: {
      type: 'Text',
      label: `
        List the specific alternatives to participation, including
        available procedures or treatments that may be advantageous to
        the subject.
      `
    }
  }
}

const ConsentFormTypes = [
  'Informed Consent - Form',
  'Informed Consent - Verbal Script/Online',
  'Informed Consent - Addendum',
  'Alteration of Consent Process',
  'Alteration of Parental Permission Assent - Form',
  'Debriefing Script',
  'Assent - Verbal Script/Online',
  'Parental Permission - Form',
  'Parental Permission - Verbal Script/Online',
  'Translated Consent/Assent - Form(s)',
  'Waiver of Assent',
  'Waiver of Consent Process',
  'Waiver of Consent Documentation',
  'Waiver of Parental Permission',
  'Waiver of Parental Permission Documentation',
];

const InformedConsentProcess: PageDefinition = {
  title: 'Informed Consent Process',
  description: `
    See [Consent for Research](https://go.osu.edu/irbconsent) for templates,
    HRPP policies [Informed Consent Process and the Elements of Informed Consent](https://go.osu.edu/hrpppolicy19),
    [Documentation of the Informed Consent Process](https://go.osu.edu/hrpppolicy20)
    and [Assent and Parental Permission](https://go.osu.edu/hrpppolicy21)
    or contact ORRP for more information.
  `,
  fields: {
    // This checkbox set is... complicated.
    // Few observations:
    // If Informed Consent - Verbal Script/Online then
    //  Waiver of Consent Documentation is automatically checked.
    //  (and visa-versa)

    //  Same for the Parental Permission - Verbal Script/Online
    //  and Waiver of Parental Permission Documentation

    // There's a warning admonition of:
    //  Since you have selected Deception as a method on this study,
    //  a 'Waiver or Alteration of Consent Process' is required.
    // and the "Waiver of Consent Process" is checked and disabled.

    consentProcesses: {
      type: 'KeyArray',
      label: `
        Indicate the consent process(es) to be used in the study.
        Check all that apply.
      `,
      choices: ConsentFormTypes.reduce(
        (agg, type) => (agg[type] = type, agg),
        {} as Record<string, string>
      ),
    },
    consentFiles: {
      type: 'Attachment',
      label: `
        Provide copies of all documents, as applicable. Attach the debriefing
        script or information sheet to be used to explain the research to the
        participants.
      `
    },

    // NOTE: was obtainsConsent
    obtainsConsentPersonnel: {
      type: 'KeyArray',
      label: `
        Select the investigator(s) and/or key personnel who
        will obtain consent from participants or their legally
        authorized representatives.
      `,
      // TODO: Checkbox set of all investigators.
      // Ones with the obtains consent activity are pre-checked.
      description: `
        If the study team member is not listed here, please make sure to
        include them in the Study Team section of this form.
      `
    },
    consentProvider: {
      type: 'Text',
      label: `
        Who will provide consent or permission (i.e., participant,
        legally authorized representative, parent and/or guardian)?
      `,
      // TODO: has NA: hasConsentProvider
    },
    consentProcessDetails: {
      type: 'Text',
      label: `
        Describe the consent process. Explain when and where consent
        will be obtained and how subjects and/or their legally
        authorized representatives will be provided sufficient
        opportunity (e.g., waiting period, if any) to consider
        participation.
      `
      // TODO: has NA: hasConsentProcess
    },
    minimizedInfluenceProcess: {
      type: 'Text',
      label: `
        Explain how the possibility of coercion or undue influence
        will be minimized in the consent process.
      `
      // TODO: has NA: hasMinimizedInfluenceProcess
    },

    // NOTE: was hasAdditionalTools
    hasAdditionalConsentTools: {
      type: 'Boolean',
      label: `
        Will any other tools (e.g., quizzes, visual aids, information
        sheets) be used during the consent process to assist
        participant comprehension?
      `
    },
    consentToolsFiles: {
      condition: 'hasAdditionalTools',
      type: 'Attachment',
      label: 'Provide copies of these tools',
    },

    // NOTE: was hasAdditionalForms
    hasAdditionalConsentFiles: {
      type: 'Boolean',
      label: `
        Will any other consent forms be used (e.g., for clinical
        procedures such as MRI, surgery, etc.)?
      `
    },
    additionalConsentFiles: {
      condition: 'hasAdditionalForms',
      type: 'Attachment',
      label: 'Provide copies of these tools',
    },
  }
}

const WaiverOfDocumentation: PageDefinition = {
  title: 'Waiver of Consent & Parental Permission Documentation',
  // TODO: It covers multiple. Idk the logic to show this page.
  description: `
    Complete the questions below to request a waiver of consent
    & parental permission documentation for the proposed research.
    DHHS regulations permit waivers of documentation of the consent
    & parental permission process if the research meets certain
    conditions. DHHS and FDA regulations differ regarding when an
    IRB may waive the requirement to document the informed consent process.

    For additional guidance, see HRPP policy
    [Documentation of the Informed Consent Process](https://go.osu.edu/hrpppolicy20)
    and the [IRB Reviewer Reference Sheets - Appendix 2](https://go.osu.edu/irbreviewerrefsheets).
  `,
  fields: {
    hasFDARegulation: {
      type: 'Boolean',
      label: `
        Is this research subject to FDA regulations (e.g., involves
        use of a food, drug, biologic, device)?
      `
    },
    hasAdditionalRisk: {
      type: 'Boolean',
      label: `
        Does the research (or research activities to which the waiver
        of documentation applies) present greater than minimal risk?
      `
    },
    hasOnlyConsentRecords: {
      type: 'Boolean',
      label: `
        Would the only record linking the participant and the research
        be the consent & parental permission document?
      `
    },
    hasCommonWrittenConsent: {
      type: 'Boolean',
      label: `
        Does the research involve procedures for which written consent
        & parental permission are normally required outside the research
        context?
      `
    },
    hasPotentialParticipantHarm: {
      type: 'Boolean',
      label: `
        Would the principal risk to the participant be potential harm
        resulting from a breach in confidentiality?
      `
    },
    minimalRiskJustification: {
      type: 'Text',
      label: `
        Explain how the research does not present greater than minimal
        risk and does not normally require written consent & parental
        permission outside the research context.
      `
    },
    dataRestrictionJustification: {
      type: 'Text',
      label: `
        Explain how the data will be restricted so the only linking
        record is the consent & parental permission document and also
        why the principal participant risk is a breach of confidentiality.
      `
    }
  }

  // TODO: There's an error admonition that appears if
  // yes to both hasFDARegulation and hasAdditionalRisk
  // or some other combination of various answers.
  // e.g. No Yes No

  // Based on the answers provided, the research does not qualify for a
  // waiver of consent documentation. Either review the answers provided
  // and correct or remove the request for a waiver of consent documentation.
  // Contact ORRP for more information.
}

// NOTE: Alterations and Waivers are mostly copy/paste
// with changes to field names to make them distinct
// and changes to wording on each one.

const ConsentWaiver: PageDefinition = {
  // TODO: Condition should also account for the deception
  // page. Since a copy of this is hoisted up if deception
  // is specified.
  title: 'Waiver of Consent Process',
  description: `
    Complete the questions below to request a waiver of the consent
    process. NOTE: Waivers of consent do not apply to greater than
    minimal risk research.

    For additional guidance, see [HRPP policy Informed Consent Process and the Elements of Informed Consent](https://go.osu.edu/hrpppolicy19)
    and the [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets).
  `,
  fields: {
    consentWaiverIsFDARegulated: {
      type: 'Boolean',
      label: `
        Is the research (or demonstration project) subject to the approval
        of state or local government officials and designed to study public
        benefit or service programs or procedures for obtaining benefits
        under those programs, changes in or alternatives to those programs
        or procedures, or changes in methods or levels of payment for benefits
        or services under those programs?
      `,
      // note: this was bolded and italicized. Admonition-ify it?
      description: `
        NOTE: If the research is FDA-regulated, select "no" for the answer
        to this question to request the waiver of consent.
      `
    },
    consentWaiverFDAJustification: {
      condition: 'consentWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the research could not "practicably" be carried
        out without the waiver.
      `,
      description: `
        Inconvenience or expense is not an adequate response as it does
        not satisfy the criterion for waiver. See
        [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets)
        for more information.
      `
    },
    consentWaiverRiskSummary: {
      condition: 'not consentWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain how the research (or research activities to which
        the waiver of consent applies) involves
        no more than minimal risk.
      `
    },
    consentWaiverRightsOfParticipants: {
      condition: 'not consentWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the waiver will not adversely affect the
        rights and welfare of the participants.
      `
    },
    consentWaiverJustification: {
      condition: 'not consentWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the research could not 'practicably' be carried
        out without the requested waiver.
      `,
      description: `
        Inconvenience or expense is not an adequate response as it does
        not satisfy the criterion for waiver. See
        [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets)
        for more information.
      `
    },
    consentWaiverPrivateInfoJustification: {
      condition: 'not consentWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why (for research involving identifiable private
        information/biospecimens) the research could not 'practicably'
        be carried out without using such information or biospecimens
        in an identifiable format.
      `
    },
    consentWaiverProvidesPertinentInformation: {
      condition: 'not consentWaiverIsFDARegulated',
      type: 'Boolean',
      label: `
        Will the participants be provided with additional pertinent
        information after participation (e.g., debriefing)?
      `
    },
    consentWaiverInformJustification: {
      condition: 'not consentWaiverIsFDARegulated',
      type: 'Text',
      label: 'Explain why or why not',
    }
  }
}

const ConsentAlteration: PageDefinition = {
  // TODO: Condition should also account for the deception
  // page. Since a copy of this is hoisted up if deception
  // is specified.
  title: 'Alteration of Consent Process',
  description: `
    Complete the questions below to request an alteration of the parental
    permission process. NOTE: Alterations of consent do not
    apply to greater than minimal risk research.

    For additional guidance, see HRPP policy [Informed Consent Process
    and the Elements of Informed Consent](https://go.osu.edu/hrpppolicy19)
    and the [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets).
  `,
  fields: {
    consentAlterationIsFDARegulated: {
      type: 'Boolean',
      label: `
        Is the research (or demonstration project) subject to the approval
        of state or local government officials and designed to study public
        benefit or service programs or procedures for obtaining benefits
        under those programs, changes in or alternatives to those programs
        or procedures, or changes in methods or levels of payment for benefits
        or services under those programs?
      `,
      // note: this was bolded and italicized. Admonition-ify it?
      description: `
        NOTE: If the research is FDA-regulated, select "no" for the answer
        to this question to request the alteration of consent.
      `
    },
    consentAlterationFDAJustification: {
      condition: 'consentAlterationIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the research could not "practicably" be carried
        out without the alteration.
      `,
      description: `
        Inconvenience or expense is not an adequate response as it does
        not satisfy the criterion for alteration. See
        [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets)
        for more information.
      `
    },
    consentAlterationRiskSummary: {
      condition: 'not consentAlterationIsFDARegulated',
      type: 'Text',
      label: `
        Explain how the research (or research activities to which
        the alteration of consent applies) involves
        no more than minimal risk.
      `
    },
    consentAlterationRightsOfParticipants: {
      condition: 'not consentAlterationIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the alteration will not adversely affect the
        rights and welfare of the participants.
      `
    },
    consentAlterationJustification: {
      condition: 'not consentAlterationIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the research could not 'practicably' be carried
        out without the requested alteration.
      `,
      description: `
        Inconvenience or expense is not an adequate response as it does
        not satisfy the criterion for alteration. See
        [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets)
        for more information.
      `
    },
    consentAlterationPrivateInfoJustification: {
      condition: 'not consentAlterationIsFDARegulated',
      type: 'Text',
      label: `
        Explain why (for research involving identifiable private
        information/biospecimens) the research could not 'practicably'
        be carried out without using such information or biospecimens
        in an identifiable format.
      `
    },
    consentAlterationProvidesPertinentInformation: {
      condition: 'not consentAlterationIsFDARegulated',
      type: 'Boolean',
      label: `
        Will the participants be provided with additional pertinent
        information after participation (e.g., debriefing)?
      `
    },
    consentAlterationInformJustification: {
      condition: 'not consentAlterationIsFDARegulated',
      type: 'Text',
      label: 'Explain why or why not',
    }
  }
}

const AssentWaiver: PageDefinition = {
  title: 'Waiver of Assent Process',
  description: `
    Complete the questions below to request a waiver of the
    assent process. NOTE: Waivers of assent do
    not apply to greater than minimal risk research.

    For additional guidance, see HRPP policy [Informed Consent Process
    and the Elements of Informed Consent](https://go.osu.edu/hrpppolicy19)
    and the [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets).
  `,
  fields: {
    assentWaiverIsFDARegulated: {
      type: 'Boolean',
      label: `
        Is the research (or demonstration project) subject to the approval
        of state or local government officials and designed to study public
        benefit or service programs or procedures for obtaining benefits
        under those programs, changes in or alternatives to those programs
        or procedures, or changes in methods or levels of payment for benefits
        or services under those programs?
      `,
      // note: this was bolded and italicized. Admonition-ify it?
      description: `
        NOTE: If the research is FDA-regulated, select "no" for the answer
        to this question to request the waiver of assent.
      `
    },
    assentWaiverFDAJustification: {
      condition: 'assentWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the research could not "practicably" be carried
        out without the waiver.
      `,
      description: `
        Inconvenience or expense is not an adequate response as it does
        not satisfy the criterion for waiver. See
        [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets)
        for more information.
      `
    },
    assentWaiverRiskSummary: {
      condition: 'not assentWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain how the research (or research activities to which
        the waiver of assent applies) involves
        no more than minimal risk.
      `
    },
    assentWaiverRightsOfParticipants: {
      condition: 'not assentWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the waiver will not adversely affect the
        rights and welfare of the participants.
      `
    },
    assentWaiverJustification: {
      condition: 'not assentWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the research could not 'practicably' be carried
        out without the requested waiver.
      `,
      description: `
        Inconvenience or expense is not an adequate response as it does
        not satisfy the criterion for waiver. See
        [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets)
        for more information.
      `
    },
    assentWaiverPrivateInfoJustification: {
      condition: 'not assentWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why (for research involving identifiable private
        information/biospecimens) the research could not 'practicably'
        be carried out without using such information or biospecimens
        in an identifiable format.
      `
    },
    assentWaiverProvidesPertinentInformation: {
      condition: 'not assentWaiverIsFDARegulated',
      type: 'Boolean',
      label: `
        Will the participants be provided with additional pertinent
        information after participation (e.g., debriefing)?
      `
    },
    assentWaiverInformJustification: {
      condition: 'not assentWaiverIsFDARegulated',
      type: 'Text',
      label: 'Explain why or why not',
    }
  }
}

const ParentalPermissionAlteration: PageDefinition = {
  // Note this is a copy/paste of ConsentProcessAlteration
  // with some wording changes and field name prefix changes
  title: 'Alteration of Parental Permission Process',
  description: `
    Complete the questions below to request an alteration of the parental
    permission process. NOTE: Alterations of parental permission do not
    apply to greater than minimal risk research.

    For additional guidance, see HRPP policy [Informed Consent Process
    and the Elements of Informed Consent](https://go.osu.edu/hrpppolicy19)
    and the [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets).
  `,
  fields: {
    permissionAlterationIsFDARegulated: {
      type: 'Boolean',
      label: `
        Is the research (or demonstration project) subject to the approval
        of state or local government officials and designed to study public
        benefit or service programs or procedures for obtaining benefits
        under those programs, changes in or alternatives to those programs
        or procedures, or changes in methods or levels of payment for benefits
        or services under those programs?
      `,
      // note: this was bolded and italicized. Admonition-ify it?
      description: `
        NOTE: If the research is FDA-regulated, select "no" for the answer
        to this question to request the alteration of parental permission.
      `
    },
    permissionAlterationFDAJustification: {
      condition: 'permissionAlterationIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the research could not "practicably" be carried
        out without the alteration.
      `,
      description: `
        Inconvenience or expense is not an adequate response as it does
        not satisfy the criterion for alteration. See
        [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets)
        for more information.
      `
    },
    permissionAlterationRiskSummary: {
      condition: 'not permissionAlterationIsFDARegulated',
      type: 'Text',
      label: `
        Explain how the research (or research activities to which
        the alteration of parental permission applies) involves
        no more than minimal risk.
      `
    },
    permissionAlterationRightsOfParticipants: {
      condition: 'not permissionAlterationIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the alteration will not adversely affect the
        rights and welfare of the participants.
      `
    },
    permissionAlterationJustification: {
      condition: 'not permissionAlterationIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the research could not 'practicably' be carried
        out without the requested alteration.
      `,
      description: `
        Inconvenience or expense is not an adequate response as it does
        not satisfy the criterion for alteration. See
        [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets)
        for more information.
      `
    },
    permissionAlterationPrivateInfoJustification: {
      condition: 'not permissionAlterationIsFDARegulated',
      type: 'Text',
      label: `
        Explain why (for research involving identifiable private
        information/biospecimens) the research could not 'practicably'
        be carried out without using such information or biospecimens
        in an identifiable format.
      `
    },
    permissionAlterationProvidesPertinentInformation: {
      condition: 'not permissionAlterationIsFDARegulated',
      type: 'Boolean',
      label: `
        Will the participants be provided with additional pertinent
        information after participation (e.g., debriefing)?
      `
    },
    permissionAlterationInformJustification: {
      condition: 'not permissionAlterationIsFDARegulated',
      type: 'Text',
      label: 'Explain why or why not',
    }
  }
}

const ParentalPermissionWaiver: PageDefinition = {
  title: 'Waiver of Parental Permission Process',
  description: `
    Complete the questions below to request a waiver of the
    parental permission process. NOTE: Waivers of parental permission do
    not apply to greater than minimal risk research.

    For additional guidance, see HRPP policy [Informed Consent Process
    and the Elements of Informed Consent](https://go.osu.edu/hrpppolicy19)
    and the [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets).
  `,
  fields: {
    permissionWaiverIsFDARegulated: {
      type: 'Boolean',
      label: `
        Is the research (or demonstration project) subject to the approval
        of state or local government officials and designed to study public
        benefit or service programs or procedures for obtaining benefits
        under those programs, changes in or alternatives to those programs
        or procedures, or changes in methods or levels of payment for benefits
        or services under those programs?
      `,
      // note: this was bolded and italicized. Admonition-ify it?
      description: `
        NOTE: If the research is FDA-regulated, select "no" for the answer
        to this question to request the waiver of parental permission.
      `
    },
    permissionWaiverFDAJustification: {
      condition: 'permissionWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the research could not "practicably" be carried
        out without the waiver.
      `,
      description: `
        Inconvenience or expense is not an adequate response as it does
        not satisfy the criterion for waiver. See
        [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets)
        for more information.
      `
    },
    permissionWaiverRiskSummary: {
      condition: 'not permissionWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain how the research (or research activities to which
        the waiver of parental permission applies) involves
        no more than minimal risk.
      `
    },
    permissionWaiverRightsOfParticipants: {
      condition: 'not permissionWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the waiver will not adversely affect the
        rights and welfare of the participants.
      `
    },
    permissionWaiverJustification: {
      condition: 'not permissionWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why the research could not 'practicably' be carried
        out without the requested waiver.
      `,
      description: `
        Inconvenience or expense is not an adequate response as it does
        not satisfy the criterion for waiver. See
        [IRB Reviewer Reference Sheets - Appendix 1](https://go.osu.edu/irbreviewerrefsheets)
        for more information.
      `
    },
    permissionWaiverPrivateInfoJustification: {
      condition: 'not permissionWaiverIsFDARegulated',
      type: 'Text',
      label: `
        Explain why (for research involving identifiable private
        information/biospecimens) the research could not 'practicably'
        be carried out without using such information or biospecimens
        in an identifiable format.
      `
    },
    permissionWaiverProvidesPertinentInformation: {
      condition: 'not permissionWaiverIsFDARegulated',
      type: 'Boolean',
      label: `
        Will the participants be provided with additional pertinent
        information after participation (e.g., debriefing)?
      `
    },
    permissionWaiverInformJustification: {
      condition: 'not permissionWaiverIsFDARegulated',
      type: 'Text',
      label: 'Explain why or why not',
    }
  }
}

const Privacy: PageDefinition = {
  title: 'Privacy of Participants',
  description: `
    It is important to note the distinction between "privacy" and
    "confidentiality." In general, privacy concerns are about the people
    involved in the research (a person's desire to control the access of
    others to themselves), whereas confidentiality is associated with a
    participant's data collected for research purposes. This section should
    specifically address provisions to protect participants' privacy
    interests (e.g., limiting the number of people screening private
    records for recruitment, any interactions will be conducted in a
    way to avoid being witnessed or overheard, sensitive or medical
    information will be discussed in a private setting, etc.). For more
    information, please see the policy [Privacy and Confidentiality](https://go.osu.edu/hrpppolicy18).
  `,
  fields: {
    privacyProtectionProvisions: {
      type: 'Text',
      label: `
        Describe the provisions to protect the privacy interests
        of the participants.
      `,
      description: `
        Consider the circumstances and nature of information to be
        obtained, taking into account factors (e.g., age, gender,
        ethnicity, education level, etc.) that may influence
        participants' expectations of privacy.
      `
    },
    // note: was accessesIdentifiableData
    hasPII: {
      type: 'Boolean',
      label: `
        Does the research require access to personally identifiable,
        private information?
      `
    },
    identifiableDataSummary: {
      condition: 'hasPII',
      type: 'Text',
      label: `
        Describe the personally identifiable private information involved
        in the research. List the information source(s) (e.g.,
        educational records, medical records, etc.).
      `
    }
  }
}

const DataConfidentiality: PageDefinition = {
  title: 'Confidentiality of Data',
  fields: {
    dataHandlingProcess: {
      type: 'Text',
      label: `
        ADMONITION:
        Methods for handling and storing data (including the use of personal
        computers and portable storage devices) must comply with university
        policies. Restricted data, including protected health information,
        must be encrypted if stored or used on portable devices, if removed
        from a secure university location, or if electronically transmitted.
        For more information, see [Policy on Institutional Data](http://go.osu.edu/idp)
        and [Research Data Policy](https://go.osu.edu/researchdatapolicy)

        Explain how information is handled, including storage, security
        measures (as necessary), and who will have access to the information.
        Include both electronic and hard copy records.
      `
    },
    incriminatingInformation: {
      type: 'Text',
      label: `
        Explain if any personal or sensitive information that could be
        potentially damaging to participants (e.g., relating to illegal
        behaviors, alcohol or drug use, sexual attitudes, mental health,
        etc.) will be collected.
      `,
      // NOTE: had a N/A as hasIncriminatingInformation
    },
    confidentialityExceptions: {
      type: 'Text',
      label: `
        Explain any circumstances (ethical or legal) where it would
        be necessary to break confidentiality.
      `
      // NOTE: had a N/A as hasConfidentialityExceptions
    },
    dataIdentifiers: {
      type: 'KeyArray',
      label: `
        ADMONITION:
        Primary research data should be retained for a minimum of five years a
        fter final project closeout. For more information, see the university's
        [Research Data Policy](https://go.osu.edu/researchdatapolicy).
        Other research-related records should be retained for a period of at
        least three years after the research has been discontinued (i.e., no
        further data collection, long term follow-up, re-contact, or analysis
        of identifiable/coded data.)

        Indicate what will happen to identifiable data at the end of the study
      `,
      choices: {
        0: 'Identifiable data will not be collected',
        1: `
          Identifiers will be permanently removed from the data and
          destroyed (resulting in de-identified data)
        `,
        2: `
          Identifiable/coded(linked) data will be retained and stored
          confidentially (as appropriate)
        `,
        3: `
          Identifiable data will be retained and may be made public
          with participant consent (e.g., ethnographic research)
        `
      }
    },

    _certificate: {
      type: 'Section',
      label: 'Certificate of Confidentiality',
      description: `
        NIH automatically provides Certificates of Confidentiality (CoC) to
        NIH-funded research studies. Please remember to insert the [standard
        CoC language](https://go.osu.edu/irbconsenttemplatelanguage) into
        the study's consent document.
      `
    },

    hasNIHCertificate: {
      type: 'Boolean',
      label: `
        If your study is not NIH-funded, will you be requesting a
        Certificate of Confidentiality from the NIH?
      `,
      description: `
        See HRPP policy [Privacy and Confidentiality](https://go.osu.edu/hrpppolicy18)
        for more information.
      `
    },
    // note: was nihCertificateFiles
    certificateOfConfidentialityFiles: {
      type: 'Attachment',
      label: 'Provide a copy of the certificate of confidentiality'
    }
  }
}

const HIPAAAuthorization: PageDefinition = {
  title: 'HIPAA Research Authorization',
  description: `
    PHI is health information that is individually identifiable and created
    or held by a covered entity. Health information is considered
    individually identifiable when it contains one or more of the
    [18 HIPAA](https://go.osu.edu/irb-hipaa) identifiers or when there is
    a reasonable basis to believe the information can be used to identify
    an individual.

    For more information, see [45 CFR Parts 160 and 164](https://go.osu.edu/hipaa45cfr160and164)
    or [Protecting Personal Health Information in Research: Understanding the HIPAA Privacy Rule](https://go.osu.edu/hhshipaaforprofessionalsresearch).

    **Authorization**: although similar to informed consent, an
    authorization focuses on privacy risks and permission to specifically
    use or disclose PHI.

    **Partial waiver of HIPAA authorization**: permits access to and
    use of PHI for recruitment purposes, prior to obtaining authorization.
    Specifically, it allows for the identification and, as appropriate,
    contact of potential participants to determine their interest in study
    participation. Note: A partial waiver does not permit retention or
    other use of the information beyond its original purpose.

    **Full waiver of HIPAA authorization**: waives the requirement to
    obtain an individual's authorization for the use of PHI for a
    particular research project (such as a retrospective chart review),
    or for a specific portion/population of the research (such as a waiver
    that applies only to review of health records of patients previously
    treated that are used as controls).

    **Alteration of HIPAA authorization**: allows a change in certain
    authorization requirements, while still requiring authorization for
    the use of PHI. Examples include making an exception to the required
    language in an authorization form or eliminating the requirement to
    obtain a signed authorization (e.g., authorization provided over
    the phone).

    For more information, please see https://go.osu.edu/irb-hipaa.
  `,
  fields: {
    hasPHI: {
      type: 'Boolean',
      label: `
        Is individually identifiable Protected Health Information (PHI)
        subject to the [HIPAA Privacy Rule](https://go.osu.edu/hipaaprivacysummary)
        requirements to be accessed, used, or disclosed in the research study?
      `
    },
    hipaaWaivers: {
      type: 'KeyArray',
      label: `
        Indicate how authorization requirements will be met (check
        all that apply).
      `,
      choices: {
        'Written Authorization': 'Written Authorization',
        'Partial Waiver': 'Partial Waiver (for identification and recruitment purposes only)',
        'Full Waiver': 'Full Waiver (authorization will not be obtained)',
        'Alteration': 'Alteration (written authorization will not be obtained or all required elements will not be included)',
      }
    }
  }
}

const GeneralAuthorizationForms: PageDefinition = {
  title: 'General Authorization Forms',
  fields: {
    _written: {
      type: 'Section',
      label: 'HIPAA Written Authorization Forms',
    },

    hipaaWrittenAndConsentFiles: {
      type: 'KeyArray',
      label: `
        If your HIPAA authorization is combined within a consent
        form file, please select the file(s) below. Select all documents
        which contain both consent and HIPAA language combined.
        Otherwise, use the file upload field to upload your HIPAA
        authorization form.
      `,
      // TODO: This is complicated. It's referencing file(s)
      // that were uploaded to a section that we can pick from.
    },
    hipaaWrittenFiles: {
      type: 'Attachment',
      label: 'Provide a copy of the authorization form',
    },

    _alteration: {
      type: 'Section',
      label: 'Alteration of HIPAA Authorization Forms',
    },

    hipaaAlterationAndConsentFiles: {
      type: 'KeyArray',
      label: `
        If your HIPAA authorization is combined within a consent form
        file, please select the file(s) below. Select all documents
        which contain both consent and HIPAA language combined.
        Otherwise, use the file upload field to upload your HIPAA
        authorization form.
      `,
      // TODO: This is complicated. It's referencing file(s)
      // that were uploaded to a section that we can pick from.
    },
    hipaaAlterationFiles: {
      type: 'Attachment',
      label: 'Provide a copy of the authorization form',
    }
  }
}

const HIPAAFullWaiver: PageDefinition = {
  title: 'Full Waiver of HIPAA Research Authorization',
  description: `
    Complete this page to request a full waiver of HIPAA authorization
    to access, use, or disclose Protected Health Information (PHI) for
    the proposed research. A Full waiver of HIPAA authorization waives
    the requirement to obtain an individual's authorization for the use
    of PHI for a particular research project (such as a retrospective
    chart review), or for a specific portion/population of the research
    (such as a waiver that applies only to review of health records of
    patients previously treated that are used as controls).
  `,
  fields: {
    hipaaFullPHISource: {
      type: 'Text',
      label: `
        List the source(s) of PHI applicable to the waiver (e.g.,
        OSUWMC Information Warehouse, eResults, physician's office
        records, clinical database, etc.). Be as specific as possible.
      `,
    },
    hipaaFullAccessedDetails: {
      type: 'Text',
      label: `
        Describe the PHI that will be accessed (viewed) for the
        research under the waiver (e.g., medical record number,
        health history, diagnosis, test results, etc.).
      `,
    },
    hipaaFullRecordedDetails: {
      type: 'Text',
      label: `
        Describe information that will be recorded. Be as specific
        as possible, including date ranges, when applicable.
        Spell out all abbreviations.
      `,
    },

    hipaaFullPHIAccessTeam: {
      type: 'KeyArray',
      label: `
        Select all study team members who will access medical information:
      `,
      // TODO: Checkbox set of all investigators
      description: `
        Protected Health Information obtained as part of this research
        will not be reused or disclosed to any other person or entity
        other than those listed (except as required by law for authorized
        oversight of the research project) without additional approval.
        IRB/Privacy Board approval will be obtained for other research
        involving the use or disclosure of this PHI. All disclosures or
        releases of identifiable information granted under this waiver
        will be accounted for and documented. Only the minimum necessary
        Protected Health Information to meet the research objectives and
        to limit access to this information will be collected.
      `
    },

    // NOTE: This is intentially a shared upload with other pages.
    dataCollectionFiles: {
      type: 'Attachment',
      label: `
        Provide a copy of the data collection form(s) used
        (e.g., Excel spreadsheet, etc.) to record the information above.
      `
    },

    hipaaFullPHIAccessJustification: {
      type: 'Text',
      label: `
        Explain why access to and/or use of the PHI
        is essential to conduct the research.
      `,
    },
    hipaaFullPHINecessity: {
      type: 'Text',
      label: `
        Explain how the PHI described above represents the minimum
        necessary information to accomplish the objectives of the
        research.
      `,
    },
    hipaaFullPHIRisk: {
      type: 'Text',
      label: `
        Explain how the access, use, or disclosure of PHI presents
        no more than a minimal risk to the privacy of the individual.
      `,
    },
    hipaaFullPHIProtectionPlan: {
      type: 'Text',
      label: `
        Describe your plan to protect identifiers and associated PHI
        (or links to identifiable data) from improper use or disclosure,
        including where PHI will be stored (include both the building/room
        number and/or specific server information), what security measures
        will be applied, and who will have access to the information.
        Describe the safeguards used for electronic records, hard copy
        records, or both, as applicable.
      `,
    },
    // was: destroysIdentifiers
    hipaaFullDestroysPHI: {
      type: 'Key',
      label: `
        Will identifiers (or links to identifiable data) be destroyed?
      `,
      choices: {
        yes: 'Yes',
        no: 'No',
        na: `
          Not applicable - Will not record identifiers or create
          links or codes to connect
        `,
      }
    },
    hipaaFullPHIDestructionPlan: {
      condition: 'hipaaFullDestroysPHI == "yes"',
      type: 'Text',
      label: `
        Describe the plan to destroy the identifiers at the earliest
        opportunity consistent with the conduct of the research.
        Include when and how identifiers will be destroyed.
      `
    },
    hipaaFullPHIRetentionJustification: {
      condition: 'hipaaFullDestroysPHI == "no"',
      type: 'Text',
      label: `
        Provide the legal, health, or research justification for retaining
        the identifiers. Legal justification should include a brief
        description/citation of the legal requirement.
      `
    },
    hipaaFullJustification: {
      type: 'Text',
      label: `
        Explain why a waiver (instead of written authorization)
        is needed to conduct the research (e.g., no longer in regular
        contact with individuals, scientific validity, etc.).
      `
    }
  }
}

// This is a copy/paste of HIPAA Full Waiver with field
// name changes and some rewording of questions.
const HIPAAPartialWaiver: PageDefinition = {
  title: 'Partial Waiver of HIPAA Research Authorization',
  description: `
    Complete this page to request a partial waiver of HIPAA authorization
    to access, use, or disclose Protected Health Information (PHI) for
    the proposed research. A partial waiver of HIPAA authorization permits
    access to and use of PHI for recruitment purposes, prior to obtaining
    authorization. Specifically, it allows for the identification and, as
    appropriate, contact of potential participants to determine their
    interest in study participation. Note: A partial waiver does not
    permit retention or other use of the information beyond its original
    purpose.
  `,
  fields: {
    hipaaPartialPHISource: {
      type: 'Text',
      label: `
        List the source(s) of PHI applicable to the waiver (e.g.,
        OSUWMC Information Warehouse, eResults, physician's office
        records, clinical database, etc.). Be as specific as possible.
      `,
    },
    hipaaPartialAccessedDetails: {
      type: 'Text',
      label: `
        Describe the PHI that will be accessed (viewed) for the
        research under the waiver (e.g., medical record number,
        health history, diagnosis, test results, etc.).
      `,
    },
    hipaaPartialRecordedDetails: {
      type: 'Text',
      label: `
        Describe information that will be recorded to aid in
        participant identification/recruitment. Be as specific as
        possible. Spell out all abbreviations.
      `,
    },

    hipaaPartialPHIAccessTeam: {
      type: 'KeyArray',
      label: `
        Select all study team members who will access medical information:
      `,
      // TODO: Checkbox set of all investigators
      description: `
        Protected Health Information obtained as part of this research
        will not be reused or disclosed to any other person or entity
        other than those listed (except as required by law for authorized
        oversight of the research project) without additional approval.
        IRB/Privacy Board approval will be obtained for other research
        involving the use or disclosure of this PHI. All disclosures or
        releases of identifiable information granted under this waiver
        will be accounted for and documented. Only the minimum necessary
        Protected Health Information to meet the research objectives and
        to limit access to this information will be collected.
      `
    },

    // NOTE: This is intentially a shared upload with other pages.
    dataCollectionFiles: {
      type: 'Attachment',
      label: `
        Provide a copy of the data collection form(s) used
        (e.g., Excel spreadsheet, etc.) to record the information above.
      `
    },

    // was: essentialJustification
    hipaaPartialPHIAccessJustification: {
      type: 'Text',
      label: `
        Explain why access to and/or use of the PHI for participant
        identification/recruitment is essential to conduct the research.
      `,
    },
    hipaaPartialPHINecessity: {
      type: 'Text',
      label: `
        Explain how the PHI described above represents the minimum
        necessary information to accomplish the objectives of the
        research.
      `,
    },
    hipaaPartialPHIRisk: {
      type: 'Text',
      label: `
        Explain how the access, use, or disclosure of PHI presents
        no more than a minimal risk to the privacy of the individual.
      `,
    },
    hipaaPartialPHIProtectionPlan: {
      type: 'Text',
      label: `
      Describe your plan to protect identifiers and associated PHI
      (or links to identifiable data) from improper use or disclosure,
      including where PHI will be stored (include both the building/room
      number and/or specific server information), what security measures
      will be applied, and who will have access to the information.
      Describe the safeguards used for electronic records, hard copy
      records, or both, as applicable.
      `,
    },
    // was: destroysIdentifiers
    hipaaPartialHipaaPartialDestroysPHI: {
      type: 'Key',
      label: `
        Will identifiers (or links to identifiable data) be destroyed?
      `,
      choices: {
        yes: 'Yes',
        no: 'No',
        na: `
          Not applicable - Will not record identifiers or create
          links or codes to connect
        `,
      }
    },
    hipaaPartialPHIDestructionPlan: {
      condition: 'hipaaPartialDestroysPHI == "yes"',
      type: 'Text',
      label: `
        Describe the plan to destroy the identifiers at the earliest
        opportunity consistent with the conduct of the research.
        Include when and how identifiers will be destroyed.
      `
    },
    hipaaPartialPHIRetentionJustification: {
      condition: 'hipaaPartialDestroysPHI == "no"',
      type: 'Text',
      label: `
        Provide the legal, health, or research justification for retaining
        the identifiers. Legal justification should include a brief
        description/citation of the legal requirement.
      `
    },
    hipaaPartialJustification: {
      type: 'Text',
      label: `
        Explain why a partial waiver (instead of written authorization)
        is needed to conduct the research (e.g., to identify participants
        of interest in order to request their authorization to participate).
      `
    }
  }
}

// Again, big copy/paste of HIPAA Full Waiver
const HIPAAAlterationWaiver: PageDefinition = {
  title: 'Alteration of HIPAA Research Authorization',
  description: `
    Complete this page to request an alteration of HIPAA authorization to access,
    use, or disclose Protected Health Information (PHI) for the proposed research.

    An alteration of HIPAA authorization allows a change in certain authorization
    requirements, while still requiring authorization for the use of PHI.

    Examples include making an exception to the required language in an authorization
    form or eliminating the requirement to obtain a signed authorization
    (e.g., authorization provided over the phone).
  `,
  fields: {
    hipaaAlterationPHISource: {
      type: 'Text',
      label: `
        List the source(s) of PHI applicable to the alteration (e.g.,
        OSUWMC Information Warehouse, eResults, physician's office
        records, clinical database, etc.). Be as specific as possible.
      `,
    },
    hipaaAlterationAccessedDetails: {
      type: 'Text',
      label: `
        Describe the PHI that will be accessed (viewed) for the
        research under the alteration (e.g., medical record number,
        health history, diagnosis, test results, etc.).
      `,
    },
    hipaaAlterationRecordedDetails: {
      type: 'Text',
      label: `
        Describe information that will be recorded. Be as specific
        as possible. Spell out all abbreviations.
      `,
    },

    hipaaAlterationPHIAccessTeam: {
      type: 'KeyArray',
      label: `
        Select all study team members who will access medical information:
      `,
      // TODO: Checkbox set of all investigators
      description: `
        Protected Health Information obtained as part of this research
        will not be reused or disclosed to any other person or entity
        other than those listed (except as required by law for authorized
        oversight of the research project) without additional approval.
        IRB/Privacy Board approval will be obtained for other research
        involving the use or disclosure of this PHI. All disclosures or
        releases of identifiable information granted under this alteration
        will be accounted for and documented. Only the minimum necessary
        Protected Health Information to meet the research objectives and
        to limit access to this information will be collected.
      `
    },

    // NOTE: This is intentially a shared upload with other pages.
    dataCollectionFiles: {
      type: 'Attachment',
      label: `
        Provide a copy of the data collection/screening form(s) used
        (e.g., screening log, Excel spreadsheet, etc.) to record the
        information above.
      `
    },

    // was: essentialJustification
    hipaaAlterationPHIAccessJustification: {
      type: 'Text',
      label: `
        Explain why access to and/or use of the PHI is essential
        to conduct the research.
      `,
    },
    hipaaAlterationPHINecessity: {
      type: 'Text',
      label: `
        Explain how the PHI described above represents the minimum
        necessary information to accomplish the objectives of the
        research.
      `,
    },
    hipaaAlterationPHIRisk: {
      type: 'Text',
      label: `
        Explain how the access, use, or disclosure of PHI presents
        no more than a minimal risk to the privacy of the individual.
      `,
    },
    hipaaAlterationPHIProtectionPlan: {
      type: 'Text',
      label: `
        Describe your plan to protect identifiers and associated PHI
        (or links to identifiable data) from improper use or disclosure,
        including where PHI will be stored (include both the building/room
        number and/or specific server information), what security measures
        will be applied, and who will have access to the information.
        Describe the safeguards used for electronic records, hard copy
        records, or both, as applicable.
      `,
    },
    // was: destroysIdentifiers
    hipaaAlterationHipaaAlterationDestroysPHI: {
      type: 'Key',
      label: `
        Will identifiers (or links to identifiable data) be destroyed?
      `,
      choices: {
        yes: 'Yes',
        no: 'No',
        na: `
          Not applicable - Will not record identifiers or create
          links or codes to connect
        `,
      }
    },
    hipaaAlterationPHIDestructionPlan: {
      condition: 'hipaaAlterationDestroysPHI == "yes"',
      type: 'Text',
      label: `
        Describe the plan to destroy the identifiers at the earliest
        opportunity consistent with the conduct of the research.
        Include when and how identifiers will be destroyed.
      `
    },
    hipaaAlterationPHIRetentionJustification: {
      condition: 'hipaaAlterationDestroysPHI == "no"',
      type: 'Text',
      label: `
        Provide the legal, health, or research justification for retaining
        the identifiers. Legal justification should include a brief
        description/citation of the legal requirement.
      `
    },
    hipaaAlterationJustification: {
      type: 'Text',
      label: `
        Explain why an alteration (instead of written authorization)
        is needed to conduct the research (e.g., no longer in regular
        contact with individuals, scientific validity, etc.).
      `
    }
  }
}

const Benefits: PageDefinition = {
  title: 'Reasonably Anticipated Benefits',
  fields: {
    participantBenefitsSummary: {
      type: 'Text',
      label: `
        List the potential benefits that participants may expect as a result of
        this research study. State if there are no direct benefits to individual
        participants.
      `,
      description: 'Compensation is not to be considered a benefit.',
    },
    societyBenefitsSummary: {
      type: 'Text',
      label: `
        List the potential benefits that society and/or others may expect as
        a result of this research study.
      `
    }
  }
}

const Risks: PageDefinition = {
  title: 'Risks, Harms & Discomforts',
  fields: {
    expectedRisksSummary: {
      type: 'Text',
      label: `
        Describe all reasonably expected risks, harms, and/or discomforts
        that may apply to the research. Discuss severity and likelihood of
        occurrence. As applicable, include potential risks to an embryo
        or fetus if a woman is or may become pregnant.
      `,
      description: `
        Consider the range of risks, including physical, psychological,
        social, legal, and economic.
      `,
    },
    riskMinimizingProcess: {
      type: 'Text',
      label: `
        Describe how risks, harms, and/or discomforts will be minimized.
      `,
      description: `
        If testing will be performed to identify individuals who may be
        at increased risk (e.g., pregnant women, individuals with HIV/AIDS,
        depressive disorders, etc.), address timing and method of testing;
        include how positive test results will be handled.
      `
    }
  }
}

const RiskAssessment: PageDefinition = {
  title: 'Assessment of Risks & Benefits',
  fields: {
    participantRiskJustification: {
      type: 'Text',
      label: `
        Discuss how risks to participants are reasonable when compared to
        the anticipated benefits to participants (if any) and the importance
        of the knowledge that may reasonably be expected to result.
      `,
      description: `
        Consider the range of risks, including physical, psychological,
        social, legal, and economic.
      `,
    },
  }
}

const Monitoring: PageDefinition = {
  title: 'Monitoring',
  fields: {
    // NOTE: Similar to other pages, if we specified yes to the below question
    // then a validation error hits the field with:
    //
    // Since expedited review was chosen on the 'Expedited Review' page, the
    // research must be minimal risk. Either change risk level answer on
    // 'Monitoring' page to 'no' or revise answer on 'Expedited Review' page.
    //
    // Might make more sense to just disable the question and add help text
    // as to why it was disabled.

    // note: was greaterThanMinimalRisk
    hasGreaterThanMinimalMonitoringRisk: {
      type: 'Boolean',
      label: `
        Does the research involve greater than minimal risk (i.e., are the harms
        or discomforts described for the study beyond what is ordinarily encountered
        in daily life or during the performance of routine physical or
        psychological tests)?
      `
    },
    planToMonitorData: {
      type: 'Text',
      label: `
        Describe the plan to oversee and monitor data collected to ensure
        participant safety and data integrity. Include the following:

        - The information that will be evaluated (e.g., incidence and severity
          of actual harm compared to that expected);
        - Who will perform the monitoring (e.g., investigator, sponsor, or
          independent monitoring committee);
        - Timing of monitoring (e.g., at specific points in time, after a
          specific number of participants have been enrolled); and
        - Decisions to be made as a result of the monitoring process (e.g.,
          provisions to stop the study early for unanticipated problems).
      `,
    },
    monitoringPlanFiles: {
      type: 'Attachment',
      label: `
        Upload the data and/or safety monitoring plan, if applicable.
      `,
    }
  }
}

const Costs: PageDefinition = {
  title: 'Participant Costs/Reimbursements',
  fields: {
    hasParticipantCosts: {
      type: 'Boolean',
      label: `
        Are there any additional costs that may result from study
        participation (e.g., parking, study drugs, diagnostic tests, etc.)?
      `,
      description: `
        Note: Answer "Yes" regardless of who will bear these costs.
      `
    },
    participantCostsSummary: {
      condition: 'hasParticipantCosts',
      type: 'Text',
      label: `
        Describe any potential costs participants (or their insurers)
        will incur as a result of study participation.
      `
    },
    coveredCostsSummary: {
      condition: 'hasParticipantCosts',
      type: 'Text',
      label: `
        Specify costs to participants that will be covered by
        the research study.
      `
    },
  }
}

// NOTE: Skipping uploaded files review page here.
// That's a custom one we need to think about.

const UploadedFilesReview: PageDefinition = {
  title: 'Uploaded Files Review',
  fields: {
    // TODO: This is a custom page that aggregates
    // all file uploads into a summary view (readonly)
    // with links off to their respective pages. Need
    // to think about how this will work in Ripple.
  }
}

const Other: PageDefinition = {
  title: 'Other Files/Comments',
  description: `
    This page should be used to provide ORRP or the IRB with additional information
    related to the current submission.

    The general comments text area can be used to provide clarification to ORRP
    staff or the IRB members.

    The general upload box below should be used to upload any additional
    documents necessary for this submission that were not already captured
    previously in the form. Examples of documents which may be uploaded include
    the detailed cover letter response for modifications or deferrals, IRB
    approvals for external sites at the time of continuing review, or a memo
    to IRB reviewers from the investigator.
  `,
  fields: {
    otherFiles: {
      type: 'Attachment',
      label: 'Additional files for this submission',
    },
    otherComments: {
      type: 'Text',
      label: 'Additional comments for this submission'
    }
  }
}

const FindErrors: PageDefinition = {
  title: 'Find Errors & Submit',
  fields: {
    /*
      Find Errors page has some language like:

      You have completed the IRB initial submission (non-exempt) form.
      To ensure a faster approval process, your study submission has been checked
      for errors or incomplete information. These must be remedied prior to
      study submission.

      And then a list of all errors. Including custom messages like:

        Please specify either an unlimited cross site population
        or total number of participants across all sites.

      And some complicated ones on the locations page like:

        You have indicated that Ohio State will be the IRB of record for another
        institution/location. Please specify at least one non-Ohio State
        institution/location as such.

      Maybe instead of fields we have some specialized components
      like a "show all errors on form", "submit", etc.
    */
  }
}

// This is the same page as ConsentWaiver (same data points)
// but we hoist the page higher into the table of
// contents when the deception page is filled out.
// To do that, we need a new page definition with
// its own condition.
const DeceptionConsentWaiver: PageDefinition = {
  ...ConsentWaiver,
  condition: 'deceptionConsentType == "waiver"',
}

const DeceptionConsentAlteration: PageDefinition = {
  ...ConsentAlteration,
  condition: 'deceptionConsentType == "alteration"',
}


/*
  High level todo / oddities

  Waiver of Consent moves around based on deception responses.
    Could be immediately after deception or later in the form.
    Same page content though.

  On the informed consent page, the "who obtains consent" that pulls
  a list of investigators is just a toggle for that particular
  activity for each investigator. Which most likely requires
  a custom component to deal with, bit complex of logic.


  on the uploaded files review page, each upload has a short
  human readable name
  e.g. Drug Labeling & Information, Radiation Dosage Calculations,
  Investigational Device Documentation, etc

  I'd like to be able to declare that per field. This ties into the
  old notes I made long about about also including an optional
  "short name" for every field for when we want to display them
  as part of conditions or cross-reference fields around pages.

  Consent autochecked

  radiation locations
*/

export const IRB: FormDefinition = {
  title: 'Ohio State IRB Initial Submission',
  version: '1.0',

  pages: {
    Identification: Identification,

    // Screening
    TypeOfResearch: TypeOfResearch,
    ExemptScreening: ExemptScreening,
    ReviewBoard: ReviewBoard,
    MultiSiteStudy: MultiSiteStudy,

    // Who and where
    LocationOfResearch: LocationOfResearch,
    Team: Team,
    ExternalCollaborators: ExternalCollaborators,
    Funding: Funding,

    OtherIRB: OtherIRB,
    WesternIRB: WesternIRB,
    InstitutionalApprovals: InstitutionalApprovals,

    ResearchMethodsAndActivities: ResearchMethodsAndActivities,
    ExpeditedReview: ExpeditedReview,
    ExpeditedReviewCategories: ExpeditedReviewCategories,

    Summary: Summary,
    DataRepositories: DataRepositories,

    // Note that consent waiver and consent alteration
    // pages are the same as the similar named ones
    // later in the form. If deception is included
    // then these pages are hoisted higher up in
    // the table of contents.
    // TODO: same data points or not? I believe they are...
    Deception: Deception,
    DeceptionConsentWaiver: DeceptionConsentWaiver,
    DeceptionConsentAlteration: DeceptionConsentAlteration,

    Devices: Devices,
    DrugsOrBiologics: DrugsOrBiologics,
    DrugsSupplemental: DrugsSupplemental,
    GeneticTesting: GeneticTesting,

    Radiation: Radiation,
    RadiationProcedures: RadiationProcedures,
    RadiationDosageTotals: RadiationDosageTotals,
    BiologicalStorage: BiologicalStorage,
    Duration: Duration,

    // Participant numbers and populations
    NumberOfParticipants: NumberOfParticipants,
    ParticipantPopulation: ParticipantPopulation,
    ChildrenPopulation: ChildrenPopulation,
    ImpairedPopulation: ImpairedPopulation,
    NonEnglishPopulation: NonEnglishPopulation,
    PregnantWomenPopulation: PregnantWomenPopulation,
    NeonatesPopulation: NeonatesPopulation,
    PrisonersPopulation: PrisonersPopulation,

    // Recruitment
    ParicipantIdentification: ParicipantIdentification,
    ParticipantIncentives: ParticipantIncentives,
    ParticipationAlternatives: ParticipationAlternatives,

    // Informed consent
    InformedConsentProcess: InformedConsentProcess,
    WaiverOfDocumentation: WaiverOfDocumentation,
    ConsentWaiver: ConsentWaiver,
    ConsentAlteration: ConsentAlteration,
    AssentWaiver: AssentWaiver,
    ParentalPermissionAlteration: ParentalPermissionAlteration,
    ParentalPermissionWaiver: ParentalPermissionWaiver,

    // PII
    Privacy: Privacy,
    DataConfidentiality: DataConfidentiality,

    // HIPAA and PHI
    HIPAAAuthorization: HIPAAAuthorization,
    GeneralAuthorizationForms: GeneralAuthorizationForms,
    HIPAAFullWaiver: HIPAAFullWaiver,
    HIPAAPartialWaiver: HIPAAPartialWaiver,
    HIPAAAlterationWaiver: HIPAAAlterationWaiver,

    // Additional questions
    Benefits: Benefits,
    Risks: Risks,
    RiskAssessment: RiskAssessment,
    Monitoring: Monitoring,
    Costs: Costs,

    UploadedFilesReview: UploadedFilesReview,
    Other: Other,

    // Final page to check the full form for errors
    // and submit for review
    FindErrors: FindErrors,
  }
};

export default IRB;

/*
  Some features I'd like out of Ripple to support this:

  - some sort of summary validator/scanner that can list
    all fields that are duplicated in the form. Some are
    okay since we intentionally show the same field in
    multiple places (with the same response) but others
    aren't and would result in bad data.
  - Check for errors component that scans the entire form
    for problems.
  - File upload review component that aggregates all the
    file fields into a single view that we can scroll
    through a summarized list of files and do some minor
    interactions or jump to the relevant pages.
  - Customizable submit button that can be part of the
    form definition itself.
  - Some simpler way to define "required" vs "optional".
    I didn't type out the required property on every single
    field because it's 99% required with 1% optional.
    Maybe for cases like this, we can have some global
    setting on FormDefinition where we assume required
    unless stated otherwise. Because, realistically,
    everything in a "smart form" should be mostly required,
    as that's the whole intention of having a smart form
    that shows questions as followups to prior questions.
  - similar to IACUC, figuring out how to associate
    cross-form many-to-many relationships will be interesting.
    I want to say we should introduce a special field type so
    we can do it for both simple data (KeyArray fields)
    as well as complex (entire Collections).
*/
