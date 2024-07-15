import supabase  from './CreateClient';

export type hadithSupbaseType = {
  id: number;
  content: string;
  created_at: Date;
};

async function createContent(content: string) {
  const { data, error } = await supabase
    .from('hadith')
    .insert([{ content: content }])
    .select();

  if (error) {
    console.error('Error inserting content:', error);
  }

  return data;
}

async function getHadith(): Promise<hadithSupbaseType[]> {
  const { data, error } = await supabase.from('hadith').select('*');

  if (error) {
    console.error('Error fetching hadith:', error);
    return [];
  }

  return data ? data : [];
}

async function deleteContent(id: number) {
  const { error } = await supabase.from('hadith').delete().eq('id', id);

  if (error) {
    console.error('Error deleting content:', error);
  }
}

export { createContent, getHadith, deleteContent };
