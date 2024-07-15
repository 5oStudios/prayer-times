import React, { useEffect, useState } from 'react';
import { Text, Textarea, Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { setNews, selectNews } from '../../../lib/features/settings';
import {
  createContent,
  deleteContent,
  getHadith,
  hadithSupbaseType,
} from 'apps/frontend/lib/database/actions';

import supabase from '../../../lib/database/CreateClient';

type NewsType = {
  content: string;
};

type NewsFormType = {
  content: string;
};
function NewsForm({ language }: { language: string }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const [supbaseData, setSupbaseData] = useState<hadithSupbaseType[]>([]);
  const newsLocal: NewsType[] = useSelector(selectNews);
  const isArabic = language === 'ar';
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsFormType>();

  const onSubmit = async (data: NewsFormType) => {
    // const newNewsItem = { content: data.content };
    // dispatch(setNews([...newsLocal, newNewsItem]));
    await createContent(data.content);
    reset();
  };

  const handleDelete = async (index: number) => {
    // const updatedNews = newsLocal.filter((_, i) => i !== index);
    // dispatch(setNews(updatedNews));
    await deleteContent(index);
  };

  useEffect(() => {
    async function getSupabaseData() {
      const supbaseData = await getHadith();
      setSupbaseData(supbaseData);
    }
    
    // Subscribe to changes in the 'hadith' table
    const subscription = supabase
    .channel('custom-all-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'hadith' }, (payload) => {
      console.log('Change received!', payload);
      getSupabaseData();
    })
    .subscribe();
    
    getSupabaseData();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Text style={{ marginTop: '0.5rem' }}>{dictionary.settings.newsComp.createNews}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="content">{dictionary.settings.newsComp.newsContent}</label>
          <Textarea
            id="content"
            minRows={2}
            maxRows={4}
            {...register('content', { required: true })}
            placeholder={dictionary.settings.newsComp.newsContentPlaceholder}
          />
          {errors.content && <span>{dictionary.settings.requiredField}</span>}
        </div>

        <Button type="submit" style={{ marginTop: '1rem' }}>
          {dictionary.settings.add}
        </Button>
      </form>

      <div style={{ marginTop: '1rem', textAlign: isArabic ? 'left' : 'normal' }}>
        <Text>{dictionary.settings.newsComp.previousNews}</Text>
        {!supbaseData || supbaseData.length === 0 ? (
          <p>{dictionary.settings.newsComp.NoNewsAvailable}</p>
        ) : (
          supbaseData.map((item, index) => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }} key={item.id}>
              <strong style={{ width: '85%', marginTop: '1rem' }}>{item.content}</strong>
              <Button onClick={() => handleDelete(item.id)} style={{ backgroundColor: 'red' }}>
                <MdDelete />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NewsForm;
