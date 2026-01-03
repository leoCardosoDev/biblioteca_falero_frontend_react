import React from 'react';
import { Icon } from '../ui';

interface LoanFormProps {
    onCancel: () => void;
    onSave: () => void;
}

export const LoanForm: React.FC<LoanFormProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                    <Icon name="person_search" className="text-[#92adc9] text-lg" />
                    Leitor / Usuário
                </label>
                <div className="relative group">
                    <select className="w-full h-12 md:h-14 rounded-lg bg-[#192633] border border-[#324d67] text-white px-4 focus:ring-2 focus:ring-primary focus:border-primary appearance-none cursor-pointer">
                        <option value="" disabled selected>Buscar por nome ou ID...</option>
                        <option value="user1">Ana Silva (ID: 00124) - Membro Ativo</option>
                        <option value="user2">Carlos Oliveira (ID: 00356) - Professor</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#92adc9]">
                        <Icon name="expand_more" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                    <Icon name="menu_book" className="text-[#92adc9] text-lg" />
                    Obra ou Exemplar
                </label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#92adc9]">
                        <Icon name="qr_code_scanner" />
                    </div>
                    <input className="w-full h-12 md:h-14 rounded-lg bg-[#192633] border border-[#324d67] text-white pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-[#92adc9]" placeholder="Escaneie o ISBN ou busque por título/autor..." />
                </div>
                <div className="flex items-center gap-2 px-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <p className="text-[#92adc9] text-sm">Status: <span className="text-emerald-400 font-medium">Disponível</span> (3 exemplares na estante A4)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                    <span className="text-white text-sm font-medium">Data do Empréstimo</span>
                    <div className="relative">
                        <input className="w-full h-12 md:h-14 rounded-lg bg-[#111a22] border border-[#324d67] text-white/50 px-4 cursor-not-allowed" readOnly type="date" value="2023-10-24" />
                        <Icon name="calendar_today" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92adc9] pointer-events-none" />
                    </div>
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-white text-sm font-medium">Devolução Prevista</span>
                    <div className="relative">
                        <input className="w-full h-12 md:h-14 rounded-lg bg-[#192633] border border-[#324d67] text-white px-4 focus:ring-2 focus:ring-primary focus:border-primary" type="date" defaultValue="2023-11-07" />
                    </div>
                </label>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium flex items-center justify-between">
                    <span>Observações</span>
                    <span className="text-[#92adc9] text-xs">Opcional</span>
                </label>
                <textarea className="w-full min-h-[100px] rounded-lg bg-[#192633] border border-[#324d67] text-white p-4 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-[#92adc9] resize-y" placeholder="Ex: Livro com capa levemente danificada..."></textarea>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#324d67]">
                <button onClick={onCancel} className="w-full sm:w-auto px-6 h-12 rounded-lg border border-[#324d67] text-white text-sm font-medium hover:bg-[#324d67] transition-all">
                    Cancelar
                </button>
                <button onClick={onSave} className="w-full sm:w-auto px-8 h-12 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-[#106cc9] transition-all flex items-center justify-center gap-2">
                    <Icon name="check_circle" className="text-lg" />
                    Confirmar Empréstimo
                </button>
            </div>
        </div>
    );
};