import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

interface SectionHeaderProps {
    className?: string;
    children?: ReactNode;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ className, children }) => {
    const headerClassName = clsx('grid grid-cols-header items-center mb-2', className);
    return (
        <header className={headerClassName}>{children}</header>
    );
}