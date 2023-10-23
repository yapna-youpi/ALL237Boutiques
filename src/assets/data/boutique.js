import boutiqueImg01 from "../images-boutiques/btq2.jpg";
import boutiqueImg02 from "../images-boutiques/btq1.jpg";
import boutiqueImg03 from "../images-boutiques/btq3.jpg";
import boutiqueImg04 from "../images-boutiques/btq4.jpg";
import boutiqueImg05 from "../images-boutiques/btq5.jpg";
import boutiqueImg06 from "../images-boutiques/btq6.jpg";

import "./products"
import products from "./products";

const filteredProdBoutique1 = products.filter((item) => item.boutique == "niki")

const boutiques = [
    {
      id: "01",
      productName: "NIKI",
      imgUrl: boutiqueImg01,
      category: "supermarche",
      place: "marche centrale",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg05,
      produits: products.filter((item)=> item.boutique == "niki")
    },
    {
      id: "02",
      productName: "Santa lucia",
      imgUrl: boutiqueImg06,
      category: "supermarche",
      place: "marche centrale",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg04,
      produits: products.filter((item)=> item.boutique == "santa lucia")
    },
    {
      id: "03",
      productName: "Doov",
      imgUrl: boutiqueImg02,
      category: "supermarche",
      place: "marche carriere",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg03,
      produits: products.filter((item)=> item.boutique == "doov")
    },
    {
      id: "04",
      productName: "Select",
      imgUrl: boutiqueImg01,
      category: "supermarche",
      place: "marche carriere",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg01,
      produits: products.filter((item)=> item.boutique == "select")
    },
    {
      id: "05",
      productName: "samsung",
      imgUrl: boutiqueImg02,
      category: "electronique",
      place: "marche carriere",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg02,
      produits: products.filter((item)=> item.boutique == "samsung")
    },
    {
      id: "06",
      productName: "apple",
      imgUrl: boutiqueImg03,
      category: "electronique",
      place: "marche carriere",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg05,
      produits: products.filter((item)=> item.boutique == "apple")
    },
    {
      id: "07",
      productName: "huawei",
      imgUrl: boutiqueImg04,
      category: "electronique",
      place: "marche carriere",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg04,
      produits: products.filter((item)=> item.boutique == "huawei")
    },
    {
      id: "08",
      productName: "Agropole",
      imgUrl: boutiqueImg03,
      category: "supermarche",
      place: "centre ville",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg03,
      produits: products.filter((item)=> item.boutique == "agropole")
    },
    {
      id: "09",
      productName: "camlait",
      imgUrl: boutiqueImg02,
      category: "bigmarket",
      place: "centre ville",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg02,
      produits: products.filter((item)=> item.boutique == "camlait")
    },
    {
      id: "10",
      productName: "dolait",
      imgUrl: boutiqueImg01,
      category: "bigmarket",
      place: "centre ville",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg01,
      produits: products.filter((item)=> item.boutique == "dolait")
    },
    {
      id: "11",
      productName: "brasserie",
      imgUrl: boutiqueImg05,
      category: "bigmarket",
      place: "centre ville",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg06,
      produits: products.filter((item)=> item.boutique == "ucb brasserie")
    },
    {
      id: "12",
      productName: "mtn cam",
      imgUrl: boutiqueImg05,
      category: "telecommunication",
      place: "centre ville",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg06,
      produits: products.filter((item)=> item.boutique == "mtn cam")
    },
    {
      id: "13",
      productName: "orange cam",
      imgUrl: boutiqueImg05,
      category: "telecommunication",
      place: "centre ville",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg06,
      produits: products.filter((item)=> item.boutique == "orange cam")
    },
    {
      id: "14",
      productName: "nextel cam",
      imgUrl: boutiqueImg05,
      category: "telecommunication",
      place: "centre ville",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg06,
      produits: products.filter((item)=> item.boutique == "nextel cam")
    },
    {
      id: "15",
      productName: "camtel",
      imgUrl: boutiqueImg05,
      category: "telecommunication",
      place: "centre ville",
      shortDesc:
        "boutique de vente des appareils electro-menager!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident! Consequatur officiis animi rem tempore voluptate cumque hic similique aperiam ut consectetur distinctio repudiandae quia quam quos, quas illo, iusto, necessitatibus odio veniam exercitationem quis voluptatibus debitis laboriosam! Esse debitis obcaecati blanditiis at impedit quibusdam!",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      avgRating: 4.5,
      profil: boutiqueImg06,
      produits: products.filter((item)=> item.boutique == "camtel cam")
    }
]

export default boutiques;