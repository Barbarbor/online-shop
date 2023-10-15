import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const RegistrationForm = ({ onRegister }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        onRegister(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            placeholder="Username"
                        />
                    )}
                />
            </div>
            <div>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="email"
                            placeholder="Email"
                        />
                    )}
                />
            </div>
            <div>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;