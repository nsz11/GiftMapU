import myUserSlice from "../slices/userSlice";

const userTestState = {
  user: null,
  shops: [],
  msg: null,
  loading: false,
};

describe("User Slice Initial State Test", () => {

  it("must match the initial state", () => {

    expect(
      myUserSlice(undefined, { type: "unknown" })
    ).toEqual(userTestState);

  });

});