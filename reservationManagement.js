export class ReservationManagement {
  constructor() {
    this.reservations = [];
  }

  add(reservation) {
    for (let i = 0; i < this.reservations.length; i++) {
      if (!this.reservations[i].doesNotOverlap(reservation)) {
        throw new Error("La réservation chevauche une réservation existante.");
      }
    }
    this.reservations.push(reservation);
  }

  findById(id) {
    return this.reservations.find((r) => r.id === id);
  }

  cancel(id, now) {
    const reservation = this.findById(id);
    if (!reservation) return false;

    const start = new Date(reservation.startDate);
    const diffHours = (start.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffHours < 48) return false;

    this.reservations = this.reservations.filter((r) => r.id !== id);
    return true;
  }
}
