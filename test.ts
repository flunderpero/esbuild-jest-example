import * as sut from "./sut";

test("spyOn", () => {
  expect(sut.foo()).toEqual("foo");
  jest.spyOn(sut, "foo").mockReturnValue("bar");
  expect(sut.foo()).toEqual("bar");
});
