export type ValidationResult<T = unknown> = {
  isValid: boolean
  data?: T
  errors?: Record<string, string> // Simple key-value for errors
}

export interface Validation<T = unknown> {
  validate: (input: unknown) => ValidationResult<T>
}
