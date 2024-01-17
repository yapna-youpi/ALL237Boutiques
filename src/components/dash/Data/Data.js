   import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilMoneyWithdrawal,
    UilUsdSquare
   } from '@iconscout/react-unicons'

   export const SidebarData = [
    {
        icon: UilChart,
        heading: "Analytics",
        name: "analytics"
    },
    {
        icon: UilEstate,
        heading: "Achat de Crypto ",
        name: "buycrypto"
    },
    {
        icon: UilClipboardAlt,
        heading: "Vente de Crypto",
        name: "sellcrypto"
    },
    {
        icon: UilUsersAlt,
        heading: "Credit Mobile",
        name: "sendmoney"   
    },
    {
        icon: UilPackage,
        heading: "Reclamation",
        name: "claim"
    },
    // {
    //     icon: UilEstate,
    //     heading: "Dashboard"
    // },
   ]

   export const CardsData = [
    {
        title: "Ventes",
        color: {
            backGround : "linear-gradient(180deg, #E2263C 0%, #A2133E 100%)",
            boxShadow: "0px 10px 20px 0px #FCDFCF",
        },
        barValue: 70,
        value: "25.970",
        png: UilUsdSquare,
        series: [{
            name: "ventes",
            data: [31,40,28,51,109,100],   
        }],
    },
    {
        title: "Achat",
        color: {
            backGround : "linear-gradient(180deg, #007AC1 0%, #0F394C 100%)",
            boxShadow: "0px 10px 20px 0px #D3E9FF",
        },
        barValue: 80,
        value: "14.270",
        png: UilMoneyWithdrawal,
        series: [{
            name: "achat",
            data: [10,100,50,70,80,30,40],   
        }],
    },
    {
        title: "Dépot",
        color: {
            backGround : "linear-gradient(180deg,#E0574A 0%, #CC1616 100%)",
            boxShadow: "0px 10px 20px 0px #FFD6C0",
        },
        barValue: 60,
        value: "25.970",
        png: UilClipboardAlt,
        series: [{
            name: "depot",
            data: [10,25,15,30,12,15,20],   
        }],
    },
   ]