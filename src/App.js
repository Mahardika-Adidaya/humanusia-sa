import { Route, Routes } from "react-router-dom";
import { Admin, Coupon, Dashboard, Login, Package, Template, Transaction } from "./pages";
import { Toaster } from "react-hot-toast";
import Article from "./pages/Article";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            <Routes>
                {/* Auth */}
                <Route name='Login' path="/" element={<Login/>}/>
                <Route path="/admin" element={<Template/>}>
                    <Route index element={<Admin/>}/>
                </Route>
                <Route path="/dashboard" element={<Template/>}>
                    <Route index element={<Dashboard/>}/>
                </Route>
                <Route path="/package" element={<Template/>}>
                    <Route index element={<Package/>}/>
                </Route>
                <Route path="/coupon" element={<Template/>}>
                    <Route index element={<Coupon/>}/>
                </Route>
                <Route path="/transaction" element={<Template/>}>
                    <Route index element={<Transaction/>}/>
                </Route>
                <Route path="/article" element={<Template/>}>
                    <Route index element={<Article/>}/>
                </Route>
                <Route path="/article-detail" element={<Template/>}>
                    <Route index element={<ArticleDetail/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App