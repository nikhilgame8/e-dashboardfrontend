import List from "@/Components/List";
import Navbar from "@/Components/Navbar";
import SearchFilter from "@/Components/SearchFilter";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/list.module.css";
import formStyles from "../../styles/forms.module.css";


const home = () => {
    const router = useRouter();
    const [productList, setProductList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        if (!(typeof window === "undefined")) {
            if (!localStorage.getItem("user")) {
                router.push("/login");
            }
        }
    }, [])

    const fetchProductListFunc = (keyword) => {
        var myHeaders = new Headers();
        myHeaders.append("authorization", `token ${localStorage.getItem("token")}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "keyword": keyword ? keyword : ""
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://e-dashboardbackend-production.up.railway.app/productList", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status_code == 200 && result.status === "Success") {
                    setProductList(result.data);
                }
            })
            .catch(error => console.log('error', error));
    }

    const deleteProductFunc = (productUUID) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productUUID": productUUID
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://e-dashboardbackend-production.up.railway.app/deleteProductByID", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status_code == 200 && result.status === "Success") {
                    alert(result.message);
                    fetchProductListFunc();
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        fetchProductListFunc();
    }, [])

    return (
        <div>
            <Navbar />
            <h1 className={styles.heading}>Product List</h1>
            <div className={formStyles.homeBtnContainer}>
                <div>
                    <button type="button" onClick={()=>router.push("/product/add-product")} className={formStyles.button}>Add New</button>
                </div>
            </div>
            {
                productList ?
                    <>
                        <SearchFilter
                            setEndDate={setEndDate}
                            endDate={endDate}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            setSearchValue={setSearchValue}
                            searchValue={searchValue}
                            onSearchClick={() => fetchProductListFunc(searchValue)}
                            onDateSearchClick={() => alert("date search")}
                        />
                        <List
                            type="productList"
                            data={productList}
                            deleteProductFunc={deleteProductFunc} />
                    </>
                    : "Data Not Found"
            }
        </div>
    )
}

export default home;