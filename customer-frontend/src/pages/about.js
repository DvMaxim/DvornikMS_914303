import { AboutDetailBlock } from "components/About/AboutDetailBlock/AboutDetailBlock";
// import { AboutDiscount } from "components/About/AboutDiscount/AboutDiscount";

import { Advantage } from "components/shared/Advantage/Advantage";

import { Testimonials } from "components/shared/Tesimonials/Tesimonials";
import { PublicLayout } from "layout/PublicLayout";
import { Info } from "components/landing/Info/InfoAbout";

const breadcrumbsData = [
  {
    label: "Главная",
    path: "/",
  },
  {
    label: "О нас",
    path: "/about",
  },
];
const AboutPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData}>
      <AboutDetailBlock />
      <Info />
      <Testimonials />
      <Advantage />
    </PublicLayout>
  );
};

export default AboutPage;
