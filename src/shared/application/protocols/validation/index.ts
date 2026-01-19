export type ValidationResult<T = unknown> = {
  isValid: boolean
  data?: T
  errors?: Record<string, string>
}

export interface Validation<T = unknown> {
  validate: (input: unknown) => ValidationResult<T>
}
