import { useState } from 'react';

export function useFetchData() {
   const [allData, setAllData] = useState([]);
   const [data, setData] = useState([]);

   async function getAllData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setAllData(data);
   }

   async function getData(LIMIT_PER_PAGE: number, currentPage: number) {
      const start =
         (currentPage - 1) * LIMIT_PER_PAGE <= 0 ? 0 : (currentPage - 1) * LIMIT_PER_PAGE;

      const response = await fetch(
         `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${LIMIT_PER_PAGE}`
      );
      const data = await response.json();
      setData(data);
   }

   return { allData, data, getAllData, getData };
}
