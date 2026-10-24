// A date without a time is read as midnight UTC
const date = new Date('2026-11-12')

const format = (timeZone) => date.toLocaleDateString('[%de-CH|en-US%]', { timeZone })
console.log(format('UTC'), format('Europe/Zurich'), format('America/New_York'))
