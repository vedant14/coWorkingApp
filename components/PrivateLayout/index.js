import { SEO } from "../SEO";
import { useAuth } from "../../context/AuthContext";
import { PageLoader } from "../PageLoader";
import { SideBar } from "../SideBar";
import { Header } from "../Header";

export function PrivateLayout({ title, description, children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <PageLoader />;
  } else {
    return <LayoutContent />;
  }

  function LayoutContent() {
    return (
      <div className="relative">
        <SEO title={title} description={description} />
        <Header />
        <SideBar />
        <div className="md:pl-64 pt-16 flex flex-col min-h-screen flex-1 bg-neutral-50">
          <main>
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
