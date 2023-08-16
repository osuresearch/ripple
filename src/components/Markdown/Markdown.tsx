import { Link, Stack, Typography } from '@mui/material';
import { Icon, Admonition } from '@osuresearch/ui';
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

// function ListItem({ children }: { children: React.ReactNode }) {
//   return (
//     <Stack as="li" ml="md">
//       <Icon name="circleFill" c="scarlet" size={10} ml="-md" pt="xs" />
//       <p>{children}</p>
//     </Stack>
//   );
// }

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
            component: Typography,
            props: {
              variant: 'h1'
            }
          },
          h2: {
            component: Typography,
            props: {
              variant: 'h2'
            }
          },
          h3: {
            component: Typography,
            props: {
              variant: 'h3'
            }
          },
          a: {
            component: Link
          },
          p: {
            component: Typography,
            props: {}
          },
          // TODO: How should this be styled?
          // See Radiation page.
          blockquote: {
            component: Typography,
            props: {
              // as: 'p',
              // pl: 'md'
            }
          },
          small: {
            component: Typography,
            props: {
              // as: 'p',
              // fs: 'sm',
              // c: 'dark'
            }
          },

          // TODO: Don't really have a list component yet.
          // Hacking something in.
          // ul: {
          //   component: Box,
          //   props: {
          //     as: 'ul'
          //   }
          // },
          // li: {
          //   component: ListItem
          // },

          // Expose RUI 5 admonitions for markdown
          Admonition: {
            component: Admonition
          }
        }
      }}
    >{md`${text}`}</MarkdownToJSX>
  );
}

/**
 * Renders text content as markdown using the lightweight
 * [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx) to render
 * [Research UI 5](https://github.com/osuresearch/ui) components.
 */
export const Markdown = React.memo(_Markdown);
