
import { PageDefinition, FormDefinition } from "../../types"

// Sections 1 through 3
const Overview: PageDefinition = {
  title: 'Overview',
  fields: {
    title: {
      type: 'Text',
      label: '1. Title',
      // 254 character limit in the old form
      description: `
        Enter the title of proposal as it will be submitted to the sponsor, avoiding acronyms
        and abbreviations not in common use. The title is restricted to 254 characters,
        though some sponsors may have more specific requirements, e.g., NIH allows only 81 characters.
        If the study is a company sponsored clinical trial, begin the title with the study number or
        acronym by which the study will be known.
      `
    },
    sponsor: {
      type: 'Text',
      label: '2. Sponsor',
      description: `
        Enter the name of the sponsor to whom the proposal is being submitted. If the award will
        be a subcontract from another organization, indicate that organization's source of funding,
        too, if known (e.g., Cornell University, USDA funds).
      `
    },
    funding: {
      type: 'Boolean',
      label: '2A. Are you seeking funds that are Federal in origin, either directly or as Federal flow-through?',
      description: `
        If you are uncertain if the funds you are seeking are Federal or Federal flow-through, contact your SPO.
      `
    },
    dueDate: {
      type: 'Date',
      label: '3A. Proposal Due Date',
      description: `
        Enter, using the format mm/dd/yyyy (or click calendar icon and select), the date by which the proposal
        must be postmarked, or be received by the sponsor.  This information is normally included in the sponsor's
        guidelines. If there is no due date, enter the date by which you intend to submit the proposal to the sponsor.
      `
    },
    spo: {
      type: 'Person',
      // Custom SPO lookup
      label: '3B. Sponsored Program Officer',
      description: `
        Select from the dropdown list the pre-award Sponsored Program Officer (SPO) who will review
        and approve your proposal for signature. SPOs are assigned to specific academic constituencies.
        If you are unsure of the SPO who works with your department,
        check the OGC constituency list at https://osp.osu.edu/development/spos/ (select your college then your
        department from the list.)
      `
    },
    discoveryThemes: {
      type: 'KeyArray',
      label: '3C. Discovery Themes',
      description: `
        Check the box(es) for any Discovery Themes to which the proposal relates.
        Given the inter-connectedness of the Discovery Themes, it may be appropriate to
        check 2 or all of the boxes. If the proposal does not pertain to any of the Themes,
        check None. For additional information on the scope of the Discovery Themes
        go to http://discovery.osu.edu/.
      `,
      choices: {
        'Energy and Environment': 'Energy and Environment',
        'Translational Data Analytics': 'Translational Data Analytics',
        'Food Production and Security': 'Food Production and Security',
        'Health and Wellness': 'Health and Wellness',
        'Humanities/Arts': 'Humanities/Arts',
        'None': 'None',
      }
    },
  }
}

