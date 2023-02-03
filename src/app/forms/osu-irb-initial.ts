const MultiSiteStudy: PageDefinition = {
  title: 'Multi-site Study',
  description: `
    Multi-site research includes projects or studies that involve collaboration with sites or individuals
    external to Ohio State. The IRB must determine whether external sites or personnel need IRB approval in
    order to participate in study activities.

    EXAMPLES OF MULTI-SITE RESEARCH:
    - Ohio State is the lead institution of a group of sites participating in the same research project,
      where all sites are recruiting subjects and administering research interventions
    - An Ohio State investigator is participating in a research project, where another institution is the
      lead institution.
    - Ohio State is the IRB of record for one or more other sites participating in a research project

    EXAMPLES OF NON-MULTI-SITE RESEARCH:
    - An Ohio State investigator is conducting research at a local elementary school that involves
      recruiting participants and performing study interventions, where no school employees are
      engaged in the research.
    - An Ohio State investigator and research staff interact with clients at a local pharmacy, and a
      letter of support from the pharmacy is in place.
  `,
  fields: {
    isTest1: {
      condition: 'ant or not bat and cat in ("dog", "elf") or fish and g.h.i == jaguar',
      type: 'Boolean',
      label: 'Is this sensible?'
    },
    isMultiSite: {
      type: 'Boolean',
      label: 'Is this a multi-site study?'
    },
    // If Yes, asks question below and enables multi-site accrual goal question on Number of Participants page.
    // Applies to all below.
    isPILeadInvestigator: {
      type: 'Boolean',
      condition: 'isMultiSite',
      label: `
        Is the Ohio State PI the lead investigator or is The Ohio State University the lead site for
        collaborative research?
      `
    },
    communicationPlan: {
      type: 'Text',
      condition: 'isMultiSite and isPILeadInvestigator',
      label: `
        Describe the communication between sites that might be relevant to the protection of
        participants, such as unanticipated problems, interim results, and protocol
        modifications.
      `
    },
    leadInstitution: {
      type: 'Text',
      condition: 'isMultiSite and not isPILeadInvestigator',
      label: 'Provide the name of the lead institution directing the research.'
    },
    leadInstitutionApproval: {
      type: 'File',
      condition: 'isMultiSite and not isPILeadInvestigator',
      label: 'Provide the IRB or ethics board approval from the lead institution, as applicable.'
    },
    coordinatingCenter: {
      type: 'Text',
      label: `
        If a separate data coordinating center exists (different from lead institution)
        provide the name.
      `
    },
    isOhioStateIRBOfRecord: {
      type: 'Boolean',
      condition: 'isMultiSite',
      label: `
        Will Ohio State be IRB of record for any other institution/location?
      `
    },
    siteCommunications: {
      // If Ohio State is the IRB of record and Ohio State is not the lead site
      condition: 'isOhioStateIRBOfRecord and not isPILeadInvestigator',
      type: 'Text',
      label: `
        Describe the communication between sites that might be relevant to the protection of
        participants, such as unanticipated problems, interim results, and protocol
        modifications.
      `
    }
  }
};

