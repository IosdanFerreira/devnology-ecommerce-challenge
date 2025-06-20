import type { IBenefit } from "../data/benefits-data";

export default function BenefitCard({ benefit }: { benefit: IBenefit }) {
  return (
    <div>
      {" "}
      <div className="flex items-start gap-4 bg-white rounded-xl  p-4 border  border-[#dddddd]">
        <div className="text-emerald-600 text-2xl md:text-3xl">
          {benefit.icon}
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            {benefit.title}
          </h3>
          <p className="text-sm text-muted-foreground">{benefit.description}</p>
        </div>
      </div>
    </div>
  );
}
