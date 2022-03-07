// Target the module containing the `ProcessEnv` interface
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare namespace NodeJS {
  // Merge the existing `ProcessEnv` definition with ours
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    MY_AWS_REGION: string;
    MY_AWS_TABLENAME: string;
    MY_AWS_ACCESS_KEY: string;
    MY_AWS_SECRET_ACCESS_KEY: string;

    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PORT: number; // 587
    EMAIL_FROM: string;
  }
}
