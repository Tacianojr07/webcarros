import { useState, useEffect } from "react";
import { Container } from "../../components/container";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Link } from "react-router-dom";

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

export function Home() {
  const [car, setCar] = useState<CarProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);

  useEffect(() => {
    function loadCards() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("date", "desc"));

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
  }, []);

  function handleLoadImage(id: string) {
    setLoadImages((imagesPreview) => [...imagesPreview, id]);
  }

  return (
    <Container>
      <section className="bg-white w-full max-w-3xl p-3 rounded-lg mx-auto flex justify-center items-center  gap-3">
        <input
          className="w-full border-2 rounded-lg px-2 h-9 outline-none"
          placeholder="Digite o nome do carro"
        />

        <button className="h-9 bg-red-600 px-8 rounded-lg text-white font-medium text-lg">
          Buscar
        </button>
      </section>
      <h1 className="text-center mt-6 font-bold text-2xl mb-4">
        Carros novos e usados de todo o brasil
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {car.map((item) => (
          <Link key={item.id} to={`car/${item.id}`}>
            <section className="w-full bg-white rounded-lg">
              <img
                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 cursor-pointer transition-all "
                src={item.images[0].url}
                alt="carros"
                onLoad={() => handleLoadImage(item.id)}
              />
              <p className="font-bold mt-1 mb-2 px-2">{item.price}</p>
              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-7 ">
                  {item.year} | {item.km} KM
                </span>
                <strong className="text-black text-xl font-medium">
                  R$ {item.price}
                </strong>
                <div className="w-full h-px bg-slate-300 my-2"></div>
                <div className="px-2 pb-2">
                  <span className="text-black">{item.city}</span>
                </div>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </Container>
  );
}
