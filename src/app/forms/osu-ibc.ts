import { ChoicesList, PageDefinition, FieldDefinition, FormDefinition } from "../../types"

const Agents: ChoicesList = {
  'Abrin': 'Abrin',
  'African horse sickness virus': 'African horse sickness virus',
  'African swine fever virus': 'African swine fever virus',
  'Avian influenza virus ': 'Avian influenza virus ',
  'Bacillus anthracis': 'Bacillus anthracis',
  'Bacillus anthracis Pasteur strain': 'Bacillus anthracis Pasteur strain',
  'Botulinum neurotoxins - clostridium': 'Botulinum neurotoxins - clostridium',
  'Botulinum neurotoxins': 'Botulinum neurotoxins',
  'Brucella abortus': 'Brucella abortus',
  'Brucella melitensis': 'Brucella melitensis',
  'Brucella suis': 'Brucella suis',
  'Burkholderia mallei ': 'Burkholderia mallei ',
  'Burkholderia pseudomallei ': 'Burkholderia pseudomallei ',
  'Classical swine fever virus': 'Classical swine fever virus',
  'Conotoxins': 'Conotoxins',
  'Coxiella burnetii': 'Coxiella burnetii',
  'Crimean-Congo haemorrhagic fever virus': 'Crimean-Congo haemorrhagic fever virus',
  'Diacetoxyscirpenol': 'Diacetoxyscirpenol',
  'Eastern Equine Encephalitis virus': 'Eastern Equine Encephalitis virus',
  'Ebola virus': 'Ebola virus',
  'Foot-and-mouth disease virus': 'Foot-and-mouth disease virus',
  'Francisella tularensis': 'Francisella tularensis',
  'Goat pox virus': 'Goat pox virus',
  'Hendra virus': 'Hendra virus',
  'Lassa fever virus': 'Lassa fever virus',
  'Lujo virus': 'Lujo virus',
  'Lumpy skin disease virus': 'Lumpy skin disease virus',
  'Marburg virus': 'Marburg virus',
  'Monkeypox virus': 'Monkeypox virus',
  'Mycoplasma capricolum': 'Mycoplasma capricolum',
  'Mycoplasma mycoides ': 'Mycoplasma mycoides ',
  'Newcastle disease virus': 'Newcastle disease virus',
  'Nipah virus': 'Nipah virus',
  'Peronosclerospora philippinensis ': 'Peronosclerospora philippinensis ',
  'Peste des petits ruminants virus': 'Peste des petits ruminants virus',
  'Phoma glycinicola ': 'Phoma glycinicola ',
  'Ralstonia solanacearum': 'Ralstonia solanacearum',
  'Rathayibacter toxicus': 'Rathayibacter toxicus',
  'Reconstructed 1918 influenza virus': 'Reconstructed 1918 influenza virus',
  'Ricin': 'Ricin',
  'Rickettsia prowazekii': 'Rickettsia prowazekii',
  'Rift Valley fever virus': 'Rift Valley fever virus',
  'Rinderpest virus': 'Rinderpest virus',
  'SARS-associate coronavirus (SARS-CoV)': 'SARS-associate coronavirus (SARS-CoV)',
  'Saxitoxin': 'Saxitoxin',
  'Sclerophthora rayssiae': 'Sclerophthora rayssiae',
  'Sheep pox virus': 'Sheep pox virus',
  'South American Haemorrhagic Fever virus - Chapare': 'South American Haemorrhagic Fever virus - Chapare',
  'South American Haemorrhagic Fever virus - Guanarito': 'South American Haemorrhagic Fever virus - Guanarito',
  'South American Haemorrhagic Fever virus - Junin': 'South American Haemorrhagic Fever virus - Junin',
  'South American Haemorrhagic Fever virus - Machupo': 'South American Haemorrhagic Fever virus - Machupo',
  'South American Haemorrhagic Fever virus - Sabia': 'South American Haemorrhagic Fever virus - Sabia',
  'Staphylococcal enterotoxins A, B, C, D, E subtypes': 'Staphylococcal enterotoxins A, B, C, D, E subtypes',
  'Swine vesicular disease virus': 'Swine vesicular disease virus',
  'Synchytrium endobioticum': 'Synchytrium endobioticum',
  'T-2 toxin': 'T-2 toxin',
  'Tetrodotoxin': 'Tetrodotoxin',
  'Tick-borne encephalitis complex virus - Far Eastern subtype': 'Tick-borne encephalitis complex virus - Far Eastern subtype',
  'Tick-borne encephalitis complex virus - Kyasanur Forest disease subtype': 'Tick-borne encephalitis complex virus - Kyasanur Forest disease subtype',
  'Tick-borne encephalitis complex virus - Omsk Hemorrhagic fever virus subtype': 'Tick-borne encephalitis complex virus - Omsk Hemorrhagic fever virus subtype',
  'Tick-borne encephalitis complex virus - Siberian subtype': 'Tick-borne encephalitis complex virus - Siberian subtype',
  'Variola major virus (Smallpox virus)': 'Variola major virus (Smallpox virus)',
  'Variola minor virus (Alastrim)': 'Variola minor virus (Alastrim)',
  'Venezuelan equine encephalitis virus': 'Venezuelan equine encephalitis virus',
  'Xanthomonas oryzae': 'Xanthomonas oryzae',
  'Yersinia pestis': 'Yersinia pestis',
}

const Identification = {
  title: 'Identification',
  fields: {
    // Autofills to logged in user on setup
    principalInvestigator: {
      type: 'Person',
      label: 'Principal Investigator',
    },
    coInvestigators: {
      // IBC just has this as an array of names.
      type: 'KeyArray', // Maybe PersonArray feature?
      label: 'Co-Investigators',
    },
    additionalContacts: {
      type: 'KeyArray',
      label: 'Additional Contacts',
    },
    keyPersonnel: {
      type: 'KeyArray',
      label: 'Key Personnel',
    },
    hasExternalCollaboration: {
      type: 'Boolean',
      label: `
        Will any individuals not affiliated with OSU (e.g. visiting scientists) be
        involved in the handling of agents in this protocol while at OSU?
      `
    },
    protocolTitle: {
      type: 'Text',
      label: 'Protocol Title',
    },
    academicUnit: {
      type: 'Key',
      label: `
        Select the principal investigator's academic unit.

        - It is important to select the most specific academic unit (which
          could be a division, department, or a college.
        - Select Centers only when the PI is not a faculty member
          (e.g. research scientist).
        - Choosing an incorrect unit will delay unit endorsement.
      `
    },
    // There's a section that lists training status for everyone here.
    // Read-only, shows rDNA general, HGT, rDNA plants, COI, et, LVT, OHR, RCR
    // Asterisk for HGT that reads:
    //  * one module specific to work being conducted is mandatory for personnel working with rDNA.
  }
} as const satisfies PageDefinition;

/**
 * Collection template on External Collaborators page
 */
const ExternalCollaborator: PageDefinition = {
  title: 'Add External Investigator',
  fields: {
    person: {
      type: 'Person',
      label: 'Find an investigator',
      component: {
        name: 'InvestigatorSearchField',
        props: {
          iconName: 'user',
          endpoint: 'https://example.com/api'
        }
      },
    },
    affiliation: {
      type: 'Text',
      label: 'Investigator Affiliation',
    }
  }
}

