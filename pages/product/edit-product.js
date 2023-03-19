import Navbar from "@/Components/Navbar";
import styles from "../../styles/forms.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


const editProduct = ({ productUUID }) => {

    console.log(productUUID.productUUID)
    const router = useRouter();

    useEffect(() => {
        if (!(typeof window === "undefined")) {
            if (!localStorage.getItem("user")) {
                router.push("/product/home");
            }
        }
    })

    const [product, setProduct] = useState({ productUUID: productUUID.productUUID, name: "", price: "", category: "", userId: "", companyName: "" });

    const fetchProductDetailFunc = () => {
        var myHeaders = new Headers();
        myHeaders.append("authorization", `token ${localStorage.getItem("token")}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productUUID": productUUID.productUUID
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://e-dashboardbackend-production.up.railway.app/getProductByID", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status_code == 200 && result.status === "Success") {
                    setProduct({ ...product, name: result.data.name, price: result.data.price, category: result.data.category, userId: result.data.userId, companyName: result.data.company })
                }
            })
            .catch(error => console.log('error', error));
    }

    const handleInput = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    }

    const handleForm = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("authorization", `token ${localStorage.getItem("token")}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productUUID": product.productUUID,
            "name": product.name,
            "price": product.price,
            "category": product.category,
            "userId": product.userId,
            "company": product.companyName
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://e-dashboardbackend-production.up.railway.app/productUpdateByID", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status_code == 200 && result.status === "Success") {
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
    useEffect(() => {
        fetchProductDetailFunc();
    }, [])

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1>Edit Product</h1>
                <form onSubmit={handleForm} className={styles.formGrid}>
                    <div className={styles.inputGridContainer}>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" name="name" value={product.name} onChange={handleInput} placeholder="Enter product name here..." required />
                    </div>
                    <div className={styles.inputGridContainer}>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" value={product.price} onChange={handleInput} placeholder="Enter product name here..." required />
                    </div>
                    <div className={styles.inputGridContainer}>
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category" value={product.category} onChange={handleInput} placeholder="Enter product name here..." required />
                    </div>
                    <div className={styles.inputGridContainer}>
                        <label htmlFor="userId">User ID</label>
                        <input type="text" name="userId" value={product.userId} onChange={handleInput} placeholder="Enter product name here..." required />
                    </div>
                    <div className={styles.inputGridFull}>
                        <label htmlFor="companyName">Company Name</label>
                        <input type="text" name="companyName" value={product.companyName} onChange={handleInput} placeholder="Enter product name here..." required />
                    </div>
                    <div>
                        <button type="submit" className={styles.button}>Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export const getServerSideProps = async (context) => {
    let productUUID = context.query;
    return {
        props: { productUUID }
    }
}

export default editProduct;