import type { GeneratedLanguage } from './languageTypes'
import { supabase } from './supabase'

export interface SavedLanguage {
  id: string
  name: string
  language: GeneratedLanguage
  created_at: string
  updated_at: string
}

export async function listSavedLanguages() {
  const { data, error } = await supabase.from('saved_languages')
    .select('id, name, language, created_at, updated_at').order('updated_at', { ascending: false })
  if (error) throw error
  return data as unknown as SavedLanguage[]
}

export async function saveLanguage(name: string, language: GeneratedLanguage) {
  const { error } = await supabase.from('saved_languages')
    .upsert({ name, language, updated_at: new Date().toISOString() }, { onConflict: 'user_id,name' })
  if (error) throw error
}

export async function deleteSavedLanguage(id: string) {
  const { error } = await supabase.from('saved_languages').delete().eq('id', id)
  if (error) throw error
}
