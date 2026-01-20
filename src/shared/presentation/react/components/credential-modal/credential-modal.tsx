import React from 'react'
import { z } from 'zod'
import { Modal, Select } from '@/shared/presentation/react/components/ui'
import {
  useCustomForm,
  Form,
  Field
} from '@/shared/presentation/react/components/ui/form'
import { ZodValidatorAdapter } from '@/shared/presentation/adapters/validation/zod-validator-adapter'

const credentialSchema = z.object({
  role: z.enum(['ADMIN', 'LIBRARIAN', 'PROFESSOR', 'STUDENT']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: 'A senha deve ter no mínimo 8 caracteres'
    })
    .refine((val) => !val || /[A-Z]/.test(val), {
      message: 'Deve conter letra maiúscula'
    })
    .refine((val) => !val || /[0-9]/.test(val), {
      message: 'Deve conter número'
    })
})

export type CredentialFormData = z.infer<typeof credentialSchema>

interface CredentialModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CredentialFormData) => void
  userName: string
  initialRole?: string
  initialStatus?: string
  error?: string | null
}

export function CredentialModal({
  isOpen,
  onClose,
  onSave,
  userName,
  initialRole,
  initialStatus,
  error
}: CredentialModalProps) {
  const methods = useCustomForm<CredentialFormData>({
    validator: new ZodValidatorAdapter(credentialSchema),
    mode: 'all',
    defaultValues: {
      role: (initialRole || 'STUDENT') as CredentialFormData['role'],
      status: (initialStatus || 'ACTIVE') as CredentialFormData['status'],
      password: ''
    }
  })

  React.useEffect(() => {
    if (isOpen) {
      methods.reset({
        role: (initialRole || 'STUDENT') as CredentialFormData['role'],
        status: (initialStatus || 'ACTIVE') as CredentialFormData['status'],
        password: ''
      })
    }
  }, [initialRole, initialStatus, isOpen, methods])

  const {
    formState: { isValid }
  } = methods

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Gerenciar Acesso"
      subtitle={`Defina o acesso para ${userName}`}
      maxWidth="max-w-md"
    >
      <Form form={methods} onSubmit={onSave} className="flex flex-col gap-6">
        {error && (
          <div className="rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-500">
            {error}
          </div>
        )}

        <Select
          {...methods.register('role')}
          id="role"
          label="Perfil"
          className="w-full"
        >
          <option value="PROFESSOR">Professor</option>
          <option value="LIBRARIAN">Bibliotecário</option>
          <option value="ADMIN">Administrador</option>
          <option value="STUDENT">Estudante</option>
        </Select>

        <Select
          {...methods.register('status')}
          id="status"
          label="Status"
          className="w-full"
        >
          <option value="ACTIVE">Ativo</option>
          <option value="INACTIVE">Inativo</option>
          <option value="BLOCKED">Bloqueado</option>
        </Select>

        <Field
          name="password"
          label="Senha (Deixe em branco para manter)"
          type="password"
          placeholder="********"
          icon="lock"
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
            disabled={!isValid}
            className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Salvar Alterações
          </button>
        </div>
      </Form>
    </Modal>
  )
}
