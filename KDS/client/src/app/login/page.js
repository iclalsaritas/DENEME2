'use client';

import '@/login.css'
import axios from "axios";
import {useState} from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        Loading.hourglass("Yükleniyor...", {
            svgColor: "red"
        })



        axios.post(
            process.env.NEXT_PUBLIC_API_URL+'/login',
            {
                username,
                password
            }
        ).then((res) => {

            if(res?.data?.token) {

                setTimeout(() => {
                    Notify.success("Giriş başarılı")

                    setTimeout(function(){
                        document.cookie = "user_jwt="+res.data.token;
                        window.location.href = "/"
                    }, 500)

                }, 1500)





            }
        }).catch((err) => {

            setTimeout(function(){
                Loading.remove()
                Notify.failure(err?.response?.data?.message || "Bir hata oluştu")
            }, 2000)
        })


    }

    return(
        <div className="container">
            <div className="logo">
                <img src="/images/turktelekom.png" alt="Logo" />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="title">Kullanıcı Girişi</div>
                <div className="input-box">
                    <input type="text" placeholder="Kullanıcı adı giriniz" required value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                        <div className="underline"></div>
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Şifre giriniz" required value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                        <div className="underline"></div>
                </div>

                <div className="input-box button">
                    <input type="submit" value="Giriş yap" />
                </div>
            </form>
        </div>
    )
}

export default Login;