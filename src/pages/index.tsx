import { useContext, FormEvent, useState } from "react";

import Head from "next/head";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import { toast } from "react-toastify";

import Link from "next/link";

import { canSSRGuest } from "../utils/canSSRGuest";

import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {

    e.preventDefault();

    if(email === '' || password === '') {
      toast.warning('Preencha todos os campos');
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }
    
    await signIn(data)
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Gerenciado de Tarefas - Faça seu login</title>
      </Head>
      <div className="min-h-[100vh] flex justify-center items-center flex-col bg-grey-900">
        <h1 className="text-2xl md:text-6xl font-bold text-white">Gerenciador de <span className="text-red-900">tarefas</span></h1>

        <div className="mt-8 w-full md:w-[600px] flex items-center justify-center flex-col py-8 px-8">
          <form className="w-11/12 flex flex-col" onSubmit={handleLogin}>
            <Input type="text" placeholder="Digite o seu email" value={email} onChange={ (e) => setEmail(e.target.value)}/>

            <Input type="password" placeholder="Sua senha" value={password} onChange={ (e) => setPassword(e.target.value)}/>

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          <Link href="/signup" className="mt-4">   
            <span className="text-white cursor-pointer">Não possui uma conta? Cadastre-se</span>
          </Link>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRGuest( async (ctx) => {
  
  return {
    props: {}
  }
})