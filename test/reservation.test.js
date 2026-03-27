import { Reservation } from "../reservation.js";

describe("Reservation", () => {
  test("contains name", () => {
    const reservation = new Reservation("Test Reservation", "12345", "2022-01-01", "2022-01-05");
    expect(reservation.name).toBe("Test Reservation");
  });

  test("contains ID", () => {
    const reservation = new Reservation("Test Reservation", "12345", "2022-01-01", "2022-01-05");
    expect(reservation.id).toBe("12345");
  });

  test("contains start date", () => {
    const reservation = new Reservation("Test Reservation", "12345", "2022-01-01", "2022-01-05");
    expect(reservation.startDate).toBe("2022-01-01");
  });

  test("contains end date", () => {
    const reservation = new Reservation("Test Reservation", "12345", "2022-01-01", "2022-01-05");
    expect(reservation.endDate).toBe("2022-01-05");
  });

  describe("validation rules", () => {
    test("end date must be after start date", () => {
      const reservation = new Reservation("Test Reservation", "12345", "2022-01-01", "2022-01-01");
      expect(reservation.isValid).toBe(false);
    });

    test("end date strictly before start date is invalid", () => {
      const reservation = new Reservation("Test Reservation", "12345", "2022-01-05", "2022-01-01");
      expect(reservation.isValid).toBe(false);
    });

    test("valid reservation has end date after start date", () => {
      const reservation = new Reservation("Test Reservation", "12345", "2022-01-01", "2022-01-05");
      expect(reservation.isValid).toBe(true);
    });

    test("no overlapping reservations", () => {
      const reservation1 = new Reservation("Reservation 1", "12345", "2022-01-01", "2022-01-05");
      const reservation2 = new Reservation("Reservation 2", "54321", "2022-01-03", "2022-01-07");
      expect(reservation1.doesNotOverlap(reservation2)).toBe(false);
    });

    test("reservation can start at the end of another reservation", () => {
      const reservation1 = new Reservation("Reservation 1", "12345", "2022-01-01", "2022-01-05");
      const reservation2 = new Reservation("Reservation 2", "54321", "2022-01-05", "2022-01-10");
      expect(reservation1.doesNotOverlap(reservation2)).toBe(true);
    });

    test("non-overlapping reservations are valid", () => {
      const reservation1 = new Reservation("Reservation 1", "12345", "2022-01-01", "2022-01-05");
      const reservation2 = new Reservation("Reservation 2", "54321", "2022-01-06", "2022-01-10");
      expect(reservation1.doesNotOverlap(reservation2)).toBe(true);
    });
  });
});
