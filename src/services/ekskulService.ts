import { supabase } from "@/lib/supabase";

export interface EkskulRecord {
  id: string;
  name: string;
  description?: string | null;
  schedule?: string | null;
  coordinator?: string | null;
  image_url?: string | null;
  created_at?: string;
}

export const ekskulService = {
  async getEkskul() {
    const { data, error } = await supabase
      .from("extracurriculars")
      .select("*")
      .order("name", { ascending: true });
    
    if (error) throw error;
    return data as EkskulRecord[];
  },

  async createEkskul(payload: Omit<EkskulRecord, "id"|"created_at">, imgFile?: File) {
    let image_url = null;
    if (imgFile) {
      image_url = await this.uploadImage(imgFile);
    }

    const { data, error } = await supabase
      .from("extracurriculars")
      .insert([{ ...payload, image_url }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEkskul(id: string, payload: Partial<EkskulRecord>, imgFile?: File) {
    let updatePayload = { ...payload };
    if (imgFile) {
      updatePayload.image_url = await this.uploadImage(imgFile);
    }

    const { data, error } = await supabase
      .from("extracurriculars")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteEkskul(id: string) {
    const { error } = await supabase.from("extracurriculars").delete().eq("id", id);
    if (error) throw error;
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `ekskul_${Date.now()}.${fileExt}`;
    const filePath = `ekskul/${fileName}`;

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
