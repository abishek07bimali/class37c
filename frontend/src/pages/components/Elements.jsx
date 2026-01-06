import React from 'react'

export function Button({ label, onclick, className }) {
    return (
        <div>
            <button onClick={onclick} className={`${className ?
                className : "bg-green-500 text-white p-3 m-2"
                }`} >{label}</button>
        </div>
    )
}

export function TextFields({ text, onChange, placeholder, name }) {
    return (
        <div>
            <input type={text} placeholder={placeholder} name={name}
                onChange={onChange} className='border
                 border-amber-500' />
        </div>
    )
}

export function Input({ type, name, placeholder, value, onChange }) {
    return (
        <div style={{ marginBottom: '10px' }}>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};