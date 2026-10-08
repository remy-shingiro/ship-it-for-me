import Image from "next/image";

export type FlagCountry = "China" | "United Arab Emirates" | "Uganda" | "Rwanda";

const flagSources: Record<FlagCountry, string> = {
  China: "/flags/cn.svg",
  "United Arab Emirates": "/flags/ae.svg",
  Uganda: "/flags/ug.svg",
  Rwanda: "/flags/rw.svg",
};

export function CountryFlag({ country, className = "" }: { country: FlagCountry; className?: string }) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={"country-flag " + className}
      height={24}
      src={flagSources[country]}
      width={36}
    />
  );
}
