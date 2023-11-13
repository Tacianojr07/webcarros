import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Container } from "../../components/container";

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
  const { car, setCar } = useState<CarProps>();

  useEffect(() => {}, []);

  return (
    <div>
      <h1>page details</h1>
    </div>
  );
}
