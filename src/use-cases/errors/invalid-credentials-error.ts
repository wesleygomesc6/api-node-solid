export class InvalidCredentialsError extends Error {
  constructor() {
    super('Dados incorretos.')
  }
}
