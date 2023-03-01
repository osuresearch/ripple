import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ExternalDocument, ExternalDocumentProps } from './ExternalDocument';
import { AnnotationsProvider } from '../AnnotationsProvider';
import { annotations } from '../../app/mocks/annotations';

export default {
  title: 'Components/ExternalDocument',
  component: ExternalDocument,
  argTypes: {}
} as Meta<typeof ExternalDocument>;

export const Simple: Story<ExternalDocumentProps> = (args) => (
  <AnnotationsProvider>
    <ExternalDocument {...args} />
  </AnnotationsProvider>
);
Simple.args = {
  content: `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        * {
          color: purple !important;
        }
        h1 {
          color: green !important;
        }
      </style>
    </head>
    <body>
      <h1>Heading level 1</h1>

      <p>Before section 1</p>

      <div id="section1" data-comment-block="true">
        👉  Content for section 1
      </div>

      <p>After section 1</p>

      <h2>Heading 2.1</h2>

      <p>Content before section 2.1 reviewables</p>

      <div id="section2-1" data-comment-block="true">
        👉 <strong>Rich</strong> content for <a href="#section2">section 2</a>. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Donec nec sapien dolor.
        Suspendisse sed erat vehicula tortor porta tincidunt at eget dui. Quisque nibh
        leo, auctor id odio nec, viverra vestibulum mauris. Vestibulum eu aliquet ipsum.
        Pellentesque interdum dignissim lorem, sit amet dictum velit.
      </div>

      <p>Content after section 2.1 reviewables</p>

      <h2>Heading 2.2</h2>

      <div id="section2-2" data-comment-block="true">
        Aliquam scelerisque mauris non aliquet iaculis. Nullam egestas urna risus,
        nec sodales nisl facilisis sed. Duis vitae velit sed ipsum consectetur blandit
        ut at diam. Vivamus pretium erat non enim hendrerit, id auctor metus lobortis.
        Suspendisse tellus dui, ullamcorper vel laoreet et, condimentum ut justo. Nunc
        in tortor non arcu suscipit vestibulum at nec neque. Vivamus fringilla velit arcu,
        in hendrerit turpis dignissim vel. Duis imperdiet lobortis tortor non ultrices.
        Cras pretium dui a turpis condimentum, sit amet sollicitudin diam auctor. In porta
        neque sit amet turpis tempus egestas.
      </div>

      <h2>Heading 2.3</h2>

      <div id="section2-3" data-comment-block="true">
        <p>Aliquam scelerisque mauris non aliquet iaculis. Nullam egestas urna risus,
        nec sodales nisl facilisis sed. Duis vitae velit sed ipsum consectetur blandit
        ut at diam. Vivamus pretium erat non enim hendrerit, id auctor metus lobortis.</p>

        <p>Suspendisse tellus dui, ullamcorper vel laoreet et, condimentum ut justo. Nunc
        in tortor non arcu suscipit vestibulum at nec neque.</p>

        <ul>
          <li>Curabitur vel turpis nec odio consequat vulputate ac non enim.</li>
          <li>Ut pulvinar lacus id ipsum maximus convallis.</li>
          <li>Etiam mattis nibh eu sollicitudin hendrerit.</li>
          <li>Cras convallis ipsum at risus suscipit sodales.</li>
          <li>Proin sit amet turpis mattis nunc sagittis dapibus.</li>
        </ul>

        <p>Vivamus fringilla velit arcu,
        in hendrerit turpis dignissim vel. Duis imperdiet lobortis tortor non ultrices.
        Cras pretium dui a turpis condimentum, sit amet sollicitudin diam auctor. In porta
        neque sit amet turpis tempus egestas.</p>
      </div>

      <h2>Heading 2.4</h2>

      <div id="section2-4" data-comment-block="true">
        Aliquam scelerisque mauris non aliquet iaculis. Nullam egestas urna risus,
        nec sodales nisl facilisis sed. Duis vitae velit sed ipsum consectetur blandit
        ut at diam. Vivamus pretium erat non enim hendrerit, id auctor metus lobortis.
        Suspendisse tellus dui, ullamcorper vel laoreet et, condimentum ut justo. Nunc
        in tortor non arcu suscipit vestibulum at nec neque. Vivamus fringilla velit arcu,
        in hendrerit turpis dignissim vel. Duis imperdiet lobortis tortor non ultrices.
        Cras pretium dui a turpis condimentum, sit amet sollicitudin diam auctor. In porta
        neque sit amet turpis tempus egestas.
      </div>

    </body>
  </html>
  `
};

export const StressTest: Story<ExternalDocumentProps> = (args) => {
  const sections = [...Array(100)].map(
    (_, i) => `
    <div id="section-${i}" data-comment-block="true">
      <p>Aliquam scelerisque mauris non aliquet iaculis. Nullam egestas urna risus,
      nec sodales nisl facilisis sed. Duis vitae velit sed ipsum consectetur blandit
      ut at diam. Vivamus pretium erat non enim hendrerit, id auctor metus lobortis.</p>

      <p>Suspendisse tellus dui, ullamcorper vel laoreet et, condimentum ut justo. Nunc
      in tortor non arcu suscipit vestibulum at nec neque.</p>

      <ul>
        <li>Curabitur vel turpis nec odio consequat vulputate ac non enim.</li>
        <li>Ut pulvinar lacus id ipsum maximus convallis.</li>
        <li>Etiam mattis nibh eu sollicitudin hendrerit.</li>
        <li>Cras convallis ipsum at risus suscipit sodales.</li>
        <li>Proin sit amet turpis mattis nunc sagittis dapibus.</li>
      </ul>

      <p>Vivamus fringilla velit arcu,
      in hendrerit turpis dignissim vel. Duis imperdiet lobortis tortor non ultrices.
      Cras pretium dui a turpis condimentum, sit amet sollicitudin diam auctor. In porta
      neque sit amet turpis tempus egestas.</p>
    </div>
  `
  );

  return (
    <AnnotationsProvider initialItems={annotations}>
      <ExternalDocument
        {...args}
        content={`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              * {
                color: purple !important;
              }
              h1 {
                color: green !important;
              }
            </style>
          </head>
          <body>
            <h1>Heading level 1</h1>
            ${sections.join('')}
          </body>
        </html>
        `}
      />
    </AnnotationsProvider>
  );
};
