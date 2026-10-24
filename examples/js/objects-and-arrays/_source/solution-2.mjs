const basket = []
basket.push('[%Zelt|Tent%]', '[%Schlafsack|Sleeping bag%]')

if (!basket.includes('[%Zelt|Tent%]')) basket.push('[%Zelt|Tent%]')

console.log(basket.length, basket.join(' + '))
