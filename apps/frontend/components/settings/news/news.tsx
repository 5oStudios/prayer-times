import React from 'react';
import { Button, Text, Textarea } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { selectNews, setNews } from '../../../lib/features/settings';

export type NewsType = {
  content: string;
};

type NewsFormType = {
  content: string;
};
function NewsForm({ language }: { language: string }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const newsLocal: NewsType[] = useSelector(selectNews);
  const isArabic = language === 'ar';
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsFormType>();

  const onSubmit = async (data: NewsFormType) => {
    const newNewsItem = { content: data.content };
    dispatch(setNews([...newsLocal, newNewsItem]));
    reset();
  };

  const handleDelete = async (index: number) => {
    const updatedNews = newsLocal.filter((_, i) => i !== index);
    dispatch(setNews(updatedNews));
  };

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

        <button
          type="submit"
          style={{
            marginTop: '1rem',
            backgroundColor: '#479ea3',
            padding: 8,
            borderRadius: 4,
            color: 'white',
          }}
        >
          {dictionary.settings.add}
        </button>
      </form>

      <div style={{ marginTop: '1rem', textAlign: isArabic ? 'left' : 'normal' }}>
        <Text>{dictionary.settings.newsComp.previousNews}</Text>
        {!newsLocal || newsLocal.length === 0 ? (
          <p>{dictionary.settings.newsComp.NoNewsAvailable}</p>
        ) : (
          newsLocal.map((item, index) => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }} key={index}>
              <strong style={{ width: '85%', marginTop: '1rem' }}>{item.content}</strong>
              <Button onClick={() => handleDelete(index)} style={{ backgroundColor: 'red' }}>
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
