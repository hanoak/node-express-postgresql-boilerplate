const { getAllUsers } = require("../services/users.services.js");
const { sequelize, User } = require("../database/models/index.js");
const { InternalServerError } = require("../errors/custom-errors.utils.js");

jest.mock("../database/models", () => ({
  sequelize: {
    transaction: jest.fn(),
  },
  User: {
    findAll: jest.fn(),
  },
}));

jest.mock("../logger", () => ({
  error: jest.fn(),
}));

describe("getAllUsers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of users when successful", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
    sequelize.transaction.mockImplementation(async (_, callback) => callback());
    User.findAll.mockResolvedValue(mockUsers);

    const result = await getAllUsers();

    expect(result).toEqual(mockUsers);
  });

  it("should return an empty array if no users are found", async () => {
    sequelize.transaction.mockImplementation(async (_, callback) => callback());
    User.findAll.mockResolvedValue(null);

    const result = await getAllUsers();

    expect(result).toEqual([]);
  });

  it("should throw an InternalServerError if an error occurs", async () => {
    const mockError = new Error("Database error");
    sequelize.transaction.mockImplementation(async () => {
      throw mockError;
    });

    await expect(getAllUsers()).rejects.toThrow(InternalServerError);
  });
});
