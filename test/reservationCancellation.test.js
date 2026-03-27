describe("Reservation Management - cancellation", () => {
  test("cancels a reservation made more than 48h before start", () => {
    const manager = new ReservationManager();
    const reservation = new Reservation("Test", "001", "2022-06-10", "2022-06-15");
    manager.add(reservation);
    const now = new Date("2022-06-07T00:00:00");
    expect(manager.cancel("001", now)).toBe(true);
    expect(manager.findById("001")).toBeUndefined();
  });

  test("refuses cancellation less than 48h before start", () => {
    const manager = new ReservationManager();
    const reservation = new Reservation("Test", "002", "2022-06-10", "2022-06-15");
    manager.add(reservation);
    const now = new Date("2022-06-09T12:00:00");
    expect(manager.cancel("002", now)).toBe(false);
    expect(manager.findById("002")).toBeDefined();
  });

  test("refuses cancellation of non-existing reservation", () => {
    const manager = new ReservationManager();
    const now = new Date("2022-06-07T00:00:00");
    expect(manager.cancel("999", now)).toBe(false);
  });
});
