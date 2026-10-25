const basket = []
basket.push('Tent', 'Sleeping bag')

if (!basket.includes('Tent')) basket.push('Tent')

console.log(basket.length, basket.join(' + '))
