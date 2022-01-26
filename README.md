# Driver OAuth para o AdonisJS Ally
Este pacote implementa um driver de autenticação do [SUAP](https://suap.ifrn.edu.br) para o [adonis ally](https://docs.adonisjs.com/guides/auth/social) (Autenticador de rede social do [AdonisJS](https://docs.adonisjs.com/))

## Instalação
**ATENÇÃO**: Esta instalação partirá da suposição de que as instruções de instalação do Ally foram seguidas corretamente, estando este instalado e configurado.

Realize a instalação do pacote utilizando o `npm` ou `yarn`.
```
npm install adonis-ally-suap
```
ou 
```
yarn add adonis-ally-suap
```

Realize a configuração do pacote com o comando:
```
node ace configure adonis-ally-suap
```

Altere o arquivo `contracts\ally.ts` para conter o mapeamento de autenticação do SUAP.

```ts
//Não esquecer de importar o driver e sua configuração
import { SuapDriver, SuapDriverConfig } from 'adonis-ally-suap/build/standalone'

declare module '@ioc:Adonis/Addons/Ally' {
  interface SocialProviders {
    // ... outros mapeamentos
    suap: {
      config: SuapDriverConfig
      implementation: SuapDriver
    }
  }
}
```

Abra o arquivo `env.ts` e acrescente as duas variáveis de ambiente:

```ts
export default Env.rules({
  //...
  SUAP_CLIENT_ID: Env.schema.string(),
  SUAP_CLIENT_SECRET: Env.schema.string(),
  //...
})
```

Altere o arquivo `config/ally.ts`, para acrescentar o driver em sua configuração:
```ts
const allyConfig: AllyConfig = {
  // ... other drivers
  suap: {
    driver: 'suap',
    clientId: Env.get('SUAP_CLIENT_ID'),
    clientSecret: Env.get('SUAP_CLIENT_SECRET'),
    callbackUrl: 'http://localhost:3333/suap/callback',
  },
}
```

Observe que será necessário configurar corretamente o *callback* para receber o retorno do SUAP, mas uma vez que a instalação esteja realizada, a [documentação do ally](https://docs.adonisjs.com/guides/auth/social) é a mesma para qualquer autenticador OAuth.