import React from "react";
import { twMerge } from "tailwind-merge";

interface TablesComponentProps {
  content: Record<string, any>[];
  tableName: string;
  variant?: "default" | "yellow";
  className?: string;
}

const wrapperStyle = {
  clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%, 0 16px)',
  backgroundColor: 'black',
  display: 'inline-block',
  padding: '1px',
};

const labelStyle = {
  clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%, 0 16px)'
};

const tableStyles = {
  default: {
    wrapper: '',
    label: 'bg-yellow-dark text-xl py-[0.5rem] px-[2rem] font-bold text-center',
    table: 'min-w-full w-full h-full border border-black',
    thead: 'bg-black',
    th: 'text-yellow-dark py-3 px-4 text-left text-lg border-b border-black',
    tr: 'bg-white border-b border-black last:border-b-0',
    td: 'py-4 px-4 text-left font-medium border-r border-black',
    tdLast: 'py-4 px-4 text-center font-medium',
  },
  yellow: {
    wrapper: '',
    label: 'bg-black text-yellow-dark text-2xl py-[0.5rem] px-[2rem] font-bold text-left uppercase tracking-wide border-2 border-yellow-dark',
    table: 'min-w-full w-full h-full border-2 border-yellow-dark',
    thead: 'bg-yellow-dark',
    th: 'text-black py-3 px-4 text-left font text-lg border-b-2 border-yellow-dark',
    tr: 'bg-black border-b-2 border-yellow-dark last:border-b-0',
    td: 'py-4 px-4 text-yellow-dark text-left font-medium border-r-2 border-yellow-dark',
    tdLast: 'py-4 px-4 text-yellow-dark text-center font-medium',
  },
};

export function TablesComponent({ content, tableName, variant = "default", className }: TablesComponentProps) {
  const styles = tableStyles[variant];
  const headers = content.length > 0 ? Object.keys(content[0]) : [];

  return (
    <div className={twMerge("overflow-x-auto px-[10%] mx-auto", styles.wrapper, className)}>
      <div style={wrapperStyle}>
        <div className={twMerge(styles.label)} style={labelStyle}>
          {tableName}
        </div>
      </div>

      <table className={twMerge(styles.table)}>
        <thead className={twMerge(styles.thead)}>
          <tr>
            {headers.map((header) => (
              <th key={header} className={twMerge(styles.th, "text-center")}>
                {header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((t, rowIndex) => (
            <tr key={rowIndex} className={twMerge(styles.tr)}>
              {headers.map((key, i) => (
                <td
                  key={key}
                  className={twMerge(
                    i === headers.length - 1 ? styles.tdLast : styles.td,
                    "text-center"
                  )}
                >
                  {t[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
