import type { IStaffTask } from "../types/flowTypes";

export const staffs: Record<string, IStaffTask> = {
  analyst: {
    id: "analyst",
    name: "Анна Белова",
    initials: "АБ",
    gradientFrom: "#3C8CE7",
    gradientTo: "#00EAFF",
  },
  architect: {
    id: "architect",
    name: "Максим Крылов",
    initials: "МК",
    gradientFrom: "#335CFF",
    gradientTo: "#7F7FD5",
  },
  designer: {
    id: "designer",
    name: "Елена Платонова",
    initials: "ЕП",
    gradientFrom: "#F2994A",
    gradientTo: "#F2C94C",
  },
  backend: {
    id: "backend",
    name: "Дмитрий Смирнов",
    initials: "ДС",
    gradientFrom: "#11998E",
    gradientTo: "#38EF7D",
  },
  qa: {
    id: "qa",
    name: "Ирина Лебедева",
    initials: "ИЛ",
    gradientFrom: "#F857A6",
    gradientTo: "#FF5858",
  },
  integrator: {
    id: "integrator",
    name: "Никита Орлов",
    initials: "НО",
    gradientFrom: "#4568DC",
    gradientTo: "#43CEA2",
  },
  devops: {
    id: "devops",
    name: "Ольга Назарова",
    initials: "ОН",
    gradientFrom: "#0F2027",
    gradientTo: "#2C5364",
  },
};
