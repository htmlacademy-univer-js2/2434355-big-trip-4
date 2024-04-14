import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { DESTINATIONS, TEXT, MIN_VALUE, MAX_COUNT_DESCRIPTION, MAX_PICTURE_ID, URL } from '../const.js';

function createDescription(text) {
  const sentencesCount = getRandomInteger(MIN_VALUE, MAX_COUNT_DESCRIPTION);
  const description = [];
  for (let i = 0; i < sentencesCount; i++) {
    description.push(getRandomArrayElement(text.split('.')));
  }
  return description.join(' ');
}

function getRandomPicture() {
  return URL + getRandomInteger(MIN_VALUE, MAX_PICTURE_ID);
}

const mockDestinations = [
  {
    id: 1,
    description: createDescription(TEXT),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: getRandomPicture(),
        description: ''
      },
      {
        src: getRandomPicture(),
        description: ''
      },
    ]
  },
  {
    id: 2,
    description: createDescription(TEXT),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: getRandomPicture(),
        description: ''
      }
    ]
  },
  {
    id: 3,
    description: createDescription(TEXT),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: []
  },
];

export { mockDestinations };
