import BlogFooter from "@/domains/other-externals/components/blog-footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div className="max-w-7xl w-full xl:mx-auto max-lg:px-4 pt-8">
        <BlogFooter />
      </div>
    </>
  );
}
