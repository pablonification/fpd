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
    <div className={`flex h-[92px] w-full flex-col gap-2 ${className}`}>
      {/* Label */}
      <label className="text-xl font-bold text-gray-700">{label}</label>

      {/* Description (opsional) */}
      {description && (
        <span className="text-l text-gray-400">{description}</span>
      )}

      {/* Input */}
      <div
        className={`flex h-[44px] w-full items-center gap-[10px] rounded-[12px] border border-gray-300 px-4 py-3`}
      >
        {prefix && <span className="text-gray-500">{prefix}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="text-l flex-l outline-none"
        />
      </div>
    </div>
  );
}
