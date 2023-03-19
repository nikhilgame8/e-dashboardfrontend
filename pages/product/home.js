import List from "@/Components/List";
import Navbar from "@/Components/Navbar";
import SearchFilter from "@/Components/SearchFilter";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/list.module.css";
import formStyles from "../../styles/forms.module.css";
import Pagination from "@/Components/Pagination";


const home = () => {
    const router = useRouter();
    const [productList, setProductList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [maxPage, setMaxPage] = useState("");
    const [dataCount, setDataCount] = useState("");
    const [searchPage, setSearchPage] = useState(1);

    useEffect(() => {
        if (!(typeof window === "undefined")) {
            if (!localStorage.getItem("user")) {
                router.push("/login");
            }
        }
    }, [])

    useEffect(() => {
        var date = new Date();
        date.setDate(date.getDate() - 30);

        let startDateFormat =
            date.getDate().toString().length === 1
                ? "0" + date.getDate()
                : date.getDate();

        const monthFormat =
            date.getMonth() + 1 > 9
                ? date.getMonth() + 1
                : "0" + (date.getMonth() + 1);

        var finalDate =
            date.getFullYear() + "-" + monthFormat + "-" + startDateFormat;

        setStartDate(finalDate);

        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate());

        let endDateFormat =
            todayDate.getDate().toString().length === 1
                ? "0" + todayDate.getDate()
                : todayDate.getDate();

        const todayMonthFormat =
            todayDate.getMonth() + 1 > 9
                ? todayDate.getMonth() + 1
                : "0" + (todayDate.getMonth() + 1);

        var finalToday =
            todayDate.getFullYear() + "-" + todayMonthFormat + "-" + endDateFormat;
        setEndDate(finalToday);
    }, []);

    useEffect(() => {
        fetchProductListFunc();
    }, [searchPage, startDate, endDate])

    const fetchProductListFunc = () => {
        var myHeaders = new Headers();
        myHeaders.append("authorization", `token ${localStorage.getItem("token")}`);

        console.log(searchPage)
        var formdata = new FormData();
        formdata.append("page", searchPage);
        formdata.append("keyword", searchValue);
        formdata.append("startDate", startDate);
        formdata.append("endDate", endDate);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://e-dashboardbackend-production.up.railway.app/productList", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status_code == 200 && result.status === "Success") {
                    setProductList(result.data);
                    setDataCount(result.data_count);
                    setMaxPage(Math.ceil(result.data_count / 10));
                }
            })
            .catch(error => console.log('error', error));
    }

    const deleteProductFunc = (productUUID) => {
        var myHeaders = new Headers();
        myHeaders.append("authorization", `token ${localStorage.getItem("token")}`);
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

    return (
        <div>
            <Navbar />
            <h1 className={styles.heading}>Product List</h1>
            <div className={formStyles.homeBtnContainer}>
                <div>
                    <button type="button" onClick={() => router.push("/product/add-product")} className={formStyles.button}>Add New</button>
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
                            onSearchClick={fetchProductListFunc}
                            onDateSearchClick={() => alert("date search")}
                        />
                        <List
                            type="productList"
                            data={productList}
                            searchPage={searchPage}
                            deleteProductFunc={deleteProductFunc} />
                        <Pagination
                            searchPage={searchPage}
                            setSearchPage={setSearchPage}
                            dataCount={dataCount}
                            setMaxPage={setMaxPage}
                            maxPage={maxPage}
                            dataLength={productList.length}
                        />
                    </>
                    : "Data Not Found"
            }
        </div>
    )
}

export default home;