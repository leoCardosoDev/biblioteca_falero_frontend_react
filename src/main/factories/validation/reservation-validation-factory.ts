import { Validation } from '@/presentation/protocols/validation'
import { ZodValidatorAdapter } from '@/presentation/adapters/validation/zod-validator-adapter'
import { reservationSchema } from '@/infra/validation/schemas/reservation-schema'
import { ReservationFormData } from '@/presentation/dtos/reservation-form-dto'

export const makeReservationValidation =
  (): Validation<ReservationFormData> => {
    return new ZodValidatorAdapter<ReservationFormData>(reservationSchema)
  }
