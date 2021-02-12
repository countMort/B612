
const adminRoutes = [
    {
        icon: 'mdi-cart-variant' ,
        title: "مدیریت محصولات" ,
        to: "/admin/products"
    } ,
    {
        icon: 'mdi-shape-outline' ,
        title: "مدیریت دسته‌بندی ها" ,
        to: "/admin/add-category"
    } ,
]

const commonRoutes = [
    {
        icon: 'mdi-apps',
        title: 'B-612',
        to: '/'
    },
    {
        icon: 'mdi-chart-bubble',
        title: 'سفارش دهید',
        to: '/inspire'
    }
]

export default (role) => {
    if (role === "admin" || role === "super_admin") {
        return [...adminRoutes , ...commonRoutes]
    } else {
        return commonRoutes
    }
}