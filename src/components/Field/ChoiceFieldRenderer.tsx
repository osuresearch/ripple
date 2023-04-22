import { Item } from '@osuresearch/ui';
import React, { ComponentType } from 'react';
import { useListData } from 'react-stately';
import { BaseFieldProps, ChoiceFieldProps } from '../../react';
import { Markdown } from '../Markdown';
import { ChoicesList } from '../../types';

type ChoiceItem = {
  name: string;
  label: React.ReactNode;
};
export type ChoiceFieldRendererProps = BaseFieldProps<any> & {
  as: ComponentType<ChoiceFieldProps<any>>;
  choices: ChoicesList;
};

export function ChoiceFieldRenderer({
  as: Component,
  choices,
  ...props
}: ChoiceFieldRendererProps) {
  const list = useListData<ChoiceItem>({
    initialItems: Object.keys(choices).map((c) => ({
      name: c,
      label: <Markdown text={choices[c]} />
    })),
    // initialSelectedKeys: [], TODO!
    getKey: (item) => item.name
  });

  // TODO: Never finished React Stately list integration for RUI.
  // TODO: Strict type
  return (
    <Component
      {...props}
      items={list.items}
      selectedKeys={list.selectedKeys}
      onSelectionChange={list.setSelectedKeys}
    >
      {(item: ChoiceItem) => <Item key={item.name}>{item.label}</Item>}
    </Component>
  );
}
