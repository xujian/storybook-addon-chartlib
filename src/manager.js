import React from 'react';
import addons from '@storybook/addons';
import CodePanel from './CodePanel';
import { ADDON_ID, PANEL_ID } from '.';

export function register() {
  addons.register(ADDON_ID, api => {
    const channel = addons.getChannel();
    addons.addPanel(PANEL_ID, {
      title: 'Code',
      // eslint-disable-next-line react/prop-types
      render: ({ active, key }) => (
        <CodePanel key={key} channel={channel} api={api} active={active} />
      ),
    });
  });
}
