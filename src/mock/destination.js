import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { TEXT, MIN_VALUE, MAX_COUNT_DESCRIPTION, URL } from '../const.js';

function createDescription(text) {
  const sentencesCount = getRandomInteger(MIN_VALUE, MAX_COUNT_DESCRIPTION);
  const description = [];
  for (let i = 0; i < sentencesCount; i++) {
    description.push(getRandomArrayElement(text.split('.')));
  }

  return description.join(' ');
}

function getRandomPicture() {
  return URL + crypto.randomUUID();
}

function generateDestination (destination) {
  return {
    id: crypto.randomUUID(),
    name: destination,
    description: createDescription(TEXT),
    pictures: Array.from({ length: getRandomInteger(0, 5) }, () => ({
      src: getRandomPicture(),
      description: `${destination} description`
    }))
  };
}

export { generateDestination };
