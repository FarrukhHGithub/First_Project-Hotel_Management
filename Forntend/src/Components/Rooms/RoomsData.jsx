import { faker } from "@faker-js/faker";

export const data = [...Array(30)].map((_, index) => ({
  id: index + 1,
  avatar: faker.image.urlLoremFlickr({ category: 'nature' }),
  roomType: faker.helpers.arrayElements([
    "Single",
    "Double",
    "Suite",
    "Standard",
    "Family",
    "Villa",
  ])[0],
  bedType: faker.helpers.arrayElements(["Single Bed", "Double Bed"])[0],
  nightlyRate: faker.commerce.price({ min: 50, max: 300, dec: 0, symbol: "$" }),
  isBooked: faker.datatype.boolean(),
}));
