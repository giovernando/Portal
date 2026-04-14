import { supabase } from "@/lib/supabase";

export interface TeacherRecord {
  id: string;
  name: string;
  role: string;
  type: "guru" | "staff";
  pendidikan_terakhir?: string | null;
  mata_pelajaran?: string | null;
  nip?: string | null;
  email?: string | null;
  bio?: string | null;
  photo_url?: string | null;
}

export const guruService = {
  async getTeachers() {
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data as TeacherRecord[];
  },

  async createTeacher(payload: Omit<TeacherRecord, "id">, photoFile?: File) {
    let photo_url = null;
    
    if (photoFile) {
      photo_url = await this.uploadPhoto(photoFile);
    }

    const { data, error } = await supabase
      .from("teachers")
      .insert([{ ...payload, photo_url }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTeacher(id: string, payload: Partial<TeacherRecord>, photoFile?: File) {
    let updatePayload = { ...payload };

    if (photoFile) {
      updatePayload.photo_url = await this.uploadPhoto(photoFile);
    }

    const { data, error } = await supabase
      .from("teachers")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTeacher(id: string) {
    const { error } = await supabase.from("teachers").delete().eq("id", id);
    if (error) throw error;
  },

  async uploadPhoto(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `teachers/${fileName}`;

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
