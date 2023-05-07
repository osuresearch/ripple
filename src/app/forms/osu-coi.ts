
import { PageDefinition, ChoicesList, FormDefinition } from "../../types"

// Written in 1.5 hours, there's probably mistakes.
// I also didn't copy all the underlying field names from COI.
// Not relevant for the demo.

const MonetaryBracketChoiceList: ChoicesList = {
  'None': 'None',
  '$0-$4,999': '$0-$4,999',
  '$5,000-$9,999': '$5,000-$9,999',
  '$10,000-$19,999': '$10,000-$19,999',
  '$20,000-$39,999': '$20,000-$39,999',
  '$40,000-$49,999': '$40,000-$49,999',
  '$50,000-$59,999': '$50,000-$59,999',
  '$60,000-$79,999': '$60,000-$79,999',
  '$80,000-$99,999': '$80,000-$99,999',
  '$100,000-$149,999': '$100,000-$149,999',
  '$150,000-$199,999': '$150,000-$199,999',
  '$200,000-$249,999': '$200,000-$249,999',
  '$250,000 or more': '$250,000 or more',
}

const PersonalInfo: PageDefinition = {
  title: 'Personal Information',
  description: `
    If any information is incorrect, you may update it for all Office of
    Research applications with the [user management](https://orapps.osu.edu/profile)
    tool.
  `,
  fields: {
    name: {
      type: 'Person',
      label: 'Name',
      example: 'Chase McManning',
    },
    college: {
      type: 'Key',
      label: 'College',
      example: 'Enterprise for Research, Innovation, and Knowledge',
    },
    department: {
      type: 'Key',
      label: 'Department',
      example: 'ERIK | Office of Research Information Systems',
    },
    location: {
      type: 'Key',
      label: 'Location',
      example: 'Columbus, OH',
    },
    employmentStatus: {
      type: 'Key',
      label: 'Employment Status',
      required: 'You must specify your employment status',
      choices: {
        faculty: 'Faculty',
        staff: 'Staff',
        student: 'Student',
        other: 'Other',
      }
    },
    email: {
      type: 'Text',
      label: 'E-mail',
      description: ' Please enter your preferred email address for COI related correspondence.',
      required: 'Please enter your email',
    },
    partner: {
      type: 'Person',
      label: 'Spouse or Partner Name',
      description: `
        If you have a **spouse or partner at Ohio State University**,
        please enter their full name or name.n then select them from the list that appears.
        Spouses and partners not at Ohio State University do not need to be entered.

        **If your spouse does not appear in the provided list, please
        [email them](mailto:TODO) the link to the Profile app to get
        them added**.
      `
    },
    partnerEmploymentStatus: {
      type: 'Text',
      label: 'Spouse or Partner Employment Status',
      computed: true,
    },
    partnerCollege: {
      type: 'Text',
      label: 'Spouse or Partner College',
      computed: true,
    },
  }
}