// Section 4
const Team: PageDefinition = {
  title: 'Investigators and Organizations',
  description: `
    All investigators named in Section 4A of the PA-005 will be associated with the proposal/award in
    university reports. Only those investigators who made a significant intellectual contribution to the
    development of the proposal, or whose expertise is critical to the conduct of the research, if funded,
    should be listed. The ePA-005 should not be used as a time sheet i.e., investigators should not be listed
    just because they are charging or contributing time to the project.
    Effort information is normally included in the proposal budget.

    The information in Section 4B of the form determines the departments/centers/colleges/VP Units
    that will receive notification of an ePA-005 awaiting their approval and whose signatures are
    required before the form is considered complete.

    The award allocation information provided in Section 4B determines how the proposal and subsequent
    award dollars are shared across orgs in University management reports (e.g., eActivity).
    The award allocation recognizes the intellectual contribution to the development of the proposal/award.

    The expenditure allocation information Section 4B determines how expenditures and associated
    F&A dollars are shared across the orgs. Expenditure incurred and F&A recovered are two of the inputs
    used to determine each College's annual research assessment. The expenditure allocation recognizes
    the facilities and administrative support provided by each org.
  `,
  fields: {
    investigators: {
      type: 'Collection',
      label: '4A. Investigators',
      placeholder: 'No selected investigators',
      description: `
        The first named investigator in Section 4A is considered to be the Principal Investigator (PI) and
        the administrative manager for the award. S/he must be a regular tenure-track faculty member with
        at least a 50% appointment, or otherwise meet one of the criteria defined in Principal Investigator
        Status Appointments. Persons not meeting these criteria and who wish to serve as PIs must be granted
        permission by the Senior Associate Vice President for Research.

        If an investigator is new to the University, or does not appear on the list, click the Request Investigator
        button to send an e-mail to the OR help desk asking that the investigator be added.
        You can expect a response in no more than 24 hours.

        All investigators named on the form will be listed with the proposal and award in official university
        reports and all investigators will have access to the proposal and award record in the PI Portal.
      `,
      summary: `
        {{ person.name }} {{ recovery }}% salary recovery
      `,
      template: {
        title: 'Add/Update Investigator for Proposal',
        fields: {
          person: {
            type: 'Person',
            // Think it's limited to PIs?
            label: 'Name',
          },
          recovery: {
            type: 'Number',
            label: 'Salary Recovery %'
          }
        }
      }
    },

    organizations: {
      type: 'Collection',
      label: '4B. Departments/Centers',
      placeholder: 'No selected departments or centers',
      description: `
        This section identifies the departments/centers (collectively known as orgs) associated
        with the proposal/award and the conduct of the study. Each org whose faculty contributed to the
        intellectual development of the proposal, or where a substantial part of the work will be
        conducted, should be listed.  The PI's TIU (Tenure Initiating Unit) must also be listed.
        The chair/center director and responsible Dean/VP for each org listed are required to sign the form.
        Chairs/Deans and their administrators in all units listed will have PI Portal access to the
        proposal/award and any resulting projects.

        The first listed org will be considered to be the administrative home of the proposal/award.
        The Office of Sponsored Programs pre-award SPO responsible for that department will the OSP point
        of contact for all aspects of proposal preparation and pre-award review.
      `,
      summary: `
        {{ organization }} {{ awardAllocation }}% for award, {{ expenditureAllocation }}% for expenditures
      `,
      template: {
        title: 'Add/Update Dept/Center for Proposal',
        fields: {
          organization: {
            type: 'Text',
            // it's a lookup for cost centers
            label: 'Dept/Center',
          },
          awardAllocation: {
            type: 'Number',
            label: 'Award Allocation',
            description: `
              Enter the % of the proposal/award to be allocated to the selected org. For example, there are two orgs
              involved and they are considered to be equal participants, so each would be assigned 50% of the
              'credit' for the proposal/award. 50% of the proposal and award dollars would be counted in each org.
              The sum of award allocations across orgs cannot exceed 100%.
            `
            // Note there's some UI next to this that shows % allocation remaining
            // which takes the allocation of all depts/centers added and subtracts them from 100
          },
          expenditureAllocation: {
            type: 'Number',
            label: 'ExpenditureAllocation',
            description: `
              Enter the % of the expenditures to be allocated to the selected org. For example, there are two orgs
              involved, one of which will provide 70% of the space and administrative support while the other
              will provide 30%. These values would be entered into the expenditure allocation boxes for the two
              orgs. The sum of expenditure allocations across orgs cannot exceed 100%. If the proposal is funded,
              project expenditures and associated F&A recovery will be allocated to orgs in accordance with
              the expenditure allocation percentages.
            `
            // same calculation thing as awardAllocation
          }
        }
      }
    },
  }
}

