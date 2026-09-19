import React from 'react';
import { QuestionMetadata } from '../types';

interface QuestionMetadataTableProps {
  metadata?: QuestionMetadata;
  fallbackNumber?: number | string;
  className?: string;
}

export const QuestionMetadataTable: React.FC<QuestionMetadataTableProps> = ({
  metadata,
  fallbackNumber,
  className = '',
}) => {
  const noSoal = metadata?.noSoal ?? fallbackNumber ?? '-';
  const kompetensi = metadata?.kompetensi || 'Pemahaman Tekstual';
  const subKompetensi = metadata?.subKompetensi || 'Pemahaman dan Analisis Teks';
  const bentukSoal = metadata?.bentukSoal || 'Pilihan Ganda (PG)';

  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs mb-4 text-xs font-sans ${className}`}
    >
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b border-slate-200/90">
            <th className="py-2 px-3 sm:px-4 bg-slate-50 text-slate-600 font-bold w-32 sm:w-40 border-r border-slate-200/90 whitespace-nowrap">
              No. Soal
            </th>
            <td className="py-2 px-3 sm:px-4 text-slate-800 font-bold text-xs sm:text-sm">
              {noSoal}
            </td>
          </tr>
          <tr className="border-b border-slate-200/90">
            <th className="py-2 px-3 sm:px-4 bg-slate-50 text-slate-600 font-bold border-r border-slate-200/90 whitespace-nowrap">
              Kompetensi
            </th>
            <td className="py-2 px-3 sm:px-4 text-slate-800 font-semibold">
              {kompetensi}
            </td>
          </tr>
          <tr className="border-b border-slate-200/90">
            <th className="py-2 px-3 sm:px-4 bg-slate-50 text-slate-600 font-bold border-r border-slate-200/90 whitespace-nowrap align-top">
              Sub Kompetensi
            </th>
            <td className="py-2 px-3 sm:px-4 text-slate-700 leading-relaxed font-medium">
              {subKompetensi}
            </td>
          </tr>
          <tr>
            <th className="py-2 px-3 sm:px-4 bg-slate-50 text-slate-600 font-bold border-r border-slate-200/90 whitespace-nowrap">
              Bentuk Soal
            </th>
            <td className="py-2 px-3 sm:px-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200/70">
                {bentukSoal}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
