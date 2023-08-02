import request from "./utils/request";

class Api {

    static urlAPI() {
        return "http://localhost:5000/api/v1/"
        // return "https://api.humanusia.id/api/v1/"
    }

    // Begin :: Auth
    static Login(email, password) {
        let path = 'auth/login';
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data: {
                email,
                password,
            },
        })
    }
    
    // Admin
    static GetAdmin(token, page, limit, search) {
        let path = `superadmin/get-admin?page=${page}&limit=${limit}&search=${search}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    
    static GetAdminById(token, id) {
        let path = `superadmin/get-admin-by-id/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreateAdmin(token, data) {
        let path = `superadmin/create-admin`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static UpdateAdmin(token, data, id) {
        let path = `superadmin/update-admin/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'PATCH',
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static DeleteAdmin(token, id) {
        let path = `superadmin/delete-admin/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    // Package
    static GetPackage(token, page, limit, search) {
        let path = `package/get?page=${page}&limit=${limit}&search=${search}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    
    static GetPackageById(token, id) {
        let path = `package/get-by-id/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreatePackage(token, data) {
        let path = `package/post`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static UpdatePackage(token, data, id) {
        let path = `package/update/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static DeletePackage(token, id) {
        let path = `package/delete/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    
    // Coupon
    static GetCoupon(token, page, limit, search) {
        let path = `coupon/get?page=${page}&limit=${limit}&search=${search}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    
    static GetCouponById(token, id) {
        let path = `coupon/get-by-id/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static CreateCoupon(token, data) {
        let path = `coupon/post`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static UpdateCoupon(token, data, id) {
        let path = `coupon/update/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static DeleteCoupon(token, id) {
        let path = `coupon/delete/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    
    // Article
    static PostArticle(token, data) {
        let path = `article/post`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
    }
    
    static UpdateArticle(token, data, id) {
        let path = `article/update/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
    }

    static GetArticle(token, page, limit, search) {
        let path = `article/get?page=${page}&limit=${limit}&search=${search}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
    }

    static GetArticleByID(token, id) {
        let path = `article/get/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
    }

    static DeleteArticle(token, id) {
        let path = `article/delete/${id}`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, 
            }
        })
    }
    
}
export default Api;