// Section 5
const Budget: PageDefinition = {
  title: 'Budget and Award Information',
  description: `
    To facilitate review, attach a copy of the proposal budget to the form, plus another documents
    required by the units associated with the proposal.
  `,
  fields: {
    awardStartDate: {
      type: 'Date',
      label: 'A. Award period start date',
      description: `
        Enter the entire period for which funding is being requested.
        Enter dates in the format mm/dd/yyyy or click the calendar icon and select date.
      `
    },
    awardEndDate: { // date range would be nicer here.
      type: 'Date',
      label: 'A. Award period end date',
    },
    requestedSponsorAmount: {
      type: 'Number', // money
      label: 'B. Total amount requested from sponsor',
      description: `Enter the amount requested from the sponsor for the entire award period. `
    },

    // There's going to be a grid of fields here for cost sharing
    equipmentCostSharing: {
      type: 'Key',
      label: 'C. Equipment cost sharing',
      description: `
        Sometimes departments and colleges will contribute part of the cost of equipment being
        requested in a proposal (=equipment cost-sharing). If this is the case, select the appropriate
        radio button to indicate whether the sponsor requires such cost-sharing as a condition
        of submitting the proposal (Required cost-sharing) or whether the PI/Unit has chosen to share part
        of the cost (Voluntary cost-sharing). Indicate the amounts from department(s)/center(s), college(s),
        Office of Research, and Ohio Board of Regents (OBOR) Action Fund (see
        [Ohio Board of Regents' Action Fund Program](http://research.osu.edu/programs/obor-actfund.cfm)
        for additional information), if relevant. If there is insufficient space, the information can
        be entered into the comments box at the bottom of the form, or in an attachment if complex.
        Chair/Center Director/Dean/VP signatures on the form indicate their concurrence with the
        cost-shared amounts listed in section 5C.
      `,
      choices: {
        required: 'Required',
        voluntary: 'Voluntary',
        notApplicable: 'N/A',
      },
    },
    equipmentCostSharingDept: {
      type: 'Number', // money
      label: 'Dept',
    },
    equipmentCostSharingOfcRes: {
      type: 'Number', // money
      label: 'Ofc Res',
    },
    equipmentCostSharingCollege: {
      type: 'Number', // money
      label: 'College',
    },
    equipmentCostSharingOBOR: {
      type: 'Number', // money
      label: 'OBOR',
    },

    // Another grid of fields
    otherCostSharing: {
      type: 'Key',
      label: 'D. Other cost sharing',
      description: `
        If other cost-sharing is included in the proposal, check the appropriate box to indicate whether
        the commitment is required by the sponsor or is voluntary. Indicate the amounts from department(s)/center(s),
        college(s), Office of Research, and other sources as appropriate, and attach documentation describing the
        nature of the cost-share. Chair/Center Director/Dean/VP signatures on the form indicate concurrence
        with the amounts listed in section 5D.

        Be aware that any voluntary cost-sharing offered in a proposal becomes part of the award, whether or not
        it is specifically identified in the award notice.  Therefore, proposed cost-share must be provided,
        which means it has to be documented in the University accounting system.  Voluntary cost-sharing is
        strongly discouraged because a) it is the University's goal to recover as much as possible of the costs
        of conducting sponsored projects, b) voluntary cost-sharing is difficult to monitor and c) it has an
        adverse impact on the University's F&A cost rate.
      `,
      choices: {
        required: 'Required',
        voluntary: 'Voluntary',
        notApplicable: 'N/A',
      },
    },
    otherCostSharingDept: {
      type: 'Number', // money
      label: 'Dept',
    },
    otherCostSharingOfcRes: {
      type: 'Number', // money
      label: 'Ofc Res',
    },
    otherCostSharingCollege: {
      type: 'Number', // money
      label: 'College',
    },
    otherCostSharingOBOR: {
      type: 'Number', // money
      label: 'OBOR',
    },

    _fa: {
      type: 'Section',
      label: 'E. Facilities and Administrative (F&A) costs',
      description: `
        F&A (Facilities and Administrative) costs - previously called indirect costs - are the funds
        provided by sponsors for charges that cannot be directly attributable to a project e.g.
        building maintenance, library costs, college and department administrative costs.

        F&A costs are calculated as a percentage of direct costs, and are collected as direct cost
        expenditures are incurred. Most F&A dollars recovered will be returned to the colleges where
        they were generated.

        The University's Facilities and Administrative (F&A) cost rates are determined in negotiations
        with the Department of Health and Human Services. The University strives to maximize F&A cost
        recovery, consistent with sponsor policy (e.g., some federal agencies and not-for-profit
        organizations have a lower rate that they consistently ask awardees to accept). There may be
        instances when a department and college feel it is in their best interests to propose a rate
        lower than that which the sponsor routinely provides. Units can propose and accept lower rates,
        though this should be a rare occurrence. No matter what rate is accepted, all MTDC expenditures
        associated with the project will be included in the determining the college research assessment.
      `
    },
    sponsorFARate: {
      type: 'Number', // percentage
      label: 'i. Sponsor F&A rate',
      description: `
        Enter the F&A rate listed in the program announcement or other sponsor publication. If a sponsor
        has no published rate, use the DHHS approved rate that is appropriate for the type of work being
        done (see [Facilities & Administrative Cost Rates at OSU](https://osp.osu.edu/development/budgets/fa-costs/)
        for additional information). This line is pre-populated with the on-campus research and development rate.
      `,
      example: 57.50, // Should also be the default value
    },
    rateUsedForThisProposal: {
      type: 'Number', // percentage
      label: 'ii. Rate used for this proposal ',
      example: 57.50, // Should also be the default value
    },
    base: {
      type: 'Key',
      label: 'iii. Base',
      choices: {
        MTDC: `
          MTDC (Modified Total Direct Costs) - this is the base against which the DHHS approved rates are
          calculated and charged.  Modified Total Direct costs include all direct costs except equipment
          (see definition at http://osp.osu.edu/pdp/pdp45.cfm), subcontract costs in excess of $25,000,
          renovations and alterations, patient care costs, tuition, and rental of off-campus facilities.
          MTDC expenditures are the basis for the allocation of the annual research assessment.
        `,
        TDC: `
          TDC (Total Direct Costs) - all direct costs categories are subject to F&A costs.
        `,
        Other: `
          Other - anything other than MTDC or TDC.  Provide additional information in the comments
          section or an attached narrative.
        `,
      }
    },


    _ga: {
      type: 'Section',
      label: 'Graduate Associate Fees',
    },
    gaFeesPaidBy: {
      type: 'Key',
      label: 'F. GA fees paid by',
      description: `
      Select the radio button that represents who will pay fees for any GAA/GRAs
      (Graduate Administrative Associate/Graduate Research Associates) to be supported on the award.

      **Sponsor** means that fees are included in the proposal budget and will be charged to the sponsor.

      **College** or **Department** means that GA fees will be charged to one of these units,
      either because sponsor policy prohibits charging fees to the award, or because a department
      or college is providing a fee waiver.

      **N/A** means that students will not be appointed or charged to the award
      (e.g., an equipment or facility improvement proposal). In the event that students
      are appointed to such a project, the fee charges will default to the Department.

      Each college has its own requirements and procedures regarding fee waivers.
      If you are uncertain of your college"s policy please check with your department chair or
      College Fiscal Officer before preparing your proposal budget.

      Chair/Center Director/Dean/VP signatures on the form indicate their
      concurrence with the fee designation.
      `,
      choices: {
        Sponsor: 'Sponsor',
        College: 'College',
        Dept: 'Dept',
        NotApplicable: 'N/A',
      }
    },

  }
}

