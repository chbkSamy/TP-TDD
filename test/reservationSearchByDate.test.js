describe("ReservationSearchByDate", () => {
  test("returns reservation active on given date", () => {
    const management = new ReservationManagement();
    const reservation = new Reservation("Test", "003", "2022-05-08", "2022-05-10");
    management.add(reservation);

    const searcher = new ReservationSearchByDate(management.reservations);
    const results = searcher.search("2022-05-09");

    expect(results).toContain(reservation);
  });

  test("does not return reservation not active on given date", () => {
    const management = new ReservationManagement();
    const reservation = new Reservation("Test", "004", "2022-05-10", "2022-05-12");
    management.add(reservation);

    const searcher = new ReservationSearchByDate(management.reservations);
    const results = searcher.search("2022-05-09");

    expect(results).not.toContain(reservation);
  });

  test("returns reservation active on its start date", () => {
    const management = new ReservationManagement();
    const reservation = new Reservation("Test", "005", "2022-05-08", "2022-05-10");
    management.add(reservation);

    const searcher = new ReservationSearchByDate(management.reservations);
    const results = searcher.search("2022-05-08");

    expect(results).toContain(reservation);
  });

  test("returns reservation active on its end date", () => {
    const management = new ReservationManagement();
    const reservation = new Reservation("Test", "006", "2022-05-08", "2022-05-10");
    management.add(reservation);

    const searcher = new ReservationSearchByDate(management.reservations);
    const results = searcher.search("2022-05-10");

    expect(results).toContain(reservation);
  });
});
