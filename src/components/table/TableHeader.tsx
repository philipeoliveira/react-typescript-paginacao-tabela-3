import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableHeaderProps {
   children: ReactNode;
   otherClasses?: string;
}
export function TableHeader({ children, otherClasses }: TableHeaderProps) {
   return <th className={twMerge('p-3 text-left', otherClasses)}>{children}</th>;
}
