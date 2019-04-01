import { ADDON_ID, PANEL_ID, EVENT_ID } from './events';
import { withCode } from './preview';

export { ADDON_ID, PANEL_ID, EVENT_ID, withCode };

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
