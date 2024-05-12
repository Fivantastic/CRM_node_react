import { useForm } from 'react-hook-form';
import './simpleEstilo.css';

function DynamicForm({ title, onSubmit, schema, fields, buttonText, extraButtons }) {
    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        resolver: async data => {
            try {
                const values = await schema.validateAsync(data);
                return { 
                    values, 
                    errors: {} 
                };
            } catch (error) {
                return {
                    values: {},
                    errors: error.details.reduce((acc, curr) => {
                        acc[curr.context.key] = { message: curr.message };
                        return acc;
                    }, {})
                };
            }
        }
    });

    const watchedFields = watch();
    const allFieldsFilled = Object.values(watchedFields).every(value => value !== "");

    return (
        <main className="outsideContainerForm">
            <section className="insideContainerForm"> 
                <form className="submitForm" onSubmit={handleSubmit(onSubmit)}>
                    <legend className="titleLegendForm">{title}</legend>
                    {fields.map((field, index) => (
                        <div className="fieldsetFrom" key={index}>
                            {field.type === 'textWithLink' ? (
                                <p className="textWithLinkParag">
                                    {field.text}{' '}
                                    <a className="linkFrom" href={field.link}>{field.linkText || 'Link'}</a>
                                </p>
                        ) : (
                            <>
                                <label className="labelForm" htmlFor={field.name}>{field.label}</label>
                                {field.type === 'select' ? (
                                    <select className='selectForm'
                                        id={field.name}
                                        {...register(field.name, {
                                            required: field.required
                                        })}
                                    >
                                        {field.options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === 'textarea' ? (
                                    <textarea 
                                        id={field.name}
                                        className="textareaForm"
                                        placeholder={field.placeholder}
                                        {...register(field.name, {
                                            required: field.required,
                                            minLength: field.minLength,
                                            maxLength: field.maxLength
                                        })}
                                    />
                                ) : field.type === 'checkbox' ? (
                                    <input
                                        id={field.name}
                                        className={`input ${errors[field.name] ? 'error' : ''}`}
                                        type="checkbox"
                                        {...register(field.name)}
                                    />
                                ) : field.type === 'radio' ? (
                                    <input
                                        id={field.name}
                                        className={`input ${errors[field.name] ? 'error' : ''}`}
                                        type="radio"
                                        value={field.value}
                                        {...register(field.name, {
                                            required: field.required
                                        })}
                                    />
                                ) : (
                                    <input
                                        id={field.name}
                                        className={`input ${errors[field.name] ? 'error' : ''}`}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        {...register(field.name, {
                                            required: field.required,
                                            minLength: field.minLength,
                                            maxLength: field.maxLength
                                        })}
                                    />
                                )}
                                {field.help && <p className="help-text-form">{field.help}</p>}
                                {errors[field.name] && <p className="error-message-form">{errors[field.name]?.message}</p>}
                            </>
                            )}
                        </div>
                    ))}
                    <nav className="button-container-form">
                        {extraButtons.map((button, index) => {
                            if (button.type === 'submit') {
                                return <button id='submitBtnLoginExtra' className='submitMainBtnExtra' key={index} type="submit">{button.label}</button>;
                            } else if (button.type === 'reset') {
                                return <button id='resetBtnLogin' className='resetMainBtn' key={index} type="reset">{button.label}</button>;
                            } else {
                                return <button id='extraBtnLogin' className='extraMainBtn' key={index} type="button" onClick={button.onClick}>{button.label}</button>;
                            }
                        })}
                        <button id='submitBtnLogin' className='submitMainBtn' type="submit" disabled={!isValid || !allFieldsFilled}>{buttonText}</button>
                    </nav>
                </form>
            </section>
        </main>
    );
}

export default DynamicForm;