const ExternalCollaboration: PageDefinition = {
  title: 'External Collaboration',
  description: `
    Please identify all external personnel (not affiliated with OSU)
    and their affiliations.
  `,
  fields: {
    // Table just shows name | affiliation
    externalCollaborators: {
      type: 'Collection',
      label: 'External Collaborators',
      // placeholder: 'You have listed no external collaborators.',
      template: ExternalCollaborator
    }
  }
}

const GettingStarted: PageDefinition = {
  title: 'Getting Started',
  fields: {
    // _Safety.customAttributes.SF_FrontEndQuestions.customAttributes._UseHumanSourceMaterial
    useHumanSourceMaterial: {
      type: 'Boolean',
      label: `
        Will your research involve the use of human source material
        (e.g., primary cells, cell lines, tissues) as the **ONLY** biohazard?
      `,
    },
    useBioHazard: {
      type: 'Boolean',
      label: `
        Will you be using biohazards in your research (virus, bacteria,
        parasite, fungi, human source material, etc.)?
      `,
      // VALIDATION:
      // The answer to the first two questions cannot both be yes. If human source material is your only biohazard then the second question should be no.
      //  cannot be true if useHumanSourceMaterial is.
    },
    useRecombSyntNucAcid: {
      type: 'Boolean',
      label: `
        Will you be using recombinant or synthetic nucleic acids in
        your research?
      `,
    },
    transferDrugResistance: {
      condition: 'useRecombSyntNucAcid',
      type: 'Boolean',
      label: `
        Will the deliberate transfer of drug resistance into organisms
        that do not acquire them naturally be involved? (except for
        approved host-vector systems that contain antibiotic resistance
        markers)
      `,
    },
    transferRecombSyntNucAcid: {
      condition: 'useRecombSyntNucAcid',
      type: 'Boolean',
      label: `
        Will the deliberate transfer of recombinant or synthetic nucleic
        acids into humans be involved?
      `,
    },
    useVertToxinGene: {
      condition: 'useRecombSyntNucAcid',
      type: 'Boolean',
      label: `
        Will genes that produce vertebrate toxins with LD50 less than
        10ng/kg of body weight be used?
      `,
    },
    useHumanAnimalPathogen: {
      condition: 'useRecombSyntNucAcid',
      type: 'Boolean',
      label: `
        Will human or animal pathogens be used as host-vector systems?
      `,
    },
    cloneHumanAnimalPathDNA: {
      type: 'Boolean',
      label: `
        Will human or animal pathogen DNA be cloned into a non-pathogenic
        prokaryote or lower eukaryote? (lentiviral vector systems must
        check "yes")
      `,
    },
    useINfAnimalPlantDNARNA: {
      condition: 'cloneHumanAnimalPathDNA',
      type: 'Boolean',
      label: `
        Will infectious animal or plant DNA or RNA viruses be used in
        tissue culture or will defective viruses in the presence of a
        helper virus be used?
      `,
    },
    alterAnimalGenome: {
      condition: 'cloneHumanAnimalPathDNA',
      type: 'Boolean',
      label: `
        Will an animal genome be altered by recombinant or synthetic
        nucleic acids?
      `,
    },
    testedGenModMicroOrganism: {
      condition: 'cloneHumanAnimalPathDNA',
      type: 'Boolean',
      label: `
        Will viable genetically - modified (with recombinant or
        synthetic nucleic acids) microorganisms be tested in whole
        animals?
      `,
    },
    useGenEngrPlants: {
      condition: 'cloneHumanAnimalPathDNA',
      type: 'Boolean',
      label: `
        Will genetic engineering of plants by rDNA methods or use of
        plants with microorganisms or insects containing recombinant or
        synthetic nucleic acids be involved?
      `,
    },
    involveMoreThan10LCulture: {
      condition: 'cloneHumanAnimalPathDNA',
      type: 'Boolean',
      label: `
        Will experiments involve more than 10 liters of culture?
      `,
    },
    delibReleaseGenModPlantAnimal: {
      condition: 'cloneHumanAnimalPathDNA',
      type: 'Boolean',
      label: `
        Will there be a deliberate release of genetically-modified
        (insertion of recombinant or synthetic nucleic acids) plants
        or animals into the environment?
      `,
    },
    useAnimals: {
      type: 'Boolean',
      label: `
        Will your research involve animals?
      `
    },
    creatingTransgenicAnimal: {
      condition: 'useAnimals',
      type: 'Boolean',
      label: `
        Will you be using or creating transgenic animals or, creating knockout
        animals using transgenic processes, in your research?
      `,
    },
    useHumanClinicalTrial: {
      type: 'Boolean',
      label: `
        Will your research involve the use of biohazards in humans?
      `,
    },
    involveHumanGeneTransfer: {
      type: 'Boolean',
      label: `
        Will your research involve human gene transfer?
      `,
    },
    useHumanStemCell: {
      type: 'Boolean',
      label: `
        Will your research involve the use of human stem cells?
      `,
    },
    createClonePlantPathogen: {
      type: 'Boolean',
      label: `
        Will you be creating plants or plant pathogens using recombinant
        or synthetic nucleic acids or will you be cloning recombinant or
        synthetic nucleic acids from a plant pathogen?
      `,
    },
    useInfectiousAgents: {
      type: 'Boolean',
      label: `
        Does your research involve the use of any of these agents: Avian
        influenza virus (highly pathogenic), Bacillus anthracis, Botulinum
        neurotoxin (any quantities), Burkholderia mallei, Burkholderia
        pseudomallei, Ebola virus, Foot-and-mouth disease virus,
        Francisella tularensis, Marburg virus, Reconstructed 1918
        influenza virus, Rinderpest virus, Toxin-producing strains of
        Clostridium botulinum, Variola major virus, Variola minor virus,
        or Yersinia pestis?
      `,
    },
  }
}

export const Summary: PageDefinition = {
  title: 'Descriptive Summary',
  fields: {
    summary: {
      type: 'Text',
      label: `
        Using non technical language, provide the following information in context
        so that the Committee can make an appropriate risk assessment of your research
        project (please do not copy and paste grant information to this section):

        1. Provide a brief synopsis of the goals for the proposed research.
        2. Provide a brief description of the laboratory procedures that will be used
          to achieve the goals for the proposed research; this must include descriptions
          of how any biohazards, rDNA, and/or animals are being used in those laboratory
          procedures. Simply listing laboratory procedures is not sufficient.
        3. Discuss the specific risks associated with all biohazards/rDNA described in
          this protocol and detail what will be implemented to mitigate these risks
          (i.e. engineering controls, work practices, types of PPE required,
          vector design, etc.). Risks and risk mitigation strategies should cover both
          study team members and animal care staff if applicable. Generic statements,
          such as "BSL2 practices will be used" or "appropriate PPE will be used" are
          not sufficient; the specific practices relevant to the proposed research
          should be briefly described.  Waste disinfection and/or disposal should also
          be briefly described.
          For animal work, the PI must include details related to housing, manipulation
          and transportation within dedicated animal facilities. Information that
          should be provided is described in Appendix B in  the IBC Guidance Document
          http://orrp.osu.edu/files/2011/10/IBC-Guidance-Document.pdf.
        4. Please list any approved or pending protocols (IACUC, IRB, or other IBC) that
          are associated with this research protocol.

        All four sections are required, and the submission will be returned if not
        complete. Please see the IBC Guidance Document for additional descriptions
        of requirements for each section:
        http://orrp.osu.edu/files/2011/10/IBC-Guidance-Document.pdf
      `
    }
  }
}

