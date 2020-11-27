import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import dotProp from 'dot-prop-immutable';
import './styles.scss';

const FormContext = createContext({});

export default function Form({
    className,
    children,
    onSubmit = f => f,
}) {
    const [values, setValues] = useState({});

    const updateValue = (id, value) => {
        setValues(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(values);

        const cleared = Object.keys(values).reduce((acc, val) => {
            acc[val] = "";
            return acc;
        }, {});
        setValues(cleared);
    };

    return (
        <FormContext.Provider value={{
            values,
            updateValue,
        }}>
            <form
                className={classNames('Form', className)}
                onSubmit={handleSubmit}
            >
                {children}
            </form>
        </FormContext.Provider>
    );
}

Form.propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

function Input({
    id,
    className,
    style = {},
    type,
    placeholder,
    initialValue = '',
    path,
}) {
    const context = useContext(FormContext);

    const value = context.values[id] || '';
    const displayedValue = (path && value !== '') ?
        dotProp.get(value, path) :
        value;

    useEffect(() => {
        context.updateValue(id, initialValue);
    }, [id, initialValue]);

    const handleChange = (event) => {
        let newValue = event.target.value;

        if (path) {
            newValue = dotProp.set(value, path, newValue);
        }

        context.updateValue(id, newValue);
    };

    return (
        <input
            id={id}
            name={id}
            value={displayedValue}
            className={classNames('Input', `Input--${type || 'text'}`, className)}
            style={style}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.oneOf(['text', 'email', 'number']),
    path: PropTypes.string,
    placeholder: PropTypes.string,
    initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object,
    ]),
};

Form.Input = Input;
