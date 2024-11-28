import { ReactNode } from 'react';

interface ButtonProps {
   children: ReactNode;
   isDisabled?: boolean;
   onClick: () => void;
}

export function Button({ children, isDisabled, ...props }: ButtonProps) {
   return (
      <button
         type='button'
         className='flex items-center justify-center gap-1 bg-zinc-400 border border-zinc-950 text-zinc-950 rounded-lg py-1 px-3 hover:bg-zinc-300 disabled:bg-zinc-700'
         disabled={isDisabled}
         {...props}
      >
         {children}
      </button>
   );
}
