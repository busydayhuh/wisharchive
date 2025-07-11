import { ID } from "appwrite";
import { useGalleryMode } from "./ui/DashboardLayout";
import DbWishlistGalleryItem from "./ui/DbWishlistGalleryItem";
import DbWishlistTableItem from "./ui/DbWishlistTableItem";

const lists = [
  {
    $id: "1",
    name: "Гаджеты",
    imagesUrl: [
      "https://anyplaceholder.com/placeholder?width=800&height=600&bg=0099ff66&color=fff&text=wish+1&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=600&height=800&bg=ff660066&color=fff&text=wish+2&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=700&height=500&bg=33cc3366&color=fff&text=wish+3&fontSize=28&radius=0&format=png&retina=true",
    ],
    isPrivate: true,
    wishCount: 10,
  },
  {
    $id: "2",
    name: "Книги",
    imagesUrl: [
      "https://anyplaceholder.com/placeholder?width=400&height=600&bg=66339966&color=fff&text=wish+4&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=600&height=400&bg=ff993366&color=fff&text=wish+5&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=500&height=700&bg=3399ff66&color=fff&text=wish+6&fontSize=28&radius=0&format=png&retina=true",
    ],
    isPrivate: false,
    wishCount: 7,
  },
  {
    $id: "3",
    name: "Одежда и аксессуары",
    imagesUrl: [
      "https://anyplaceholder.com/placeholder?width=600&height=600&bg=ff336666&color=fff&text=wish+7&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=800&height=400&bg=66ccff66&color=fff&text=wish+8&fontSize=28&radius=0&format=png&retina=true",
      undefined,
    ],
    isPrivate: false,
    wishCount: 15,
  },
  {
    $id: "4",
    name: "Для дома",
    imagesUrl: [
      "https://anyplaceholder.com/placeholder?width=500&height=500&bg=ffcc3366&color=fff&text=wish+10&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=700&height=700&bg=33ff9966&color=fff&text=wish+11&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=600&height=400&bg=3366ff66&color=fff&text=wish+12&fontSize=28&radius=0&format=png&retina=true",
    ],
    isPrivate: true,
    wishCount: 5,
  },
  {
    $id: "5",
    name: "Гаджеты",
    imagesUrl: [
      "https://anyplaceholder.com/placeholder?width=800&height=600&bg=0099ff66&color=fff&text=wish+1&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=600&height=800&bg=ff660066&color=fff&text=wish+2&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=700&height=500&bg=33cc3366&color=fff&text=wish+3&fontSize=28&radius=0&format=png&retina=true",
    ],
    isPrivate: true,
    wishCount: 10,
  },
  {
    $id: "6",
    name: "Книги",
    imagesUrl: [
      "https://anyplaceholder.com/placeholder?width=400&height=600&bg=66339966&color=fff&text=wish+4&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=600&height=400&bg=ff993366&color=fff&text=wish+5&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=500&height=700&bg=3399ff66&color=fff&text=wish+6&fontSize=28&radius=0&format=png&retina=true",
    ],
    isPrivate: false,
    wishCount: 7,
  },
  {
    $id: "7",
    name: "Одежда и аксессуары",
    imagesUrl: [
      "https://anyplaceholder.com/placeholder?width=600&height=600&bg=ff336666&color=fff&text=wish+7&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=800&height=400&bg=66ccff66&color=fff&text=wish+8&fontSize=28&radius=0&format=png&retina=true",
      undefined,
    ],
    isPrivate: false,
    wishCount: 15,
  },
  {
    $id: "8",
    name: "Для дома",
    imagesUrl: [
      "https://anyplaceholder.com/placeholder?width=500&height=500&bg=ffcc3366&color=fff&text=wish+10&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=700&height=700&bg=33ff9966&color=fff&text=wish+11&fontSize=28&radius=0&format=png&retina=true",
      "https://anyplaceholder.com/placeholder?width=600&height=400&bg=3366ff66&color=fff&text=wish+12&fontSize=28&radius=0&format=png&retina=true",
    ],
    isPrivate: true,
    wishCount: 5,
    canRead: ["id1", "id2", "id3", "id3", "id3", "id3"],
    canEdit: ["id1", "id2", "id3"],
  },
];

function WishlistsPage() {
  const { galleryMode } = useGalleryMode();
  //TODO адаптировать под мобилку

  return (
    <div className="flex flex-col gap-4">
      {galleryMode === "gallery" && (
        <div className="gap-x-4 gap-y-6 grid grid-cols-5">
          {lists.map((list) => (
            <DbWishlistGalleryItem list={list} key={list.$id} />
          ))}
        </div>
      )}
      {galleryMode === "table" &&
        lists.map((list) => (
          <DbWishlistTableItem list={list} key={ID.unique()} />
        ))}
    </div>
  );
}

export const Component = WishlistsPage;
