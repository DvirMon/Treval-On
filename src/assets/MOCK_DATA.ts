import { Timestamp } from '@angular/fire/firestore';
import { Places } from 'src/app/vacations/store/vacation.model';

export const VACATIONS_DATA: Places[] = [
  {
    imageUrl: "https://media.worldnomads.com/travel-safety/poland/historic-houses-poland-gettyimages-137910613.jpg",
    price: 3546,
    takeoff: new Timestamp(1667599200, 0),
    destination: {
      city: "Warsaw",
      country: "Poland"
    },
    landing: new Timestamp(1667599200, 0),
    id: "3hqilxhJNUzylQQa18Xd"
  },

  {
    imageUrl: "https://images.pexels.com/photos/189833/pexels-photo-189833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    landing: new Timestamp(1670536800, 0),
    price: 4018,
    destination: {
      city: "Beijing",
      country: "China"
    },
    takeoff: new Timestamp(1665867600, 0),
    id: "6jsShidDt50ZFqXbJuGC"
  },

  {
    imageUrl: "https://images.pexels.com/photos/13911606/pexels-photo-13911606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 2759,
    takeoff: new Timestamp(1685221200, 0),
    destination: {
      city: "Rio de Janeiro",
      country: "Brazil"
    },
    landing: new Timestamp(1657486800, 0),
    id: "9w97as0pyPdseWzjTfXC"
  },

  {
    landing: new Timestamp(1668376800, 0),
    destination: {
      city: "Santiago",
      country: "Chile"
    },
    imageUrl: "https://images.pexels.com/photos/1684166/pexels-photo-1684166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 3191,
    takeoff: new Timestamp(1662066000, 0),
    id: "KMMWCuHBMAkc6bwG9n07"
  },

  {
    imageUrl: "https://images.pexels.com/photos/6476020/pexels-photo-6476020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    takeoff: new Timestamp(1670536800, 0),
    destination: {
      city: "London",
      country: "England"
    },
    price: 1651,
    landing: new Timestamp(1673301600, 0),
    id: "T0bP7ItCDwJPZB60pd2c"
  },

  {
    imageUrl: "https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg",
    destination: {
      city: "Berlin",
      country: "Germany"
    },
    landing: new Timestamp(1660942800, 0),
    takeoff: new Timestamp(1674684000, 0),
    price: 4312,
    id: "bPwXKAVt68nMJNC2m51B"
  },

  {
    landing: new Timestamp(1668549600, 0),
    imageUrl: "https://images.pexels.com/photos/5220030/pexels-photo-5220030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 1655,
    takeoff: new Timestamp(1682629200, 0),
    destination: {
      city: "Tokyo",
      country: "Japan"
    },
    id: "isfPtIf6PLNji3UPYTmO"
  },

  {
    imageUrl: "https://images.pexels.com/photos/1531660/pexels-photo-1531660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    destination: {
      city: "Kathmandu",
      country: "Nepal"
    },
    takeoff: new Timestamp(1668895200, 0),
    price: 1717,
    landing: new Timestamp(1659646800, 0),
    id: "n9mpncvltrdPnWqLyLGu"
  },

  {
    price: 1921,
    imageUrl: "https://images.pexels.com/photos/922978/pexels-photo-922978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    destination: {
      city: "Zurich",
      country: "Switzerland"
    },
    takeoff: new Timestamp(1671487200, 0),
    landing: new Timestamp(1665003600, 0),
    id: "tLGTfXNtuvBIZHUsoUnW"
  },

  {
    imageUrl: "https://images.pexels.com/photos/1637122/pexels-photo-1637122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    takeoff: new Timestamp(1659387600, 0),
    destination: {
      city: "Havana",
      country: "Cuba"
    },
    landing: new Timestamp(1671919200, 0),
    price: 2003,
    id: "v3oP25WvJPtbdiC2qGgf"
  },
  {
    imageUrl: "https://example.com/destination/image11.jpg",
    price: 2800,
    takeoff: new Timestamp(1705000000, 0),
    destination: {
      city: "Sydney",
      country: "Australia"
    },
    landing: new Timestamp(1706000000, 0),
    id: "abcdefg1"
  },
  {
    imageUrl: "https://example.com/destination/image12.jpg",
    price: 3500,
    takeoff: new Timestamp(1707000000, 0),
    destination: {
      city: "Cairo",
      country: "Egypt"
    },
    landing: new Timestamp(1708000000, 0),
    id: "abcdefg2"
  },
  {
    imageUrl: "https://example.com/destination/image13.jpg",
    price: 2300,
    takeoff: new Timestamp(1709000000, 0),
    destination: {
      city: "Moscow",
      country: "Russia"
    },
    landing: new Timestamp(1710000000, 0),
    id: "abcdefg3"
  },
  {
    imageUrl: "https://example.com/destination/image14.jpg",
    price: 2800,
    takeoff: new Timestamp(1711000000, 0),
    destination: {
      city: "Bangkok",
      country: "Thailand"
    },
    landing: new Timestamp(1712000000, 0),
    id: "abcdefg4"
  },
  {
    imageUrl: "https://example.com/destination/image15.jpg",
    price: 3200,
    takeoff: new Timestamp(1713000000, 0),
    destination: {
      city: "Toronto",
      country: "Canada"
    },
    landing: new Timestamp(1714000000, 0),
    id: "abcdefg5"
  },
  {
    imageUrl: "https://example.com/destination/image16.jpg",
    price: 3800,
    takeoff: new Timestamp(1715000000, 0),
    destination: {
      city: "Cape Town",
      country: "South Africa"
    },
    landing: new Timestamp(1716000000, 0),
    id: "abcdefg6"
  },
  {
    imageUrl: "https://example.com/destination/image17.jpg",
    price: 2100,
    takeoff: new Timestamp(1717000000, 0),
    destination: {
      city: "New York City",
      country: "United States"
    },
    landing: new Timestamp(1718000000, 0),
    id: "abcdefg7"
  },
  {
    imageUrl: "https://example.com/destination/image18.jpg",
    price: 2700,
    takeoff: new Timestamp(1719000000, 0),
    destination: {
      city: "Dubai",
      country: "United Arab Emirates"
    },
    landing: new Timestamp(1720000000, 0),
    id: "abcdefg8"
  },
  {
    imageUrl: "https://example.com/destination/image19.jpg",
    price: 2950,
    takeoff: new Timestamp(1721000000, 0),
    destination: {
      city: "Stockholm",
      country: "Sweden"
    },
    landing: new Timestamp(1722000000, 0),
    id: "abcdefg9"
  },
  {
    imageUrl: "https://example.com/destination/image20.jpg",
    price: 2450,
    takeoff: new Timestamp(1723000000, 0),
    destination: {
      city: "Marrakech",
      country: "Morocco"
    },
    landing: new Timestamp(1724000000, 0),
    id: "abcdefg10"
  }
];
