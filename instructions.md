The package has been configured successfully.

Make sure to first define the mapping inside the `contracts/ally.ts` file as follows.

```ts
import { SuapDriver, SuapDriverConfig } from 'adonis-ally-suap/build/standalone'

declare module '@ioc:Adonis/Addons/Ally' {
  interface SocialProviders {
    // ... other mappings
    suap: {
      config: SuapDriverConfig
      implementation: SuapDriver
    }
  }
}
```

Ally config relies on environment variables for the client id and secret.
We recommend you to validate environment variables inside the `env.ts` file.

## Variables for SUAP driver

```ts
SUAP_CLIENT_ID: Env.schema.string(),
SUAP_CLIENT_SECRET: Env.schema.string(),
```

## Ally config for SUAP driver
Update `config/ally.ts`
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