
import { FormDefinition } from "../../types"

// Define your form
const ContactForm: FormDefinition = {
  title: 'My Contact  Form',
  version: '1.0',

  pages: {
    contact: {
      title: 'Contact Information',
      fields: {
        searchForPerson: {
          type: 'Person',
          label: 'Search for a person',
          required: 'Select a person'
        },
        email: {
          type: 'Text',
          label: 'Email',
          required: 'Input a valid email address'
        },
        birthday: {
          type: 'Date',
          label: 'Date of birth',
          required: 'Input your birth date'
        },
        address: {
          type: 'Text',
          label: 'Address',
          required: 'Input your street address'
        },
        state: {
          type: 'Text',
          label: 'State (if applicable)',
          choices: {
            CA: 'California',
            OH: 'Ohio',
            AZ: 'Arizona',
            NY: 'New York'
            // ... and the rest ...
          }
        },
        zip: {
          type: 'Text',
          label: 'Zip code (if applicable)'
        },
        favoriteAPI: {
          type: 'Key',
          label: 'My favorite graphics API',
          choices: {
            ogl: 'OpenGL',
            dx11: 'DirectX 11',
            dx12: 'DirectX 12',
            metal: 'Metal',
            vulkan: 'Vulkan'
          }
        },
        optIn: {
          type: 'Key', // multiple...
          label: 'I want to receive...',
          description: 'Choose all that apply',
          choices: {
            newsletter: 'The weekly newsletter',
            companyOffers: 'Offers from the company',
            assocCompanyOffers: 'Offers from associated companies'
          }
        }
      }
    }
  }
};

export default ContactForm;
