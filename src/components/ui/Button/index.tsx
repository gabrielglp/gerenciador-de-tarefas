import { ReactNode, ButtonHTMLAttributes } from "react";

import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?: boolean,
    children: ReactNode,
}

export function Button({ loading, children, ...rest }: ButtonProps) {
    return (
        <button className={`max-w-[600px] bg-red-900 border-0 p-2 text-white rounded-lg hover:brightness-125 duration-500 transition justify-center flex 
        ${ loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading} {...rest}>
            { loading ? (
                <FaSpinner className="animate-animate" color="#FFF" size={16}/>
            ) : (
                <a className="text-white" href="">{children}</a>
            )}
        </button>
    )
}