// Section 6
const Compliance: PageDefinition = {
  title: 'Compliance',
  description: 'Does this project involve any of the following compliance areas?',
  fields: {
    humanSubjects: {
      type: 'Boolean',
      label: `
        A. Human Subjects?
        [If you have any questions, send email to ORRP Human Subjects Determination](mailto:hscongruencyreview@osu.edu?subject=PA-005%20-%20Human%20Subjects%20-%20Uncertain)
      `,
      description: `
        If the project will involve human subjects, the protocol must be reviewed and approved by the appropriate Institutional
        Review Board (IRB) or determined to be exempt prior to initiation of the study.

        See the Research Involving Human Subjects policy for more information or contact ORRP for additional
        guidance at ORRPDeterminations@osu.edu.
      `,
    },
    vertebrateAnimals: {
      type: 'Boolean',
      label: 'B. Vertebrate Animals?',
      description: `
        If the project will involve the use of any vertebrate animals, the research protocol must be reviewed
        and approved by the Institutional Animal Care and Use Committee (IACUC) prior to initiation of the
        study. See [IACUC](http://orrp.osu.edu/iacuc/) for complete information on when a protocol is required,
        and a list of people who can help with IACUC related questions.
      `,
    },
    recombinantDNA: {
      type: 'Boolean',
      label: `
        C. Recombinant DNA or Synthetic Nucleic Acids?
        [If you have any questions, send email to ORRP IBC/IACUC](mailto:IBCinfo@osu.edu?subject=PA-005%20-%20Recombinant%20DNA%20or%20Synthetic%20Nucleic%20Acids%20-%20Uncertain)
      `,
      description: `
        If the award will involve recombinant DNA or Synthetic Nucleic Acids, the study protocol must be reviewed by the
        Institutional Biosafety Committee. See [IBC](http://orrp.osu.edu/ibc/) for additional information.
      `,
    },
    xenotransplantation: {
      type: 'Boolean',
      label: 'D. Xenotransplantation?',
      description: `
        Xenotransplantation is the transfer of living cells, tissues, and/or organs from one species to another.
        While the route is usually animal-to-human transplants, interspecies transplants between animals also occur.
        Xenotransplantation involves a number of ethical, legal and regulatory requirements that require special review.
        If your proposal involves xenotransplantation, select the yes button.  This will result in an e-mail to the
        [Office of Responsible Research Practices](http://orrp.osu.edu/), who will advise on whether additional
        information is required before the proposal can be submitted.
      `,
    },
    geneTransfer: {
      type: 'Boolean',
      label: 'E. Gene Transfer?',
      description: `
        Human Gene transfer is the process of transferring genetic material (DNA or RNA) into a person or animal,
        to determine whether it can affect certain health problems by compensating for defective genes,
        producing potentially therapeutic substances or triggering the immune system to fight disease.
        Gene transfer involves a number of ethical, legal and regulatory requirements that require special review.
        If your proposal involves gene transfer, select the yes button.  This will result in a notification to the
        [Office of Responsible Research Practices](http://orrp.osu.edu/), who will advise on whether additional
        information is required before the proposal can be submitted.
        See [Guidance](http://orrp.osu.edu/ibc/guidance/) for additional information.
      `,
    },
    embryonicStemCells: {
      type: 'Boolean',
      label: 'F. Human Embryonic Stem Cells?',
      description: `
        There are a number of specific state and federal requirements that govern use of human embryonic stem cells.
        If your proposal involves human embryonic stem cells, select the yes button. This will result in a
        notification to the [Office of Responsible Research Practices](http://orrp.osu.edu/), who will advise
        on whether additional information is required before the proposal can be submitted.
      `,
    },
    infectiousSelectAgents: {
      type: 'Boolean',
      label: 'G. Infectious and/or Select Agents?',
      description: `
        The Centers for Disease Control and Prevention is required to regulate the possession of
        biological agents and toxins that have the potential to pose a severe threat to public health
        and safety. CDC's Select Agent Program oversees these activities. See http://www.cdc.gov/od/sap/docs/salist.pdf
        for the current list of select agents. If your proposal involves infectious or select agents, select the yes button.
        This will result in a notification to the [Office of Responsible Research Practices](http://orrp.osu.edu/),
        who will advise on whether additional information is required before the proposal can be submitted.
      `,
    },
    radioisotopes: {
      type: 'Boolean',
      label: 'H. Radioisotopes?',
      description: `
        Procurement, storage use and disposition of radioisotopes are overseen by Radiation Safety in the
        University's Office of Environmental Health and Safety. See http://www.ehs.ohio-state.edu/index.asp?PAGE=radsafe.menu
        for additional information. If your proposal involves radioisotopes, select the yes button.
        This will result in a notification to the University's Office of Environmental Health and Safety,
        whose director will advise on whether additional information is required before the proposal can be submitted.
      `,
    },
    securityClassification: {
      type: 'Boolean',
      label: 'I. Security Classification?',
      description: `
        Mark yes if your proposal will require anyone to have access to classified information or
        secured facilities. A notification will be sent to the Facility Clearance Officer who will
        contact you for additional information if necessary.
      `,
    },
    exportControl: {
      type: 'Boolean',
      label: 'J. Export Control?',
      description: `
        Federal Export Control regulations place restrictions on the release or transfer of certain information and
        materials to foreign nationals or foreign entities, both here at Ohio State and abroad. If award activities
        will include any of the following conditions, an export control assessment will need to be done and if needed
        an export control management plan implemented to ensure compliance with the federal regulations.

        Select the Export Control "yes" button if any of the following conditions apply:

        1. Research involves the use of information, items or technology subject to the licensing provisions of the
          International Traffic in Arms (ITAR) regulations 15 CFR งง 120-130 or the Export Administration Regulations
          (EAR) 22 CFR งง 730-774 (e.g., information marked as export restricted received from outside the University).
        2. Research involves export restricted science and engineering areas (e.g., defense areas, missiles,
          weapons, select agents, encryption technology).
        3. Research involves the transfer of project information, equipment, materials or financial support out of the
          U.S. (e.g., sending project deliverables or providing funding via a subcontract).
        4. Any part of the research will take place outside the U.S. or will include international travel (e.g., field
          work outside the U.S., you plan on presenting the work at an international conference, or you will be
          providing professional services).
        5. Research involves foreign national faculty, visiting scientists or collaborator(s), or other foreign
          entities (e.g., non-US Company, University or other organization).
        6. Foreign National graduate students, trainees or other Ohio State employees will be involved in any
          of the research types listed in conditions 1-4 above, AND the research has not been determined to be
          fundamental research by the Export Control Administrator.

        Selecting "yes" will result in a notification to the Export Control Administrator, who will contact you for
        additional information as needed. Note that selecting "yes" will not affect the submission of the proposal.
        See the [Office of Secure Research, Export Control](http://osr.osu.edu/) website or contact the Export
        Control Administrator at [exportcontrol@osu.edu](mailto:exportcontrol@osu.edu) for additional information
        regarding Export Controls.
      `,
    },
    scubaDive: {
      type: 'Boolean',
      label: 'K. Scuba Diving?',
      description: `
        The federal Occupational Safety and Health Administration (OSHA) requires that academic institutions provide
        oversight of all research-relating diving activities. If your proposal involves scuba diving, select the “yes” button.
        This will notify the University's Diving Safety Officer, who will contact you for additional information if necessary.
        See the [Office of Research Compliance](http://orc.osu.edu/) for additional information.
      `,
    },
    chemicalSecurity: {
      type: 'Boolean',
      label: 'L. Chemical Security? ',
      description: `
        The federal Department of Homeland Security (DHS) imposes comprehensive federal security regulations for chemical
        facilities, including academic institutions, under the agency's Chemical Facility Anti-Terrorism Standards.
        If your proposal involves the following chemicals, please select the "yes" button.

        - Chemicals covered under the Environmental Protection Agency's Risk Management Program;
        - Chemicals included in the Chemical Weapons Convention;
        - Hazardous materials, such as gases that are poisonous by inhalation; or
        - Explosives regulated by the Department of Transportation.

        Selecting "yes" will notify the University's Office of Environmental Health & Safety, which will
        contact you for additional information.

        The complete list of DHS "Chemicals of Interest" is available at
        http://www.dhs.gov/xlibrary/assets/chemsec_appendixa-chemicalofinterestlist.pdf.
      `,
    },
  }
}