const ResearchMethodsAndActivities: PageDefinition = {
  title: 'Research Methods & Activities',
  description: `
    Use the boxes provided below to provide information on all interventions and activities that are to be
    performed in the research. Based on the selections chosen in the list of activities and components,
    completion of additional form pages may be necessary to provide required information for IRB review.
  `,
  fields: {
    activities: {
      type: 'FlagArray',
      label: `
        Identify and describe all interventions and interactions that are to be performed
        solely for the research study.
      `,
      description: 'Check all research activities and/or components that apply.',
      choices: {
        'Anesthesia or sedation': 'Anesthesia (general or local) or sedation',
        'Audio, video, digital, or image recordings': 'Audio, video, digital, or image recordings',
        'Biohazards': 'Biohazards (e.g., rDNA, infectious agents, select agents, toxins)',
        'Biological sampling (other than blood)': 'Biological sampling (other than blood)',
        'Blood drawing': 'Blood drawing',
        'Coordinating center': 'Coordinating center',
        'Data repositories':
          'Data repositories (future unspecified use, including research databases)', // Enables Data Repositories page
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
    },
    otherActivities: {
      condition: '"Other" in activities',
      type: 'Text',
      label: 'Specify the other activities'
    }
  }
};

const LocationOfResearch: PageDefinition = {
  title: 'Location of Research',
  description: `
    Research to be conducted at locations other than approved performance sites may require a letter of
    support or another institution\'s approval if personnel are engaged. See OHRP Engagement Guidance or
    contact ORRP at [irbinfo@osu.edu](mailto:irbinfo@osu.edu) or [614-688-8457](tel:614-688-8457) for more information.
  `,
  fields: {
    approved: {
      type: 'Collection',
      label: 'Ohio State Approved Research Sites',
      template: {
        title: 'Ohio State Approved Research Site',
        fields: {
          approvedSiteKey: {
            type: 'Key',
            component: {
              name: 'ApprovedResearchSiteSearchField',
              props: {
                endpoint: 'https://example.com/api'
              }
            },
            label: `
              Select the appropriate Ohio State approved research site by typing the building name or address
              in the search field below. If the specific Ohio State site is not listed,
              [contact ORRP](mailto:irbinfo@osu.edu) for assistance.
            `,
            description: `
              If you are adding a county extension office as a research location, enter the county name first when
              searching. If you are performing research in ALL county extension offices, select “Ohio State University
              Extension”.

              To add a Columbus campus location, begin typing an academic building name below or enter “Ohio State
              Columbus Campus” in the search field and select that option when it appears
            `
            // Address auto-complete component referenced here somehow.
          }
        }
      }
    },
    domestic: {
      type: 'Collection',
      label: 'Domestic Research Sites',
      template: {
        title: 'Non-Ohio State Domestic Research Site',
        description: `
          Please provide the following information about the
          non-Ohio State domestic research site.
        `,
        fields: {
          locationDescription: {
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
          approvalDocuments: {
            type: 'File',
            label: `
              A letter of support and/or another IRB\'s approval should be provided, as necessary.
              [Contact ORRP](mailto:irbinfo@osu.edu) for more information.
            `
          }
        }
      }
    }
  }
};

const TeamMember: PageDefinition = {
  title: 'New Study Team Member',
  fields: {
    person: {
      type: 'Person',
      label: 'Team member search',
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
    designation: {
      type: 'Key',
      label: 'Team member designation',
      choices: {
        'Co-Investigator': 'Co-Investigator',
        'Key Personnel': 'Key Personnel',
        'Additional Contact': 'Additional Contact (receives study correspondence from ORRP)'
      }
    },
    activities: {
      condition: 'this.designation in ("Co-Investigator", "Key Personnel")',
      type: 'FlagArray',
      label: 'Research role/activities performed for study',
      choices: {
        'Protocol development/study design': 'Protocol development/study design',
        'Recruitment': 'Recruitment',
        'Assess participant eligibility': 'Assess participant eligibility',
        'Obtain consent/parental permission/assent': 'Obtain consent/parental permission/assent',
        'Interview participants/administer surveys': 'Interview participants/administer surveys',
        'Process biological specimens': 'Process biological specimens',
        'Conduct follow-up visits': 'Conduct follow-up visits',
        'Data collection/entry/coding': 'Data collection/entry/coding'
      }
    }
  }
};

const Team: PageDefinition = {
  title: 'Study Personnel',
  description: `
    Enter all Ohio State study team members below. External collaborators will be entered on a different
    page. Study team members should only be listed in one category (i.e., PI, co-investigator, or key
    personnel).

    Co-investigators and key personnel are defined as individuals who participate in the design, conduct, or
    reporting of human subjects research. At a minimum, include individuals who recruit participants, obtain
    consent, or who collect study data.

    Additional contacts can also serve in another role on the project.

    All individuals listed as Ohio State study team members will have access to all submitted information,
    including completion status of team members’ administrative and training requirements (CITI, RCR, COI
    disclosure), and may edit submissions on behalf of the principal investigator.
    Electronic signatures are required of all Ohio State investigators named on the submission.

    The individual entering the new study will automatically be entered as an additional contact (if not
    designated as the principal investigator). This individual must click the edit icon to edit his/her role if an
    additional role (i.e., co-investigator or key personnel) is also applicable.
  `,
  fields: {
    team: {
      type: 'Collection',
      label: 'Study Team',
      template: TeamMember
    }
  }
};

// Significantly complex page to test with.
// https://orapps.osu.edu/buck-irb/edit/radiation/study/5416
const Radiation: PageDefinition = {
  title: 'Radiation',
  description: `
    All research involving use of radioactive materials and/or radiation-producing equipment is
    subject to review by the [Human Subject Radiation Committee](https://go.osu.edu/hsrc) (HSRC).
    For more information, see Human Subject Radiation Committee and HRPP policy
    [Research Involving Radiation](https://go.osu.edu/hrpppolicy41).

    Complete the questions below to request inclusion of diagnostic imaging procedures involving
    radiation (including x-ray, CT, fluoroscopy, DEXA, dental, and nuclear medicine imaging
    (including PET or SPECT)). Therapeutic procedures involving radiation (including
    radioactive drug therapies (e.g., radium-223, iodine-131, lutetium-177, yttrium-90) and
    oncologic use of radiation (including external beam, gamma knife and radioactive seed implants))
    in the proposed research should be included.

    The patient-specific radiation dose for most routine imaging studies (including x-ray, CT studies,
    fluoroscopy, DEXA, and nuclear medicine imaging) may be obtained from the [RADAR Medical Procedure
    Radiation Dose Calculator and Consent Language Generator](https://go.osu.edu/radardoseriskcalc).
    These calculations of effective doses are approximations. Values obtained from the calculator
    may require adjustment during HSRC review to more accurately reflect the procedures completed
    at Ohio State. For other assistance  contact the Office of Environmental Health and Safety
    [(614-292-1284)](tel:614-292-1284). To request adding a procedure to the list
    contact [ORRP](mailto:irbinfo@osu.edu).

    An additional resource is available at [Effective Doses in Radiology and Diagnostic Nuclear Medicine](https://go.osu.edu/rsnaradiology).

    Insert the radiation risk language generated by the dose calculator into applicable
    consent, assent, and/or parental permission forms prior to HSRC review. If necessary,
    the radiation risk language generated by the dose calculator should be revised to lay language.

    > PLEASE NOTE: The radiation dose estimate online calculators do not provide
    > consent form language for patient radiation dose involving therapeutic use of
    > radiation, such as radiopharmaceutical therapy, external beam (SBRT) and radioactive
    > seed implants. When radiation is used as therapy in research/investigational
    > studies (not standard of care), study team should provide a brief description of the
    > therapeutic use of radiation and estimates of radiation dose, when available.
  `,
  fields: {
    locations: {
      type: 'KeyArray',
      label: 'Provide the locations where the radiologic procedure(s) will be performed',
      description:
        'If the specific location for imaging is not listed, return to the Location of Research section to add the approved locations where imaging will occur.',
      // component needs to show existing / approved OSU locations they can select from.
      // i.e. backend-loaded checkbox set of keys. Right now, hardcoded.
      choices: {
        0: 'Dodd Hall',
        1: 'Physical Activity and Education Services building'
      }
    },
    radiationAgeRange: {
      type: 'Number',
      label: 'Specify the age(s) of participants who will receive radiation exposure.'
      // Needs a range, where the first is From with description "Lowest age (years)"
      // and the highest is To with description Highest age (years)
    },
    totalRadiationParticipants: {
      type: 'Number',
      label:
        'Provide the total number of participants (receiving radiation exposure) for whom you are seeking approval.'
    },
    radiationPopulations: {
      type: 'FlagArray',
      label: 'Specify the participant population(s) to be included (check all that apply)',
      choices: {
        0: 'Children',
        1: 'Healthy volunteers',
        2: 'Pregnant women',
        3: 'Women of childbearing potential',
        other: 'Other(s) not listed above'
      }
    },
    otherRadiationPopulation: {
      type: 'Text',
      condition: '"other" in radiationPopulations',
      label: 'Specify other population.'
    },
    testToExcludePregnanciesFromRadiation: {
      type: 'Key',
      label: 'Indicate the type of pregnancy testing that will be used to exclude pregnant women.',
      description:
        'A serum pregnancy test must be used if the study involves greater than 100 mrem or the ovaries are in the radiation field.',
      choices: {
        'Serum BHCG': 'Serum BHCG test',
        'Other': 'Other pregnancy test'
      }
    },
    otherPregnancyTestJustification: {
      type: 'Text',
      condition: 'testToExcludePregnanciesFromRadiation == "Other"',
      label: 'Specify and provide justification'
    },
    hsrcReviewRequested: {
      type: 'Key',
      label: 'Indicate the type of HSRC review requested for this research:',
      choices: {
        'Administrative': `
          Administrative -
          _Protocols involving effective doses of 500 mrem or less for all proposed radiologic procedures (including repeat procedures) - for all populations._
        `,
        'Expedited': `
          Expedited (Subcommittee) -
          _Protocols involving effective doses greater than 500 mrem, but not greater than 5000 mrem (5 Rem) - for all populations except children and pregnant women._
        `,
        'Full Committee': `
          Full (Convened) Committee -
          _Protocols involving children and pregnant women receiving greater than 500 mrem; and protocols involving effective doses greater than 5000 mRem (5 Rem) for all other populations_
        `
      }
    }
  }
};

// Define your form
// Ref: https://orrp.osu.edu/files/2019/03/IRB-Initial-Submission.pdf
const InitialSubmission: FormDefinition = {
  title: 'OSU IRB Initial Submission',

  // Version it - will help you compare versioned responses later
  // Will probably be semver-related, e.g. major changes aren't fully diffable,
  // but minors are. Or something along those lines.
  version: '1.0',

  // All your pages in the order they should display.
  // Each page has an optional condition to control visibility.
  pages: {
    multiSiteStudy: MultiSiteStudy,
    locations: LocationOfResearch,
    team: Team,
    activities: ResearchMethodsAndActivities,
    radiation: Radiation
  }
};

export default InitialSubmission;
