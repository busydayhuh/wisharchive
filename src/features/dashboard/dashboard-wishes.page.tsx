import { useState } from "react";
import Masonry from "react-masonry-css";
import DashboardGalleryModeSwitch from "./ui/DashboardGalleryModeSwitch";
import DbWishGalleryItem from "./ui/DbWishGalleryItem";
import DbWishTableItem from "./ui/DbWishTableItem";

const wishes = [
  {
    name: "Книга «1984»",
    listId: "list001",
    listName: "Книги",
    listPrivate: false,
    url: "https://www.ozon.ru/product/kniga-1984-dzhordzh-oruell-123456/",
    price: 550,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=400&height=600&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // вертикальное
    imageAspectRatio: 400 / 600, // 0.67
  },
  {
    name: "Наушники Sony WH-1000XM5",
    listId: "list002",
    listName: "Гаджеты",
    listPrivate: true,
    url: "https://www.ozon.ru/product/naushniki-sony-wh-1000xm5-654321/",
    price: 24990,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=800&height=800&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // квадратное
    imageAspectRatio: 1,
  },
  {
    name: "Рюкзак Fjällräven Kånken",
    listId: "list003",
    listName: "Одежда и аксессуары",
    listPrivate: false,
    url: "https://www.ozon.ru/product/ryukzak-fjallraven-kanken-789012/",
    price: 7990,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=600&height=800&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // вертикальное
    imageAspectRatio: 600 / 800, // 0.75
  },
  {
    name: "Чайник Xiaomi Mi Electric Kettle",
    listId: "list004",
    listName: "Для дома",
    listPrivate: false,
    url: "https://www.ozon.ru/product/chaynik-xiaomi-mi-electric-kettle-345678/",
    price: 1990,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=800&height=500&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // горизонтальное
    imageAspectRatio: 800 / 500, // 1.6
  },
  {
    name: "Фитнес-браслет Xiaomi Mi Band 7",
    listId: "list002",
    listName: "Гаджеты",
    listPrivate: true,
    url: "https://www.ozon.ru/product/fitnes-braslet-xiaomi-mi-band-7-987654/",
    price: 3490,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=500&height=500&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // квадратное
    imageAspectRatio: 1,
  },
  {
    name: "Электрическая зубная щётка Oral-B",
    listId: "list004",
    listName: "Для дома",
    listPrivate: false,
    url: "https://www.ozon.ru/product/elektricheskaya-zubnaya-shchetka-oral-b-192837/",
    price: 2790,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=400&height=700&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // вертикальное
    imageAspectRatio: 400 / 700, // 0.57
  },
  {
    name: "Кофемашина DeLonghi",
    listId: "list004",
    listName: "Для дома",
    listPrivate: false,
    url: "https://www.ozon.ru/product/kofemashina-delonghi-564738/",
    price: 29990,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=800&height=600&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // горизонтальное
    imageAspectRatio: 800 / 600, // 1.33
  },
  {
    name: "Беспроводная колонка JBL",
    listId: "list002",
    listName: "Гаджеты",
    listPrivate: true,
    url: "https://www.ozon.ru/product/besprovodnaya-kolonka-jbl-847362/",
    price: 7990,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=700&height=500&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // горизонтальное
    imageAspectRatio: 700 / 500, // 1.4
  },
  {
    name: "Кроссовки Nike Air Force 1",
    listId: "list003",
    listName: "Одежда и аксессуары",
    listPrivate: false,
    url: "https://www.ozon.ru/product/krossovki-nike-air-force-1-918273/",
    price: 9990,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=600&height=400&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // горизонтальное
    imageAspectRatio: 1.5,
  },
  {
    name: "Плед флисовый",
    listId: "list004",
    listName: "Для дома",
    listPrivate: false,
    url: "https://www.ozon.ru/product/pled-flisovyy-112233/",
    price: 990,
    currency: "Р",
    isBooked: true,
    imageUrl:
      "https://i.pinimg.com/736x/72/97/e9/7297e9242fa457214f91ed153c37f5ae.jpg", // квадратное
    imageAspectRatio: 1,
  },
  {
    name: "Настольная лампа",
    listId: "list004",
    listName: "Для дома",
    listPrivate: false,
    url: "https://www.ozon.ru/product/nastolnaya-lampa-445566/",
    price: 1490,
    currency: "Р",
    isBooked: true,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=500&height=800&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // вертикальное
    imageAspectRatio: 500 / 800, // 0.625
  },
  {
    name: "Смартфон Samsung Galaxy S24",
    listId: "list002",
    listName: "Гаджеты",
    listPrivate: true,
    url: "https://www.ozon.ru/product/smartfon-samsung-galaxy-s24-778899/",
    price: 79990,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=600&height=1200&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // очень вертикальное
    imageAspectRatio: 0.5,
  },
  {
    name: "Чемодан на колёсах",
    listId: "list003",
    listName: "Одежда и аксессуары",
    listPrivate: false,
    url: "https://www.ozon.ru/product/chemodan-na-kolesah-334455/",
    price: 4990,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=500&height=700&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // вертикальное
    imageAspectRatio: 500 / 700, // 0.71
  },
  {
    name: "Графический планшет Wacom",
    listId: "list002",
    listName: "Гаджеты",
    listPrivate: true,
    url: "https://www.ozon.ru/product/graficheskiy-planshet-wacom-556677/",
    price: 12990,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=800&height=600&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // горизонтальное
    imageAspectRatio: 1.33,
  },
  {
    name: "Набор кастрюль",
    listId: "list004",
    listName: "Для дома",
    listPrivate: false,
    url: "https://www.ozon.ru/product/nabor-kastryul-998877/",
    price: 3990,
    currency: "Р",
    isBooked: false,
    imageUrl:
      "https://anyplaceholder.com/placeholder?width=700&height=700&bg=0099ff66&color=fff&text=wish+image&fontSize=28&radius=0&format=png&retina=true", // квадратное
    imageAspectRatio: 1,
  },
];

function WishesPage() {
  const [galleryMode, setGalleryMode] = useState("gallery");

  return (
    <div className="flex flex-col gap-2">
      <DashboardGalleryModeSwitch mode={galleryMode} set={setGalleryMode} />
      {galleryMode === "gallery" && (
        <Masonry
          breakpointCols={{ default: 4, 1100: 3, 768: 2 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {wishes.map((wish) => (
            <DbWishGalleryItem wish={wish} key={wish.name} />
          ))}
        </Masonry>
      )}
      {galleryMode === "table" &&
        wishes.map((wish) => <DbWishTableItem wish={wish} key={wish.name} />)}
    </div>
  );
}

export const Component = WishesPage;
