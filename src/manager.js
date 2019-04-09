import React from 'react';
import addons, { types } from '@storybook/addons';
import CodePanel from './CodePanel';
import SettingsPanel from './SettingsPanel';
import ThemeTool from './ThemeTool';
import * as constants from './constants';

export function register() {
  addons.register(constants.ADDON_ID, api => {
    const channel = addons.getChannel();
    addons.addPanel(constants.CODE_PANEL_ID, {
      title: 'Code',
      // eslint-disable-next-line react/prop-types
      render: ({ active, key }) => (
        <CodePanel key={key} channel={channel} api={api} active={active} />
      ),
    });
    addons.addPanel(constants.SETTINGS_PANEL_ID, {
      title: '图表库',
      // eslint-disable-next-line react/prop-types
      render: ({ active, key }) => (
        <SettingsPanel key={key} channel={channel} api={api} active={active} />
      ),
    });
    addons.add(constants.THEME_TOOL, {
      title: 'Chartlib/theme',
      type: types.TOOL,
      match: ({ viewMode }) => viewMode === 'story',
      render: () => <ThemeTool channel={channel} api={api} />,
    });
  });
}
