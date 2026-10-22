"use client";

import { Fragment, useCallback, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Check, ChevronDown, RefreshCw } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

type Inquiry = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email?: string;
  pickup_location?: string;
  pickup_date?: string;
  service_type?: string;
  travel_date?: string;
  passengers?: number;
  trip_details?: string;
  form_source: "quick_booking" | "contact_us";
  status: "new" | "read" | "replied" | "closed";
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-yellow-100 text-yellow-700",
  replied: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

const STATUS_OPTIONS = ["new", "read", "replied", "closed"];
const SOURCE_OPTIONS = [
  { value: "all", label: "All Forms" },
  { value: "quick_booking", label: "Quick Booking" },
  { value: "contact_us", label: "Contact Us" },
];
const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "closed", label: "Closed" },
];

function FilterListbox({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const selected = options.find((o) => o.value === value) ?? options[0];
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <ListboxButton className="flex w-40 items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm outline-none transition-all hover:border-[#D2AC2F] hover:text-[#D2AC2F]">
          <span>{selected.label}</span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </ListboxButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <ListboxOptions modal={false} className="absolute z-30 mt-1.5 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl outline-none">
            {options.map((opt) => (
              <ListboxOption key={opt.value} value={opt.value} as={Fragment}>
                {({ active, selected: isSelected }) => (
                  <li className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors ${active ? "bg-brand-muted text-[#D2AC2F]" : "text-gray-700"}`}>
                    <span className={isSelected ? "font-semibold" : ""}>{opt.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-[#D2AC2F]" />}
                  </li>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}

function StatusListbox({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <ListboxButton className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none transition-all hover:border-[#D2AC2F] hover:text-[#D2AC2F] disabled:cursor-not-allowed disabled:opacity-50">
        <span className="capitalize">{value}</span>
        <ChevronDown className="h-3 w-3 text-gray-400" />
      </ListboxButton>
      <ListboxOptions
        modal={false}
        anchor="bottom end"
        className="z-[999] w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl outline-none [--anchor-gap:4px]"
      >
        {STATUS_OPTIONS.map((opt) => (
          <ListboxOption key={opt} value={opt} as={Fragment}>
            {({ active, selected: isSelected }) => (
              <li className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-xs transition-colors ${active ? "bg-brand-muted text-[#D2AC2F]" : "text-gray-700"}`}>
                <span className={`capitalize ${isSelected ? "font-semibold" : ""}`}>{opt}</span>
                {isSelected && <Check className="h-3 w-3 text-[#D2AC2F]" />}
              </li>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function InquiriesClient({ initialData }: { initialData: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialData);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setInquiries(data as Inquiry[]);
    } catch (err) {
      console.error("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const { updateInquiryStatus } = await import("@/app/actions/updateInquiryStatus");
      await updateInquiryStatus(id, status);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: status as Inquiry["status"] } : i))
      );
      if (selected?.id === id) {
        setSelected((prev) => prev ? { ...prev, status: status as Inquiry["status"] } : prev);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdating(null);
    }
  };

  const filtered = inquiries.filter((i) => {
    if (filterStatus !== "all" && i.status !== filterStatus) return false;
    if (filterSource !== "all" && i.form_source !== filterSource) return false;
    return true;
  });

  return (
    <>
      {/* Filter bar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <FilterListbox
          value={filterStatus}
          onChange={setFilterStatus}
          options={STATUS_FILTER_OPTIONS}
        />
        <FilterListbox
          value={filterSource}
          onChange={setFilterSource}
          options={SOURCE_OPTIONS}
        />
        <span className="text-xs font-semibold text-gray-400">{filtered.length} results</span>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="ml-auto flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm transition-all hover:border-[#D2AC2F] hover:text-[#D2AC2F] disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Name", "Phone", "Email", "Source", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="py-12 text-center text-sm text-gray-300">No inquiries found.</td></tr>
              )}
              {filtered.map((inq) => (
                <tr key={inq.id} className="cursor-pointer transition-colors hover:bg-brand-muted/30" onClick={() => setSelected(inq)}>
                  <td className="px-4 py-3 font-semibold text-gray-900">{inq.full_name}</td>
                  <td className="px-4 py-3 text-gray-600">{inq.phone}</td>
                  <td className="px-4 py-3 text-gray-500">{inq.email ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${inq.form_source === "quick_booking" ? "bg-brand-soft text-brand-dark" : "bg-purple-100 text-purple-700"}`}>
                      {inq.form_source === "quick_booking" ? "Quick" : "Contact"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(inq.created_at).toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${STATUS_COLORS[inq.status]}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <StatusListbox
                      value={inq.status}
                      onChange={(val) => updateStatus(inq.id, val)}
                      disabled={updating === inq.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-gray-900">{selected.full_name}</h2>
                <p className="mt-0.5 text-xs text-gray-400">{new Date(selected.created_at).toLocaleString("en-PK")}</p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100">✕</button>
            </div>
            <div className="space-y-2 text-sm">
              {([
                ["Phone", selected.phone],
                ["Email", selected.email],
                ["Form", selected.form_source === "quick_booking" ? "Quick Booking" : "Contact Us"],
                ["Service Type", selected.service_type],
                ["Pickup Location", selected.pickup_location],
                ["Pickup Date", selected.pickup_date],
                ["Travel Date", selected.travel_date],
                ["Passengers", selected.passengers],
                ["Trip Details", selected.trip_details],
              ] as [string, string | number | undefined][])
                .filter(([, v]) => v != null && v !== "")
                .map(([label, val]) => (
                  <div key={label} className="flex gap-2">
                    <span className="w-36 shrink-0 font-semibold text-gray-400">{label}</span>
                    <span className="text-gray-800">{String(val)}</span>
                  </div>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Update Status</span>
              <StatusListbox
                value={selected.status}
                onChange={(val) => updateStatus(selected.id, val)}
                disabled={updating === selected.id}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
