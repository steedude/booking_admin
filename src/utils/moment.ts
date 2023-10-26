import moment from 'moment';

export function formatTime(date?: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date).format(format);
}
