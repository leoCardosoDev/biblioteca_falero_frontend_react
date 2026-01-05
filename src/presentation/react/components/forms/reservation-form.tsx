import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '../ui';
import { reservationSchema, ReservationFormData } from './reservation-schema';
import { ReservationParticipants } from './parts/reservation/ReservationParticipants';
import { ReservationDetails } from './parts/reservation/ReservationDetails';

interface ReservationFormProps {
    initialData?: Partial<ReservationFormData>;
    onCancel: () => void;
    onSave: (data: ReservationFormData) => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ initialData, onCancel, onSave }) => {
    const methods = useForm<ReservationFormData>({
        resolver: zodResolver(reservationSchema),
        defaultValues: initialData || {
            reservationDate: new Date().toISOString().split('T')[0],
            priority: 'LOW'
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
                    <ReservationParticipants />
                    <ReservationDetails />
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
                        Confirmar Reserva
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};