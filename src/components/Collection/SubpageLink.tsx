import { Button } from "@osuresearch/ui";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { normalizeFieldPath } from "../../tools";
import { CollectionInstanceId, FieldName } from "../../types";

export type SubpageLinkProps = {
  id: CollectionInstanceId
  name: FieldName
  label: React.ReactNode
}

/**
 * Link to render a collection instance as a subpage on the form.
 *
 * This component handles the heavy lifting of normalizing the link,
 * allowing it to be used from any subpage *within the parent page*.
 *
 * In other words, page `Foo` cannot make deep links into page `Bar`
 * with this component. But `Bar` can make deep links into child
 * collections of child collections within `Bar`.
 */
export function SubpageLink({ id, name, label }: SubpageLinkProps) {
  const location = useLocation();
  return (
    <Button as={Link} to={normalizeFieldPath(location, `${name}.${id}`)}>
      {label}
    </Button>
  )
}
