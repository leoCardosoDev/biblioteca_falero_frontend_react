
import React, { useState } from 'react';
import type { User } from '../../../domain/entities/User';
import { Input, Select } from './Input';
import { Button } from './Button';

interface UserFormProps {
  initialUser?: User | undefined;
  onSubmit: (user: Omit<User, 'id'> | User) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const UserForm: React.FC<UserFormProps> = ({ initialUser, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState<Partial<User>>(() => {
    if (initialUser) {
      return {
        ...initialUser,
        cpf: initialUser.cpf || '',
        rg: initialUser.rg || '',
        birthDate: initialUser.birthDate || '',
      };
    }
    return {
      name: '',
      email: '',
      role: 'user',
      cpf: '',
      rg: '',
      birthDate: '',
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value) error = 'Nome é obrigatório';
        else if (value.length < 3) error = 'Nome deve ter pelo menos 3 caracteres';
        break;
      case 'email':
        if (!value) error = 'Email é obrigatório';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email inválido';
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'cpf') {
      finalValue = formatCPF(value);
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    validateField(name, finalValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (initialUser && initialUser.id) {
      await onSubmit({ ...formData, id: initialUser.id } as User);
    } else {
      await onSubmit(formData as Omit<User, 'id'>);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Nome Completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: João Silva"
            required
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemplo@email.com"
            required
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <Select
          label="Função"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">Usuário</option>
          <option value="librarian">Bibliotecário</option>
          <option value="admin">Administrador</option>
        </Select>
        <Input
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="000.000.000-00"
          maxLength={14}
        />
        <Input
          label="RG"
          name="rg"
          value={formData.rg}
          onChange={handleChange}
          placeholder="00.000.000-0"
        />
        <Input
          label="Data de Nascimento"
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border-light dark:border-border-dark">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
};