/**
 * Collection template on Funding page
 */
const Sponsor: PageDefinition = {
  title: 'Edit Sponsor',
  fields: {
    name: {
      type: 'Text',
      label: 'Sponsor',
    },
    awardNo: {
      type: 'Text',
      label: `
        OSU Sponsored Program Proposal or Award Number
      `
    },
    researchPlanFiles: {
      type: 'Attachment',
      label: `
        Upload a copy of the research plan included in the grant application or
        funding proposal.

        For NIH funded studies, the research plan should include the specific aims,
        research  strategy and vertebrate animals sections.
      `
    }
  }
}

/**
 * Collection template on Funding page
 */
const ExternalSupportProvider: PageDefinition = {
  title: 'Edit External Support Provider',
  fields: {
    name: {
      type: 'Text',
      label: 'External Support Provider Name',
    },
    support: {
      type: 'Text',
      label: 'Type of Support Provided'
    },
  }
}

const Funding: PageDefinition = {
  title: 'Funding / Sponsor Information',
  description: `
    Sponsors require the university to verify that the IBC has reviewed funding
    proposals and grants before funds are awarded. Sponsor information is also
    needed to implement the university's conflict of interest policy.
  `,
  fields: {
    hasExternalFunding: {
      type: 'Boolean',
      label: `
        Is the research externally funded or have external funds been requested? (if known)
      `
    },
    sponsors: {
      condition: 'hasExternalFunding',
      type: 'Collection',
      label: 'Sponsor(s)',
      // template is Sponsor Name | OSURF Proposal/Project No
      template: Sponsor
    },
    hasExternalSupport: {
      type: 'Boolean',
      label: `
        Is any external support other than monetary (e.g. drugs, equipment, etc.)
        being provided for the study?
      `
    },
    externalSupport: {
      condition: 'hasExternalSupport',
      type: 'Collection',
      label: 'External Support Provider(s)',
      // Table is: External Support Provider | Type of Support Provided
      template: ExternalSupportProvider,
    }
  }
}

const ProceduresAndLocations: PageDefinition = {
  condition: 'useAnimals or useHumanSourceMaterial or useBioHazard',
  title: 'Procedures and Locations',
  fields: {
    procedures: {
      type: 'KeyArray',
      label: 'General Lab Procedures',
      choices: {
        'Centrifuging': 'Centrifuging',
        'Pipetting': 'Pipetting',
        'Virus Work': 'Virus Work',
        'Xenografting': 'Xenografting',
        'DNA/RNA Extraction': 'DNA/RNA Extraction',
        'Tissue Culture': 'Tissue Culture',
        'Culturing Microorganisms': 'Culturing Microorganisms',
        'Not Applicable (Clinical Work Only)': 'Not Applicable (Clinical Work Only)',
        'Other': 'Other',
      },
    },
    otherProcedures: {
      condition: '"Other" in procedures',
      type: 'Text',
      label: 'Please specify the other lab procedures here',
    },
    locations: {
      type: 'KeyArray',
      label: 'Where does this research occur?',
      choices: {
        'Research Lab': 'Research Lab',
        'Clinical Setting': 'Clinical Setting',
        'Animal Facility': 'Animal Facility',
        'Greenhouse / Growth Chamber': 'Greenhouse / Growth Chamber',
        'Field Trial': 'Field Trial',
      }
    }
  }
}

/**
 * Reusable field for selecting biosafety levels for locations
 */
const BiosafetyLevelField: FieldDefinition = {
  type: 'KeyArray',
  label: 'Approved Biosafety Level',
  choices: {
    BSL1: `
      **BSL1** - Suitable for work involving well-characterized agents not known
      to consistently cause disease in healthy adult humans, and of minimal potential
      hazard to laboratory personnel and the environment.
    `,
    BSL2: `
      **BSL2** - Suitable for work involving agents of moderate potential hazard
      to personnel and the environment. Includes the use of Universal Precautions
      in all clinical settings.
    `,
    BSL3: `
      **BSL3** - Suitable for work involving indigenous or exotic agents that may
      cause serious or potentially lethal disease through inhalation route exposure.
    `,
    // TODO: These links are 404'd (and still in eProtocol)
    BSL1P: `
      **BSL1-P** - http://osp.od.nih.gov/office-biotechnology-activities/biosafety/nih-guidelines?(See Appendix L)
    `,
    BSL2P: `
      **BSL2-P** - http://osp.od.nih.gov/office-biotechnology-activities/biosafety/nih-guidelines?(See Appendix L)
    `,
    BSL3P: `
      **BSL3-P** - http://osp.od.nih.gov/office-biotechnology-activities/biosafety/nih-guidelines?(See Appendix L)
    `
  }
}

/** Collection template for LocationsContinued */
const ResearchLab: PageDefinition = {
  condition: 'useAnimals',
  title: 'Research Lab',
  fields: {
    building: {
      type: 'Key',
      label: 'Building',
      // this is a search against known OSU buildings.
      // E.g. 1216 Kinnear Road, 300 W. Tenth Ave
    },
    room: {
      type: 'Text',
      label: 'Room number',
      description: 'Include building name if "Other" is selected above'
    },
    lastInspectionDate: {
      type: 'Date',
      label: 'Most Recent Inspection Date',
    },
    needsInspection: {
      type: 'Boolean',
      label: 'Needs Initial Inspection',
      // VALIDATION: if lastInspectionDate is empty.
    },
    approvedBiosafetyLevel: {
      ...BiosafetyLevelField,
      label: 'Approved Biosafety Level',
    }
  },
}

/** Collection template for LocationsContinued */
const ClinicalSetting: PageDefinition = {
  title: 'Clinical Setting',
  fields: {
    building: {
      type: 'Key',
      label: 'Building',
      // this is a search against known OSU buildings.
      // E.g. 1216 Kinnear Road, 300 W. Tenth Ave
      // Might be the same as ResearchLab building list.
    },
    otherBuilding: {
      type: 'Text',
      label: 'Other building'
    }
  }
}

/** Collection template for LocationsContinued */
const AnimalHousing: PageDefinition = {
  title: 'Animal Housing',
  fields: {
    building: {
      type: 'Key',
      label: 'Building',
      // this is a search against known OSU buildings.
      // E.g. 1216 Kinnear Road, 300 W. Tenth Ave
      // Might be the same as ResearchLab building list.
    },
    room: {
      type: 'Text',
      label: 'Room number',
      description: `
        Include building name if "Other" is selected above
      `
    }
  }
}

/** Collection template for LocationsContinued */
const Greenhouse: PageDefinition = {
  title: 'Greenhouse / Growth Chamber',
  fields: {
    building: {
      type: 'Key',
      label: 'Building',
      // this is a search against known OSU buildings.
      // E.g. 1216 Kinnear Road, 300 W. Tenth Ave
      // Might be the same as ResearchLab building list.
    },
    room: {
      type: 'Text',
      label: 'Room number',
      description: `
        Include building name if "Other" is selected above
      `
    },
    aphisPermit: {
      type: 'Text',
      label: `
        APHIS Permit Number (if applicable)
      `
      // optional
    },
    recentInspectionDate: {
      type: 'Date',
      label: 'Most Recent Inspection Date',
    },
    biosafetyLevel: {
      ...BiosafetyLevelField,
      label: 'Biosafety Level',
    }
  }
}

