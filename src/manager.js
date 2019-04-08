import React from 'react';
import addons from '@storybook/addons';
import CodePanel from './CodePanel';
import SettingsPanel from './SettingsPanel';
import { ADDON_ID, CODE_PANEL_ID, SETTINGS_PANEL_ID } from '.';

export function register() {
  addons.register(ADDON_ID, api => {
    const channel = addons.getChannel();
    addons.addPanel(CODE_PANEL_ID, {
      title: 'Code',
      // eslint-disable-next-line react/prop-types
      render: ({ active, key }) => (
        <CodePanel key={key} channel={channel} api={api} active={active} />
      ),
    });
    addons.addPanel(SETTINGS_PANEL_ID, {
      title: '图表库',
      // eslint-disable-next-line react/prop-types
      render: ({ active, key }) => (
        <SettingsPanel key={key} channel={channel} api={api} active={active} />
      ),
    });
  });
}
