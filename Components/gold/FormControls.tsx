"use client";

import { Fragment, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Input, Listbox, ListboxButton, ListboxOption, ListboxOptions, Popover, PopoverButton, PopoverPanel, Textarea } from "@headlessui/react";
import { format, isValid, parseISO } from "date-fns";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarMonth, DayPicker, useDayPicker } from "react-day-picker";

export type SelectOption = { value: string; label: string };

export function GoldInput(props:InputHTMLAttributes<HTMLInputElement>){
  return <Input {...props} className={`gold-input ${props.className??""}`.trim()}/>;
}

export function GoldTextarea(props:TextareaHTMLAttributes<HTMLTextAreaElement>){
  return <Textarea {...props} className={`gold-input gold-textarea ${props.className??""}`.trim()}/>;
}

export function GoldSelect({name,value,onChange,options,placeholder="Choose an option",required=false,ariaLabel}:{name?:string;value:string;onChange:(value:string)=>void;options:SelectOption[];placeholder?:string;required?:boolean;ariaLabel?:string}){
  const selected=options.find(option=>option.value===value);
  return <div className="gold-select"><input type="hidden" name={name} value={value}/><Listbox value={value} onChange={onChange}>
    <ListboxButton className="gold-select-button" aria-label={ariaLabel} aria-required={required}><span className={!selected?"is-placeholder":""}>{selected?.label??placeholder}</span><ChevronDown aria-hidden="true"/></ListboxButton>
    <ListboxOptions modal={false} transition anchor="bottom start" className="gold-select-options">
      {options.map(option=><ListboxOption key={option.value} value={option.value} as={Fragment}>{({focus,selected})=><button type="button" className={`gold-select-option ${focus?"is-focus":""} ${selected?"is-selected":""}`}><span>{option.label}</span>{selected&&<Check aria-hidden="true"/>}</button>}</ListboxOption>)}
    </ListboxOptions>
  </Listbox></div>;
}

function CalendarCaption({calendarMonth}:{calendarMonth:CalendarMonth}){
  const {goToMonth,nextMonth,previousMonth}=useDayPicker();
  return <div className="gold-calendar-caption"><strong>{format(calendarMonth.date,"MMMM yyyy")}</strong><div><button type="button" aria-label="Previous month" disabled={!previousMonth} onClick={()=>previousMonth&&goToMonth(previousMonth)}><ChevronLeft/></button><button type="button" aria-label="Next month" disabled={!nextMonth} onClick={()=>nextMonth&&goToMonth(nextMonth)}><ChevronRight/></button></div></div>;
}

export function GoldDatePicker({name,value,onChange,required=false,ariaLabel="Travel date"}:{name:string;value:string;onChange:(value:string)=>void;required?:boolean;ariaLabel?:string}){
  const parsed=value?parseISO(value):undefined;
  const selected=parsed&&isValid(parsed)?parsed:undefined;
  const today=new Date();today.setHours(0,0,0,0);
  return <Popover className="gold-date">{({close})=><><input type="hidden" name={name} value={value}/><PopoverButton className="gold-date-button" aria-label={ariaLabel} aria-required={required}><span className={!selected?"is-placeholder":""}>{selected?format(selected,"dd MMM yyyy"):"Choose a date"}</span><CalendarDays aria-hidden="true"/></PopoverButton><PopoverPanel transition anchor="bottom start" className="gold-calendar-panel"><DayPicker mode="single" selected={selected} onSelect={(date)=>{if(date){onChange(format(date,"yyyy-MM-dd"));close()}}} disabled={{before:today}} showOutsideDays classNames={{root:"gold-calendar",months:"gold-calendar-months",month:"gold-calendar-month",month_caption:"gold-calendar-hidden",nav:"gold-calendar-hidden",month_grid:"gold-calendar-grid",weekdays:"gold-calendar-weekdays",weekday:"gold-calendar-weekday",week:"gold-calendar-week",day:"gold-calendar-day",day_button:"gold-calendar-day-button",selected:"is-selected",today:"is-today",outside:"is-outside",disabled:"is-disabled",hidden:"is-hidden"}} components={{MonthCaption:CalendarCaption}}/></PopoverPanel></>}</Popover>;
}
