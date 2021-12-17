import contactSearch from './assets/img/search-user.svg'
import contacte from './assets/img/contacts.svg' 
// import externalLink from '../img/external-link.svg'
import wallete from './assets/img/wallet.svg' 


const FIRST=[
    {
        id:1,
        title: "A propos de Ipercash",  
        description: "Nous sommes interfaces entre Mobile Money et la Cryptomonnaie...",
        route: 'help/description/#dsc-begin',
        img: contactSearch
    },
    {
        id:2,
        title: "Effectuer un depôt",
        description: "Créez et validez votre compte client pour commencer , acheter vos crypto-monnaies et deposer les en contre-partie argent sur un compte Mobile Money",
        route: 'help/description/#dsc-do',
        img: contacte
    },
    {
        id:3,
        title: "comment acheter la crypto",
        description: "Créez et validez votre compte client pour commencer , debiter votre compte Mobile Money ou votre carte bancaire et recevez l'equivalent en contre-partie crypto dans votre wallet.",
        route: 'help/description/#dsc-buy',
        img: wallete
    },
    {
        id:4,
        title: "comment vendre la crypto",
        description: "Créez et validez votre compte client pour commencer ,Retirez vos crypto-monnaies en les transférant et recevez l'argent instantanément sur un compte Mobile Money...",
        route: 'help/description/#dsc-move',
        img: wallete
    }
    

    
    
]

export { FIRST }