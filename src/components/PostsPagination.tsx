import data from '../data/users';

import { Table } from './table/Table';
import { TableHeader } from './table/TableHeader';
import { TableCell } from './table/TableCell';
import { TableRow } from './table/TableRow';

import { usePagination } from '../hooks/usePagination';
import { Pagination } from './Pagination';

export function PostsPagination() {
   const {
      currentPage,
      limitPerPage,
      totalPages,
      totalButtons,
      handleItemsPerPage,
      firstButton,
      handlePagination,
   } = usePagination(data);

   return (
      <>
         <Table>
            <thead>
               <TableRow>
                  <TableHeader>Código</TableHeader>
                  <TableHeader>Nome</TableHeader>
                  <TableHeader>Sobrenome</TableHeader>
                  <TableHeader otherClasses='max-sm:hidden'>E-mail</TableHeader>
               </TableRow>
            </thead>
            <tbody>
               {data
                  .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
                  .map((item) => {
                     return (
                        <TableRow key={item.id}>
                           <TableCell>{item.id}</TableCell>
                           <TableCell>{item.firstName}</TableCell>
                           <TableCell>{item.lastName}</TableCell>
                           <TableCell otherClasses='max-sm:hidden'>
                              {item.email}
                           </TableCell>
                        </TableRow>
                     );
                  })}
            </tbody>
            <tfoot>
               <tr>
                  <TableCell colSpan={2} otherClasses='text-sm'>
                     {limitPerPage} de {data.length} itens
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
