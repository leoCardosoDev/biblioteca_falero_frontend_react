import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '../ui';
import { loanSchema, LoanFormData } from './loan-schema';
import { LoanParticipants } from './parts/loan/LoanParticipants';
import { LoanTerms } from './parts/loan/LoanTerms';

interface LoanFormProps {
    initialData?: Partial<LoanFormData>;
    onCancel: () => void;
    onSave: (data: LoanFormData) => void;
}

export const LoanForm: React.FC<LoanFormProps> = ({ initialData, onCancel, onSave }) => {
    const methods = useForm<LoanFormData>({
        resolver: zodResolver(loanSchema),
        defaultValues: initialData || {
            loanDate: new Date().toISOString().split('T')[0]
        }
    });

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-6" noValidate>
                <div className="flex flex-col gap-8">
                    <LoanParticipants />
                    <LoanTerms />
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
                        Confirmar Empréstimo
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};