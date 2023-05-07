import { Heading, Link, Box, Text, Icon, Group, Admonition } from '@osuresearch/ui';
import MarkdownToJSX from 'markdown-to-jsx';
import React from 'react';

/**
 * Tag for trimming markdown literals
 */
export function md(templateStrings: TemplateStringsArray, ...substitutions: unknown[]) {
  let md = templateStrings.raw[0];
  for (let i = 0; i < substitutions.length; i++) {
    md += String(substitutions[i]) + templateStrings.raw[i + 1];
  }
  if (md.startsWith('\n')) {
    // Dedent
    const lines = md.split('\n').slice(1);

    if (lines.length > 0) {
      const afterIndent = lines[0].search(/[^\s]/);

      if (afterIndent >= 0) {
        const indent = lines[0].slice(0, afterIndent);

        md = lines.map((l) => (l.startsWith(indent) ? l.slice(indent.length) : l)).join('\n');
      }
    }
  }

  return md;
}

export type MarkdownProps = {
  text?: string;
};

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <Group as="li" ml="md">
      <Icon name="circleFill" c="scarlet" size={10} ml="-md" pt="xs" />
      <p>{children}</p>
    </Group>
  );
}

export function _Markdown({ text }: MarkdownProps) {
  if (!text) {
    return <></>;
  }

  return (
    <MarkdownToJSX
      options={{
        // Map DOM elements to RUI components
        overrides: {
          h1: {
            component: Heading,
            props: {
              level: 1
            }
          },
          h2: {
            component: Heading,
            props: {
              level: 2
            }
          },
          h3: {
            component: Heading,
            props: {
              level: 3
            }
          },
          a: {
            component: Link // requires: title, href
          },
          p: {
            component: Text,
            props: {
              as: 'p',
              pb: 'xs'
            }
          },
          // TODO: How should this be styled?
          // See Radiation page.
          blockquote: {
            component: Text,
            props: {
              as: 'p',
              pl: 'md'
            }
          },
          small: {
            component: Text,
            props: {
              as: 'p',
              fs: 'sm',
              c: 'dark'
            }
          },

          // TODO: Don't really have a list component yet.
          // Hacking something in.
          ul: {
            component: Box,
            props: {
              as: 'ul'
            }
          },
          li: {
            component: ListItem
          },

          // Expose RUI 5 admonitions for markdown
          Admonition: {
            component: Admonition,
          }
        }
      }}
    >{md`${text}`}</MarkdownToJSX>
  );
}

export const Markdown = React.memo(_Markdown);
