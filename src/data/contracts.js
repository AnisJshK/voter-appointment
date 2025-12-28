export const emptyConstituency = { id: null, name: "" };

export const emptyBooth = {
  id: null,
  constituencyId: null,
  name: ""
};

export const emptyCenter = {
  id: null,
  boothId: null,
  name: "",
  address: "",
  contactNumber: "",
  contactPerson: "",
  isActive: true,
  slotsPerDay: 0
};

export const emptySlotType = {
  id: null,
  slotType1: ""
};

export const emptySlot = {
  id: null,
  centerId: null,
  slotTypeId: null,
  startTime: "",
  endTime: "",
  maxAppointment: 0,
  isActive: true
};

export const emptyHoliday = {
  id: null,
  boothId: null,
  centerId: null,
  slotId: null,
  holidayDate: "",
  description: ""
};
