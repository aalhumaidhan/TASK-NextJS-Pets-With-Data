import { fetchPets } from "@/actions";
import PetsContainer from "./components/PetsContainer";

async function PetsPage() {
  let pets = await fetchPets();
  return <PetsContainer pets={pets} />;
}

export default PetsPage;
