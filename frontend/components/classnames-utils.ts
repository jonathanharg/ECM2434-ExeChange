import { CalendarDay, CalendarMonth, CalendarYear, Time } from "@rehookify/datepicker";
import clsx from "clsx";

export const getDayClassName = (
    className: string,
    { selected, disabled, inCurrentMonth, now, range }: CalendarDay
) => 
    clsx(
        'day',
        className,
        range,
        {
            'bg-slate-700 text-white hover:bg-slate-700 opacity-100': selected,
            'opacity-25 cursor-not-allowed': disabled,
            'opacity-50': !inCurrentMonth,
            'border border-slate-500': now,
        },
    );
    
export const getMonthClassName = (
    className: string,
    { selected, now, disabled }: CalendarMonth
) => clsx(
    className,
    {
        'bg-slate-700 text-white hover:bg-slate-700 opacity-100': selected,
        'border border-slate-500': now,
        'opacity-25 cursor-not-allowed': disabled,
    }
);

export const getYearsClassName = (
    className: string,
    { selected, now, disabled }: CalendarYear
) => clsx(
    className,
    {
        'bg-slate-700 text-white hover:bg-slate-700 opacity-100': selected,
        'border border-slate-500': now,
        'opacity-25 cursor-not-allowed': disabled,
    }
)

export const getTimesClassName = (
    className: string,
    { selected, disabled }: Time
) => clsx(
    className,
    {
        'bg-slate-700 text-white hover:bg-slate-700 opacity-100': selected,
        'opacity-25 cursor-not-allowed': disabled,
    }
)

