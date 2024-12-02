import { useState } from 'react';

interface Post {
   userId: number;
   id: number;
   title: string;
   body: string;
}

export function usePosts() {
   const [allPosts, setAllPosts] = useState<Post[]>([]);
   const [posts, setPosts] = useState<Post[]>([]);

   async function getAllPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setAllPosts(data);
   }

   async function getPosts(LIMIT_PER_PAGE: number, currentPage: number) {
      const start =
         (currentPage - 1) * LIMIT_PER_PAGE <= 0 ? 0 : (currentPage - 1) * LIMIT_PER_PAGE;

      const response = await fetch(
         `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${LIMIT_PER_PAGE}`
      );
      const data = await response.json();
      setPosts(data);
   }

   return { allPosts, posts, getAllPosts, getPosts };
}
