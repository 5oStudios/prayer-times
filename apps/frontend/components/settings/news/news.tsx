import React, { useState } from 'react';
import { Text, Input, Textarea, Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { setNews, selectNews } from '../../../lib/features/settings';

type NewsType = {
  title: string;
  content: string;
};

type NewsFormType = {
  title: string;
  content: string;
};

function NewsForm() {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const newsLocal: NewsType[] = useSelector(selectNews);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsFormType>();
  const [news, setNew] = useState<NewsType[]>([]);

  const onSubmit = (data: NewsFormType) => {
    const newNewsItem = { title: data.title, content: data.content };
    setNew([...news, newNewsItem]);
    dispatch(setNews([...newsLocal, newNewsItem]));
    reset();
  };

  const handleDelete = (index: number) => {
    const updatedNews = news.filter((_, i) => i !== index);
    setNew(updatedNews);
    dispatch(setNews(updatedNews));
  };

  return (
    <div style={{ width: '100%' }}>
      <Text style={{ marginTop: '0.5rem' }}>{dictionary.settings.newsComp.createNews}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">{dictionary.settings.newsComp.newsTitle}</label>
          <Input
            id="title"
            type="text"
            {...register('title', { required: true })}
            placeholder={dictionary.settings.newsComp.newsTitlePlaceholder}
          />
          {errors.title && <span>{dictionary.settings.requiredField}</span>}
        </div>

        <div>
          <label htmlFor="content">{dictionary.settings.newsComp.newsContent}:</label>
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

      <div style={{ marginTop: '1rem' }}>
        <Text>{dictionary.settings.newsComp.previousNews}</Text>
        {!newsLocal || newsLocal.length === 0 ? (
          <p>{dictionary.settings.newsComp.NoNewsAvailable}</p>
        ) : (
          <ul style={{ width: '100%' }}>
            {news.map((item, index) => (
              <div style={{ display: 'flex', flexWrap: 'wrap' }} key={index}>
                <li style={{ width: '70%', marginTop: '1rem' }}>
                  <strong>{item.title}</strong>
                  <p>{item.content}</p>
                </li>
                <Button onClick={() => handleDelete(index)}>
                  <Text style={{ fontSize: '0.5rem' }}>{dictionary.settings.delete}</Text>
                </Button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NewsForm;