const OutsideActivitiesScreening: PageDefinition = {
  title: 'Outside Activities Screening',
  description: `
    The first five questions involve Outside Activities related to—but not part of—your job at Ohio State.

    During the past year, have you (or an immediate family member<sup>1</sup>)
    participated in any outside activities that could be related to your
    professional duties at Ohio State?
  `,
  fields: {
    isPaidOutsideOhioState: {
      type: 'Boolean',
      label: ' 1. Has anyone other than Ohio State paid you (or paid for your travel)?',
      required: 'Please fill out this field',
    },
    hadActivitiesPaidOutsideOhioState: {
      type: 'Boolean',
      condition: 'isPaidOutsideOhioState',
      label: ' a. Any consulting, advising, or speaking activities paid for by an outside organization?',
      required: 'Please fill out this field',
    },
    hadTravelPaidOutsideOhioState: {
      type: 'Boolean',
      condition: 'isPaidOutsideOhioState',
      label: ' b. Any reimbursed or sponsored travel from an outside organization? ',
      required: 'Please fill out this field',
    },
    hadPersonalPaymentOutsideOhioState: {
      type: 'Boolean',
      condition: 'isPaidOutsideOhioState',
      label: ' c. Any royalties, gifts, employment or other personal payments from an outside organization? ',
      required: 'Please fill out this field',
    },
    haveInvestmentOutsideOhioState: {
      type: 'Boolean',
      label: ' 2. Do you hold any equity, ownership or investment in an outside organization (excluding mutual funds and retirement accounts where you do not directly control the investment decisions)?',
      required: 'Please fill out this field',
    },
    haveResearchOutsideOhioState: {
      type: 'Boolean',
      label: ' 3. Have you conducted any research as a personal consultant or served as a Principal Investigator outside of Ohio State?',
      required: 'Please fill out this field',
    },
    haveDecisionMakingAuthorityOutsideOhioState: {
      type: 'Boolean',
      label: ' 4. Do you have any role or title such as Officer, Board of Directors Member, or another position with decision-making authority in an outside organization?',
      required: 'Please fill out this field',
    },
    hadInternationalCollaborativeActivities: {
      type: 'Boolean',
      label: ' 5. Do you have any foreign affiliation (paid or unpaid) or any research support from a foreign organization, such as participation in a foreign talent program?',
      required: 'Please fill out this field',
    },
    hadAppointmentOrAffiliationWithForeignEntity: {
      type: 'Boolean',
      condition: 'hadInternationalCollaborativeActivities',
      label: ' a. Any academic, scientific, professional, or institutional appointment or affiliation with a foreign entity (e.g., adjunct, honorary, visiting, or other title, including participation in a foreign talent program)? ',
      required: 'Please fill out this field',
    },
    hadActivitiesOrCollaborationWithForeignEntity: {
      type: 'Boolean',
      condition: 'hadInternationalCollaborativeActivities',
      label: ' b. Any research support you received outside of Ohio State from foreign governments, foreign academic institutions, or other foreign organizations, including laboratory space, funding (awards, gifts, grants, stipends) or in kind-support? ',
      required: 'Please fill out this field',
    },
    hadPersonalIncomeOutsideOhioState: {
      type: 'Boolean',
      label: `
      ** The next question involves Outside Activities that may not be related to your job at Ohio State.**

      To your knowledge, during the past year, have you (or an immediate family member<sup>1</sup>) held any other financial or fiduciary interest<sup>2</sup> in any organization that is seeking to do or doing business with OSU?
      `,
      description: ' If your only interest in this organization is holding less than five percent of the company\'s stock or equity, then you should answer no.',
    }
  }
  // Note there's a footer with references that we don't yet support:
  // It's also not a11y how it's written in COI today since the reference codes don't link.
  /*
    <sup>1</sup> Immediate family member includes grandparents, parents, spouse, children, whether dependent or not, grandchildren, siblings, or any person related by blood or marriage and residing in the same household.
    <sup>2</sup> Examples of a financial or fiduciary interest include receiving employee compensation, consulting fees, publishing fees, honoraria, or gifts; serving as a board member (paid or unpaid) or officer (paid or unpaid); and holding an equity or ownership interest.
  */
}

