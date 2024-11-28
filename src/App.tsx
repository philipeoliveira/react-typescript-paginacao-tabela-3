import { useState } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { users } from './data/users';

import { Button } from './components/Button';
import { Table } from './components/table/Table';
import { TableHeader } from './components/table/TableHeader';
import { TableCell } from './components/table/TableCell';
import { TableRow } from './components/table/TableRow';

/**
 * MAX_BUTTONS define a quantidade máxima de botões da paginação
 * É necessário que ela contenha somente números ímpares
 */
const MAX_BUTTONS = 5;
// define o máximo de itens que serão mostrados por página
const LIMIT_PER_PAGE = 5;

function App() {
   const [currentPage, setCurrentPage] = useState(1);
   const [limitPerPage, setLimitPerPage] = useState(LIMIT_PER_PAGE);

   const totalPages = Math.ceil(users.length / limitPerPage);
   // impede o excedente de botões quando existirem poucos registros
   const totalButtons = totalPages > MAX_BUTTONS ? MAX_BUTTONS : totalPages;
   // define a quantidade máxima de botões que ficarão à esquerda da página atual
   const maxButtonsLeft = (MAX_BUTTONS - 1) / 2;
   // impede o excedente de botões além do último
   const maxFirstButton = Math.max(totalPages - (MAX_BUTTONS - 1), 1);
   // define o primeiro botão da página atual
   const firstButton = Math.min(
      Math.max(currentPage - maxButtonsLeft, 1),
      maxFirstButton
   );

   function handleItemsPerPage(event: React.ChangeEvent<HTMLSelectElement>) {
      const valueNumber = Number(event.target.value);
      setLimitPerPage(valueNumber);
      setCurrentPage(1);
   }

   function handlePagination(pageNumber: number) {
      setCurrentPage(pageNumber);
   }

   return (
      <div className='max-w-6xl mx-auto flex flex-col gap-6 p-6'>
         <h1 className='bg-zinc-400 text-zinc-950 text-4xl max-sm:text-3xl font-medium p-2 my-2 text-center rounded-lg'>
            Paginação com React
         </h1>
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
               {users
                  .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
                  .map((user) => {
                     return (
                        <TableRow key={user.id}>
                           <TableCell>{user.id}</TableCell>
                           <TableCell>{user.firstName}</TableCell>
                           <TableCell>{user.lastName}</TableCell>
                           <TableCell otherClasses='max-sm:hidden'>
                              {user.email}
                           </TableCell>
                        </TableRow>
                     );
                  })}
            </tbody>
            <tfoot>
               <tr>
                  <TableCell colSpan={2} otherClasses='text-sm'>
                     {limitPerPage} de {users.length} itens
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
         <div className='flex items-center justify-between px-3'>
            <div className='flex items-center gap-3'>
               Itens por página:
               <select
                  id='items-per-page'
                  value={limitPerPage}
                  onChange={handleItemsPerPage}
                  aria-label='Selecione uma opção'
                  className='flex items-center justify-center gap-1 bg-zinc-400 border border-zinc-950 text-zinc-950 rounded-lg p-1 hover:bg-zinc-300 disabled:bg-zinc-700'
               >
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='15'>15</option>
                  <option value='20'>20</option>
               </select>
            </div>
            <ul className='flex gap-1 justify-center flex-wrap'>
               <li>
                  <Button
                     onClick={() => handlePagination(1)}
                     isDisabled={1 === currentPage}
                  >
                     <ChevronsLeft size={14} />
                     Primeira
                  </Button>
               </li>
               {Array.from({ length: totalButtons }).map((_, index) => {
                  const pageNumber = index + firstButton;
                  return (
                     <li key={pageNumber}>
                        <Button
                           onClick={() => handlePagination(pageNumber)}
                           isDisabled={pageNumber === currentPage}
                        >
                           {pageNumber}
                        </Button>
                     </li>
                  );
               })}
               <li>
                  <Button
                     onClick={() => handlePagination(totalPages)}
                     isDisabled={totalPages === currentPage}
                  >
                     Última
                     <ChevronsRight size={14} />
                  </Button>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default App;
