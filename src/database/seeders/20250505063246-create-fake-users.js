/* eslint-disable no-unused-vars */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          role: "admin",
          visits: 1,
          uuid: "590a37d2-8d66-429e-b850-43524dc163cc",
          createdAt: "2025-04-30T08:53:08.674Z",
          updatedAt: "2025-04-30T08:53:26.519Z",
        },
        {
          name: "Jane Doe",
          email: "jane.doe@example.com",
          role: "user",
          visits: 2,
          uuid: "d521f385-905b-46fa-a8c0-3297d14eba64",
          createdAt: "2025-04-30T08:53:08.674Z",
          updatedAt: "2025-04-30T08:53:26.519Z",
        },
        {
          name: "Jennifer S",
          email: "jennifer.s@example.com",
          role: "admin",
          visits: 3,
          uuid: "aec68f7f-f63c-462e-9627-b6f63057f536",
          createdAt: "2025-04-30T08:53:08.674Z",
          updatedAt: "2025-04-30T08:53:26.519Z",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("users", null, {});
  },
};
