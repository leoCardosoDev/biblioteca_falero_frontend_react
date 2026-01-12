import { DomainErrorMessages } from '@/domain/constants/messages'

export const ValidationMessages = {
  RequiredField: 'Campo obrigatório'
} as const

export const ErrorMessages = {
  UnexpectedLogin: 'Erro inesperado: Falha no login',
  UnexpectedTryAgain: DomainErrorMessages.UnexpectedTryAgain,
  UnexpectedReload: 'Ocorreu um erro inesperado. Tente recarregar a página.'
} as const
