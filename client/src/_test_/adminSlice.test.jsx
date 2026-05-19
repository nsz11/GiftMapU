import myAdminSlice from "../slices/adminSlice";

const AdminTestState = {
  shops: [],
  products: [],
  loading: false,
  msg: null
};

describe("User Slice Initial State Test", () => {it("must match the initial state", () => {
expect(
      myAdminSlice(undefined, { type: "unknown" })
    ).toEqual(AdminTestState);

  });

});