/** Collection template for LocationsContinued */
const FieldTrialSite: PageDefinition = {
  title: 'Field Trial Site',
  fields: {
    location: {
      type: 'Text',
      label: 'Location',
    },
    aphisPermit: {
      type: 'Text',
      label: 'APHIS Permit #'
    }
  }
}

const LocationsContinued: PageDefinition = {
  condition: 'useAnimals or useHumanSourceMaterial or useBioHazard',
  title: 'Locations / Research Sites',
  // This is conditional based on whether we selected one or more locations.
  // It looks like each one creates a subsection with a collection entry.
  // Each one requires at least one entry.
  fields: {
    laboratories: {
      type: 'Collection',
      label: 'Research Laboratories',
      // Table: Building | Room Number | Last Inspection Date
      // Note that BSL levels are NOT displayed in the table currently.
      template: ResearchLab,
    },
    clinics: {
      type: 'Collection',
      label: 'Clinical Settings',
      // Table: Building
      template: ClinicalSetting,
    },
    animalHousings: {
      type: 'Collection',
      label: 'Animal Housings',
      // Table: Building | Room Number
      template: AnimalHousing,
    },
    greenhouses: {
      type: 'Collection',
      label: 'Greenhouses / Growth Chambers',
      // Table: Building | Room Number | APHIS Permit Number | Last Inspection Date
      // BSL is missing here as well.
      template: Greenhouse,
    },
    fieldTrialSites: {
      type: 'Collection',
      label: 'Field Trial Sites',
      // Table: Location, APHIS Permit
      template: FieldTrialSite,
    }
  }
}

/** Collection page for Safety Equipment page */
const BiosafetyCabinet: PageDefinition = {
  title: 'Biosafety Cabinet',
  fields: {
    building: {
      type: 'Key',
      label: 'Building',
      // TODO: this is a search against known OSU buildings.
      // E.g. 1216 Kinnear Road, 300 W. Tenth Ave
    },
    room: {
      type: 'Text',
      label: 'Room',
    },
    lastCertifiedDate: {
      type: 'Date',
      label: 'Date last certified',
    },
    needsInitialCertification: {
      type: 'Boolean',
      label: 'Needs initial certification',
      // required if !lastCertifiedDate
    },
    manufacturer: {
      type: 'Text',
      label: 'Manufacturer',
      description: `
        NOTE: Pertinent information can be found on the biosafety
        cabinet data place, the certification report and/or the
        certification sticker.
      `,
      // optional
    },
    modelNumber: {
      type: 'Text',
      label: 'Model Number',
      // optional
    },
    serialNumber: {
      type: 'Text',
      label: 'Serial Number',
      // optional
    }
  }
}

const SafetyEquipment = {
  condition: 'useBioHazard',
  title: 'Safety Equipment',
  fields: {
    hasCentrifuge: {
      type: 'Boolean',
      label: `
        Does the laboratory contain a centrifuge with aerosol-proof safety cup/rotors?
      `,
    },
    hasBiosafetyCabinet: {
      type: 'Boolean',
      label: `
        Does the laboratory contain a biosafety cabinet (BSC)?
      `
    },
    biosafetyCabinets: {
      condition: 'hasBiosafetyCabinet',
      type: 'Collection',
      // table: Building | Room No | Model No | Serial No | Manufacturer | Certification Date
      label: 'Biosafety Cabinet(s)',
      template: BiosafetyCabinet,
    }
  }
} as const satisfies PageDefinition;

const RodentGeneTransfer: PageDefinition = {
  condition: 'useAnimals',
  title: 'Rodent Gene Transfer: DNA Source',
  fields: {
    // NOTE: Field names come from IBC form
    // e.g. Safety.customAttributes.SF_RodentGeneTransfer.customAttributes._TransGeneDescr_text
    transGeneDescr: {
      type: 'Text',
      label: `
        Provide a brief description of the transgene and remaining vector sequences:
      `
    },
    purchaseBreedObtainTransRodent: {
      type: 'Text',
      label: `
        Will you be purchasing, breeding or obtaining transgenic rodents from an
        external laboratory or have you done so in the past?
      `
    },
    createTransStrain: {
      type: 'Boolean',
      label: `
        Will this project involve creating a transgenic strain on the OSU campus
        at a BSL-1 containment level?
      `,
      description: `
        Creating does not include purchasing, breeding or obtaining from an
        external laboratory
      `
    },
    DNASource: {
      type: 'KeyArray',
      label: 'What is the source of DNA?',
      choices: {
        Human: 'Human',
        Plant: 'Plant',
        Animal: 'Animal',
      }
    },
    humanAnimalPathogenUsed: {
      type: 'Boolean',
      label: `
        Are human or animal pathogens to be used as host-vector system?
      `
    },
    useVirus: {
      type: 'Boolean',
      label: 'Does this experiment use viruses?',
    }
  }
}

const RodentGeneTransferTransgenic: PageDefinition = {
  condition: 'useAnimals',
  title: 'Rodent Gene Transfer (Transgenic)',
  fields: {
    scientificProbQuest: {
      type: 'Text',
      label: `
        Please describe the scientific problem/question to be addressed and
        provide sufficient information to determine the scope of the research.
        Describe why it is necessary to generate transgenic rodents to conduct
        this research. Include goals of the project and procedures to be used.
        Include information as to how the project relates to the NIH Guidelines
        for Research Involving Recombinant DNA Molecules.
      `
    },
    alterationOfGermLine: {
      type: 'Boolean',
      label: `
        Does this study involve the alteration of the germ line of the animal?
      `
    },
    howDNAIntroduced: {
      type: 'Text',
      label: `
        How will DNA be introduced?
      `
    }
  }
}

const RodentGeneTransferViruses: PageDefinition = {
  condition: 'useAnimals',
  title: 'Rodent Gene Transfer (Viruses)',
  fields: {
    // _Safety.customAttributes.SF_RodentGeneTransfer.customAttributes._FormOfRDNAMol
    formOfRDNAMol: {
      type: 'Boolean',
      label: `
        Do the experiments involve formation of rDNA molecules containing
        two-thirds of the genome of any eukaryotic viruses of the same family?
      `
    },
    useHumanAnimalVirus: {
      type: 'Boolean',
      label: `
        Do the experiments involve the use of infectious human or animal viruses?
      `
    },
    useDefHumanAnimalVirus: {
      type: 'Boolean',
      label: `
        Do the experiments involve the use of a defective human or animal virus
        in the presence of a helper virus?
      `
    }
  }
}

export const RDNASection1: PageDefinition = {
  condition: 'useAnimals',
  title: 'rDNA: Description of Work',
  fields: {
    // _Safety.customAttributes.SF_ExemptRDNAWork.customAttributes._GeneActivityDescr_text
    geneActivityDescr: {
      type: 'Text',
      label: `
        For each experiment, list genes, inserts, gene products and key regulatory elements
        to be cloned. Provide a brief description of gene activity and indicate the
        species of origin for each. (Provide an explanation of any acronyms).
      `
    },
    vectors: {
      type: 'Text',
      label: `
        Describe all vectors (plasmids, viruses, RNA/DNA constructs) to be used (provide
        written description and include a map in available).
      `
    },
    vectorMapFiles: {
      type: 'Attachment',
      label: 'Upload Vector Map',
    },

    // This next set is kind of a weird sub-grouping. So I'm adding it as a new section.
    _hostSystems: {
      type: 'Section',
      label: 'Host system(s)',
      description: `
        For each experiment identify all applicable host system(s) to be used
      `
    },

    pkgSystems: {
      type: 'Text',
      label: 'Packaging system(s)',
    },
    microbes: {
      type: 'Text',
      label: 'Microbes (if E. coli, please indicate if K-12)',
      description: 'Identify Genus and Species'
    },
    tissueCellCulture: {
      type: 'Text',
      label: 'Tissue/Cell Cultures',
      description: 'List source and cell type (human, Mouse, Plant, insect, etc.).',
    },
    plantAnimal: {
      type: 'Text',
      label: 'Plant/Animal',
      description: 'Identify Genus and Species.'
    }
  }
}