// Section 7
const ConflictOfInterest: PageDefinition = {
  title: 'Potential Financial Conflicts of Interest',
  description: `
    Indicate whether the PI or anyone named in section 4 (or an immediate family member) has a significant
    financial interest in any company or organization listed in section 7A. This includes the sponsor
    of the research or other company or organization providing support for the research - e.g., providing
    study materials, drugs or devices. “Immediate family” means spouse, domestic partner, and/or dependent children.

    To comply with federal law, Ohio State University"s financial conflict of interest policy has two
    definitions for what constitutes a 'significant' financial interest - one for U.S. Public Health
    Service (PHS) funded research and a separate definition for non-PHS funded research. PHS funding
    agencies include the National Institutes of Health (NIH), Food and Drug Administration (FDA),
    Centers for Disease Control and Prevention (CDC), Indian Health Service (IHS), Health Resources and
    Services Administration (HRSA), Substance Abuse and Mental Health Services Administration (SAMHSA),
    Agency for Healthcare Research and Quality (AHRQ), Centers for Medicare & Medicaid Services (CMS),
    Administration for Children and Families (ACF), and Administration on Aging (AOA).

    For PHS-funded research, a "significant" financial interest exists if the PI or anyone listed in
    section 4 (and their immediate family members) have one or more of the following interests:

    1. Any equity or ownership interest in a non-publicly traded entity;
    2. An equity (stock or stock option) interest in a publicly traded company that is 5% or greater; or
    3. $5,000 or more of financial income (e.g. consulting income) or other remuneration (e.g. personal
      travel payments) from the entity in the past twelve (12) months.

    For non-PHS funded research, a "significant" financial interest exists if the PI or anyone listed
    in section 4 (and their immediate family members) have one or more of the following interests:

    1. Any equity or ownership interest in a non-publicly traded entity;
    2. An equity (stock or stock option) interest in a publicly traded company that is 5% or greater; or
    3. $10,000 or more of financial income (e.g. consulting income) or other remuneration (e.g. personal
      travel payments) from the entity in the past twelve (12) months.

    If Yes, indicate whether the interest has already been disclosed on the university's electronic
    conflict of interest disclosure at http://go.osu.edu/coi. If the interest has not been disclosed,
    the electronic conflict of interest disclosure should be revised and updated with the financial interest.

    Please also indicate whether the project involves the use of Ohio State University intellectual
    property that has been formally licensed by the University"s Technology Commercialization
    Office to the sponsor, or other company or organization that is providing support for the research.
    Intellectual property includes, for example, a drug, device or patented or copyrighted material,
    information or software. If so, please provide the name of the company or organization.

    For questions or additional information, contact the Office of Research Compliance
    at [conflictinfo@osu.edu](mailto:conflictinfo@osu.edu).
  `,
  fields: {
    hasCompOrgAssist: {
      type: 'Boolean',
      label: `
        7A. Does this project involve any company or organization besides the sponsor that is providing
        financial or in-kind assistance for the project (e.g., provision of study drug or device or
        providing staffing, equipment, or other material support for the project)?
      `,
    },
    compOrgNames: {
      condition: 'hasCompOrgAssist',
      type: 'Text',
      label: 'Please list the name of the company or organization(s)',
    },
    hasSFI: {
      type: 'Boolean',
      label: `
        7B. Does anyone listed in section 4 (or their immediate family members) have a significant
        interest (SFI) in an entity supporting this research?
      `,
      description: `
        SFI is:
        1. Any equity or ownership interest in a private, non-publically traded company,
        2. Greater than 5% stock ownership in a publically-traded company or $5,000 per year
          in personal income - if the sponsor is a Public Health Service (PHS) entity, or
        3. Greater than 5% stock ownership in a publically-traded company or $10,000 per year
          in personal income if the sponsor is a non-PHS entity.
      `
    },
    hasSFIDisclosed: {
      condition: 'hasSFI',
      type: 'Boolean',
      label: 'Has interest already been disclosed?',
      description: `
        If you marked No: Please revise and update your electronic conflict of interest disclosure at [e-COI](http://go.osu.edu/coi).
      `
    },
    hasOSUintProperty: {
      type: 'Boolean',
      label: `
        7C. Does this project use Ohio State University intellectual property (e.g., a drug, device or other patented or
        copyrighted material, information or software) that has been licensed by the University to an outside company or
        organization, including the sponsor of the project?
      `,
    },
    osuIntPropertyCompOrgNames: {
      condition: 'hasOSUintProperty',
      type: 'Text',
      label: 'Please list the name of the company or organization(s):',
    },
  }
}

