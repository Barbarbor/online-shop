import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const LoginForm = ({ onLogin }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        onLogin(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;