const HumanSourceMaterialSection1: PageDefinition = {
  condition: 'useHumanSourceMaterial',
  title: 'Human Source Material',
  description: `
    AMONITION:
    Biocontainment Level NOTICE:
    All work with human source material, including established cell lines, must be done at BSL2.
  `,
  fields: {
    humanSourceMaterialTypes: {
      type: 'KeyArray',
      label: 'Type of Human Source Material',
      choices: {
        'Blood': 'Blood',
        'Established Cell Lines': 'Established Cell Lines',
        'Organs': 'Organs',
        'Primary Cells': 'Primary Cells',
        'Tissues': 'Tissues',
        'Tumor Cells': 'Tumor Cells',
        'Other': 'Other',
      }
    },
    otherHumanSourceMaterial: {
      condition: '"Other" in humanSourceMaterialTypes',
      type: 'Text',
      label: 'Other - human source material',
    }
  }
}

const ExposureAssessmentAndPPE: PageDefinition = {
  condition: 'useHumanSourceMaterial',
  title: 'Exposure Assessment and PPE',
  fields: {
    exposureAssessment: {
      type: 'Text',
      label: `
        If a loss of containment or spill of the agent were to occur and humans, animals
        or plants in the immediate or surrounding area were exposed, please describe
        possible occupational and environmental consequences (i.e. symptoms in affected
        persons/animals, impact on plants, crops, and livestock in surrounding areas, etc.)
      `
    },
    PPE: {
      type: 'KeyArray',
      label: `
        Indicate the Personal Protective Equipment (PPE) that will be used
      `,
      choices: {
        'Gowns': 'Gowns',
        'Lab Coats': 'Lab Coats',
        'Shoe Covers': 'Shoe Covers',
        'Booties': 'Booties',
        'Gloves': 'Gloves',
        'Eyewear': 'Eyewear',
        'Respirators': 'Respirators',
        'Other': 'Other',
      }
    },
    otherPPE: {
      condition: '"Other" in PPE',
      type: 'Text',
      label: 'Other (specify)',
    }
  }
}

const DualUseDetermination: PageDefinition = {
  condition: 'useHumanSourceMaterial',
  title: 'Dual Use Determination',
  fields: {
    // _Safety.customAttributes.SF_rDNABioHazardCommon.customAttributes._HarmfulConsequences
    harmfulConsequences: {
      type: 'Boolean',
      label: `
        Will the proposed work enhance harmful consequences of a biological agent or toxin?
      `
    },
    disruptImmunity: {
      type: 'Boolean',
      label: `
       Will the proposed work disrupt immunity or the effectiveness of an immunization without
       clinical and/or agricultural justification?
      `
    },
    conferToBioAgent: {
      type: 'Boolean',
      label: `
        Will the proposed research confer to a biological agent or toxin, resistance to clinically
        and/or agriculturally useful prophylactic or therapeutic interventions against
        that agent or toxin, or facilitate their ability to evade detection methodologies?
      `
    },
    increasedStability: {
      type: 'Boolean',
      label: `
        Will the proposed research increase the stability, transmissibility or the ability
        to disseminate a biological agent or toxin?
      `
    },
    alterHostRange: {
      type: 'Boolean',
      label: `
      Will the proposed research alter the host range or tropism of a biological agent or toxin?
      `
    },
    enhancedSusceptibility: {
      type: 'Boolean',
      label: `
        Will the proposed research enhance the susceptibility of a host population?
      `
    },
    generateNovelPathAgent: {
      type: 'Boolean',
      label: `
        Will the proposed research generate a novel pathogenic agent or toxin, or reconstitute
        an eradicated or extinct biological agent?
      `
    },
  }
}

const OccupationalHealthRiskGroups: PageDefinition = {
  title: 'Occupational Exposure Assessment and Risk Groups',
  // _webrRequired__Safety.customAttributes.SF_rDNABioHazardCommon.customAttributes._OHA
  fields: {
    OHA: {
      type: 'KeyArray',
      label: `
        Check all practices and procedures that may result
        in occupational exposures.
      `,
      choices: {
        'Injection/needlestick': 'Injection/needlestick',
        'Inhalation': 'Inhalation',
        'Splash': 'Splash',
        'Ingestion': 'Ingestion',
        'Cut/Abrasion': 'Cut/Abrasion',
        'Other': 'Other',
      }
    },
    otherPPE: {
      condition: '"Other" in OHA',
      type: 'Text',
      label: 'Other (specify)',
    },
    highestRiskGroup: {
      type: 'KeyArray',
      label: 'Highest Risk Group',
      choices: {
        RG1: `
          Risk Group 1 (RG1)
          Agents that are not associated with disease in healthy adult humans
        `,
        RG2: `
          Risk Group 2 (RG2)
          Agents that are associated with human disease that is rarely serious and
          for which preventative of therapeutic interventions are often available.
          All human source material (including blood, cell lines and other potentially
          infectious materials) are considered RG2.
        `,
        RG3: `
	        Risk Group 3 (RG3)
          Agents associated with serious or lethal human disease for which preventative
          or therapeutic interventions may be available (high individual risk but
          low community risk)
        `
      }
    },
    bioContainmentLevel: {
      ...BiosafetyLevelField,
      label: 'Appropriate Biocontainment Level',
    }
  }
}

const NIHSectionDesignation: PageDefinition = {
  title: 'NIH Section Designation',
  fields: {
    a: {
      type: 'KeyArray',
      label: `
        Check the appropriate Section III registration category for your experiment.
      `,
      description: 'Check all that apply',
      // TODO: Bit complex, there's choices nested in choices here.
      // But the child choices don't seem to impact the parents selection.
      choices: {
        // Choice keys from eProtocol
        // _Safety.customAttributes.SF_rDNAInfo.customAttributes._ReqIBCRACNIH
        ReqIBCRACNIH: 'A. Experiments that require IBC approval and NIH Director approval before initiation',
        ReqNIHOBAIBC: 'B. Experiments that require NIH OSP and IBC approval before initiation',
        ReqIBCIRBRAC: 'C. Experiments involving Human Gene Transfer that require IBC approval prior to initiation',
        ReqIBC: 'D. Experiments that require IBC approval before initiation (please indicate below)',
        UsingRG234: 'D 1. Experiments using Risk Group 2, 3, 4 or restricted agents and host-vector systems',
        RecombSyntNucAcidRiskRG234: 'D 2. Experiments in which DNA from Risk Group 2, 3, 4 or restricted agents is cloned into non-pathogenic prokaryotic or lower eukaryotic host-vector systems',
        UseInfDNARNA: 'D 3. Experiments involving the use of infectious or defective DNA or RNA viruses in the presence of helper virus in tissue culture systems',
        InvolveWholeAnimals: 'D 4. Experiments involving whole animals',
        InvolveIBCWholePlants: 'D 5. Experiments involving whole plants',
        MoreThan10LCulture: 'D 6. Experiments involving more than 10L of culture',
        InvolveInfluenza: 'D 7. Experiments involving Influenza viruses',
        ReqIBCNotice: 'Experiments that require IBC notice simultaneous with initiation (please indicate below)',
        InvolveRecombDNAMol: 'E 1. Experiments involving the formation of recombinant DNA molecules containing no more than two-thirds of the genome of any eukaryotic virus',
        InvolveWholePlants: 'E 2. Experiments involving whole plants',
        InvolveTransgenRodent: 'E 3. Experiments involving transgenic rodents',
        ExemptExperiment: 'Exempt Experiment',
      }
    },
    pctGenomeVectors: {
      type: 'KeyArray',
      label: 'Viral Vectors: Percentage of viral genome',
      description: 'Check at least one',
      choices: {
        'Greater than two-thirds': 'Greater than two-thirds',
        'Less than two-thirds': 'Less than two-thirds',
        'na': 'Viral Vectors are not being used in this research',
      }
    },
    docs: {
      type: 'Attachment',
      label: 'If available, upload map and/or other spporting document(s)'
    }
  }
}

