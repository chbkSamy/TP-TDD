export class ReservationSearchByDate {
  constructor(reservations) {
    this.reservations = reservations;
  }

  search(dateString) {
    const targetDate = new Date(dateString);
    return this.reservations.filter((r) => this._isActiveOn(r, targetDate));
  }

  _isActiveOn(reservation, targetDate) {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return targetDate >= start && targetDate <= end;
  }
}
