
const formatDistance = require('date-fns/formatDistance');

const closedAt = new Date('2021-09-14T22:49:40Z');
const createdAt = new Date('2021-09-14T12:49:38Z');
const timeDifference = closedAt - createdAt;
const time = formatDistance(0, timeDifference, { includeSeconds: false });
const message = `This PR took ${time} to close`;
console.log(closedAt, createdAt, timeDifference, time)


