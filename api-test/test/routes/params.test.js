"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("default params route", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/params",
  });
  t.same(res.statusCode, 404);
});

test("default params with wrong param (string)", async (t) => {
  const app = await build(t);
  const res = await app.inject({
    url: "/params/string",
  });
  t.same(res.statusCode, 400);
});

test("default params with ok param (number)", async (t) => {
  const app = await build(t);
  const res = await app.inject({
    url: "/params/1234",
  });
  t.same(res.statusCode, 200);
  const data = JSON.parse(res.payload);
  t.same(Object.keys(data.params).length, 1);
  t.same(data.params.id, 1234);
  t.same(data.q, undefined);
});

test("default params with ok param (number) and only q querystring", async (t) => {
  const app = await build(t);
  const res = await app.inject({
    url: "/params/1234?a=one&b=two&q=ok-string",
  });
  t.same(res.statusCode, 200);
  const data = JSON.parse(res.payload);
  t.same(Object.keys(data.params).length, 1);
  t.same(data.params.id, 1234);
  t.same(Object.keys(data.query).length, 1);
  t.same(data.query.q, "ok-string");
});
