const moment = require('moment');

exports.getDateTimeNow = () => {
  return moment().format();
}

exports.getUnixDateTimeNow = () => {
  return moment().unix();
}

exports.getDisplayDateTimeNow = () => {
  return moment().format();
}

exports.getCustomDateTimeNow = format => {
  return moment().format(format);
}