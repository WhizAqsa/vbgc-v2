'use client';

import { FiCheck } from "react-icons/fi";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export default function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
    return (
        <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                />
                <div
                    className={`
            w-5 h-5 rounded border-2 flex items-center justify-center
            transition-all duration-200
            ${checked
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300 bg-white group-hover:border-blue-400'
                        }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
                >
                    {checked && <FiCheck className="w-3.5 h-3.5 text-white" />}
                </div>
            </div>
            <span className={`
        text-sm text-gray-700 select-none
        ${disabled ? 'opacity-50' : 'group-hover:text-gray-900'}
      `}>
                {label}
            </span>
        </label>
    );
}