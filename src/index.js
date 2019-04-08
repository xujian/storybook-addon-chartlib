import { ADDON_ID, CODE_PANEL_ID, SETTINGS_PANEL_ID, EVENT_ID } from './events';
import { withCode } from './preview';

export { ADDON_ID, CODE_PANEL_ID, SETTINGS_PANEL_ID, EVENT_ID, withCode };

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
