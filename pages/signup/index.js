import Navbar from "@/Components/Navbar";
import styles from "../../styles/forms.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const signup = () => {

    const router = useRouter();

    useEffect(()=>{
        if(!(typeof window === "undefined")){
            if(localStorage.getItem("user")){
                router.push("/product/home");
            }
        }
    })
    const [user, setUser] = useState({ email: "", password: "", confirmPassword: "", name: "" });

    const handleInput = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleForm = (event) => {
        event.preventDefault();
        if(user.password === user.confirmPassword){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                "name": user.name,
                "email": user.email,
                "password": user.password
            });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            fetch("https://e-dashboardbackend-production.up.railway.app/register-user", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status_code == 201 && result.status === "Success") {
                        alert(result.message);
                        localStorage.setItem("user", JSON.stringify(result.data));
                        localStorage.setItem("token", result.token);
                    }
                    return result;
                })
                .then(result => {
                    if (result.status_code == 201 && result.status === "Success") {
                        router.push("/product/home");
                    }
                })
                .catch(error => console.log('error', error));
        }else{
            alert("please enter correct password")
        }
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1>Sign Up</h1>
                <form onSubmit={handleForm} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="name">User Name</label>
                        <input type="text" name="name" onChange={handleInput} placeholder="Enter your name" required />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email or Mobile Number</label>
                        <input type="email" name="email" onChange={handleInput} placeholder="Enter your email" required />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Create Password</label>
                        <input type="password" name="password" onChange={handleInput} placeholder="Enter your new password" required />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" name="confirmPassword" onChange={handleInput} placeholder="Enter your password agian" required />
                    </div>
                    <div>
                        <button type="submit" className={styles.button}>Sign up</button>
                    </div>
                    <div className={styles.links}>
                        <Link href="/login">Already have account ?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default signup;