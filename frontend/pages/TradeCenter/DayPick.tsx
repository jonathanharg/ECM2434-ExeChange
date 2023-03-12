import React, { useState } from "react";
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { DayPicker, Row, RowProps } from 'react-day-picker';

import { differenceInCalendarDays } from 'date-fns';

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: green;
    color: green;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
  }
`;


function isPastDate(date: Date) {
  return differenceInCalendarDays(date, new Date()) < 0;
}

function isPostNextWeek(date: Date){
    return differenceInCalendarDays(date, new Date) > 7;
}

function OnlyFutureRow(props: RowProps) {
  const isPastRow = props.dates.every(isPastDate);
  const isFutureRow = props.dates.every(isPostNextWeek);
  if (isPastRow && isFutureRow) return <></>;
  return <Row {...props} />;
}

export default function DayPick() {
    const [selected, setSelected] = useState<Date>();
    
    
    return (
      <><style> {css}</style>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        fromDate={new Date()}
        components={{ Row: OnlyFutureRow }}
        disabled={[isPastDate, isPostNextWeek]}
        showOutsideDays 
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today'
        }}
        />
      </>
    )
}