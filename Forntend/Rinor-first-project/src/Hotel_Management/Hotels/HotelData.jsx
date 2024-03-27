import { faker } from '@faker-js/faker';

export const data = [...Array(30)].map((_, index) => ({
  id: index + 1,
  name: faker.company.name(),
  hotelType: faker.helpers.arrayElements([
    "Standard",
    "Family",
    "Villa",
    "Excort"
  ])[0],
  city: faker.location.city(),
  address: faker.location.streetAddress(),
  avatar: faker.image.avatar (),
  title: faker.lorem.sentence(),
  nightlyRate: faker.commerce.price({ min: 1200, max: 7000, dec: 0, symbol: "Rs " }),
  description: faker.lorem.paragraph(2, 3), // Generate 2-3 sentences
  rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1, // Generate random integer between 1 and 5
  rooms: faker.number.int({ min: 1, max: 10 }), // Generates a random integer between 1 and 10
}));
