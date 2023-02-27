import React from "react";
import { useContextTime, useContextTimePropGetters } from "@rehookify/datepicker";
import { getTimesClassName } from "./classnames-utils";
import { Button } from "./button";

export const Time = () => {
    const { time } = useContextTime();
    const { timeButton } = useContextTimePropGetters();
    return(
        <ul className="list-none p-0 m-0 max-h-80 overflow-y-auto">
            {time.map((t) => (
                <li key={t.$date.toString()} className="p-0">
                    <Button className={getTimesClassName("text-xs px-8", t)} {...timeButton(t)}>
                        {t.time}
                    </Button>
                </li>
            ))}
        </ul>
    );
}