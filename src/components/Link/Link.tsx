import React from 'react';

export type LinkProps = {
  href: string
  children: React.ReactNode
}

export function Link({ href, children }: LinkProps) {
  return <a href="#">{href} - {children}</a>
}
