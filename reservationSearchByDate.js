export class ReservationSearchByDate {
  constructor(reservations) {
    this.reservations = reservations;
  }

  search(dateString) {
    const target = new Date(dateString);
    return this.reservations.filter((r) => this._isActiveOn(r, target));
  }

  _isActiveOn(reservation, targetDate) {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return targetDate >= start && targetDate <= end;
  }
}
