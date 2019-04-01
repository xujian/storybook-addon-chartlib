import addons from '@storybook/addons';
import { EVENT_ID } from './events';

const getLocation = (context, locationsMap) => locationsMap[context.id];

function setCode(context, source, locationsMap) {
  const currentLocation = getLocation(context, locationsMap);

  addons.getChannel().emit(EVENT_ID, {
    source,
    currentLocation,
    locationsMap,
  });
}

export function withCode(source, locationsMap = {}) {
  return (storyFn, context) => {
    setCode(context, source, locationsMap);
    return storyFn();
  };
}
