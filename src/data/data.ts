import { faker } from "@faker-js/faker";
import { typeOfData } from "./type";

const brands: string[] = [...Array(10)].map(() => faker.company.name());

export const data: typeOfData[] = [...Array(250)].map(() => ({
  id: faker.database.mongodbObjectId(),
  name: faker.commerce.productName(),
  brandName: brands[faker.helpers.rangeToNumber({ min: 0, max: 9 })],
  price: faker.helpers.rangeToNumber({ min: 300, max: 5000 }),
  discount: faker.helpers.rangeToNumber({ min: 5, max: 40 }),
  rating: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
  noOfRatings: faker.helpers.rangeToNumber({ min: 120, max: 500 }),
  trendingPercentage: faker.datatype.float({
    min: 10,
    max: 100,
    precision: 0.01,
  }),
  suggestionPercentage: faker.datatype.float({
    min: 10,
    max: 100,
    precision: 0.01,
  }),
  image: faker.image.nature(180, 240, true),
  favourite: false,
}));
