import { useState } from 'react'
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { loginUserApi } from '../services/api';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        if (!email || !password) {
            return toast.error("please enter all fields")
        }
        const formdata = {
            email: email, password: password
        }
        try {

            const response = await loginUserApi(formdata);
            if (!response?.data?.success) {
                return toast.error(response?.data?.message);
            }
            localStorage.setItem("token-37c", response?.data?.token)
            // localStorage.setItem("user", JSON.stringify(response?.data?.user))
            toast.success(response?.data?.message)
            let decoded;
            try {
                decoded = jwtDecode(response?.data?.token);
            } catch {
                return toast.error("Invalid token");
            }

            if (decoded.role === "admin") {
                navigate("/admindash",{replace:true});
            } else {
                navigate("/userdash",{ replace: true });
            }
            window.location.reload();            

        }
        catch (err) {
            return toast.error(err?.response?.data?.message)
        }
    }
    return (
        <div>
            <form className='mt-10 '>
                <input type="text" name="email" value={email} className='border border-amber-300 m-2 p-2'
                    onChange={(e) => setEmail(e.target.value)} placeholder='email' />
                <input type="password" name="password" value={password} className='border border-amber-300 m-2 p-2'
                    onChange={(e) => setPassword(e.target.value)} placeholder='password' />
            </form>
            <button onClick={submit} className='bg-green-400 text-white rounded-sm p-3 ml-2'> click me</button>
        </div>
    )
}
export default Login

