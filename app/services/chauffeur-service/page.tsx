import { notFound } from "next/navigation";
import { ServiceDetail } from "@/Components/gold/Details";
import { getServiceTypeContent } from "../serviceTypeData";
export default async function Page({searchParams}:{searchParams:Promise<{city?:string}>}){const content=getServiceTypeContent("chauffeur-service");if(!content)notFound();const {city}=await searchParams;return <ServiceDetail content={content} city={city}/>;}
