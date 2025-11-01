export interface TokenPayload {
  exp: number;       // timestamp em segundos
  iat: number;       // emitido em
  iss: string;       // Issuer
  aud: string;       // Audience
  // outros claims da sua API se houver
}