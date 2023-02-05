function ProductList() {
    
    this.getList = function () {
        return axios ({
            url:"https://6370b41f0399d1995d8230e9.mockapi.io/phones",
            method:"GET",
        })
    }
   
}