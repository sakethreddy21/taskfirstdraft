import axios from 'axios';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { IStoreState } from '@/store/store';

type request = {
  method?: 'get' | 'put' | 'post' | 'delete';
  body?: string | object | null;
  url: string;
  accessToken?: string;
  contentType?: string;
};

const useAuthorizedHttp = () => {
  const accessToken = useSelector(
    (state: IStoreState) => state.app.accessToken
  );
  return useCallback(
    (requestOptions: request) =>
      axios({
        method: requestOptions.method
          ? requestOptions.method.toLowerCase()
          : 'get',
        url: requestOptions.url,
        headers: {
          Authorization: `Bearer ${
            requestOptions.accessToken
              ? requestOptions.accessToken
              : accessToken
          }`,
          'Content-Type': `${
            requestOptions.contentType
              ? requestOptions.contentType
              : 'application/json'
          }`,
        },
        data:
          requestOptions.body &&
          requestOptions.contentType === 'multipart/form-data'
            ? requestOptions.body
            : JSON.stringify(requestOptions.body),
      }),
    [accessToken]
  );
};

export default useAuthorizedHttp;
