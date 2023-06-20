export const getRandomCity = () => {
    const cities = [
        'Denver', 'Frankfurt', 'London', 'Paris', 'Portland', 'Seattle',
        'Sydney', 'Zurich', 'San Francisco', 'Los Angeles'
    ]

    return cities[Math.floor(Math.random() * cities.length)]
}