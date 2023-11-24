import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface RegistrationFormData {
    username: string;
    email: string;
    password: string;
}

interface RegistrationFormProps {
    onRegister: (data: RegistrationFormData) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
    const { control, handleSubmit } = useForm<RegistrationFormData>();

    const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
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