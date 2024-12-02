import { useEffect } from 'react';

import { usePosts } from '../hooks/usePosts';

import { usePagination } from '../hooks/usePagination';
import { Pagination } from './Pagination';

import { Table } from './table/Table';
import { TableHeader } from './table/TableHeader';
import { TableCell } from './table/TableCell';
import { TableRow } from './table/TableRow';

export function PostsPagination() {
   const { allPosts, getAllPosts, getPosts, posts } = usePosts();
   const {
      currentPage,
      limitPerPage,
      totalPages,
      totalButtons,
      handleItemsPerPage,
      firstButton,
      handlePagination,
   } = usePagination(allPosts);

   useEffect(() => {
      getAllPosts();
   }, []);

   useEffect(() => {
      getPosts(limitPerPage, currentPage);
   }, [currentPage]);

   return (
      <>
         <Table>
            <thead>
               <TableRow>
                  <TableHeader>Código</TableHeader>
                  <TableHeader>Título</TableHeader>
                  <TableHeader otherClasses='max-sm:hidden'>Texto</TableHeader>
               </TableRow>
            </thead>
            <tbody>
               {posts.map((item) => {
                  return (
                     <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.body}</TableCell>
                     </TableRow>
                  );
               })}
            </tbody>
            <tfoot>
               <tr>
                  <TableCell colSpan={2} otherClasses='text-sm'>
                     {limitPerPage} de {posts.length} itens
                  </TableCell>

                  <TableCell colSpan={2} otherClasses='text-sm text-right'>
                     <div className='flex max-sm:flex-col items-center justify-end gap-4 py-3'>
                        <span>
                           Página {currentPage} de {totalPages}
                        </span>
                     </div>
                  </TableCell>
               </tr>
            </tfoot>
         </Table>
         <Pagination
            pagination={{
               currentPage,
               limitPerPage,
               totalPages,
               totalButtons,
               handleItemsPerPage,
               firstButton,
               handlePagination,
            }}
         />
      </>
   );
}
