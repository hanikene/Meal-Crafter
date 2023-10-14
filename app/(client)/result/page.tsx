"use client";

import { MealContext } from "@/app/hooks/MealContext";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useContext } from "react";

const ResultPage = () => {
  const { data, status } = useContext(MealContext);

  if (status !== "SUCCESS") redirect("/create-meal");
  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center pt-10 pb-32 gap-6 md:px-0 px-3">
      <h1 className="4xl text-4xl font-bold mb-5 md:text-left text-center">
        {data.name}
      </h1>
      <Image
        src={data.imageUrl}
        alt={data.name + " image"}
        width={600}
        height={451}
        className="rounded-xl shadow shadow-neutral-400"
      />
      <div className="max-w-full w-[37rem]">
        <div className="flex justify-center gap-4">
          <div className="bg-orange-200 aspect-square w-20 flex text-center justify-center items-center rounded-lg shadow-md ">
            min
            <br />
            {data.preparationTime}
          </div>
          <div className="bg-orange-200 aspect-square w-20 flex text-center justify-center items-center rounded-lg shadow-md ">
            kcal
            <br />
            {data.nutritionalFacts.calories}
          </div>
          <div className="bg-orange-200 aspect-square w-20 flex text-center justify-center items-center rounded-lg shadow-md ">
            carbs
            <br />
            {data.nutritionalFacts.carbohydrates}g
          </div>
          <div className="bg-orange-200 aspect-square w-20 flex text-center justify-center items-center rounded-lg shadow-md ">
            fat
            <br />
            {data.nutritionalFacts.fat}g
          </div>
          <div className="bg-orange-200 aspect-square w-20 flex text-center justify-center items-center rounded-lg shadow-md ">
            protein
            <br />
            {data.nutritionalFacts.proteins}g
          </div>
        </div>
        <h2 className="mt-16 mb-8 font-bold text-4xl">Ingredients</h2>
        {data.ingredients.map(({ name, amount }) => (
          <div key={name} className="ml-4 text-lg mb-1">
            {name}: {amount}
          </div>
        ))}
        <h2 className="mt-16 mb-8 font-bold text-4xl">Steps</h2>
        {data.steps.map((step, key) => (
          <p key={step} className="mb-5">
            <span className="font-semibold text-lg mr-2">{key + 1}.</span>
            {step}
          </p>
        ))}
        <h3 className="text-2xl font-semibold md:text-left text-center mt-14">
          Bon appetit 👨‍🍳
        </h3>
      </div>
    </main>
  );
};

export default ResultPage;