const OutsideActivities: PageDefinition = {
  // I don't know the actual conditions, so I
  // assume *any* yes answers in screening = show this page.
  condition: `
    isPaidOutsideOhioState or
    hadActivitiesPaidOutsideOhioState or
    hadTravelPaidOutsideOhioState or
    hadPersonalPaymentOutsideOhioState or
    haveInvestmentOutsideOhioState or
    haveResearchOutsideOhioState or
    haveDecisionMakingAuthorityOutsideOhioState or
    hadInternationalCollaborativeActivities or
    hadAppointmentOrAffiliationWithForeignEntity or
    hadActivitiesOrCollaborationWithForeignEntity or
    hadPersonalIncomeOutsideOhioState
  `,
  title: 'Outside Activities',
  description: `
  You indicated that you have participated in outside activities during the past year. Please add these activities below.
  `,
  fields: {
    activities: {
      type: 'Collection',
      label: 'Outside Activities',
      placeholder: 'No outside activities disclosed.',
      summary: '',

      // The template card shows:
      // Microsoft Corp.
      // For: Me, Immediate Family Member
      //  4 Errors

      template: {
        title: 'Disclose Outside Activity',
        fields: {
          organization: {
            type: 'Text',
            // Custom organization lookup component.
            label: 'Name of Outside Organization',
            required: 'Please fill out this field',
          },
          location: {
            type: 'Key',
            label: 'Location of Outside Organization',
            required: 'Please fill out this field',
            choices: {
              us: 'U.S.',
              foreign: 'Foreign',
              multinational: 'Multinational',
              unknown: 'I don\'t know',
            },
          },
          involvedIndividuals: {
            type: 'KeyArray',
            label: 'Involved individuals',
            description: 'Check all that apply',
            choices: {
              me: 'Me',
              immediateFamily: 'Immediate family member',
            },
          },
          previousEmployer: {
            type: 'Boolean',
            label: 'Was this organization a previous employer?',
            description: ' Select "Yes" if the only income you or your family member received in the past year from this company was employee compensation received prior to beginning your Ohio State University employment. ',
            required: 'Please fill out this field',
          },
          continuedActivity: {
            type: 'Key',
            label: 'Is this an ongoing activity or a concluded activity?',
            description: ' Select "Yes" if the only income you or your family member received in the past year from this company was employee compensation received prior to beginning your Ohio State University employment. ',
            required: 'Please fill out this field',
            choices: {
              ongoing: 'Ongoing',
              concluded: 'Concluded',
            }
          },
          decisionMaker: {
            type: 'Boolean',
            label: 'In your role as an Ohio State employee, do you make any decisions on behalf of the university regarding this company? ',
            required: 'Please fill out this field',
          },

          //////////
          // Payments
          //////////
          _payments: {
            type: 'Section',
            label: 'Payments',
            description: 'Please provide the amount of payments received in the past year. Do not include travel expenses in this section.',
          },

          consultingAmount: {
            type: 'Key',
            label: ' i. personal consulting / advising ',
            required: 'Please fill out this field',
            choices: MonetaryBracketChoiceList,
          },
          directorAmount: {
            type: 'Key',
            label: ' ii. board of directors service ',
            required: 'Please fill out this field',
            choices: MonetaryBracketChoiceList,
          },
          employeeAmount: {
            type: 'Key',
            label: ' iii. full or part-time employee ',
            required: 'Please fill out this field',
            choices: MonetaryBracketChoiceList,
          },
          teachingAmount: {
            type: 'Key',
            label: ' iv. Honoraria from seminars, lectures, teaching engagements, non-OSU continuing education presentations ',
            required: 'Please fill out this field',
            choices: MonetaryBracketChoiceList,
          },

          //////////
          // Gifts
          //////////
          _gifts: {
            type: 'Section',
            label: 'Gifts',
            description: 'Please provide the value of personal gifts or gifts to development funds under your control (i.e., used for your own activities) received in the past year.'
          },

          giftsAmount: {
            type: 'Key',
            label: ' Gift(s) amount ',
            required: 'Please fill out this field',
            choices: MonetaryBracketChoiceList,
          },

          //////////
          // Equity or Ownership Interest
          //////////
          _equity: {
            type: 'Section',
            label: 'Equity or Ownership Interest',
            description: 'Please provide information about your equity or ownership interest held in the past year.'
          },

          isPubliclyTraded: {
            type: 'Boolean',
            label: 'Is this organization a publicly traded company?',
            required: 'Please fill out this field',
          },

          privatelyTradedEquity: {
            condition: 'isPubliclyTraded == false',
            type: 'Boolean',
            label: 'Do you have equity with this organization?',
            required: 'Please fill out this field',
          },
          publiclyTradedEquity: {
            condition: 'isPubliclyTraded == true',
            type: 'Key',
            label: 'Do you have equity with this organization?',
            required: 'Please fill out this field',
            choices: {
              no: 'No',
              yesWithLessThan5PctInterest: 'Yes, and interest is less than 5%',
              yesWithGreaterThan5PctInterest: ' Yes, and interest is greater than 5%',
            }
          },
          estimatedInterestAmount: {
            type: 'Key',
            label: ' Current estimated value of this equity/ownership interest',
            required: 'Please fill out this field',
            choices: MonetaryBracketChoiceList,
          },

          //////////
          // Invention or Other Royalty Payments
          //////////
          _royalties: {
            type: 'Section',
            label: 'Invention or Other Royalty Payments',
            description: ' Please provide the value of personal royalty payments from this organization made directly to you in the past year. Do not include any royalties received from Ohio State through the Technology Commercialization Office or The Ohio State University Press. '
          },

          royaltyAmount: {
            type: 'Key',
            label: 'Amount',
            required: 'Please fill out this field',
            choices: MonetaryBracketChoiceList,
          },

          //////////
          // Technology Licensing
          //////////
          _licensing: {
            type: 'Section',
            label: 'Technology Licensing',
          },

          isTCOInvolved: {
            type: 'Boolean',
            label: 'Have you been involved in licensing technology created at OSU to this organization through the Technology Commercialization Office?',
            required: 'Please fill out this field',
          },

          //////////
          // Roles and Affiliations
          //////////
          _role: {
            type: 'Section',
            label: 'Roles and Affiliations',
          },
          fiduciaryRole: {
            type: 'Key',
            label: 'Please select any fiduciary role you or a family member have held with this organization. ',
            required: 'Please fill out this field',
            choices: {
              None: 'None',
              'Board of Directors Member': 'Board of Directors Member',
              Director: 'Director',
              Officer: 'Officer',
              Treasurer: 'Treasurer',
              Trustee: 'Trustee',
              Other: 'Other (please specify)',
            },
          },
          otherFiduciaryRole: {
            condition: 'fiduciaryRole == "Other"',
            type: 'Text',
            label: 'Specify',
            required: 'Please fill out this field',
          },
          appointmentOrAffiliation: {
            type: 'Key',
            label: ' Please select any academic, scientific, professional, or institutional appointment or affiliation you have held with this organization. ',
            required: 'Please fill out this field',
            choices: {
              None: 'None',
              'Adjunct Professor': 'Adjunct Professor',
              'Advisor/Consultant': 'Advisor/Consultant',
              'Guest Professor': 'Guest Professor',
              'Honorary Professor': 'Honorary Professor',
              'Visiting Professor': 'Visiting Professor',
              Other: 'Other (please specify)',
            },
          },
          otherAppointmentOrAffiliation: {
            condition: 'appointmentOrAffiliation == "Other"',
            type: 'Text',
            label: 'Specify',
            required: 'Please fill out this field',
          },

          //////////
          // Global Engagements
          //////////
          _globalEngagements: {
            type: 'Section',
            label: 'Global Engagements',
            description: ' Please select any international collaborations / support related to this organization. ',
          },

          foreignTalentRecruitmentProgram: {
            type: 'Boolean',
            label: `
              Is this disclosure related to a Foreign Government Talent Recruitment Program
              (i.e., a program providing *personal benefits* in exchange for transferring knowledge
                and expertise to a foreign entity)?
            `,
            description: `
              *Personal benefits* may include cash, research funding provided directly to the
              individual and not through OSU, access to research facilities or other in-kind support,
              honorific titles, career advancement opportunities, promised future compensation,
              or other types of remuneration/consideration.
            `,
            required: 'Please fill out this field',
          },
          foreignSupport: {
            type: 'Key',
            label: ' Please select any other foreign support you have received from this organization. ',
            required: 'Please fill out this field',
            choices: {
              None: 'None',
              'Funding (awards, gifts, grants, stipends)': 'Funding (awards, gifts, grants, stipends)',
              'In-Kind Support (equipment, materials, space, time)': 'In-Kind Support (equipment, materials, space, time)',
              'Laboratory Space': 'Laboratory Space',
              'Living Expenses': 'Living Expenses',
              'Visiting Scientists, Postdocs, Students': 'Visiting Scientists, Postdocs, Students',

              Other: 'Other (please specify)',
            },
          },
          otherForeignSupport: {
            condition: 'foreignSupport == "Other"',
            type: 'Text',
            label: 'Specify',
            required: 'Please fill out this field',
          },
          internationalCollaborations: {
            type: 'Key',
            label: 'Please select any international collaborations you have with individuals at this organization.',
            required: 'Please fill out this field',
            choices: {
              None: 'None',
              'Co-authorship with investigators at a foreign site': 'Co-authorship with investigators at a foreign site',
              'Human subject or animal research at a foreign site': 'Human subject or animal research at a foreign site',
              'Financial support or resources from a foreign entity': 'Financial support or resources from a foreign entity',
              'Travel to conduct research at a foreign site': 'Travel to conduct research at a foreign site',
              'Use of facilities or instrumentation at a foreign site': 'Use of facilities or instrumentation at a foreign site',

              Other: 'Other (please specify)',
            },
          },
          otherInternationalCollaborations: {
            condition: 'internationalCollaborations == "Other"',
            type: 'Text',
            label: 'Specify',
            required: 'Please fill out this field',
          },

        }
      }
    }
  }
}

