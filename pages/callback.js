import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  const { link } = router.query;

  useEffect(() => {
    const pageUrl = window.location.href;
    const accessToken = pageUrl.slice(
      pageUrl.indexOf("token=") + 6,
      pageUrl.indexOf("&token_type")
    );

    localStorage.setItem("token", accessToken);
    console.log("this is the access token", accessToken);
    // router.push("/review");
  }, [router]);

  return <h3>Loading...</h3>;
}
