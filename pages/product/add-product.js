import Navbar from "@/Components/Navbar";
import styles from "../../styles/forms.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


const addProduct = () => {

    const router = useRouter();

    

    const [product, setProduct] = useState({ name: "", price: "", category: "", userId: "", companyName: "" });

    useEffect(() => {
        if (!(typeof window === "undefined")) {
            if (!localStorage.getItem("user")) {
                router.push("/product/home");
            }
        }
    })
    
    const handleInput = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    }

    const handleForm = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("authorization", `token ${localStorage.getItem("token")}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": product.name,
            "price": product.price,
            "category": product.category,
            "userId": product.userId,
            "company": product.companyName
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://e-dashboardbackend-production.up.railway.app/product", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status_code == 201 && result.status === "Success"){
                    alert(result.message);
                }
                return result;
            })
            .then(result => {
                if(result.status_code == 201 && result.status === "Success"){
                    setProduct({name: "", price: "", category: "", userId: "", companyName: ""});
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1>Add Product</h1>
                <form onSubmit={handleForm} className={styles.formGrid}>
                    <div className={styles.inputGridContainer}>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" name="name" onChange={handleInput} placeholder="Enter product name here..." required />
                    </div>
                    <div className={styles.inputGridContainer}>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" onChange={handleInput} placeholder="Enter product name here..." required />
                    </div>
                    <div className={styles.inputGridContainer}>
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category" onChange={handleInput} placeholder="Enter product name here..." required />
                    </div>
                    <div className={styles.inputGridContainer}>
                        <label htmlFor="userId">User ID</label>
                        <input type="text" name="userId" onChange={handleInput} placeholder="Enter product name here..." required />
                    </div>
                    <div className={styles.inputGridFull}>
                        <label htmlFor="companyName">Company Name</label>
                        <input type="text" name="companyName" onChange={handleInput} placeholder="Enter product name here..." required />
                    </div>
                    <div className={styles.inputGridContainer}>
                        <button type="submit" className={styles.button}>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default addProduct;