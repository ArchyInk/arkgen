/*
 * @author: Archy
 * @Date: 2022-01-28 15:49:38
 * @LastEditors: Archy
 * @LastEditTime: 2022-01-28 16:06:58
 * @FilePath: \code-generator\server\routes\users.js
 * @description:
 */
var express = require("express");
var router = express.Router();
const { readFileSync, writeFileSync } = require("fs-extra");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const text = readFileSync("./index.js", "utf-8");
  writeFileSync("test.js", "test", "utf-8");
  res.send(text);
});

module.exports = router;
