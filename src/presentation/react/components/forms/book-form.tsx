import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '../ui';
import { bookSchema, BookFormData } from './book-schema';
import { BookCoverUpload } from './parts/book/BookCoverUpload';
import { BookGeneralInfo } from './parts/book/BookGeneralInfo';
import { BookTechnicalInfo } from './parts/book/BookTechnicalInfo';
import { BookCategorization } from './parts/book/BookCategorization';

interface BookFormProps {
    initialData?: Partial<BookFormData>;
    onCancel: () => void;
    onSave: (data: BookFormData) => void;
}

export const BookForm: React.FC<BookFormProps> = ({ initialData, onCancel, onSave }) => {
    const methods = useForm<BookFormData>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            language: 'Português',
            ...initialData
        }
    });

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        if (initialData) {
            reset({
                language: 'Português',
                ...initialData
            });
        }
    }, [initialData, reset]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-6" noValidate>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Upload Section */}
                    <BookCoverUpload />

                    {/* Fields Section */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <BookGeneralInfo />
                        <BookTechnicalInfo />
                        <BookCategorization />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200/10 dark:border-slate-800/50 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 h-11 rounded-lg border border-slate-200/10 dark:border-slate-800/50 text-slate-500 dark:text-[#92adc9] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#192633] transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 h-11 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium shadow-lg shadow-primary/20 transition-all"
                    >
                        <Icon name="check" />
                        Salvar Obra
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};