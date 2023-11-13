import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Container } from "../../components/container";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface CarProps {
  name: string;
  id: string;
  model: string;
  city: string;
  price: string;
  km: string;
  uid: string;
  owner: string;
  date: string;
  year: string;
  description: string;
  whatsapp: string;
  images: CarImagesProps[];
}

interface CarImagesProps {
  name: string;
  uid: string;
  url: string;
}

export function Car() {
  const { id } = useParams();
  const { car, setCar } = useState<CarProps[]>();

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        return;
      }

      const docRef = doc(db, "cars", id);
      getDoc(docRef).then((snapshot) => {
        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          year: snapshot.data()?.year,
          km: snapshot.data()?.km,
          price: snapshot.data()?.price,
          city: snapshot.data()?.city,
          images: snapshot.data()?.images,
          uid: snapshot.data()?.uid,
          owner: snapshot.data()?.owner,
          description: snapshot.data()?.description,
          date: snapshot.data()?.date,
          model: snapshot.data()?.model,
          whatsapp: snapshot.data()?.whatsapp,
        });
      });

      console.log(car);
    }

    loadCar();
  }, []);

  return (
    <Container>
      <h1>page details</h1>
    </Container>
  );
}
