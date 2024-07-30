import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// função para visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        // se o user tentar acessar e ja estiver logado
        if(cookies['@nextauth.token']) {
            return {
                redirect: {
                    destination: '/taskManager',
                    permanent: false,
                }
            }
        }

        return await fn(ctx);

    }

}