export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
}

export const NOTE_CATEGORIES = ["Kuliah", "Tugas", "Pribadi", "Organisasi"];
