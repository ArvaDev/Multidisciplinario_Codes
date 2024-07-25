import './login.css';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input';
export default function Login() {
    localStorage.setItem('token', '{Hola}')
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className='LoginClass'>
            <form onSubmit={handleSubmit(onSubmit)} className='Form card'>
                <p className='nC'>Login</p>
                <Input register={register('name', {required:true})} error={errors.name} placeholder="Nombre"/>
                <Input register={register('mail', {required:true})} error={errors.mail} placeholder="E-mail"/>
                <Input register={register('pass', {required:true})} error={errors.pass} isPassword placeholder="Contraseña"/>
                <button className='SendButton'>Ingresar</button>
                <div className='add'>¿No tienes cuenta? <a href='/register'>Crea una aquí</a></div>
            </form>
        </div> 
    )
}