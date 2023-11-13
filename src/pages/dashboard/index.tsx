import { useEffect, useState, useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Container } from "../../components/container";
import { DashboardHeaderl } from "../../components/painelheader";
import {
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { ref, deleteObject } from "firebase/storage";
import { AuthContext } from "../../contexts/AuthContext";

interface CarProps {
  id: string;
  name: string;
  year: string;
  km: string;
  uid: string;
  city: string;
  price: string | number;
  images: CarImageProps[];
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}
export function Dashboard() {
  const [car, setCar] = useState<CarProps[]>([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    function loadCards() {
      if (!user?.uid) {
        return;
      }
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user?.uid));

      getDocs(queryRef).then((snapshot) => {
        const carList = [] as CarProps[];

        snapshot.forEach((doc) => {
          carList.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            price: doc.data().price,
            city: doc.data().city,
            images: doc.data().images,
            uid: doc.data().uid,
          });
        });
        console.log(carList);
        setCar(carList);
      });
    }

    loadCards();
  }, [user?.uid]);

  async function handleDeleteCar(newCar: CarProps) {
    //deleta do banco
    const docRef = doc(db, "cars", newCar.id);
    await deleteDoc(docRef);

    newCar.images.map(async (image) => {
      //deleta do strorage
      const imagePath = `images/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.log(error);
      }
    });

    //retira do useState
    setCar(car.filter((cars) => cars.id !== newCar.id));
  }

  return (
    <Container>
      <DashboardHeaderl />

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {car.map((cars) => (
          <section
            key={cars.id}
            className="w-full bg-white rounded-lg relative"
          >
            <button
              onClick={() => handleDeleteCar(cars)}
              className="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center right-2 top-2 drop-shadow-sm"
            >
              <FiTrash2 size={26} color="#000" />
            </button>
            <img
              className="w-full max-h-72 rounded-lg mb-2 "
              src={cars.images[0].url}
              alt="image de carro"
            />
            <p className="font-bold mt-1 px-2 mb-2">{cars.name}</p>

            <div className="flex flex-col px-1">
              <span className="text-zinc-700 ">
                {cars.year} |{cars.km}{" "}
              </span>

              <strong className="text-black font-bold mt-4">
                Preço: R${cars.price}
              </strong>
            </div>

            <div className="w-full h-px bg-slate-200 my-2"></div>
            <div className=" px-2 pb-2">
              <span className="text-black">{cars.city}</span>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}
