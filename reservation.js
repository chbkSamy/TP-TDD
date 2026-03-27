export class Reservation {
  constructor(name, id, startDate, endDate) {
    this.name = name;
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isValid = new Date(endDate) > new Date(startDate);
  }

  doesNotOverlap(other) {
    const thisEnd = new Date(this.endDate);
    const otherStart = new Date(other.startDate);
    const thisStart = new Date(this.startDate);
    const otherEnd = new Date(other.endDate);
    return thisEnd <= otherStart || otherEnd <= thisStart;
  }
}
