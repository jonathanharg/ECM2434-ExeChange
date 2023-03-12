import React, { useState } from "react";
import "react-day-picker/dist/style.css";
import { DayPicker, Row, RowProps } from "react-day-picker";

import { differenceInCalendarDays } from "date-fns";

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

function isPostNextWeek(date: Date) {
  return differenceInCalendarDays(date, new Date()) > 6;
}

function isWeekend(date: Date){
  if (date.getDay() == 0 || date.getDay() == 6) return true 
  else return false;
}

function weekends(props: RowProps){
  const weekends = props.dates.filter((i)=> isWeekend(i))
  return weekends
}

function OnlyThisWeek(props: RowProps) {

  const isPastRow = props.dates.every(isPastDate);
  const isFutureRow = props.dates.every(isPostNextWeek);

  if (isPastRow && isFutureRow) return <></>;
  return <Row {...props} />;
}


export default function DayPick({day, setDay}) {

  return (
    <>
      <style> {css}</style>
      <DayPicker
        mode="single"
        selected={day}
        onSelect={setDay}
        fromDate={new Date()}
        components={{ Row: OnlyThisWeek}}
        disabled={[isPastDate, isPostNextWeek, isWeekend]}
        showOutsideDays
        modifiersClassNames={{
          selected: "my-selected",
          today: "my-today",
        }}
        
       
      />
    </>
  );
}
