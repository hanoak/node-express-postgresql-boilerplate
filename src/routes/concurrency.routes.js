const { Router } = require("express");
const UsersController = require("../controllers/concurrency.controller.js");

const router = Router({ mergeParams: true });

router.get("/count/:userId", UsersController.count);

router.get("/count/fixed-1/:userId", UsersController.countFixed1);

router.get("/count/fixed-2/:userId", UsersController.countFixed2);

router.get("/count/fixed-3/:userId", UsersController.countFixed3);

module.exports = router;