// Page depends on Getting Started useBioHazard question
const BiohazardIdentification: PageDefinition = {
  condition: 'useBioHazard',
  title: 'Biohazard Identification',
  description: `
    Identify all biohazards to be used in this Protocol. List each biohazard
    in the appropriate box (include genus, species, strain, subtype, as applicable)
  `,
  fields: {
    virus: {
      type: 'Text',
      label: 'Virus',
    },
    bacteria: {
      type: 'Text',
      label: 'Bacteria',
    },
    rickettsiae: {
      type: 'Text',
      label: 'Rickettsiae',
    },
    fungi: {
      type: 'Text',
      label: 'Fungi',
    },
    toxin: {
      type: 'Text',
      label: 'Toxin',
    },
    parasite: {
      type: 'Text',
      label: 'Parasite',
    },
    humanSourceMaterial: {
      type: 'Text',
      label: 'Human Source Material',
    },
    agent: {
      type: 'Key',
      label: 'Select Agent',
      choices: Agents,
    },
    additionalAgent: {
      type: 'Key',
      label: 'Select Additional Agent',
      choices: Agents,
    }
  }
}

const HGTIRBApproval: PageDefinition = {
  condition: 'useHumanClinicalTrial',
  title: 'HGT / Human Clinical Trial: IRB Approval',
  fields: {
    irbProtocol: {
      // TODO: this can be a lookup integration point.
      type: 'Text',
      label: 'IRB Protocol # (if obtained)',
      // optional field
    },
    irbProtocolPendingApproval: {
      type: 'Boolean',
      label: 'Pending Approval',
    },
    irbProtocolFiles: {
      type: 'Attachment',
      label: `
        Attach the proposed clinical protocol describing the work to be conducted.
      `,
      description: `
        For Human Gene Transfer (HGT) Trials:

        Attach a RAC approval letter if obtained prior to the change in NIH requirements in
        August 2018; or if no RAC letter is available, the study sponsor or investigator
        should provide an attestation that the study does not involve any of the three
        criteria outlined below.

        1. Does the protocol use a new vector, genetic material or delivery system for first-in-man testing,
        2. Does the protocol rely on preclinical safety data obtained using a new preclinical model system
          of unknown and unconfirmed value, or
        3. Is the vector, gene construct, or delivery system associated with toxicities that aren't widely
          known and that may render it difficult for an oversight body to evaluate the protocol rigorously?
      `
    }
  }
}

const HGTDescription: PageDefinition = {
  condition: 'useHumanClinicalTrial',
  title: 'HGT / Human Clinical Trial: Description',
  fields: {
    hgtSummary: {
      type: 'Text',
      label: `
        Provide a brief summary of pre-clinical and clinical studies relevant to
        the biosafety concerns associated with this project.
      `
    }
  }
}

const HGTMonitoring: PageDefinition = {
  condition: 'useHumanClinicalTrial',
  title: 'HGT / Human Clinical Trial: Monitoring Procedures',
  fields: {
    hgtMonitoring: {
      type: 'Text',
      label: `
        Describe specific procedures for clinical monitoring of the
        biohazard used in this protocol.
      `
    }
  }
}

const HGTMonitoringCriteria: PageDefinition = {
  condition: 'useHumanClinicalTrial',
  title: 'HGT / Human Clinical Trial:  Monitoring Criteria',
  fields: {
    hgtMonitoringCriteria: {
      type: 'Text',
      label: `
        Describe the decisions to be made as result of the monitoring process
        (i.e. provisions to stop the study early for unanticipated problems).
      `
    }
  },
}

const HGTRisk: PageDefinition = {
  condition: 'useHumanClinicalTrial',
  title: 'HGT / Human Clinical Trial:  Risk/Benefit Ratio',
  fields: {
    hgtRisk: {
      type: 'Text',
      label: `
        Discuss the risk/benefit ratio, particulary for subjects without
        immediate life-threatening disease.
      `
    }
  }
}

const HGTMaterials: PageDefinition = {
  condition: 'useHumanClinicalTrial',
  title: 'HGT / Human Clinical Trial: Materials',
  fields: {
    sopFiles: {
      type: 'Attachment',
      label: `
        Attach all relevant standard operating procedures (SOPs).
        (e.g. pharmacy preparation, transport, etc.)
      `,
      // optional
    },
    informedConsentFiles: {
      type: 'Attachment',
      label: `
        Attach informed consent document
      `
    },
    brochureFiles: {
      type: 'Attachment',
      label: 'Attach investigator brochure',
    }
  }
}


const SpeciesChoices: ChoicesList = {
  'Mouse, Standard (Mus Musculus)': 'Mouse, Standard (Mus Musculus)',
  'Rat, Standard (Rattus Norvegicus)': 'Rat, Standard (Rattus Norvegicus)',
  'Rabbit (Oryctolagus sp)': 'Rabbit (Oryctolagus sp)',
  'Pig (Sus Scrofa)': 'Pig (Sus Scrofa)',
  'Amphibian': 'Amphibian',
  'Bat': 'Bat',
  'Birds': 'Birds',
  'Poultry': 'Poultry',
  'Camelid': 'Camelid',
  'Cat': 'Cat',
  'Chinchilla': 'Chinchilla',
  'Cow': 'Cow',
  'Dog': 'Dog',
  'Ferret': 'Ferret',
  'Fish': 'Fish',
  'Gerbil': 'Gerbil',
  'Goat': 'Goat',
  'Guinea Pig': 'Guinea Pig',
  'Hamster': 'Hamster',
  'Horse': 'Horse',
  'Lemming': 'Lemming',
  'Mouse, Deer': 'Mouse, Deer',
  'Mouse, Grasshopper': 'Mouse, Grasshopper',
  'Mouse, white-footed (Peromyscus leucopus)': 'Mouse, white-footed (Peromyscus leucopus)',
  'Nonhuman Primate': 'Nonhuman Primate',
  'Opossum': 'Opossum',
  'Pony': 'Pony',
  'Raccoon': 'Raccoon',
  'Rat, Grass': 'Rat, Grass',
  'Rat, Cotton': 'Rat, Cotton',
  'Rat, Naked Mole': 'Rat, Naked Mole',
  'Reptile': 'Reptile',
  'Rat, Rice': 'Rat, Rice',
  'Sheep': 'Sheep',
  'Squirrel': 'Squirrel',
  'Vole': 'Vole',
  'Other': 'Other',
}

