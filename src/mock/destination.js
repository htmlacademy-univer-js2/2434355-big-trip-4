import { getRandomInteger } from '../utils/common.js';
import { TEXT, DESTINATIONS } from '../const.js';

const remainingDestinations = [...DESTINATIONS];

function generateDestination() {
  const randomIndex = getRandomInteger(0, remainingDestinations.length - 1);
  const destination = remainingDestinations[randomIndex];

  remainingDestinations.splice(randomIndex, 1);

  return {
    id: crypto.randomUUID(),
    name: destination,
    description: TEXT,
    pictures: Array.from({ length: getRandomInteger(0, 5) }, () => ({
      src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      description: `${destination} description`
    }))
  };
}

export { generateDestination };
