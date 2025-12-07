'use client';
import React from 'react';

export default function FormField({
  label,
  description,
  prefix,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  className = '',
}) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      {/* Label */}
      <label className="text-xl font-bold text-gray-700">{label}</label>

      {/* Description (opsional) */}
      {description && (
        <span className="text-sm text-gray-400">{description}</span>
      )}

      {/* Input container */}
      <div
        className={`flex w-full items-center gap-2.5 rounded-[12px] border border-gray-300 px-4`}
        style={{ height: '44px' }} // tetap tinggi 44px
      >
        {prefix && <span className="text-gray-500">{prefix}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-full flex-1 text-base outline-none"
        />
      </div>
    </div>
  );
}