// Section 8
const SpacePlanning: PageDefinition = {
  title: 'Space available for award',
  fields: {
    hasSuitableSpace: {
      type: 'Boolean',
      label: '8. Is sufficient and suitable space presently available to house this project?',

    },
    location: {
      condition: 'hasSuitableSpace',
      type: 'Text',
      label: `
        List the room number(s) and building(s) that will be used for the award.
        If the project is off-campus, indicate the street address and city.
      `,
    },
    spacePlanningAttachments: {
      condition: 'not hasSuitableSpace',
      type: 'Attachment',
      label: `
        If appropriate space is not available, attach plan to provide space for the award,
        including funding sources for space alterations.
      `
    }
  }
}

const AdditionalInformation: PageDefinition = {
  title: 'Additional Information',
  fields: {
    comments: {
      type: 'Text',
      label: `
        Add any comments or additional information.
      `
    },
    supplementaryAttachments: {
      type: 'Attachment',
      label: 'Upload a file',
      // Old form restricts it to doc, xls, txt, and PDF.
    }
  }
}

// Last section that they need to agree to.
// Maybe this is a checkbox?

// This statement identifies the terms under which the proposal will be submitted to the
// sponsor and the award accepted. Each unit’s signature indicates acceptance of these terms.
const StatementOfResponsibility: PageDefinition = {
  title: 'STATEMENT OF RESPONSIBILITY',
  description: `
    By signing this form Principal Investigator(s) certifies that:

    - the statements included in the proposal are true, complete and accurate to the best of my knowledge
    - I am aware that any false, fictitious, or fraudulent statements or claims may subject me to criminal,
      civil, or administrative penalties
    - I agree to accept responsibility for the scientific conduct of the project and to provide the
      required progress reports if a grant is awarded as a result of this application.
    - I will perform the work in accordance with University and Sponsor policies and procedures
      all faculty involved in the proposal have agreed to participate

    Administrative signers:

    - acknowledge agreement with the information listed above and in the proposal
    - certify that the proposed work is consistent with the University unit objectives,
      and the obligation and commitments described are acceptable
    - authorize the transfer of the following expenses to our unit's salary recovery fund(s)
      in accordance with the expenditure allocation on this form:
      - the amount of any project overexpenditures at project termination
      - any costs that are disallowed by the sponsor, or any costs incurred in excess
        of funds collected from the sponsor


    **COMPLETING THE FORM:**

    If you have entered all the necessary data and are ready to submit your information, click on the
    Submit for Signature button (below).

    - This will save your data and validate your submission.
    - If validated, you will receive confirmation and have an opportunity to print your form.
    - If your submission requires changes, you will be prompted on those data points that are missing.

    You can always save your work - use one of the Save buttons. If you leave the application, you can resume
    work on this form by clicking on Update and selecting the appropriate data.
  `,
  fields: {
    // ?
  }
}

export const PA005 = {
  title: 'The Ohio State University Authorization to Seek Off-Campus Funding',
  version: '1.0',
  pages: {
    overview: Overview,
    team: Team,
    budget: Budget,
    compliance: Compliance,
    coi: ConflictOfInterest,
    space: SpacePlanning,
    additionalInfo: AdditionalInformation,
    legal: StatementOfResponsibility,
  }
} as const satisfies FormDefinition;
