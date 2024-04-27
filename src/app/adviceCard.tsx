"use client";

import React, { useEffect, useState } from "react";
import Divider from "./divider";
import DiceIcon from "./diceIcon";

type AdviceSlip = { id: number; advice: string };
type AdviceResponse = {
  slip: AdviceSlip;
};

export default function AdviceCard() {
  const fetchAdvice = async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        throw new Error("error while fetching advice");
      }

      const data: AdviceResponse = await res.json();
      setAdvice(data.slip);
    } catch (error) {
      console.error("error while fetching advice " + error);
    }
  };

  const [advice, setAdvice] = useState<AdviceSlip | null>();

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    advice && (
      <div className="relative max-w-lg space-y-8 rounded-xl bg-dark-grayish-blue px-4 py-14 text-center sm:px-8">
        <div>
          <h1 className="text-xs tracking-[0.3em] text-neon-green">{`ADVICE #${advice.id}`}</h1>
          <h2 className="mt-4 text-[28px] text-light-cyan">
            {`"${advice.advice}"`}
          </h2>
        </div>
        <Divider />
        <button
          className="absolute bottom-0 left-1/2 flex size-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-neon-green hover:shadow-soft-blur"
          onClick={fetchAdvice}
          aria-label="fetch new advice"
        >
          <DiceIcon />
        </button>
      </div>
    )
  );
}
