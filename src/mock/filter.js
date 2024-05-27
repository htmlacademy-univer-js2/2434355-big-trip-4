import {filter} from '../utils/filter.js';

function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterType, tripEvents]) => ({
      type: filterType,
      count: tripEvents(events).length,
    }),
  );
}

export {generateFilter};
