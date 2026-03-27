const CANCELLATION_LIMIT_HOURS = 48; 

export class ReservationManagement {
  constructor() {
    this.reservations = [];
  }

  add(reservation) {
    const hasOverlap = this.reservations.some(
      (existing) => !existing.doesNotOverlap(reservation)
    );

    if (hasOverlap) {
      throw new Error("La réservation chevauche une réservation existante.");
    }

    this.reservations.push(reservation);
  }

  findById(id) {
    return this.reservations.find((r) => r.id === id);
  }

  cancel(id, now) {
    const reservation = this.findById(id);
    if (!reservation) return false;

    if (!this._isCancellable(reservation, now)) return false;

    this.reservations = this.reservations.filter((r) => r.id !== id);
    return true;
  }

  _isCancellable(reservation, now) {
    const start = new Date(reservation.startDate);
    const hoursUntilStart = (start.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilStart >= CANCELLATION_LIMIT_HOURS;
  }
}
