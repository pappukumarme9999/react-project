export const apiEndPoint = {

    STATE_API :"/state/stateList",
    CITY_API:"/city/findCityByState",
    FETCH_CITY_BY_STATE:"/city/findCityByState",
    // SEARCH_CITY_BY_ID: "/city/byId",
    
    USER_SIGNIN:"/user/signIn",
    USER_SIGNUP:"/user/signup",
    USER_VERIFY : "/user/verifyEmail",
    FORGOT_PASSWORD : '/user/forgotpassword',
    USER_CHECK : "/user/checkuser",
    USER_UPDATEPROFILE:"/user/updateProfile",
    USER_PROFILE:"/user/userProfile",
    ORDER_INVOICE : '/user/invoice',

    CATEGORY_API : "/category/list",

    
    ALL_BOOKS:"/book/bookList",
    TOTAL_BOOKS:"/book/totalbook",
    TOP_PRODUCT_API:"/book/TopBooks",
    FREE_BOOK_API:"/book/freebooklist",
    BOOK_BY_CATEGORY :"/book/searchByCategoryId",
    Search_By_Categoryname: "/book/searchByCategoryId",
    SEARCH_BY_AUTHOR: "/book/searchbyAuthor",
    UPLOAD_BOOK : "/book/addBook",
    ADD_BOOK : "/book/addBook",
    SEARCH_BOOKS : "/book/searchByKeyWord",
    UPDATE_BOOK:"/book/updateBook",
    SEARCH_BOOK_BY_USERID: "/book/serachByuserId",
    PRICE: "/book/price",
    DONETORS: "/book/donetors",


    // RECENT_PRODUCT: '/product/recentProduct',
    // PRODUCT_LIST: '/product/list',


    FETCH_CART: '/cart/fetchCart',
    USER_CART : "/cart/userCart",
    ADD_TO_CART: '/cart/addToCart',
    REMOVE_CART:"/cart/removeBookInCart",

    
    ORDER_SAVE:"/order/saveOrder",
    FETCH_ORDER:"/order/vieworderByorderId",
    FETCH_ORDER_BY_ORDERID:"/order/vieworderByorderId",


    DISK_STORAGE : "http://localhost:3006/uploads/"
    
}
