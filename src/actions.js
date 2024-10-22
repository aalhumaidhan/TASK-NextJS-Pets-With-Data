"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function fetchPets() {
  const response = await fetch(
    "https://pets-react-query-backend.eapi.joincoded.com/pets"
  );
  const pets = await response.json();
  return pets;
}

export async function fetchPetsById(id) {
  const response = await fetch(
    `https://pets-react-query-backend.eapi.joincoded.com/pets/${id}`
  );
  let pet;
  try {
    pet = await response.json();
  } catch (error) {
    console.error("Pet not found!");
    redirect("/pets");
  }
  return pet;
}

export async function createPet(formData) {
  const petData = {
    ...Object.fromEntries(formData),
    adopted: 0,
  };

  const response = await fetch(
    "https://pets-react-query-backend.eapi.joincoded.com/pets",
    {
      method: "POST",
      headers,
      body: JSON.stringify(petData),
    }
  );
  const newPet = await response.json();

  revalidatePath("/pets");
  revalidatePath("/pets[id]", "page");
  redirect(`/pets/${newPet.id}`);
}

export async function deletePet(id) {
  const response = await fetch(
    `https://pets-react-query-backend.eapi.joincoded.com/pets/${id}`,
    {
      method: "DELETE",
    }
  );
  revalidatePath("/pets");
  revalidatePath("/pets[id]", "page");
  redirect(`/pets`);
}
