import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '../components/Button';

interface PaginationProps {
   currentPage: number;
   limitPerPage: number;
   totalPages: number;
   totalButtons: number;
   handleItemsPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
   firstButton: number;
   handlePagination: (pageNumber: number) => void;
}

export function Pagination({ pagination }: { pagination: PaginationProps }) {
   const {
      currentPage,
      limitPerPage,
      totalPages,
      totalButtons,
      handleItemsPerPage,
      firstButton,
      handlePagination,
   } = pagination;

   return (
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
               <Button onClick={() => handlePagination(1)} isDisabled={1 === currentPage}>
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
   );
}
