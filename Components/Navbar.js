import Link from "next/link";
import navbar from "../styles/navbar.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {

    const { pathname } = useRouter();
    const [login, setLogin] = useState(true);
    const [menu, setMenu] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setLogin(false);
        }
    }, [])

    const logout = () => {
        setLogin(true);
        localStorage.clear();
    }

    return (
        <div>
            <nav className={navbar.nav}>
                <div className={navbar.logo}>
                    <Link href="/product/home">N E-COM</Link>
                </div>
                {
                    login ?
                        <ul>
                            <li><Link href="/login" className={navbar.links}>Log In</Link></li>
                        </ul> :
                        <ul className={navbar.listContainer}>
                            <li><Link href="/product/home" className={pathname === "/product/home" ? navbar.selectedLink : navbar.links}>Products</Link></li>
                            {/* <li><Link href="/product/edit-product" className={pathname === "/product/edit-product" ? navbar.selectedLink : navbar.links}>Update Product</Link></li> */}
                            <li><Link href="/login" onClick={logout} className={navbar.links}>Logout</Link></li>
                            <li><Link href="/profile/home" className={pathname === "/profile/home" ? navbar.selectedLink : navbar.links}>Profile</Link></li>
                        </ul>
                }
                {
                    !login &&
                    <div className={navbar.smallScreenNav}>
                        <div className={navbar.menuBtn}>
                            {
                                menu ?
                                    <div onClick={() => setMenu(false)} className={navbar.openMenu}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                                        </svg>
                                    </div> :
                                    <div onClick={() => setMenu(true)} className={navbar.openMenu}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                            }
                        </div>
                        <div className={navbar.slidebar}>
                            {
                                login ?
                                    <ul>
                                        <li><Link href="/login" className={navbar.respLinks}>Log In</Link></li>
                                    </ul> :
                                    <>
                                        {
                                            !menu &&
                                            <div className={navbar.dropdownlinks}>
                                                <ul>
                                                    <li><Link href="/product/home" className={pathname === "/product/home" ? navbar.selectedLink : navbar.respLinks}>Products</Link></li>
                                                    {/* <li><Link href="/product/edit-product" className={pathname === "/product/edit-product" ? navbar.selectedLink : navbar.links}>Update Product</Link></li> */}
                                                    <li><Link href="/login" onClick={logout} className={navbar.respLinks}>Logout</Link></li>
                                                    <li><Link href="/profile/home" className={pathname === "/profile/home" ? navbar.selectedLink : navbar.respLinks}>Profile</Link></li>
                                                </ul>
                                            </div>
                                        }
                                    </>
                            }
                        </div>
                    </div>
                }
            </nav>
        </div>
    )
}

export default Navbar;