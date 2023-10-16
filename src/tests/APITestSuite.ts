import { expect } from "@playwright/test";
import { fixtures as test } from "../utils/fixture";

test.describe("API Demo test suite", () => {

  let token: string;
  let bookingId: string;

  test.beforeAll(async ({ API }) => {
    const res = await API.postReq('/auth', {
      "username": "admin",
      "password": "password123"
    });
    token = (await res.json()).token;
  });

  test("[GET] Retrieve list of bookings and verify response", async ({ API }) => {
    const res = await API.getReq('/booking');
    expect.soft(res.status()).toBe(200);
    expect((await res.json())[0]).toHaveProperty('bookingid');
  });

  test.describe("Creating Booking Suite", async () => {

    test.beforeAll(async ({ API }) => {
      const res = await API.postReq('/booking', {
        "firstname": "Amr",
        "lastname": "Sa",
        "totalprice": 100,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2023-10-17",
          "checkout": "2023-10-30"
        },
        "additionalneeds": "launch"
      });
      bookingId = (await res.json()).bookingid;
    });

    test("[PUT] Update an existing booking and verify response", async ({ API }) => {
      const res = await API.putReq(`/booking/${bookingId}`, {
        "firstname": "amr",
        "lastname": "ka",
        "totalprice": 100,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2023-10-17",
          "checkout": "2023-10-30"
        },
        "additionalneeds": "launch"
      }, token);
      expect.soft(res.status()).toBe(200);
      expect((await res.json()).firstname).toBe('amr');
    });

    test("[PATCH] Partially update an existing booking and verify response", async ({ API }) => {
      const res = await API.patchReq(`/booking/${bookingId}`, {
        "firstname": "john",
        "lastname": "smith"
      }, token);
      expect.soft(res.status()).toBe(200);
      expect.soft((await res.json()).firstname).toBe('john');
      expect((await res.json()).lastname).toBe('smith');
    });

    test("[DELETE] Delete an existing booking and verify response", async ({ API }) => {
      const res = await API.deleteReq(`/booking/${bookingId}`, token);
      expect.soft(res.status()).toBe(201);
    });
  });
});
