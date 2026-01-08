import React from 'react'
import { useFormContext } from '@/presentation/react/components/ui/form'
import { Input, FormSection, Select } from '@/presentation/react/components/ui'
import { maskCpf, maskRg } from '@/presentation/react/helpers/mask-utils'
import { UserFormData } from '../../user-schema'

export const UserGeneralInfo: React.FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<UserFormData>()

  const watchedCpf = watch('cpf')
  const watchedRg = watch('rg')

  return (
    <FormSection title="Informações Pessoais">
      <Input
        {...register('name')}
        id="name"
        label="Nome Completo"
        icon="person"
        placeholder="Ex: Ana Maria Souza"
        error={errors.name?.message}
        className="md:col-span-2"
        required
      />

      <Input
        {...register('cpf')}
        id="cpf"
        label="CPF"
        icon="id_card"
        value={watchedCpf || ''}
        placeholder="000.000.000-00"
        onChange={(e) => {
          setValue('cpf', maskCpf(e.target.value), { shouldValidate: true })
        }}
        error={errors.cpf?.message}
        required
      />

      <Input
        {...register('rg')}
        id="rg"
        label="RG"
        value={watchedRg || ''}
        placeholder="00.000.000-0"
        onChange={(e) => {
          setValue('rg', maskRg(e.target.value), { shouldValidate: true })
        }}
        error={errors.rg?.message}
        required
      />

      <Select
        {...register('gender')}
        id="gender"
        label="Gênero"
        error={errors.gender?.message}
        required
      >
        <option value="MALE">Masculino</option>
        <option value="FEMALE">Feminino</option>
        <option value="OTHER">Outro</option>
      </Select>

      <Input
        {...register('email')}
        id="email"
        label="Email"
        icon="mail"
        type="email"
        placeholder="exemplo@email.com"
        error={errors.email?.message}
        className="md:col-span-2"
        required
      />
    </FormSection>
  )
}
