import { ReservationManagement } from "../reservationManagement.js";
import { Reservation } from "../reservation.js";

describe("ReservationManagement", () => {
  test("cancels a reservation made more than 48h before start", () => {
    const management = new ReservationManagement();
    const reservation = new Reservation("Test", "001", "2022-06-10", "2022-06-15");
    management.add(reservation);
    const now = new Date("2022-06-07T00:00:00");
    expect(management.cancel("001", now)).toBe(true);
    expect(management.findById("001")).toBeUndefined();
  });

  test("refuses cancellation less than 48h before start", () => {
    const management = new ReservationManagement();
    const reservation = new Reservation("Test", "002", "2022-06-10", "2022-06-15");
    management.add(reservation);
    const now = new Date("2022-06-09T12:00:00");
    expect(management.cancel("002", now)).toBe(false);
    expect(management.findById("002")).toBeDefined();
  });

  test("refuses cancellation of non-existing reservation", () => {
    const management = new ReservationManagement();
    const now = new Date("2022-06-07T00:00:00");
    expect(management.cancel("999", now)).toBe(false);
  });

  test("throws an error if a new reservation overlaps with an existing one", () => {
    const management = new ReservationManagement();
    management.add(new Reservation("Res 1", "1", "2022-01-01", "2022-01-05"));

    expect(() => {
      management.add(new Reservation("Res 2", "2", "2022-01-03", "2022-01-07"));
    }).toThrow("La réservation chevauche une réservation existante.");
  });
});
