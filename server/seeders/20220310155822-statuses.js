"use strict";

const { Status } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const statuses = await Status.findAll();
    if (statuses.length === 0)
      return queryInterface.bulkInsert("Statuses", [
        {
          name: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "in progress",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "finished",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "postponed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Statuses", null, {});
  },
};
