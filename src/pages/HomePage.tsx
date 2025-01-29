import {
  SectionConheca,
  // SectionEnergiaRenovavel,
  SectionPerguntasFrequentes,
  SectionSimulacaoEconomia,
  // SectionMercadoLivreDeEnergia,
} from "../section/home";
import { Helmet } from "react-helmet-async";
import SectionOQueFalamDeNos from "../section/home/SectionOQueFalamDeNos";
import SectionComALightCom from "../section/home/SectionComALightCom";


export default function HomePage() {


  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="
          Comercializadora do Grupo Light. Com presença nacional, oferecemos soluções personalizadas para maximizar sua economia por meio de uma fonte de energia limpa e sustentável, proporcionando crescimento, segurança e solidez ao seu negócio.,
          Light COM"
        />
        <meta
          name="keywords"
          content="
          Mercado livre de energia,
          Energia renovável,
          Energia solar,
          Energia eólica,
          Economia de energia,
          Fornecedores de energia,
          Tarifas de energia,
          Energia sustentável,
          Energia limpa,
          Comparação de tarifas de energia"
        />
      </Helmet>

      <SectionSimulacaoEconomia id="simulacao-economia" />
      <SectionConheca id="conheca" />

      {/* <SectionEnergiaRenovavel id="EnergiaRenovavel" /> */}
      <SectionComALightCom />

      {/* <SectionMercadoLivreDeEnergia id="mercado-livre-energia" /> */}
      <SectionPerguntasFrequentes id="perguntas-frequentes" />
      <SectionOQueFalamDeNos id="falam-de-nos" />
    </>
  );
}
