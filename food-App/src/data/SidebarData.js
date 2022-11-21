
import { BsBorderAll } from "react-icons/bs"
import { MdOutlineCategory } from "react-icons/md"
import { RiCoupon2Line } from "react-icons/ri"
import { MdProductionQuantityLimits } from "react-icons/md"
import { MdPayment } from "react-icons/md"
import { AiOutlineUser } from "react-icons/ai"
import { MdOutlineLocalOffer } from "react-icons/md"
import { MdOutlineDashboard } from "react-icons/md"


export const SidebarData=[
    {
        title: "Dashboard",
        path: "admindash",
        icon: < MdOutlineDashboard/>,
    },
    {
        title: "User Management",
        path: "adminUser",
        icon: < AiOutlineUser/>,
    },
    {
        title: "Production Management",
        path: "adminproduction",
        icon: < MdProductionQuantityLimits/>,
    },
    {
        title: "Category Management",
        path: "adminmanagement",
        icon: < MdOutlineCategory/>,
    },
    {
        title: "Order",
        path: "adminorder",
        icon: < BsBorderAll/>,
    },
    {
        title: "Coupon",
        path: "admincoupon",
        icon: < RiCoupon2Line/>,
    },
    {
        title: "Payment",
        path: "adminpayment",
        icon: < MdPayment/>,
    },
    {
        title: "Offer Management",
        path: "adminoffer",
        icon: < MdOutlineLocalOffer/>,
    },

]