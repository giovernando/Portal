import { supabase } from "@/lib/supabase";

export interface ScheduleRecord {
  id: string;
  class_name: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  subject: string;
  teacher_id?: string | null;
  created_at?: string;
}

export interface AcademicCalendarRecord {
  id: string;
  title: string;
  file_url: string;
  year: string;
  semester: "Ganjil" | "Genap";
  is_active: boolean;
  created_at?: string;
}

export const akademikService = {
  // Schedules
  async getSchedules(className?: string) {
    let query = supabase
      .from("schedules")
      .select(`
        *,
        teachers (
          name
        )
      `)
      .order("day_of_week", { ascending: true })
      .order("start_time", { ascending: true });
    
    if (className) {
      query = query.eq("class_name", className);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createSchedule(payload: Omit<ScheduleRecord, "id"|"created_at">) {
    const { data, error } = await supabase
      .from("schedules")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSchedule(id: string, payload: Partial<ScheduleRecord>) {
    const { data, error } = await supabase
      .from("schedules")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSchedule(id: string) {
    const { error } = await supabase.from("schedules").delete().eq("id", id);
    if (error) throw error;
  },

  // Academic Calendar
  async getCalendar() {
    const { data, error } = await supabase
      .from("academic_calendar")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data as AcademicCalendarRecord[];
  },

  async getActiveCalendar() {
    const { data, error } = await supabase
      .from("academic_calendar")
      .select("*")
      .eq("is_active", true)
      .single();
    
    if (error) throw error;
    return data as AcademicCalendarRecord;
  },

  async createCalendarItem(payload: Omit<AcademicCalendarRecord, "id"|"file_url"|"created_at">, file: File) {
    const file_url = await this.uploadFile(file);

    const { data, error } = await supabase
      .from("academic_calendar")
      .insert([{ ...payload, file_url }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCalendarItem(id: string, payload: Partial<AcademicCalendarRecord>, file?: File) {
    let updatePayload = { ...payload };
    if (file) {
      updatePayload.file_url = await this.uploadFile(file);
    }

    const { data, error } = await supabase
      .from("academic_calendar")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCalendarItem(id: string) {
    const { error } = await supabase.from("academic_calendar").delete().eq("id", id);
    if (error) throw error;
  },

  async uploadFile(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `academic_${Date.now()}.${fileExt}`;
    const filePath = `academic_calendar/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("school_assets")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("school_assets")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};
