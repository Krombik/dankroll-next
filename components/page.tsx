import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { State } from '../interfaces';

interface PageProps {
  title: string;
}

const selectData = createSelector(
  (state: State) => state.error,
  (state: State) => state.allPostsList,
  (error, allPostsList) => ({ error, allPostsList }),
);

const Page: React.FunctionComponent<PageProps> = ({ title }: PageProps) => {
  const { error, allPostsList } = useSelector(selectData);

  return (
    <div>
      <h1>{title}</h1>
      {allPostsList &&
        allPostsList.sort((a, b) => b.id - a.id).map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <div>{item.body}</div>
            <Link as={`/posts/${item.id}`} href="/posts/[id]">
              <a className="hover:underline">See more...</a>
            </Link>
          </div>
        ))
      }
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

export default Page;
