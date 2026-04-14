import { supabase } from "@/lib/supabase";

export interface NewsRecord {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnail_url?: string | null;
  published_date: string;
  created_at?: string;
  updated_at?: string;
}

// Format Title into Slug (e.g. "Juara Lomba" -> "juara-lomba")
export const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const beritaService = {
  async getNews() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("published_date", { ascending: false });
      
    if (error) throw error;
    return data as NewsRecord[];
  },

  async getNewsBySlug(slug: string) {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .single();
      
    if (error) throw error;
    return data as NewsRecord;
  },

  async createNews(payload: Omit<NewsRecord, "id"|"created_at"|"updated_at">, thumbnailFile?: File) {
    let thumbnail_url = null;
    
    if (thumbnailFile) {
      thumbnail_url = await this.uploadThumbnail(thumbnailFile);
    }

    const { data, error } = await supabase
      .from("news")
      .insert([{ ...payload, thumbnail_url }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateNews(id: string, payload: Partial<NewsRecord>, thumbnailFile?: File) {
    let updatePayload = { ...payload, updated_at: new Date().toISOString() };

    if (thumbnailFile) {
      updatePayload.thumbnail_url = await this.uploadThumbnail(thumbnailFile);
    }

    const { data, error } = await supabase
      .from("news")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteNews(id: string) {
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) throw error;
  },

  async uploadThumbnail(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `news_${Date.now()}.${fileExt}`;
    const filePath = `news_thumbnails/${fileName}`;

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
