import { FilterType } from '../const';
import { isFutureDate, isPastDate, isPresentDate } from './point';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentDate(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo)),
};

export { filter };
