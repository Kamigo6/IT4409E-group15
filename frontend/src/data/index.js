export const data = {
  banner: [
    {
      to: "/link",
      img: "../../images/banner/875_generated.jpg",
      title: "First slide label",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum",
    },
    {
      to: "/link",
      img: "../../images/banner/875_generated.jpg",
      title: "Second slide label",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      to: "/link",
      img: "../../images/banner/875_generated.jpg",
      title: "Third slide label",
      description: " Praesent commodo cursus magna, vel scelerisque nisl.",
    },
  ],
  iconProducts: [
    {
      to: "/product/detail",
      img: "IconBook",
      title: "Fiction",
      text: " Upto 20% off",
      tips: "Summer Discount",
      cssClass: "text-primary",
    },
    {
      to: "/product/detail",
      img: "IconHeadset",
      title: "Business & Finance",
      text: " Upto 50% off",
      tips: "Summer Discount",
      cssClass: "text-secondary",
    },
    {
      to: "/product/detail",
      img: "IconPhone",
      title: "Health & Fitness",
      text: " Upto 20% off",
      tips: "Summer Discount",
      cssClass: "text-danger",
    },
    {
      to: "/product/detail",
      img: "IconTv",
      title: "History & Archaeology",
      text: " Upto 25% off",
      tips: "Summer Discount",
      cssClass: "text-warning",
    },
    {
      to: "/product/detail",
      img: "IconDisplay",
      title: "Art & Photography",
      text: " Upto 30% off",
      tips: "Summer Discount",
      cssClass: "text-info",
    },
    {
      to: "/product/detail",
      img: "IconHdd",
      title: "Romance",
      text: " Upto 15% off",
      tips: "Summer Discount",
      cssClass: "text-success",
    },
    {
      to: "/product/detail",
      img: "IconUpcScan",
      title: "Food & Drink",
      text: " Upto 45% off",
      tips: "Summer Discount",
      cssClass: "text-muted",
    },
    {
      to: "/product/detail",
      img: "IconTools",
      title: "Other",
      text: " Upto 20% off",
      tips: "Summer Discount",
      cssClass: "text-primary",
    },
  ],
  // products: [{
  //   "supplier": "612345678901234567890141",
  //   "name": "Laptop",
  //   "categories": ["Electronics", "Computers"],
  //   "detail": "A powerful laptop for all your computing needs.",
  //   "imageUrls": [
  //     "https://example.com/images/laptop-1.jpg",
  //     "https://example.com/images/laptop-2.jpg"
  //   ],
  //   "price": 999.99,
  //   "discount": {
  //     "value": 100,
  //     "unit": "USD"
  //   },
  //   "isAvailable": true,
  //   "ratings": ["612345678901234567890142", "612345678901234567890143"],
  //   "createdAt": "2023-06-22T12:00:00.000Z"
  // },
  // {
  //   "supplier": "612345678901234567890144",
  //   "name": "Smartphone",
  //   "categories": ["Electronics", "Mobile Phones"],
  //   "detail": "A high-performance smartphone with advanced features.",
  //   "imageUrls": [
  //     "https://example.com/images/smartphone-1.jpg",
  //     "https://example.com/images/smartphone-2.jpg"
  //   ],
  //   "price": 699.99,
  //   "discount": {
  //     "value": 50,
  //     "unit": "USD"
  //   },
  //   "isAvailable": true,
  //   "ratings": ["612345678901234567890145"],
  //   "createdAt": "2023-06-21T09:30:00.000Z"
  // },
  // {
  //   "supplier": "612345678901234567890146",
  //   "name": "Headphones",
  //   "categories": ["Electronics", "Audio"],
  //   "detail": "High-quality headphones for an immersive audio experience.",
  //   "imageUrls": [
  //     "https://example.com/images/headphones-1.jpg",
  //     "https://example.com/images/headphones-2.jpg"
  //   ],
  //   "price": 149.99,
  //   "discount": {
  //     "value": 0,
  //     "unit": "USD"
  //   },
  //   "isAvailable": true,
  //   "ratings": [],
  //   "createdAt": "2023-06-20T15:00:00.000Z"
  // }

  // ],
  products: [
    {
      id: 1,
      sku: "FAS-01",
      link: "/product/detail",
      categories: ["Business & Finance"],
      name: "A song of ice and fire",
      img: "https://upload.wikimedia.org/wikipedia/en/d/dc/A_Song_of_Ice_and_Fire_book_collection_box_set_cover.jpg",
      price: 180,
      originPrice: 200,
      discountPrice: 20,
      discountPercentage: 10,
      isNew: true,
      isHot: false,
      star: 4,
      isFreeShipping: true,
      description:
        "Nulla sodales sit amet orci eu vehicula. Curabitur metus velit, fermentum a velit ac, sodales egestas lacus. Etiam congue velit vel luctus dictum. Pellentesque at pellentesque sapien.",
    },
    {
      id: 2,
      sku: "FAS-02",
      link: "/product/detail",
      name: "A song of ice and fire",
      img: "https://upload.wikimedia.org/wikipedia/en/d/dc/A_Song_of_Ice_and_Fire_book_collection_box_set_cover.jpg",
      price: 475,
      originPrice: 0,
      discountPrice: 0,
      discountPercentage: 0,
      isNew: false,
      isHot: true,
      star: 3,
      isFreeShipping: true,
      description:
        "Maecenas suscipit volutpat gravida. Nulla hendrerit nisi a lectus blandit aliquam. Integer enim magna, consequat sed justo nec, auctor sagittis urna.",
    },
    {
      id: 3,
      sku: "FAS-03",
      link: "/product/detail",
      name: "A song of ice and fire",
      img: "https://upload.wikimedia.org/wikipedia/en/d/dc/A_Song_of_Ice_and_Fire_book_collection_box_set_cover.jpg",
      price: 1900,
      originPrice: 2000,
      discountPrice: 100,
      discountPercentage: 0,
      isNew: true,
      isHot: true,
      star: 2,
      isFreeShipping: true,
      description:
        "Vivamus sapien eros, molestie sed lacus vitae, lacinia volutpat ipsum. Nam sollicitudin lorem eget ornare vulputate.",
    },
    {
      id: 4,
      sku: "FAS-04",
      link: "/product/detail",
      name: "A song of ice and fire",
      img: "https://upload.wikimedia.org/wikipedia/en/d/dc/A_Song_of_Ice_and_Fire_book_collection_box_set_cover.jpg",
      price: 10,
      originPrice: 0,
      discountPrice: 0,
      discountPercentage: 0,
      isNew: false,
      isHot: false,
      star: 0,
      isFreeShipping: false,
      description:
        "Morbi lobortis velit non consectetur porta.|Duis auctor risus ac purus vehicula tempor.|Fusce at ipsum a leo tempor malesuada.|Curabitur tincidunt justo vel volutpat suscipit.",
    },
  ],
  blogBanner: [
    {
      to: "/blog/detail",
      img: "https://upload.wikimedia.org/wikipedia/en/d/dc/A_Song_of_Ice_and_Fire_book_collection_box_set_cover.jpg",
      title: "First slide label",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum",
    },
    {
      to: "/blog/detail",
      img: "../../images/blog/nature-2.webp",
      title: "Second slide label",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      to: "/blog/detail",
      img: "../../images/blog/nature-3.webp",
      title: "Third slide label",
      description: "Praesent commodo cursus magna, vel scelerisque nisl.",
    },
  ],
  blogList: [
    {
      to: "/blog/detail",
      img: "../../images/blog/nature-1.webp",
      title:
        "It is a long established fact that a reader will be distracted by the readable content",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      publishDate: "Jul 05, 2020",
      tags: ["Branding", "Design"],
      commentCount: 2,
    },
    {
      to: "/blog/detail",
      img: "../../images/blog/nature-2.webp",
      title:
        "Contrary to popular belief, Lorem Ipsum is not simply random text",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
      publishDate: "Aug 05, 2020",
      tags: ["Branding", "Design"],
      commentCount: 3,
    },
    {
      to: "/",
      img: "../../images/blog/nature-3.webp",
      title: "The standard chunk of Lorem Ipsum used since the 1500s",
      description:
        "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      publishDate: "Sep 05, 2020",
      tags: ["Branding", "Design"],
      commentCount: 4,
    },
  ],
};
