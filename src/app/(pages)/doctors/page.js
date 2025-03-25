import Container from "@/app/components/Layout/Container";
import ContainerFluid from "@/app/components/Layout/ContainerFluid";
import DoctorsPage from "@/app/components/Organs/DoctorsPage/DoctorsPage";
import React from "react";

export default function page() {
  return <>
  <ContainerFluid className="">
  <Container className="">
  <DoctorsPage/>
  </Container>
    </ContainerFluid>
    </>;
}