const Animals: PageDefinition = {
  condition: 'useAnimals',
  title: 'Animals',
  fields: {
    species: {
      type: 'KeyArray',
      label: 'Identify species (check all that apply)',
      choices: SpeciesChoices,
    },
    otherSpecies: {
      condition: '"Other" in species',
      type: 'Text',
      label: 'Other (specify)',
    },
    hasImmunocompromisedAnimals: {
      type: 'Boolean',
      label: `
        Are the animals used in the experiment immunocompromised?
      `
    },
    exposureRisks: {
      type: 'KeyArray',
      label: `
        Which of the following present exposure risks to the investigator or animal care personnel?
        (check at least one)
      `,
      choices: {
        'Aerosols': 'Aerosols',
        'Animal Bite/Scratch': 'Animal Bite/Scratch',
        'Bedding': 'Bedding',
        'Blood': 'Blood',
        'Contact with lesions on the animal': 'Contact with lesions on the animal',
        'Feces': 'Feces',
        'Mucous membrane contact with secretions or excretions': 'Mucous membrane contact with secretions or excretions',
        'Saliva': 'Saliva',
        'Urine': 'Urine',
        'Other': 'Other',
        'None Apply': 'None Apply',
      }
    },
    otherExposureRisks: {
      condition: '"Other" in exposureRisks',
      type: 'Text',
      label: 'Other (specify)',
    },
  }
}

const StemCellHumanMaterials: PageDefinition = {
  condition: 'useHumanStemCell',
  title: 'Stem Cells:  Human Materials and Origin of Cells',
  fields: {
    involvedHumanMaterials: {
      type: 'KeyArray',
      label: 'Check all human materials involved in the project',
      choices: {
        'Adult Stem Cells': 'Adult Stem Cells',
        'Embryonic Stem Cells': 'Embryonic Stem Cells',
        'Fetal Tissue/Cells': 'Fetal Tissue/Cells',
        'Cord Blood Stem Cells': 'Cord Blood Stem Cells',
        'Somatic Cells': 'Somatic Cells',
        'Embryos': 'Embryos',
        'Oocytes': 'Oocytes',
        'Sperm': 'Sperm',
        'Other': 'Other',
      }
    },
    otherHumanMaterials: {
      condition: '"Other" in involvedHumanMaterials',
      type: 'Text',
      label: 'Other (specify)',
    },
    stemCellOrigins: {
      type: 'Text',
      label: `
        List the origin of each stem cell line and the NIH code, if applicable
      `
    }
  }
}

const StemCellEmbryonics: PageDefinition = {
  condition: 'useHumanStemCell',
  title: 'Stem Cells: New or Embryonic Cells',
  fields: {
    // _Safety.customAttributes.SF_StemCell.customAttributes._DerivationOfAdultStemCell
    derivationOfAdultStemCell: {
      type: 'Boolean',
      label: `
        Will the proposed research use newly isolated stem cells or involve
        the derivation of new adult stem cell lines?
      `
    },
    tissueOriginIRBNum: {
      condition: 'derivationOfAdultStemCell',
      type: 'Text',
      label: `
        Please list tissue(s) of origin and the IRB approval number for tissue procurement.
      `
    },

    useHumanEmbryonicStemCell: {
      type: 'Boolean',
      label: `
        Will the proposed research involve the use of human embryonic stem cells?
      `
    },
    whyUseHumanEmbryonicStemCell: {
      condition: 'useHumanEmbryonicStemCell',
      type: 'Text',
      label: `
        Why are human embryonic stem cells, rather that non-human embryonic stem
        cells, necessary for use in this research?
      `
    },
    whyHumanEmbryonicStemCellPreferable: {
      condition: 'useHumanEmbryonicStemCell',
      type: 'Text',
      label: `
        Why is the use of human embryonic stem cell preferable to the use of
        adult stem cells in this research?
      `
    },
    precedingAnimalWork: {
      condition: 'useHumanEmbryonicStemCell',
      type: 'Text',
      label: `
        What type of animal work has preceded the proposed work involving human stem cells?
      `
    }
  }
}

const StemCellPluripotentOrNeuralProgenitors: PageDefinition = {
  condition: 'useHumanStemCell',
  title: 'Stem Cells: Pluripotent or Neural Progenitor Cells',
  fields: {
    // _Safety.customAttributes.SF_StemCell.customAttributes._IntroOfPluripotent
    introOfPluripotent: {
      type: 'Boolean',
      label: `
        Will the proposed research involve introduction of human embryonic/pluripotent
        stem cells into non-human animals?
      `
    },
    provideSciRationaleOfPluripotent: {
      condition: 'introOfPluripotent',
      type: 'Text',
      label: `
        Please provide the scientific rationale for introduction of human pluripotent
        stem cells into non-human animals, and evaluate the probable pattern and effects
        of differentiation and integration of the human cells into the non-human
        animal tissues.
      `
    },

    introOfHumanNeuralProgenitor: {
      type: 'Boolean',
      label: `
        Will the proposed research involve the introduction of human neural
        progenitor cells into the brain of non-human animals?
      `
    },
    provideSciRationaleOfProgenitor: {
      condition: 'introOfHumanNeuralProgenitor',
      type: 'Text',
      label: `
        Please provide the scientific rationale for introduction of human
        neural progenitor cells into the brain of non-human animals and
        evaluate the probable pattern and effects of differentiation and
        integration of the human cells into the non-human animal tissues.
      `
    },
  }
}

const StemCellHumanCells: PageDefinition = {
  condition: 'useHumanStemCell',
  title: 'Stem Cells: Human Cell Use',
  fields: {
    // _Safety.customAttributes.SF_StemCell.customAttributes._HumanOocytesProcured
    humanOocytesProcured: {
      type: 'Boolean',
      label: `
        Will human oocytes be procured in the course of the proposed studies?
      `
    },
    provideSciRationaleOfOocytes: {
      condition: 'introOfPluripotent',
      type: 'Text',
      label: `
        Provide an acceptable scientific rationale for the need to use oocytes,
        including a justification for the number needed.
      `
    },
    somaticNuclearTransfer: {
      condition: 'introOfPluripotent',
      type: 'Text',
      label: `
        If somatic nuclear transfer is proposed, provide a justification for the use of this procedure.
      `
    },

    useFertilizedOocytes: {
      type: 'Boolean',
      label: `
        Will fertilized human oocytes, human blastomeres, human blastocytes or human embryos
        be used in the course of the proposed studies?
      `
    },
    provideSciRationaleFertilizedOocytes: {
      condition: 'useFertilizedOocytes',
      type: 'Text',
      label: `
        Provide an acceptable scientific rationale for the need to use fertilized human
        oocytes, human blastomeres, human blastocysts or human embryos, including
        justification for the number needed.
      `
    },
  }
}

