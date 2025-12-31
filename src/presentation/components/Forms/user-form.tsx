import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icon } from '../ui';
import { UserModel } from '@/domain/models/user-model';
import { maskCpf, maskRg, maskZipCode } from '@/presentation/helpers/mask-utils';

const userSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido (000.000.000-00)'),
    rg: z.string().min(5, 'RG inválido'),
    birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Data inválida'),
    role: z.enum(['admin', 'librarian', 'professor']),
    status: z.enum(['active', 'inactive']),
    address: z.object({
        street: z.string().min(1, 'Rua obrigatória'),
        number: z.string().min(1, 'Número obrigatório'),
        complement: z.string().optional(),
        neighborhood: z.string().min(1, 'Bairro obrigatório'),
        city: z.string().min(1, 'Cidade obrigatória'),
        state: z.string().length(2, 'Estado (UF) deve ter 2 letras'),
        zipCode: z.string().min(8, 'CEP inválido'),
    }),
});

export type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
    initialData?: UserModel;
    onCancel: () => void;
    onSave: (data: UserFormData) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData, onCancel, onSave }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: 'professor',
            status: 'active'
        }
    });

    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('cpf', maskCpf(event.target.value));
    };

    const handleRgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('rg', maskRg(event.target.value));
    };

    const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('address.zipCode', maskZipCode(event.target.value));
    };

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                email: initialData.email,
                cpf: initialData.cpf,
                rg: initialData.rg,
                birthDate: initialData.birthDate,
                role: initialData.role as 'admin' | 'librarian' | 'professor',
                status: initialData.status as 'active' | 'inactive',
                address: initialData.address || { street: '', number: '', neighborhood: '', city: '', state: '', zipCode: '' },
            });
        }
    }, [initialData, reset]);

    return (
        <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmit(onSave)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Informações Pessoais</h3>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-white text-sm font-medium flex items-center gap-1">Nome Completo <span className="text-red-400">*</span></label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Icon name="person" className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                            </div>
                            <input {...register('name')} className="w-full h-12 pl-11 pr-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="Ex: Ana Maria Souza" />
                        </div>
                        {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
                    </div>

                    {/* CPF */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium flex items-center gap-1">CPF <span className="text-red-400">*</span></label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Icon name="id_card" className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                {...register('cpf')}
                                onChange={handleCpfChange}
                                className="w-full h-12 pl-11 pr-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                                placeholder="000.000.000-00"
                            />
                        </div>
                        {errors.cpf && <span className="text-xs text-red-400">{errors.cpf.message}</span>}
                    </div>

                    {/* RG */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium flex items-center gap-1">RG <span className="text-red-400">*</span></label>
                        <input
                            {...register('rg')}
                            onChange={handleRgChange}
                            className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                            placeholder="00.000.000-0"
                        />
                        {errors.rg && <span className="text-xs text-red-400">{errors.rg.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-white text-sm font-medium flex items-center gap-1">Email <span className="text-red-400">*</span></label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Icon name="mail" className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                            </div>
                            <input type="email" {...register('email')} className="w-full h-12 pl-11 pr-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="exemplo@email.com" />
                        </div>
                        {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
                    </div>

                    {/* BirthDate */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium flex items-center gap-1">Data de Nascimento <span className="text-red-400">*</span></label>
                        <input type="date" {...register('birthDate')} className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" />
                        {errors.birthDate && <span className="text-xs text-red-400">{errors.birthDate.message}</span>}
                    </div>

                    <div className="md:col-span-2 pt-2 border-t border-[#324d67]/50 mt-2">
                        <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Endereço</h3>
                    </div>

                    {/* ZipCode */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium">CEP <span className="text-red-400">*</span></label>
                        <input
                            {...register('address.zipCode')}
                            onChange={handleZipCodeChange}
                            className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                            placeholder="00000-000"
                        />
                        {errors.address?.zipCode && <span className="text-xs text-red-400">{errors.address.zipCode.message}</span>}
                    </div>

                    {/* Street */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-white text-sm font-medium">Rua <span className="text-red-400">*</span></label>
                        <input {...register('address.street')} className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" />
                        {errors.address?.street && <span className="text-xs text-red-400">{errors.address.street.message}</span>}
                    </div>

                    {/* Number */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium">Número <span className="text-red-400">*</span></label>
                        <input {...register('address.number')} className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" />
                        {errors.address?.number && <span className="text-xs text-red-400">{errors.address.number.message}</span>}
                    </div>

                    {/* Neighborhood */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium">Bairro <span className="text-red-400">*</span></label>
                        <input {...register('address.neighborhood')} className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" />
                        {errors.address?.neighborhood && <span className="text-xs text-red-400">{errors.address.neighborhood.message}</span>}
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium">Cidade <span className="text-red-400">*</span></label>
                        <input {...register('address.city')} className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" />
                        {errors.address?.city && <span className="text-xs text-red-400">{errors.address.city.message}</span>}
                    </div>

                    {/* State */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium">Estado (UF) <span className="text-red-400">*</span></label>
                        <input {...register('address.state')} className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" maxLength={2} />
                        {errors.address?.state && <span className="text-xs text-red-400">{errors.address.state.message}</span>}
                    </div>


                    <div className="md:col-span-2 pt-2 border-t border-[#324d67]/50 mt-2">
                        <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Controle de Acesso</h3>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium">Perfil <span className="text-red-400">*</span></label>
                        <select {...register('role')} className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer">
                            <option value="professor">Professor</option>
                            <option value="librarian">Bibliotecário</option>
                            <option value="admin">Administrador</option>
                        </select>
                        {errors.role && <span className="text-xs text-red-400">{errors.role.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-medium">Status <span className="text-red-400">*</span></label>
                        <select {...register('status')} className="w-full h-12 px-4 bg-[#192633] border border-[#324d67] rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer">
                            <option value="active">Ativo</option>
                            <option value="inactive">Inativo</option>
                        </select>
                        {errors.status && <span className="text-xs text-red-400">{errors.status.message}</span>}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#324d67] mt-6">
                    <button type="button" onClick={onCancel} className="px-6 h-11 rounded-lg border border-[#324d67] text-[#92adc9] hover:text-white hover:bg-[#192633] transition-colors font-medium">Cancelar</button>
                    <button type="submit" className="flex items-center gap-2 px-6 h-11 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium shadow-lg shadow-primary/20 transition-all">
                        <Icon name="save" />
                        Salvar Usuário
                    </button>
                </div>
            </form>
        </div>
    );
};