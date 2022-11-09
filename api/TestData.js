var TestData = {
    products: [
        [1, 'Blade Oakleaf Lettuce', 'https://i2.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/015-Blade-Oakleaf-Lettuce-Web.jpg?fit=1500%2C1000&ssl=1', 'https://localgrownsalads.com/product/blade-oakleaf-lettuce/'],
        [2, 'Curly Kale', 'https://i0.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/014-Kale-Web.jpg?fit=1500%2C1000&ssl=1','https://localgrownsalads.com/product/curly-kale/'],
        [3, 'Pesto Basil', 'https://i0.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/014-Kale-Web.jpg?fit=1500%2C1000&ssl=1', 'https://localgrownsalads.com/product/pesto-basil/']
    ],
    product_names: [
        [1, 'english', 'Blade Oakleaf Lettuce'],
        [1, 'spanish', 'Hoja de Lechuga de Hoja de Roble'],
        [2, 'english', 'Curly Kale'],
        [2, 'spanish', 'Col Rizada'],
        [3, 'english', 'Pesto Basil'],
        [3, 'spanish', 'Pesto de Albahaca']
    ],
    product_specs: [
        [1, 'english', 'An Oakleaf Lettuce in the shape of a blade, this lettuce\'s leaves are long and thin, and they fit perfectly, whole, in large salads, or, chopped, in regular salads. Blade Oakleaf Lettuce has its own distinct, bold flavour compared to staple lettuces, and that\'s why you\'ll find it in stronger flavoured salads.'],
        [1, 'spanish', 'Una Lechuga Hoja de Roble en forma de cuchilla, las hojas de esta lechuga son largas y finas, y encajan perfectamente, enteras, en ensaladas grandes, o, picadas, en ensaladas regulares. Blade Oakleaf Lettuce tiene su propio sabor distintivo y audaz en comparación con las lechugas básicas, y es por eso que la encontrará en ensaladas de sabores más fuertes.'],
        [2, 'english', 'A salad favourite, Curly Kale gets its name from its wavy leaves. When young, their edges have a slight curl, but as they grow, so do the amount of curls. This variety of kale is particularly nice in salads, thanks in large part to its appearance and texture adding a different look than your average lettuce-based salad.'],
        [2, 'spanish', 'Una ensalada favorita, Curly Kale recibe su nombre de sus hojas onduladas. Cuando son jóvenes, sus bordes tienen un ligero rizo, pero a medida que crecen, también aumenta la cantidad de rizos. Esta variedad de col rizada es particularmente agradable en ensaladas, gracias en gran parte a su apariencia y textura que le da un aspecto diferente al de una ensalada promedio a base de lechuga.'],
        [3, 'english', 'Sweet Basil. St. Joseph\'s Wort. Ocimum Basilicum. Genovese Basil. Delicious. Whatever you call it, this popular variety of basil is a fragrant and flavourful herb that is most commonly found in its own saucy paste-type dish, pesto, which pairs beautifully from everything from pastas and pizzas to fish and even as a dip for breads and crackers.'],
        [3, 'spanish', 'Albahaca. Hierba de San José. Ocimum Basilicum. Albahaca Genovesa. Delicioso. Como sea que la llames, esta popular variedad de albahaca es una hierba aromática y sabrosa que se encuentra más comúnmente en su propio plato tipo pasta picante, el pesto, que combina a la perfección con todo, desde pastas y pizzas hasta pescado e incluso como salsa para panes. y galletas.']
    ],
    lot: [
        [1, '2022-09-26', 4, '2022-10-15'],
        [2, '2022-09-26', 4, '2022-10-16'],
        [3, '2022-09-26', 4, '2022-10-17'],
        [1, '2022-09-26', 4, '2022-10-18'],
        [3, '2022-09-26', 4, '2022-10-19'],
        [1, '2022-09-26', 4, '2022-10-20'],
        [2, '2022-10-26', 4, '2022-11-15'],
        [3, '2022-10-26', 4, '2022-11-15'],
        [1, '2022-10-26', 4, '2022-11-21'],
        [2, '2022-10-26', 4, '2022-11-21']
      ],
      settings: [
        ["1.0","LGS","https://i2.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/lfs-logo-tight-crop-e1454958460180.png?fit=190%2C69&ssl=1","https://i2.wp.com/localgrownsalads.com/wp-content/uploads/2022/03/cropped-cropped-lfs-logo0-1-2-e1649170913225.png?fit=71%2C71&ssl=1","Roboto","San Francisco","282A36","8A8888","EEEEEE","FFFFFF","282A36"],
        ["2.0","Philly's Farm","https://previews.123rf.com/images/newdesignillustrations/newdesignillustrations1902/newdesignillustrations190211430/125451478-generic-text-on-a-ribbon-designed-with-white-caption-and-blue-tape-vector-banner-with-generic-tag-on.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYbEvXUTDdZ-f6eqGOMcR_KmEDSDcCBsRMQ&usqp=CAU","Montserrat","Montserrat","F54021","EFA94A","EEEEEE","FFFFFF","F54021"],
        ["3.0","Hardee Greens","https://images.squarespace-cdn.com/content/v1/5f5a93f868913475d06130f4/1601663134422-WFW88W9AZ04T55WTTIG6/HF_LOGO_KO.png?format=1500w","https://previews.123rf.com/images/newdesignillustrations/newdesignillustrations1902/newdesignillustrations190211430/125451478-generic-text-on-a-ribbon-designed-with-white-caption-and-blue-tape-vector-banner-with-generic-tag-on.jpg","Open Sans","Open Sans","8ABB50","006681","EEEEEE","FFFFFF","8ABB50"]
      ],
      recall: [
        [1, '2022-10-01', 'E. coli detected', 'XYZ123'],
        [3, '2022-11-01', 'Salmonella detected', 'ABC456']
      ],
      user: [
        [1, 'Zale', 'Tabakman', 'zale@localgrownsalads.com', 'LGS1', 'consumer', 'english', 'Consumer'],
        [2, 'John', 'Doe', 'johndoe@walmart.com', 'LGS2', 'retailer', 'english', 'Walmart'],
        [3, 'Jane', 'Smith', 'janesmith@PHXDistribution.com', 'LGS3', 'distributor', 'english', 'PHXDistribution'],
        [4, 'Jose', 'Rodriguez', 'a@b.com', 'a', 'farmer', 'spanish', 'QuartzsiteFarming']
      ],
      pallet: ["1,2,3", "1,2", "1"],
      qrcode: [
        [1, 'product'],
        [2, 'product'],
        [3, 'product'],
        [1, 'pallet'],
        [2, 'box']
      ],
      qrscan: [
        [4, '2022-07-21 12:00:00.000',33.695, -114.204, 1],
        [3, '2022-07-25 12:00:00.000', 33.447612811244085, -112.07044719604862, 1],
        [2, '2022-07-30 12:00:00.000', 33.39390852951677, -111.92761243213363, 1],
        [1, '2022-07-31 12:00:00.000', 33.424564, -111.928001, 1],
        [4, '2022-08-21 12:00:00.000', 33.694877853650866, -114.2038716512168, 2],
        [3, '2022-08-25 12:00:00.000', 33.447612811244085, -112.07044719604862, 2],
        [2, '2022-08-30 12:00:00.000', 33.39390852951677, -111.92761243213363, 2],
        [1, '2022-08-31 12:00:00.000', 33.424564, -111.928001, 2],
        [4, '2022-05-21 12:00:00.000', 33.694877853650866, -114.2038716512168, 3],
        [3, '2022-05-25 12:00:00.000', 33.447612811244085, -112.07044719604862, 3],
        [2, '2022-05-30 12:00:00.000', 33.39390852951677, -111.92761243213363, 3],
        [1, '2022-05-31 12:00:00.000', 33.424564, -111.928001, 3],
        [4, '2022-05-21 12:00:00.000', 33.694877853650866, -114.2038716512168, 4],
        [3, '2022-05-25 12:00:00.000', 33.447612811244085, -112.07044719604862, 4],
        [2, '2022-05-30 12:00:00.000', 33.39390852951677, -111.92761243213363, 4],
        [1, '2022-05-31 12:00:00.000', 33.424564, -111.928001, 4],
        [4, '2022-05-21 12:00:00.000', 33.694877853650866, -114.2038716512168, 5],
        [3, '2022-05-25 12:00:00.000', 33.447612811244085, -112.07044719604862, 5],
        [2, '2022-05-30 12:00:00.000', 33.39390852951677, -111.92761243213363, 5],
        [1, '2022-05-31 12:00:00.000', 33.424564, -111.928001, 5]
      ],
      box: [
        [1],
        [2],
        [3]
      ],
      box_contents: [
        [1, 3, 1],
        [1, 1, 2],
        [1, 5, 3],
        [2, 1, 4],
        [2, 2, 5],
        [3, 5, 6],
        [3, 3, 7],
        [3, 1, 8]

      ]
}
export default TestData