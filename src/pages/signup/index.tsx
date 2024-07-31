import { FormEvent, useContext, useState } from "react";

import Head from "next/head";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

import { AuthContext } from "../../contexts/AuthContext";

import { toast } from "react-toastify";

import Link from "next/link";

// type SignUpData = {
//   email: string;
//   password: string;
//   name: string;
// };

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  
  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast.warning('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      await signUp({ email, name, password });
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error('Email já está em uso');
      }
    } finally {
      setLoading(false);
    }
}

  return (
    <>
      <Head>
        <title>Faça o seu cadastro agora!</title>
      </Head>
      <div className="min-h-[100vh] flex justify-center items-center flex-col bg-grey-900">
        <h1 className="text-2xl md:text-6xl font-bold text-white">Gerenciador de <span className="text-red-900">tarefas</span></h1>

        <div className="mt-8 w-full md:w-[600px] flex items-center justify-center flex-col py-8 px-8">
          <h1 className="text-white pb-4 font-semibold text-xl md:text-3xl">Criando sua conta</h1>

          <form className="w-11/12 flex flex-col" onSubmit={handleSignUp}>
            <Input type="text" placeholder="Digite seu nome" value={name} onChange={ (e) => setName(e.target.value)}/>

            <Input type="text" placeholder="Digite o seu email" value={email} onChange={ (e) => setEmail(e.target.value)}/>

            <Input type="password" placeholder="Sua senha" value={password} onChange={ (e) => setPassword(e.target.value)}/>

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link href="/" className="mt-4">   
            <span className="text-white cursor-pointer">Já possui uma conta? Faça o login!</span>
          </Link>
        </div>
      </div>
    </>
  );
}