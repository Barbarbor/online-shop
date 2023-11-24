import React from 'react';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';

interface LoginFormProps {
    onLogin: SubmitHandler<FieldValues>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
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