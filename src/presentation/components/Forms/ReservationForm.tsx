import React from 'react';
import { Icon } from '../UI/Components';

interface ReservationFormProps {
    onCancel: () => void;
    onSave: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-white text-base font-medium">Usuário</label>
                <div className="relative flex items-center w-full group">
                    <div className="absolute left-4 text-[#92adc9] flex items-center justify-center pointer-events-none">
                        <Icon name="person_search" />
                    </div>
                    <input className="w-full h-14 bg-[#233648] text-white rounded-lg pl-12 pr-4 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-[#92adc9] text-base transition-all" placeholder="Buscar por nome ou ID..." />
                    <div className="absolute right-4 text-[#92adc9] pointer-events-none">
                        <Icon name="arrow_drop_down" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-white text-base font-medium">Obra / Livro</label>
                <div className="relative flex items-center w-full group">
                    <div className="absolute left-4 text-[#92adc9] flex items-center justify-center pointer-events-none">
                        <Icon name="menu_book" />
                    </div>
                    <input className="w-full h-14 bg-[#233648] text-white rounded-lg pl-12 pr-4 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-[#92adc9] text-base transition-all" placeholder="Buscar por título, autor ou ISBN..." />
                    <div className="absolute right-4 text-[#92adc9] pointer-events-none">
                        <Icon name="search" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-white text-base font-medium">Data da Reserva</label>
                <div className="flex w-full items-stretch rounded-lg opacity-80 cursor-not-allowed">
                    <input className="flex w-full rounded-l-lg text-[#92adc9] border-none bg-[#1c2b3a] h-14 p-4 text-base focus:outline-none cursor-not-allowed" readOnly value="15 de Outubro, 2023" />
                    <div className="text-[#92adc9] flex bg-[#1c2b3a] items-center justify-center pr-4 rounded-r-lg pl-2">
                        <Icon name="calendar_today" />
                    </div>
                </div>
                <p className="text-xs text-[#58738e] mt-1">* A data é preenchida automaticamente com o dia atual.</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button onClick={onCancel} className="w-full sm:w-auto min-w-[120px] h-12 px-6 rounded-lg bg-transparent border border-[#233648] hover:bg-[#233648] text-white font-bold transition-all">
                    Cancelar
                </button>
                <button onClick={onSave} className="w-full sm:w-auto min-w-[160px] h-12 px-6 rounded-lg bg-primary hover:bg-[#116ecf] text-white font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2">
                    <span>Confirmar Reserva</span>
                    <Icon name="check" className="text-[20px]" />
                </button>
            </div>
        </div>
    );
};