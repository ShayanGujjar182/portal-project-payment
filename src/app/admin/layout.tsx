import "@/app/globals.css"
import Header from "@/components/Header";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en" className="h-screen w-screen ">
        <body className=" overflow-x-hidden w-full h-full ">
            <div id="header" className=" bg-[#1B1F23] h-[8rem]">{<Header/>}</div>
            {children}
        </body>
      </html>
    );
  }