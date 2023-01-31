import { Item } from '@osuresearch/ui';
import React, { ComponentType } from 'react';
import { useListData } from 'react-stately';
import { BaseFieldProps, ChoiceFieldProps } from '../../react';

export type ChoiceFieldRendererProps = BaseFieldProps & {
  as: ComponentType<ChoiceFieldProps>;
  choices: ChoicesList;
};

export function ChoiceFieldRenderer({
  as: Component,
  choices,
  ...props
}: ChoiceFieldRendererProps) {
  const list = useListData({
    initialItems: Object.keys(choices).map((c) => ({
      name: c,
      label: choices[c]
    })),
    // initialSelectedKeys: [], TODO!
    getKey: (item) => item.name
  });

  // TODO: Never finished React Stately list integration for RUI.
  return (
    <Component
      {...props}
      items={list.items}
      selectedKeys={list.selectedKeys}
      onSelectionChange={list.setSelectedKeys}
    >
      {(item) => <Item key={item.name}>{item.label}</Item>}
    </Component>
  );
}
