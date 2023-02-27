import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

interface SectionProps {
    className?: string;
    children?: ReactNode;
}

export const Section: FC<SectionProps> = ({ className, children }) => {
    const sectionClassName = clsx('w-56', className);
    return (
        <section className={sectionClassName}>{children}</section>
    )
}