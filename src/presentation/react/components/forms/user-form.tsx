import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '../ui';
import { User } from '@/domain/models/user';
import { UserGeneralInfo } from './parts/user/UserGeneralInfo';
import { UserAddress } from './parts/user/UserAddress';
import { UserAccessControl } from './parts/user/UserAccessControl';
import { userSchema, UserFormData } from './user-schema';

export type { UserFormData };

interface UserFormProps {
    initialData?: User;
    onCancel: () => void;
    onSave: (data: UserFormData) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData, onCancel, onSave }) => {
    const methods = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: 'PROFESSOR',
            status: 'ACTIVE'
        }
    });

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                email: initialData.email,
                cpf: initialData.cpf,
                rg: initialData.rg,
                role: initialData.role as 'ADMIN' | 'LIBRARIAN' | 'PROFESSOR' | 'STUDENT',
                status: initialData.status as 'ACTIVE' | 'INACTIVE' | 'BLOCKED',
                address: initialData.address || { street: '', number: '', neighborhood: '', city: '', state: '', zipCode: '' },
            });
        }
    }, [initialData, reset]);

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col gap-6">
                <form onSubmit={handleSubmit(onSave)} noValidate>
                    <div className="flex flex-col gap-8">
                        <UserGeneralInfo />
                        <UserAddress />
                        <UserAccessControl />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200/10 dark:border-slate-800/50 mt-8">
                        <button type="button" onClick={onCancel} className="px-6 h-11 rounded-lg border border-slate-200/10 dark:border-slate-800/50 text-slate-500 dark:text-[#92adc9] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#192633] transition-colors font-medium">Cancelar</button>
                        <button type="submit" className="flex items-center gap-2 px-6 h-11 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium shadow-lg shadow-primary/20 transition-all">
                            <Icon name="save" />
                            Salvar Usuário
                        </button>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};