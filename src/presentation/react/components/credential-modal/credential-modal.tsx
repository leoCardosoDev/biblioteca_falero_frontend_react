import React from 'react'
import { z } from 'zod'
import { Modal } from '@/presentation/react/components/ui'
import {
  useCustomForm,
  Form,
  Field
} from '@/presentation/react/components/ui/form'

const credentialSchema = z.object({
  username: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 3,
      'O usuário deve ter no mínimo 3 caracteres'
    ),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter letra maiúscula')
    .regex(/[0-9]/, 'Deve conter número')
})

export type CredentialFormData = z.infer<typeof credentialSchema>

interface CredentialModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CredentialFormData) => void
  userName: string
}

export const CredentialModal: React.FC<CredentialModalProps> = ({
  isOpen,
  onClose,
  onSave,
  userName
}) => {
  const methods = useCustomForm<CredentialFormData>({
    schema: credentialSchema,
    mode: 'onChange'
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configurar Credenciais"
      subtitle={`Defina o acesso para ${userName}`}
      maxWidth="max-w-md"
    >
      <Form form={methods} onSubmit={onSave} className="flex flex-col gap-6">
        <Field
          name="username"
          label="Nome de Usuário (Opcional)"
          placeholder="username"
        />

        <Field
          name="password"
          label="Senha"
          type="password"
          placeholder="********"
          icon="lock"
          required
        />

        <div className="flex items-center justify-end gap-3 border-t border-[#324d67] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-[#324d67] px-4 font-medium text-[#92adc9] transition-colors hover:bg-[#192633] hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-600"
          >
            Salvar Senha
          </button>
        </div>
      </Form>
    </Modal>
  )
}
