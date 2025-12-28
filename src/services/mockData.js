// ===== MOCK DATA BASED ON PROVIDED JSON =====

export const constituencies = [
  { id: 1, name: "Pune" }
];

export const booths = [
  { id: 1, constituencyId: 1, name: "Wagholi" },
  { id: 3, constituencyId: 1, name: "Chandan Nagar" },
  { id: 4, constituencyId: 1, name: "Kharadi" }
];

export const centers = [
  {
    id: 1,
    boothId: 1,
    name: "Kesnand Center",
    address: "kesnand Road, Wagholi",
    contactNumber: "9865322356",
    contactPerson: "Sham",
    isActive: true,
    slotsPerDay: 50
  },
  {
    id: 3,
    boothId: 1,
    name: "Wagheshawar Temple",
    address: "Near bus stop, Wagholi",
    contactNumber: "9865322456",
    contactPerson: "Ram",
    isActive: true,
    slotsPerDay: 50
  },
  {
    id: 4,
    boothId: 3,
    name: "Chandan Nagar camp",
    address: "Chandan Nagar, near school",
    contactNumber: "8888322456",
    contactPerson: "Ali",
    isActive: true,
    slotsPerDay: 50
  }
];

export const slotTypes = [
  { id: 3, slotType1: "Senior Citizen" },
  { id: 4, slotType1: "Women" },
  { id: 5, slotType1: "Handicap" },
  { id: 6, slotType1: "VIP" }
];

export const slots = [
  {
    id: 1,
    centerId: 1,
    slotTypeId: 3,
    startTime: "09:00:00",
    endTime: "12:00:00",
    maxAppointment: 50,
    isActive: true
  },
  {
    id: 2,
    centerId: 1,
    slotTypeId: 3,
    startTime: "01:00:00",
    endTime: "03:00:00",
    maxAppointment: 50,
    isActive: true
  },
  {
    id: 3,
    centerId: 1,
    slotTypeId: 3,
    startTime: "03:00:00",
    endTime: "06:00:00",
    maxAppointment: 50,
    isActive: true
  },
  {
    id: 4,
    centerId: 3,
    slotTypeId: 3,
    startTime: "03:00:00",
    endTime: "06:00:00",
    maxAppointment: 50,
    isActive: true
  }
];
