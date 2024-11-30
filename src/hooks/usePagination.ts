import { useState } from 'react';
/**
 * MAX_BUTTONS define a quantidade máxima de botões da paginação
 * É necessário que ela contenha somente números ímpares
 */
const MAX_BUTTONS = 5;
// define o máximo de itens que serão mostrados por página
const LIMIT_PER_PAGE = 5;

interface DataItem<T> {
   [key: string]: T;
}

export function usePagination<T, U extends DataItem<T>>(data: U[]) {
   const [currentPage, setCurrentPage] = useState(1);
   const [limitPerPage, setLimitPerPage] = useState(LIMIT_PER_PAGE);

   const totalPages = Math.ceil(data.length / limitPerPage);
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

   return {
      currentPage,
      limitPerPage,
      totalPages,
      totalButtons,
      handleItemsPerPage,
      firstButton,
      handlePagination,
   };
}
