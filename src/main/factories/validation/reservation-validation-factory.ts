import type { Validation } from '@/shared/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/shared/presentation/adapters/validation/zod-validator-adapter'
import { reservationSchema } from '@/shared/infra/validation/schemas/reservation-schema'
import type { ReservationFormData } from '@/shared/presentation/dtos/reservation-form-dto'

export const makeReservationValidation =
  (): Validation<ReservationFormData> => {
    return new ZodValidatorAdapter<ReservationFormData>(reservationSchema)
  }
