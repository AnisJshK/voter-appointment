export const constituencies = [
  { id: 1, name: "Pune" },
  { id: 2, name: "Mumbai" }
];

export const booths = [
  { id: 1, constituencyId: 1, name: "Wagholi" },
  { id: 2, constituencyId: 1, name: "Kharadi" },
  { id: 3, constituencyId: 2, name: "Andheri" }
];

export const centers = [
  {
    id: 1,
    boothId: 1,
    name: "Kesnand School",
    address: "Kesnand Road",
    contactNumber: "9999999999",
    contactPerson: "Sham",
    isActive: true,
    slotsPerDay: 50
  }
];

export const slotTypes = [
  { id: 1, slotType1: "Senior Citizen" },
  { id: 2, slotType1: "Women" }
];

export const slots = [
  {
    id: 1,
    centerId: 1,
    slotTypeId: 1,
    startTime: "09:00",
    endTime: "12:00",
    maxAppointment: 50,
    isActive: true
  },
  {
    id: 2,
    centerId: 1,
    slotTypeId: 1,
    startTime: "12:00",
    endTime: "15:00",
    maxAppointment: 50,
    isActive: true
  }
];

export const holidays = [];
