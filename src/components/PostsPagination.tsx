import { useEffect } from 'react';

import { useFetchData } from '../hooks/useFetchData';
import { usePagination } from '../hooks/usePagination';
import { Pagination } from './Pagination';

import { Table } from './table/Table';
import { TableHeader } from './table/TableHeader';
import { TableCell } from './table/TableCell';
import { TableRow } from './table/TableRow';

interface Post {
   userId: number;
   id: number;
   title: string;
   body: string;
   [key: string]: string | number;
}

interface DataProps {
   allData: Post[];
   getAllData: () => void;
   getData: (LIMIT_PER_PAGE: number, currentPage: number) => void;
   data: Post[];
}

export function PostsPagination() {
   const { allData, getAllData, getData, data }: DataProps = useFetchData();
   const {
      currentPage,
      limitPerPage,
      totalPages,
      totalButtons,
      handleItemsPerPage,
      firstButton,
      handlePagination,
   } = usePagination(allData);

   useEffect(() => {
      getAllData();
   }, []);

   useEffect(() => {
      getData(limitPerPage, currentPage);
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
               {data.map((item) => {
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
                     {data.length} de {limitPerPage} itens
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
