import { useContext } from "react";

import Link from "next/link";
import { FiLogOut } from "react-icons/fi"

import { AuthContext } from "../../contexts/AuthContext";

export function Header() {

    const { signOut } = useContext(AuthContext)

    return (
        <header className="h-20 ">
            <div className="max-w-[1120px] h-20 mx-auto px-8 flex justify-center items-center">
                <Link href={"/taskManager"}>
                    <h1 className="text-xl sm:text-3xl font-bold text-white">Gerenciador de <span className="text-red-900">tarefas</span></h1>
                </Link>

                <nav className="flex items-center">
                    <button className="ml-8 transform transition-transform duration-800 hover:scale-120" onClick={signOut}>
                        <FiLogOut color="#FFF" size={24}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}