import React from "react";
import { useDatePickerContext } from "@rehookify/datepicker"
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import { getMonthClassName } from './classnames-utils';
import { Section } from './section';
import { SectionHeader } from './section-header';
import { Button } from './button';

export const Months = () => {
    const {
        data: { months },
        propGetters: {
            previousMonthButton,
            nextMonthButton,
            monthButton,
        }
    } = useDatePickerContext();
    
    const year = months[0].$date.getFullYear();
    
    return (
        <Section>
          <SectionHeader>
            <Button className="w-8" {...previousMonthButton()}>
              <IoChevronBack />
            </Button>
            <p className="text-center text-sm">{year}</p>
            <Button className="w-8" {...nextMonthButton()}>
              <IoChevronForward />
            </Button>
          </SectionHeader>
          <main className="grid grid-cols-3 items-center gap-x-2 gap-y-2">
            {months.map((m) => (
              <Button
                key={m.month + year}
                className={getMonthClassName("text-xs", m)}
                {...monthButton(m)}
              >
                {m.month}
              </Button>
            ))}
          </main>
        </Section>
    );
}