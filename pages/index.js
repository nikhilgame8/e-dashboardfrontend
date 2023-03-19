import Navbar from "@/Components/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";

const home = () => {

  const router = useRouter();

  useEffect(() => {
    if (!(typeof window === "undefined")) {
      if (!localStorage.getItem("user")) {
        router.push("/product/home");
      }
    }
  })

  return (
    <>
      <Navbar />
    </>
  )

}
export default home;