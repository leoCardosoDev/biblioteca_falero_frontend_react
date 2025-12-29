import React from 'react';
import { Icon } from '../UI/Components';

interface BookFormProps {
    onCancel: () => void;
    onSave: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Upload Section */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <label className="block text-sm font-medium text-slate-200">Capa da Obra</label>
                    <div className="flex-1 min-h-[320px] lg:h-auto border-2 border-dashed border-[#324d67] rounded-xl bg-[#151f2b] hover:bg-[#192633] transition-colors flex flex-col items-center justify-center p-6 text-center cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Icon name="add_photo_alternate" className="text-primary text-3xl" />
                        </div>
                        <p className="text-sm font-medium text-white">Clique para fazer upload</p>
                        <p className="text-xs text-[#92adc9] mt-1">ou arraste e solte o arquivo aqui</p>
                        <p className="text-[10px] text-[#58738e] mt-4 uppercase tracking-wider">PNG, JPG ATÉ 5MB</p>
                    </div>
                </div>

                {/* Fields Section */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-6">
                        <label className="flex flex-col flex-1 gap-2">
                            <span className="text-white text-base font-medium">Título da Obra <span className="text-red-500">*</span></span>
                            <input className="w-full rounded-lg bg-[#151f2b] border border-[#324d67] text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-[#58738e]" placeholder="Ex: Dom Casmurro" />
                        </label>
                        <label className="flex flex-col flex-1 gap-2">
                            <span className="text-white text-base font-medium">Subtítulo <span className="text-[#58738e] text-sm font-normal ml-1">(Opcional)</span></span>
                            <input className="w-full rounded-lg bg-[#151f2b] border border-[#324d67] text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-[#58738e]" placeholder="Ex: Edição Comemorativa" />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col flex-1 gap-2">
                            <span className="text-white text-base font-medium">Autor(es) <span className="text-red-500">*</span></span>
                            <input className="w-full rounded-lg bg-[#151f2b] border border-[#324d67] text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-[#58738e]" placeholder="Ex: Machado de Assis" />
                        </label>
                        <label className="flex flex-col flex-1 gap-2">
                            <span className="text-white text-base font-medium">Editora <span className="text-red-500">*</span></span>
                            <input className="w-full rounded-lg bg-[#151f2b] border border-[#324d67] text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-[#58738e]" placeholder="Ex: Companhia das Letras" />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <label className="flex flex-col flex-1 gap-2">
                            <span className="text-white text-base font-medium">ISBN <span className="text-red-500">*</span></span>
                            <div className="flex w-full rounded-lg bg-[#151f2b] border border-[#324d67] focus-within:ring-2 focus-within:ring-primary overflow-hidden">
                                <input className="w-full bg-transparent border-none text-white h-12 px-4 focus:ring-0 placeholder:text-[#58738e]" placeholder="000-0-00-000000-0" />
                                <div className="flex items-center justify-center pr-3 text-[#92adc9]">
                                    <Icon name="barcode_reader" />
                                </div>
                            </div>
                        </label>
                        <label className="flex flex-col flex-1 gap-2">
                            <span className="text-white text-base font-medium">Ano <span className="text-red-500">*</span></span>
                            <input type="number" className="w-full rounded-lg bg-[#151f2b] border border-[#324d67] text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-[#58738e]" placeholder="2024" />
                        </label>
                        <label className="flex flex-col flex-1 gap-2">
                            <span className="text-white text-base font-medium">Edição</span>
                            <input className="w-full rounded-lg bg-[#151f2b] border border-[#324d67] text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-[#58738e]" placeholder="1ª Ed." />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <label className="flex flex-col flex-1 gap-2">
                            <span className="text-white text-base font-medium">Gênero</span>
                            <div className="relative">
                                <select className="w-full appearance-none rounded-lg bg-[#151f2b] border border-[#324d67] text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer">
                                    <option value="" disabled selected>Selecione</option>
                                    <option>Romance</option>
                                    <option>Ficção Científica</option>
                                    <option>Fantasia</option>
                                    <option>Técnico</option>
                                </select>
                                <Icon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#92adc9] pointer-events-none" />
                            </div>
                        </label>
                        <label className="flex flex-col flex-1 gap-2">
                            <span className="text-white text-base font-medium">Idioma</span>
                            <div className="relative">
                                <select className="w-full appearance-none rounded-lg bg-[#151f2b] border border-[#324d67] text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer">
                                    <option>Português</option>
                                    <option>Inglês</option>
                                    <option>Espanhol</option>
                                </select>
                                <Icon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#92adc9] pointer-events-none" />
                            </div>
                        </label>
                        <label className="flex flex-col flex-1 gap-2">
                            <span className="text-white text-base font-medium">Nº Páginas</span>
                            <input type="number" className="w-full rounded-lg bg-[#151f2b] border border-[#324d67] text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-[#58738e]" placeholder="0" />
                        </label>
                    </div>

                    <label className="flex flex-col flex-1 gap-2">
                        <span className="text-white text-base font-medium">Resumo / Sinopse</span>
                        <textarea className="w-full rounded-lg bg-[#151f2b] border border-[#324d67] text-white min-h-[120px] p-4 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-[#58738e] resize-y" placeholder="Digite uma breve descrição sobre a obra..."></textarea>
                    </label>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#324d67]">
                <button 
                    onClick={onCancel}
                    className="px-6 h-11 rounded-lg border border-[#324d67] text-[#92adc9] hover:text-white hover:bg-[#192633] transition-colors font-medium"
                >
                    Cancelar
                </button>
                <button 
                    onClick={onSave}
                    className="flex items-center gap-2 px-6 h-11 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium shadow-lg shadow-primary/20 transition-all"
                >
                    <Icon name="check" />
                    Salvar Obra
                </button>
            </div>
        </div>
    );
};