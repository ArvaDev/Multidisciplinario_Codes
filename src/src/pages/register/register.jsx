import './register.css';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input';
export default function Register() {
    const { register, watch, handleSubmit, formState: { errors }} = useForm();
    console.log(watch('password'))
    const onSubmit = (data) => {
        console.log(data)
    } 
    return (
        <div className="RegisteClass">
            <form onSubmit={handleSubmit(onSubmit)} className='Form card'>
                <p className='nC'>Registro</p>
                <Input register={register('name', {required: true})} error={errors.name} placeholder="Nombre"/>
                <Input register={register('mail', {required: true})} error={errors.mail} placeholder="E-mail"/>
                <div className='inputs'>
                    <Input register={register('password', {required: true})} error={watch('password') !== watch('matchPass')}  customClass="pass" isPassword placeholder="Contraseña"/>
                    <Input register={register('matchPass', {required: true})} error={watch('password') !== watch('matchPass')} customClass="pass" isPassword placeholder="Confirmar contraseña"/>
                </div>
                <button className='SendButton'>Registrar</button>
                <div className='add'>Ya tienes una <a href='/'>ingresa aquí</a></div>
            </form>
        </div>
    );
}