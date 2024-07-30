import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProps) {
    return (
        <input className="mb-4 h-10 rounded-lg bg-dark-900 text-white p-4 border border-gray-100 placeholder-white" {...rest}/>
    )
}

export function TextArea({...rest}: TextAreaProps) {
    return (
        <textarea className="mb-4 h-10 rounded-lg bg-dark-900 text-white p-4 border border-gray-100 placeholder-white" {...rest}></textarea>
    )
}