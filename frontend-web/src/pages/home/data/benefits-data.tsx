import type React from "react";
import { FaShippingFast } from "react-icons/fa";

export interface IBenefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const benefitsData: IBenefit[] = [
  {
    title: "Frete Grátis",
    description: "Frete grátis para todo o Brasil em pedidos acima de R$ 150",
    icon: <FaShippingFast />,
  },
  {
    title: "Cashback",
    description: "5% de cashback em todos os produtos na sua carteira virtual",
    icon: <FaShippingFast />,
  },
  {
    title: "Pagamento Seguro",
    description: "Seus dados protegidos com criptografia e segurança bancária",
    icon: <FaShippingFast />,
  },
  {
    title: "Suporte 24h",
    description: "Atendimento ao cliente disponível todos os dias, 24 horas",
    icon: <FaShippingFast />,
  },
];