const StemCellsPluripotentCells = {
  condition: 'useHumanStemCell',
  title: 'Stem Cells: Pluripotent Stem Cells',
  fields: {
    // _Safety.customAttributes.SF_StemCell.customAttributes._PluripotentDerived
    pluripotentDerived: {
      type: 'Boolean',
      label: `
        Will pluripotent stem cell line(s) be derived or created in
        the course of the proposed research?
      `
    },
    provideSciRationalePluripotentNeed: {
      condition: 'pluripotentDerived',
      type: 'Text',
      label: `
        Provide an acceptable scientific rationale for the need to derive
        human pluripotent cell line(s), including a justification for the number needed.
      `
    } ,
    somaticNuclearTransfer: {
      condition: 'pluripotentDerived',
      type: 'Text',
      label: `
        If somatic cell nuclear transfer is proposed, provide a justification
        for the use of this procedure.
      `,
      // optional
    },
    stemCellDoc: {
      condition: 'pluripotentDerived',
      type: 'Text',
      label: `
        Document how stem cell lines will be characterized, validated, stored
        and distributed, including the method of ensuring that the confidentiality
        of the donor(s) will be protected.
      `
    },
    donorConsentDoc: {
      condition: 'pluripotentDerived',
      type: 'Text',
      label: `
        Provide documentation that donors of gametes, embryos, somatic cells or
        human tissue have given voluntary informed consent.
      `
    },
    donorConsentFiles: {
      condition: 'pluripotentDerived',
      type: 'Attachment',
      label: 'Upload Donor Consent Documentation',
    }
  }
} as const satisfies PageDefinition;

const PlantBiocontainmentLevel: PageDefinition = {
  condition: 'createClonePlantPathogen',
  title: 'Plant Biocontainment Level',
  fields: {
    // TODO: This was pre-checked for me. Might be shared with another field.
    // _Safety.customAttributes.SF_BioHazardInfo.customAttributes._BioContainmentLevel
    plantBiocontainmentLevel: {
      ...BiosafetyLevelField,
      label: 'Appropriate Biocontainment Level (select all that apply)',
    }
  }
}

const SubmissionInstructions: PageDefinition = {
  title: 'Protocol Submission Instructions',
  description: `
    You have reached the end of the e-IBC SmartForm.

    **Please take this opportunity to review the information you have provided.**
    It is very important that the responses in this form be thorough and specific.
    Failure to respond to all requested items, to submit all required documents, or complete
    all study team personnel requirements will result in a delay in the review of this
    submission and may result in the submission being returned to the study team for
    correction or completion.

    <Admonition variant="caution" title="ATTENTION">
      This submission has not yet been forwarded to the IBC.
    </Admonition>

    Please note that this submission has not yet been forwarded for review.
    Upon completing the required information and clicking the "Finish" button below,
    **the Principal Investigator must select the "Forward Study for Review" activity
    from the protocol/amendment workspace.**

    Once completed, this submission will be forwarded for departmental endorsement
    (if required).  Upon completion of departmental endorsement, the submission
    will be forwarded to the IBC for review.
  `,
  fields: {
    // nope.
  }
}

export const IBC = {
  title: 'Ohio State IBC Initial Submission',
  version: '1.0',

  pages: {
    Identification,
    ExternalCollaboration,
    GettingStarted,
    Summary,
    Funding,

    // Animal
    ProceduresAndLocations,
    LocationsContinued,

    // Biohazards
    SafetyEquipment,

    RodentGeneTransfer,
    RodentGeneTransferTransgenic,
    RodentGeneTransferViruses,
    RDNASection1,
    HumanSourceMaterialSection1,
    ExposureAssessmentAndPPE,
    DualUseDetermination,
    OccupationalHealthRiskGroups,
    NIHSectionDesignation,

    // Biohazards
    BiohazardIdentification,

    // HGT things
    HGTIRBApproval,
    HGTDescription,
    HGTMonitoring,
    HGTMonitoringCriteria,
    HGTRisk,
    HGTMaterials,

    // Also animals
    Animals,

    // Stem cells
    StemCellHumanMaterials,
    StemCellEmbryonics,
    StemCellPluripotentOrNeuralProgenitors,
    StemCellHumanCells,
    StemCellsPluripotentCells,

    PlantBiocontainmentLevel,
    SubmissionInstructions,
  }
} as const satisfies FormDefinition;

type FieldResponse<T extends FieldDefinition> = string

// response OF TYPE
// May extract.
type TextField = { type: 'Text' }
type BooleanField = { type: 'Boolean' }

type CollectionField = { type: 'Collection' }
type AnyField = { type: 'Text' | 'Boolean' | 'Attachment' }

// https://stackoverflow.com/a/69969474
type GetKeysOfType<
  Type extends Record<string, any>,
  Obj extends Record<string, any>
> = keyof {
  [Key in keyof Obj as Obj[Key] extends Type ? Key : never]: Obj[Key];
}

// Extraction of explicit field types
type TextFields = GetKeysOfType<TextField, typeof StemCellsPluripotentCells['fields']>
type BooleanFields = GetKeysOfType<BooleanField, typeof StemCellsPluripotentCells['fields']>
type AnyFields = GetKeysOfType<AnyField, typeof StemCellsPluripotentCells['fields']>

type PageNames = GetKeysOfType<PageDefinition, typeof IBC['pages']>;

type GetKeysOfFields<
  Obj extends PageDefinition
> = keyof {
  [Key in keyof Obj['fields'] as Obj['fields'][Key] extends AnyField
    ? Key : never
  ] : Obj['fields'][Key];
}

type AnyFields2 = GetKeysOfFields<typeof StemCellsPluripotentCells>;

type AnyFields3 = keyof typeof StemCellsPluripotentCells['fields'];
  // same thing lmao.
  // at least for the simple case.
  // I'd have to do some magic for specific types
  // e.g omit collection and union with some string literals.

// BUT! I want to separate collections to process them separately.
// AND remove fields I don't care about (e.g. sections).
// Thus I use the more advanced version to type check fields:

type NonCollectionFieldNames = GetKeysOfType<AnyField, typeof SafetyEquipment['fields']>
type CollectionFieldNames = GetKeysOfType<CollectionField, typeof SafetyEquipment['fields']>


// Now I COULD for responses split those off into each individual type
// and remap it to a response type. E.g. BooleanFieldNames map to a
// boolean response type. But is there an easier method...?

type BooleanFieldNames = GetKeysOfType<BooleanField, typeof SafetyEquipment['fields']>

// Naive version for mapping:

type BooleanResponses = {
  [K in BooleanFieldNames]: boolean;
};

type CollectionResponses = {
  [K in CollectionFieldNames]: {
    _id: string
  }[]
}

// and THEN combining all that into:

type CombinedSafetyEquipmentResponses = {
  [K in GetKeysOfType<BooleanField, typeof SafetyEquipment['fields']>]: boolean;
} | {
  [K in GetKeysOfType<CollectionField, typeof SafetyEquipment['fields']>]: {
    _id: string
  }[]
};

// And then generalizing:

type CombinedResponses<T extends PageDefinition> = {
  [K in GetKeysOfType<BooleanField, T['fields']>]: boolean;
} & {
  [K in GetKeysOfType<CollectionField, T['fields']>]: {
    _id: string
  }[]
};

const safety: CombinedResponses<typeof SafetyEquipment> = {} as any;




type PageResponses<T extends PageDefinition> = {
  [K in keyof T['fields']]: string;
};

function responses<T extends PageDefinition>(materials: T): PageResponses<T> {
  const result: PageResponses<T> = {} as PageResponses<T>;
  // for (const key in materials.fields) {
  //   result[key] = materials.fields[key].label;
  // }
  return result;
}

const res = responses(Identification);
res.academicUnit
