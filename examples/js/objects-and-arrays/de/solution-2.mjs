const basket = []
basket.push('Zelt', 'Schlafsack')

if (!basket.includes('Zelt')) basket.push('Zelt')

console.log(basket.length, basket.join(' + '))