const Travels: PageDefinition = {
  title: 'Travels',
  description: `
  Faculty, staff and students are also required to separately disclose the occurrence of any externally
  reimbursed or sponsored travel related to their institutional responsibilities.
  This disclosure requirement does **NOT** apply to:

  - Any travel reimbursed, sponsored or paid for by a U.S. government agency, a U.S. higher education institution; and/or
  - Any travel reimbursement or payment of travel made by **The Ohio State University**, a university college, department or unit, or travel covered by a sponsored program agreement managed through the Office of Sponsored Programs.

  Three buttons are provided to the right of each entry to copy a travel entry, edit it, or delete it. Any errors/incomplete information found will prevent you from submitting this disclosure.
  `,
  fields: {
    travel: {
      type: 'Collection',
      label: 'Travel',
      // placeholder: No travel disclosed.
      // Card looks like:
      //  2023 - Microsoft Corp.
      //  [destination] for [purpose] lasting [duration] days
      // with an edit, copy, and remove button.
      // Copy opens a new instance and unsets the decision maker field?
      template: {
        title: 'Add a Sponsored/Reimbursed Travel',
        description: `
          Please answer these questions separately for each occurrence (or set of repeated travel)
          of any reimbursement or sponsored travel related to institutional responsibilities.
        `,
        fields: {
          company: {
            type: 'Text',
            // Custom organization lookup component.
            label: 'Company Name',
            required: 'Please fill out this field',
          },
          year: {
            type: 'Key',
            label: 'Year',
            required: 'Please fill out this field',
            choices: {
              2021: '2021',
              2022: '2022',
              2023: '2023',
            }
          },
          destination: {
            type: 'Text',
            label: 'Please indicate a destination',
            description: ' If this was a multi-stop trip, please list all destinations separated by a semi-colon or dash (Example: New York, NY; Chicago, IL; Seattle, WA). For international travel, please be sure to indicate the city and country.',
            required: 'Please fill out this field',
            example: 'New York, NY; Chicago, IL; Seattle, WA',
          },
          purpose: {
            type: 'Key',
            label: 'Purpose of trip',
            description: 'Specify a category in the box above.',
            required: 'Please fill out this field',
            choices: {
              'Scientific meetings': 'Scientific meetings',
              'Research collaboration': 'Research collaboration',
              'Data collection/analysis': 'Data collection/analysis',
              'Professional service obligations/commitment': 'Professional service obligations/commitment',
              'Professional development': 'Professional development',

              Other: 'Other (please specify)',
            }
          },
          otherPurpose: {
            condition: 'purpose == "Other"',
            type: 'Text',
            label: 'Specify purpose of trip',
            description: 'Please specify your purpose in the box above.',
            required: 'Please fill out this field',
          },
          duration: {
            type: 'Number',
            label: 'Duration (in days) of trip',
            description: 'Include both the start and end dates as individual days when counting the duration of trip. This value will be rounded up to the nearest whole number. Ex: A trip from Jan. 11 to Jan. 12 would be 2 days. ',
          },
          occurrences: {
            type: 'Number',
            label: 'Occurrences for the above calendar year ',
            description: 'For repeated travel across multiple calendar years, please create a separate travel entry for each calendar year. ',
          },
          amount: {
            type: 'Key',
            label: 'Amount of Reimbursement or Estimated Trip Cost',
            required: 'Please fill out this field',
            choices: {
              'Unknown': 'Unknown',
              '$1,000-$1,999': '$1,000-$1,999',
              '$2,000-$2,999': '$2,000-$2,999',
              '$3,000-$3,999': '$3,000-$3,999',
              '$4,000-$4,999': '$4,000-$4,999',
              '$5,000-$5,999': '$5,000-$5,999',
              '$6,000-$6,999': '$6,000-$6,999',
              '$7,000-$7,999': '$7,000-$7,999',
              '$8,000-$8,999': '$8,000-$8,999',
              '$9,000-$9,999': '$9,000-$9,999',
              '$10,000 or more': '$10,000 or more',
            }
          },
          isDecisionMaker: {
            type: 'Boolean',
            label: `
              In your role as an Ohio State employee, do you make any decisions on behalf
              of the university regarding this company?
            `,
            required: 'Please fill out this field',
          },

        }
      }
    }
  }
}

const COI: FormDefinition = {
  title: 'Ohio State Conflict of Interest',
  version: '1.0',
  pages: {
    personalInfo: PersonalInfo,
    outsideActivitiesScreening: OutsideActivitiesScreening,
    outsideActivities: OutsideActivities,
    travels: Travels,
  }
}

export default COI;
