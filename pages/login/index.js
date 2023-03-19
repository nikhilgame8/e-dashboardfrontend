import Navbar from "@/Components/Navbar";
import styles from "../../styles/forms.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


const login = () => {

    const router = useRouter();

    useEffect(() => {
        if (!(typeof window === "undefined")) {
            if (localStorage.getItem("user")) {
                router.push("/product/home");
            }
        }
    })

    const [user, setUser] = useState({ email: "", password: "" });

    const handleInput = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleForm = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": user.email,
            "password": user.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://e-dashboardbackend-production.up.railway.app/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status_code == 200 && result.status === "Success") {
                    localStorage.setItem("user", JSON.stringify(result.data))
                    localStorage.setItem("token", result.token)
                }
                else {
                    alert(result.message);
                }
                return result;
            })
            .then(result => {
                if (result.status_code == 200 && result.status === "Success") {
                    router.push("/product/home");
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1>LOGIN</h1>
                <div className={styles.form}>
                    <form onSubmit={handleForm}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="email">Email or Mobile Number</label>
                            <input type="email" name="email" onChange={handleInput} placeholder="Enter your email" required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={handleInput} placeholder="Enter your password" required />
                        </div>
                        <div>
                            <button type="submit" className={styles.button}>Login</button>
                        </div>
                        <div className={styles.links}>
                            <Link href="/signup">Create an account ?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default login;