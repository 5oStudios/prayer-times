import React from 'react';
import { Text, Input, Textarea, Button, Center } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { addNews, NewsType, selectNews } from '../../lib/features/settings';
import { useDictionary } from '../../app/[lang]/dictionary-provider';

function NewsForm() {
  const dictionary = useDictionary();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsType>();
  const dispatch = useDispatch();
  const news = useSelector(selectNews);

  const onSubmit = (data: NewsType) => {
    dispatch(addNews(data));
    reset();
  };

  return (
    <div>
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

        <Center style={{ marginTop: '1rem' }}>
          <Button type="submit">{dictionary.settings.add}</Button>
        </Center>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Text>{dictionary.settings.newsComp.previousNews}</Text>
        {!news || news.length === 0 ? (
          <p>{dictionary.settings.newsComp.NoNewsAvailable}</p>
        ) : (
          <ul>
            {news.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NewsForm;
