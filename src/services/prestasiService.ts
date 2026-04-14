import { supabase } from "@/lib/supabase";

export interface PrestasiRecord {
  id: string;
  judul: string;
  slug: string;
  tahun: string;
  tingkat: string;
  siswa: string;
  kategori: "akademik" | "olahraga" | "seni" | "lainnya";
  img_url?: string | null;
  deskripsi?: string | null;
  created_at?: string;
}

export const generatePrestasiSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const prestasiService = {
  async getAchievements() {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("tahun", { ascending: false });
    
    if (error) throw error;
    return data as PrestasiRecord[];
  },

  async getAchievementBySlug(slug: string) {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("slug", slug)
      .single();
    
    if (error) throw error;
    return data as PrestasiRecord;
  },

  async createAchievement(payload: Omit<PrestasiRecord, "id"|"created_at">, imgFile?: File) {
    let img_url = null;
    if (imgFile) {
      img_url = await this.uploadImage(imgFile);
    }

    const { data, error } = await supabase
      .from("achievements")
      .insert([{ ...payload, img_url }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateAchievement(id: string, payload: Partial<PrestasiRecord>, imgFile?: File) {
    let updatePayload = { ...payload };
    if (imgFile) {
      updatePayload.img_url = await this.uploadImage(imgFile);
    }

    const { data, error } = await supabase
      .from("achievements")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteAchievement(id: string) {
    const { error } = await supabase.from("achievements").delete().eq("id", id);
    if (error) throw error;
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `achievement_${Date.now()}.${fileExt}`;
    const filePath = `achievements/${fileName}`;

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
