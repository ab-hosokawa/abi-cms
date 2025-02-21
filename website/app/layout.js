import "./globals.css";
import Html from "@/components/organisms/layout/Html";
export const metadata = {
    title: "MVP SITE", description: "必要最低限の新着ページです",
};

async function getData() {
    const res = await fetch('https://dev-cms.abi-system.net/api/web/step1/1');
    if (res.status !== 200) throw new Error(
        `Failed to fetch data: ${res.status} ${res.statusText}`
    );
    return await res.json();
}

export default async function RootLayout({children}) {
    const data = await getData();
    return (
        <Html data={data} child={children}/>
    );
}
