import React from 'react';
import { PageTitleProps } from '../types';

export default function PageTitle({ title, subtitle }: PageTitleProps): React.JSX.Element {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-text-primary mb-2">{title}</h1>
      {subtitle && <p className="text-text-muted">{subtitle}</p>}
    </div>
  );
}