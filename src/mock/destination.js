import { getRandomArrayElement, getRandomInteger } from '../utils/common';
import { DESTINATIONS } from '../const';

const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];

const destinations = DESTINATIONS.map((item, index) => ({
  id: index,
  description: getRandomArrayElement(DESCRIPTIONS),
  name: item,
  pictures: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
      description: getRandomArrayElement(DESCRIPTIONS)
    }, {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
      description: getRandomArrayElement(DESCRIPTIONS)
    }, {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
      description: getRandomArrayElement(DESCRIPTIONS)
    }]
}));

function getRandomDestination() {
  return getRandomArrayElement(destinations);
}

function getDestinations() {
  return destinations;
}

export { getRandomDestination, getDestinations };
