export class InvalidNameError extends Error {
  constructor(name: string) {
    super(`Invalid name: ${name}`)
    this.name = 'InvalidNameError'
  }
}
