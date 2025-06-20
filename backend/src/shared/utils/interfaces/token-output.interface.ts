export interface TokenOutputPropsInterface {
  token: string;
  expires_in: number;
}

export interface TokensOutputInterface {
  auth_tokens: {
    access_token: TokenOutputPropsInterface;
    refresh_token: TokenOutputPropsInterface;
  };
}
