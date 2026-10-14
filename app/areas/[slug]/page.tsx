import { notFound } from "next/navigation";
import { areas } from "../areasData";
import { AreaDetail } from "@/Components/gold/Details";
export function generateStaticParams(){return areas.map(a=>({slug:a.slug}));}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const area=areas.find(a=>a.slug===slug);if(!area)notFound();return <AreaDetail area={area}/>;}
