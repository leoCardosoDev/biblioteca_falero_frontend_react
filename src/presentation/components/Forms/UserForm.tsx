import React from 'react';
import { Icon } from '../UI/Components';

interface UserFormProps {
    onCancel: () => void;
    onSave: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex flex-col gap-6">
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
                        <input className="w-full h-12 pl-11 pr-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="Ex: Ana Maria Souza" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium flex items-center gap-1">CPF <span className="text-red-400">*</span></label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Icon name="id_card" className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                        </div>
                        <input className="w-full h-12 pl-11 pr-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="000.000.000-00" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium flex items-center gap-1">Email <span className="text-red-400">*</span></label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Icon name="mail" className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                        </div>
                        <input type="email" className="w-full h-12 pl-11 pr-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="exemplo@email.com" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium">Telefone</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Icon name="call" className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                        </div>
                        <input type="tel" className="w-full h-12 pl-11 pr-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="(00) 00000-0000" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium">Endereço</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Icon name="location_on" className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                        </div>
                        <input className="w-full h-12 pl-11 pr-4 bg-[#192633] border border-[#324d67] rounded-lg text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="Rua, Número, Bairro" />
                    </div>
                </div>

                <div className="md:col-span-2 pt-2 border-t border-[#324d67]/50 mt-2">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Controle de Acesso</h3>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium flex items-center gap-1">Perfil de Acesso <span className="text-red-400">*</span></label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Icon name="badge" className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                        </div>
                        <select className="w-full h-12 pl-11 pr-10 bg-[#192633] border border-[#324d67] rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none cursor-pointer">
                            <option value="" disabled selected>Selecione o perfil</option>
                            <option value="admin">Administrador</option>
                            <option value="librarian">Bibliotecário</option>
                            <option value="assistant">Assistente</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#92adc9]">
                            <Icon name="arrow_drop_down" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium flex items-center gap-1">Status da Conta <span className="text-red-400">*</span></label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Icon name="toggle_on" className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                        </div>
                        <select className="w-full h-12 pl-11 pr-10 bg-[#192633] border border-[#324d67] rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none cursor-pointer">
                            <option value="active">Ativo</option>
                            <option value="inactive">Inativo</option>
                            <option value="blocked">Bloqueado</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#92adc9]">
                            <Icon name="arrow_drop_down" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#324d67]">
                <button onClick={onCancel} className="px-6 h-11 rounded-lg border border-[#324d67] text-[#92adc9] hover:text-white hover:bg-[#192633] transition-colors font-medium">Cancelar</button>
                <button onClick={onSave} className="flex items-center gap-2 px-6 h-11 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium shadow-lg shadow-primary/20 transition-all">
                    <Icon name="save" />
                    Salvar Usuário
                </button>
            </div>
        </div>
    );
};