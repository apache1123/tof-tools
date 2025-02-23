import "@testing-library/jest-dom";

jest.mock("nanoid", () => {
  return {
    nanoid: () => {},
  };
});
