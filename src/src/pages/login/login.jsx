import './login.css';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input';
import axios from 'axios';
export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        axios.post('http://52.72.151.221/auth/access', data)
            .then(response => {
                console.log(response.data)
                // localStorage.setItem('token', JSON.stringify(data.token));
                // location.href = '/app';
            }).catch(error  => {
                console.log(error);
            })
    }
    return (
        <div className='LoginClass'>
            <form onSubmit={handleSubmit(onSubmit)} className='Form card'>
                <p className='nC'>Login</p>
                <Input register={register('name', {required:true})} error={errors.name} placeholder="Nombre"/>
                <Input register={register('email', {required:true})} error={errors.email} placeholder="E-mail"/>
                <Input register={register('password', {required:true})} error={errors.password} isPassword placeholder="Contraseña"/>
                <button className='SendButton'>Ingresar</button>
                <div className='add'>¿No tienes cuenta? <a href='/register'>Crea una aquí</a></div>
            </form>
        </div> 
    )
}