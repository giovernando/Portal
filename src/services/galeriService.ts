import { supabase } from "@/lib/supabase";

export interface GalleryRecord {
  id: string;
  title: string;
  description?: string | null;
  image_url: string;
  category?: string | null;
  created_at?: string;
}

export const galeriService = {
  async getGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data as GalleryRecord[];
  },

  async createGalleryItem(payload: Omit<GalleryRecord, "id"|"image_url"|"created_at">, imgFile: File) {
    const image_url = await this.uploadImage(imgFile);

    const { data, error } = await supabase
      .from("gallery")
      .insert([{ ...payload, image_url }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteGalleryItem(id: string) {
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) throw error;
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `gallery_${Date.now()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

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
