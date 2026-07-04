"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, MapPin, CalendarCheck, Star, FileText,
  Image, Users, Shield, LogOut,
  Menu, X, Plus, Edit3, Trash2, Eye, Check,
  ChevronDown, Download, RefreshCw, Bell, Upload, Copy,
  Filter, TrendingUp, IndianRupee, CheckCircle2, XCircle,
  Globe, Clock, Tag, Mail,
  Calendar, DollarSign, Phone, ChevronLeft, ChevronRight,
  Image as ImageIcon, Video, ShieldAlert, ShieldCheck,
} from "lucide-react";
import { cn, formatDate, formatPrice, slugify, getInitials } from "@/lib/utils";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import FormField from "@/components/admin/FormField";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import StatsCard from "@/components/admin/StatsCard";
import ImageUploader from "@/components/admin/ImageUploader";
import StatusBadge from "@/components/admin/StatusBadge";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  destinations: "Destinations",
  bookings: "Bookings",
  inquiries: "Customer Inquiries",
  media: "Media Library",
  customers: "Customers",
  users: "User Management",
};

/** Normalize a MongoDB document by mapping _id → id */
function normalizeId(doc: any): any {
  if (!doc) return doc;
  if (Array.isArray(doc)) return doc.map(normalizeId);
  const out = { ...doc };
  if (out._id !== undefined && out.id === undefined) {
    out.id = String(out._id);
  }
  return out;
}

export default function AdminPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("dashboard");

  function handleLogout() {
    localStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_token");
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <AdminSidebar activeSection={activeSection} onNavigate={setActiveSection} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <AdminHeader title={pageTitles[activeSection] || "Admin Panel"} />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {activeSection === "dashboard" && <DashboardSection />}
          {activeSection === "destinations" && <DestinationsSection />}
          {activeSection === "bookings" && <BookingsSection />}
          {activeSection === "inquiries" && <InquiriesSection />}
          {activeSection === "media" && <MediaSection />}
          {activeSection === "customers" && <CustomersSection />}
          {activeSection === "users" && <UsersSection />}
        </main>
      </div>
    </div>
  );
}

/* ───────── Dashboard ───────── */

function DashboardSection() {
  const [stats, setStats] = useState({ totalDestinations: 24, activeBookings: 142, totalTestimonials: 87, blogPosts: 36, revenue: 28450000, totalBookings: 189 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem("admin_token");
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        const res = await fetch("/api/stats", { headers });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setStats({ totalDestinations: data.totalDestinations ?? 24, activeBookings: data.activeBookings ?? 142, totalTestimonials: data.totalTestimonials ?? 87, blogPosts: data.blogPosts ?? 36, revenue: data.revenue ?? 28450000, totalBookings: data.totalBookings ?? 189 });
        setRecentBookings(data.recentBookings ?? dummyRecentBookings);
      } catch {
        setRecentBookings(dummyRecentBookings);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-white rounded-xl border border-cream-dark/20" />)}
        </div>
        <div className="h-64 bg-white rounded-xl border border-cream-dark/20" />
      </div>
    );
  }

  const bookingColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "destinationTitle", label: "Destination", sortable: true },
    { key: "travelDate", label: "Travel Date", sortable: true, render: (row: any) => formatDate(row.travelDate) },
    { key: "travelers", label: "Travelers", sortable: true },
    { key: "status", label: "Status", sortable: true, render: (row: any) => <StatusBadge status={row.status} /> },
    { key: "totalPrice", label: "Price", sortable: true, render: (row: any) => formatPrice(row.totalPrice) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-primary-400 text-sm">Welcome back, Admin</p>
        <h2 className="text-2xl font-heading font-bold text-primary-900">Dashboard Overview</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={MapPin} label="Total Destinations" value={stats.totalDestinations} trend="12%" trendUp />
        <StatsCard icon={CalendarCheck} label="Active Bookings" value={stats.activeBookings} trend="8.5%" trendUp />
        <StatsCard icon={Star} label="Total Testimonials" value={stats.totalTestimonials} trend="5.2%" trendUp />
        <StatsCard icon={FileText} label="Blog Posts" value={stats.blogPosts} trend="3.1%" trendUp />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-primary-900 font-heading">Recent Bookings</h3>
          </div>
          <DataTable columns={bookingColumns} data={recentBookings.slice(0, 5)} searchable={false} pageSize={5} />
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-cream-dark/20 p-5">
            <h3 className="text-base font-semibold text-primary-900 font-heading mb-4">Revenue Overview</h3>
            <p className="text-3xl font-bold text-accent font-heading">{formatPrice(stats.revenue)}</p>
            <p className="text-sm text-primary-400 mt-1">Total revenue from all bookings</p>
          </div>
          <div className="bg-white rounded-xl border border-cream-dark/20 p-5">
            <h3 className="text-base font-semibold text-primary-900 font-heading mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-cream hover:bg-cream-dark/30 transition-colors text-sm text-primary-700 text-left">
                <PackageIcon size={16} className="text-accent" />
                Manage Destinations
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-cream hover:bg-cream-dark/30 transition-colors text-sm text-primary-700 text-left">
                <Star size={16} className="text-accent" />
                Pending Reviews
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-cream hover:bg-cream-dark/30 transition-colors text-sm text-primary-700 text-left">
                <Mail size={16} className="text-accent" />
                New Inquiries
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const dummyRecentBookings = [
  { id: "1", name: "Rajesh Sharma", destinationTitle: "Kerala Backwaters", travelDate: "2026-08-15", travelers: 2, status: "confirmed", totalPrice: 45000 },
  { id: "2", name: "Priya Singh", destinationTitle: "Swiss Alps", travelDate: "2026-09-20", travelers: 4, status: "in-progress", totalPrice: 285000 },
  { id: "3", name: "Amit Patel", destinationTitle: "Maldives", travelDate: "2026-10-05", travelers: 2, status: "new", totalPrice: 185000 },
  { id: "4", name: "Sneha Gupta", destinationTitle: "Rajasthan Royal", travelDate: "2026-11-12", travelers: 6, status: "confirmed", totalPrice: 125000 },
  { id: "5", name: "Vikram Mehta", destinationTitle: "Bali Retreat", travelDate: "2026-07-28", travelers: 3, status: "completed", totalPrice: 95000 },
];

function PackageIcon(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" /></svg>; }

/* ───────── Destinations ───────── */

function DestinationsSection() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const [form, setForm] = useState<any>({ title: "", slug: "", location: "", description: "", longDescription: "", price: "", originalPrice: "", duration: "", category: "", tags: "", inclusions: "", exclusions: "", isAvailable: true, isFeatured: false, images: [] });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => { fetchDestinations(); }, []);

  async function fetchDestinations() {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch("/api/destinations", { headers });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const list = normalizeId(Array.isArray(data) ? data : data.destinations ?? data.data ?? []);
      setDestinations(list);
      localStorage.setItem("mahadev_destinations", JSON.stringify(list));
    } catch {
      const local = localStorage.getItem("mahadev_destinations");
      if (local) {
        try {
          setDestinations(JSON.parse(local));
        } catch {
          setDestinations(dummyDestinations);
        }
      } else {
        setDestinations(dummyDestinations);
      }
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingId(null);
    setForm({ title: "", slug: "", location: "", description: "", longDescription: "", price: "", originalPrice: "", duration: "", category: "", tags: "", inclusions: "", exclusions: "", isAvailable: true, isFeatured: false, images: [] });
    setFormErrors({});
    setModalOpen(true);
  }

  function openEditModal(dest: any) {
    setEditingId(dest.id);
    setForm({ title: dest.title || "", slug: dest.slug || "", location: dest.location || "", description: dest.description || "", longDescription: dest.longDescription || "", price: String(dest.price || ""), originalPrice: String(dest.originalPrice || ""), duration: dest.duration || "", category: dest.category || "", tags: Array.isArray(dest.tags) ? dest.tags.join(", ") : "", inclusions: Array.isArray(dest.inclusions) ? dest.inclusions.join("\n") : "", exclusions: Array.isArray(dest.exclusions) ? dest.exclusions.join("\n") : "", isAvailable: dest.isAvailable ?? true, isFeatured: dest.isFeatured ?? false, images: dest.images || [] });
    setFormErrors({});
    setModalOpen(true);
  }

  function handleChange(e: React.ChangeEvent<any>) {
    const { name, value, type, checked } = e.target;
    if (name === "title") setForm((prev: any) => ({ ...prev, title: value, slug: slugify(value) }));
    else setForm((prev: any) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (formErrors[name]) setFormErrors((prev: any) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.location.trim()) errors.location = "Location is required";
    if (!form.price || Number(form.price) <= 0) errors.price = "Valid price is required";
    if (!form.duration.trim()) errors.duration = "Duration is required";
    if (!form.category) errors.category = "Category is required";
    if (!form.description.trim()) errors.description = "Description is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    const payload = { 
      ...form, 
      price: Number(form.price), 
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined, 
      tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean), 
      inclusions: form.inclusions.split("\n").filter(Boolean), 
      exclusions: form.exclusions.split("\n").filter(Boolean) 
    };

    try {
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      const url = editingId ? `/api/destinations/${editingId}` : "/api/destinations";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Failed");
      await fetchDestinations();
      setModalOpen(false);
    } catch {
      let updatedList: any[] = [];
      if (editingId) {
        updatedList = destinations.map((d: any) => (d.id === editingId ? { ...d, ...payload } : d));
      } else {
        updatedList = [{ id: String(Date.now()), ...payload, createdAt: new Date().toISOString() }, ...destinations];
      }
      setDestinations(updatedList);
      localStorage.setItem("mahadev_destinations", JSON.stringify(updatedList));
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      await fetch(`/api/destinations/${deleteId}`, { method: "DELETE", headers });
    } catch {}
    
    const updatedList = destinations.filter((d: any) => d.id !== deleteId);
    setDestinations(updatedList);
    localStorage.setItem("mahadev_destinations", JSON.stringify(updatedList));
    setDeleteId(null);
  }

  async function toggleStatus(dest: any) {
    setStatusUpdating(dest.id);
    try {
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      await fetch(`/api/destinations/${dest.id}`, { method: "PUT", headers, body: JSON.stringify({ isAvailable: !dest.isAvailable }) });
    } catch {}
    setDestinations((prev: any) => prev.map((d: any) => (d.id === dest.id ? { ...d, isAvailable: !d.isAvailable } : d)));
    setStatusUpdating(null);
  }

  function handleImageUpload(files: File[]) {
    setForm((prev: any) => ({ ...prev, images: [...prev.images, ...files.map((f) => URL.createObjectURL(f))] }));
  }

  const columns = [
    {
      key: "title", label: "Title", sortable: true,
      render: (row: any) => (
        <div className="flex items-center gap-3">
          {row.images?.[0] && <img src={row.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />}
          <span className="font-medium text-primary-900">{row.title}</span>
        </div>
      ),
    },
    { key: "location", label: "Location", sortable: true },
    { key: "price", label: "Price", sortable: true, render: (row: any) => <span className="font-medium">{formatPrice(row.price)}</span> },
    { key: "category", label: "Category", sortable: true, render: (row: any) => <StatusBadge status={row.category} /> },
    {
      key: "isAvailable", label: "Status",
      render: (row: any) => (
        <button onClick={() => toggleStatus(row)} disabled={statusUpdating === row.id}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${row.isAvailable ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
          {statusUpdating === row.id ? <RefreshCw size={12} className="animate-spin" /> : row.isAvailable ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
          {row.isAvailable ? "Available" : "Unavailable"}
        </button>
      ),
    },
  ];

  if (loading) return <div className="space-y-4 animate-pulse"><div className="h-10 w-48 bg-white rounded-lg" /><div className="h-96 bg-white rounded-xl" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary-900">Destinations</h2>
          <p className="text-sm text-primary-400">Manage your travel destinations</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors text-sm">
          <Plus size={16} /> Add New Destination
        </button>
      </div>
      <DataTable columns={columns} data={destinations} onEdit={openEditModal} onDelete={(row: any) => setDeleteId(row.id)} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Destination" : "Add New Destination"} size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title" name="title" value={form.title} onChange={handleChange} error={formErrors.title} required placeholder="e.g. Kerala Backwaters" />
            <FormField label="Slug" name="slug" value={form.slug} onChange={handleChange} placeholder="Auto-generated" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Location" name="location" value={form.location} onChange={handleChange} error={formErrors.location} required placeholder="e.g. Alleppey, Kerala" />
            <FormField label="Category" name="category" type="select" value={form.category} onChange={handleChange} error={formErrors.category} required placeholder="Select category" options={[{ value: "domestic", label: "Domestic" }, { value: "international", label: "International" }, { value: "weekend", label: "Weekend Getaway" }]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Price (₹)" name="price" type="number" value={form.price} onChange={handleChange} error={formErrors.price} required placeholder="e.g. 45000" />
            <FormField label="Original Price (₹)" name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} placeholder="e.g. 55000" />
            <FormField label="Duration" name="duration" value={form.duration} onChange={handleChange} error={formErrors.duration} required placeholder="e.g. 5 Days / 4 Nights" />
          </div>
          <FormField label="Description" name="description" type="textarea" value={form.description} onChange={handleChange} error={formErrors.description} required rows={3} placeholder="Brief description of the destination" />
          <FormField label="Long Description" name="longDescription" type="textarea" value={form.longDescription} onChange={handleChange} rows={5} placeholder="Detailed description of the destination" />
          <FormField label="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} placeholder="e.g. beach, luxury, adventure" />
          <FormField label="Inclusions (one per line)" name="inclusions" type="textarea" value={form.inclusions} onChange={handleChange} rows={3} placeholder="Hotel accommodation&#10;Airport transfers&#10;Daily breakfast" />
          <FormField label="Exclusions (one per line)" name="exclusions" type="textarea" value={form.exclusions} onChange={handleChange} rows={3} placeholder="Flight tickets&#10;Personal expenses&#10;Travel insurance" />
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">Images</label>
            <ImageUploader onUpload={handleImageUpload} maxFiles={10} />
          </div>
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={handleChange} className="w-4 h-4 rounded border-cream-dark/30 text-accent focus:ring-accent/40 accent-accent" />
              <span className="text-sm text-primary-700">Available</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="w-4 h-4 rounded border-cream-dark/30 text-accent focus:ring-accent/40 accent-accent" />
              <span className="text-sm text-primary-700">Featured</span>
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-cream-dark/10">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2.5 text-sm font-medium text-primary-700 bg-cream rounded-lg hover:bg-cream-dark/30 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50">
              {saving ? "Saving..." : editingId ? "Update Destination" : "Create Destination"}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Destination" message="Are you sure you want to delete this destination? This action cannot be undone." />
    </div>
  );
}

const dummyDestinations = [
  { id: "d1", title: "Kerala Backwaters", slug: "kerala-backwaters", location: "Alleppey, Kerala", description: "Explore the serene backwaters of Kerala", longDescription: "", images: ["https://images.unsplash.com/photo-1593693397690-362cb9666fc1?w=200"], price: 45000, originalPrice: 55000, duration: "5 Days / 4 Nights", category: "domestic", tags: ["beach", "houseboat"], inclusions: ["Hotel", "Transfers"], exclusions: ["Flights"], isAvailable: true, isFeatured: true, rating: 4.8, createdAt: "2026-01-15" },
  { id: "d2", title: "Swiss Alps Adventure", slug: "swiss-alps", location: "Interlaken, Switzerland", description: "Experience the majestic Swiss Alps", longDescription: "", images: ["https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=200"], price: 285000, originalPrice: 325000, duration: "7 Days / 6 Nights", category: "international", tags: ["ski", "luxury"], inclusions: ["Hotel", "Meals"], exclusions: ["Visa"], isAvailable: true, isFeatured: true, rating: 4.9, createdAt: "2026-02-10" },
  { id: "d3", title: "Maldives Paradise", slug: "maldives-paradise", location: "Male, Maldives", description: "Luxury overwater villas in Maldives", longDescription: "", images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200"], price: 185000, originalPrice: 220000, duration: "4 Days / 3 Nights", category: "international", tags: ["beach", "resort"], inclusions: ["Villa", "Breakfast"], exclusions: ["Flights"], isAvailable: false, isFeatured: false, rating: 4.7, createdAt: "2026-03-05" },
  { id: "d4", title: "Rajasthan Royal Journey", slug: "rajasthan-royal", location: "Jaipur, Rajasthan", description: "Royal heritage tour of Rajasthan", longDescription: "", images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?w=200"], price: 125000, originalPrice: 150000, duration: "6 Days / 5 Nights", category: "domestic", tags: ["heritage", "culture"], inclusions: ["Hotel", "Sightseeing"], exclusions: ["Tips"], isAvailable: true, isFeatured: true, rating: 4.6, createdAt: "2026-01-20" },
  { id: "d5", title: "Bali Wellness Retreat", slug: "bali-wellness", location: "Ubud, Bali", description: "Rejuvenate your mind and body in Bali", longDescription: "", images: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200"], price: 95000, originalPrice: 115000, duration: "5 Days / 4 Nights", category: "international", tags: ["wellness", "yoga"], inclusions: ["Stay", "Yoga"], exclusions: ["Flights"], isAvailable: true, isFeatured: false, rating: 4.5, createdAt: "2026-04-01" },
  { id: "d6", title: "Goa Beach Escape", slug: "goa-beach", location: "Goa, India", description: "Fun-filled beach vacation in Goa", longDescription: "", images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200"], price: 35000, duration: "3 Days / 2 Nights", category: "domestic", tags: ["beach", "party"], inclusions: ["Hotel"], exclusions: ["Meals"], isAvailable: true, isFeatured: false, rating: 4.3, createdAt: "2026-05-10" },
];

/* ───────── Bookings ───────── */

function BookingsSection() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [viewBooking, setViewBooking] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const statusTabs = ["all", "new", "in-progress", "confirmed", "completed", "cancelled"];

  useEffect(() => { fetchBookings(); }, []);

  async function fetchBookings() {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch("/api/bookings", { headers });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setBookings(normalizeId(Array.isArray(data) ? data : data.bookings ?? data.data ?? []));
    } catch {
      setBookings(dummyBookings);
    } finally {
      setLoading(false);
    }
  }

  const filtered = activeTab === "all" ? bookings : bookings.filter((b) => b.status === activeTab);

  async function updateStatus(booking: any, newStatus: string) {
    setStatusUpdating(booking.id);
    try {
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      await fetch(`/api/bookings/${booking.id}`, { method: "PUT", headers, body: JSON.stringify({ status: newStatus }) });
    } catch {}
    setBookings((prev: any) => prev.map((b: any) => (b.id === booking.id ? { ...b, status: newStatus } : b)));
    setStatusUpdating(null);
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      await fetch(`/api/bookings/${deleteId}`, { method: "DELETE", headers });
    } catch {}
    setBookings((prev: any) => prev.filter((b: any) => b.id !== deleteId));
    setDeleteId(null);
  }

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "destinationTitle", label: "Destination", sortable: true },
    { key: "travelDate", label: "Travel Date", sortable: true, render: (row: any) => formatDate(row.travelDate) },
    { key: "travelers", label: "Travelers", sortable: true },
    {
      key: "status", label: "Status", sortable: true,
      render: (row: any) => (
        <div className="relative group">
          <StatusBadge status={row.status} />
          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-cream-dark/20 p-1 min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
            {statusTabs.filter((s) => s !== "all" && s !== row.status).map((s) => (
              <button key={s} onClick={() => updateStatus(row, s)} disabled={statusUpdating === row.id}
                className="w-full text-left px-3 py-1.5 text-sm text-primary-700 hover:bg-cream rounded-md transition-colors">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    { key: "totalPrice", label: "Price", sortable: true, render: (row: any) => <span className="font-medium">{formatPrice(row.totalPrice)}</span> },
  ];

  if (loading) return <div className="space-y-4 animate-pulse"><div className="h-10 w-48 bg-white rounded-lg" /><div className="h-96 bg-white rounded-xl" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-primary-900">Bookings</h2>
        <p className="text-sm text-primary-400">Manage all customer bookings</p>
      </div>
      <div className="flex items-center gap-1 bg-white rounded-lg border border-cream-dark/20 p-1 overflow-x-auto">
        {statusTabs.map((tab) => {
          const count = tab === "all" ? bookings.length : bookings.filter((b) => b.status === tab).length;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap", activeTab === tab ? "bg-accent text-white" : "text-primary-500 hover:text-primary-700 hover:bg-cream")}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-1.5 opacity-60">({count})</span>
            </button>
          );
        })}
      </div>
      <DataTable columns={columns} data={filtered} onView={(row: any) => setViewBooking(row)} onDelete={(row: any) => setDeleteId(row.id)} />
      <Modal isOpen={!!viewBooking} onClose={() => setViewBooking(null)} title="Booking Details" size="lg">
        {viewBooking && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-primary-400 uppercase tracking-wider">Name</p><p className="text-sm font-medium text-primary-900">{viewBooking.name}</p></div>
              <div><p className="text-xs text-primary-400 uppercase tracking-wider">Email</p><p className="text-sm text-primary-900">{viewBooking.email}</p></div>
              <div><p className="text-xs text-primary-400 uppercase tracking-wider">Phone</p><p className="text-sm text-primary-900">{viewBooking.phone}</p></div>
              <div><p className="text-xs text-primary-400 uppercase tracking-wider">Status</p><StatusBadge status={viewBooking.status} /></div>
              <div><p className="text-xs text-primary-400 uppercase tracking-wider">Destination</p><p className="text-sm text-primary-900">{viewBooking.destinationTitle}</p></div>
              <div><p className="text-xs text-primary-400 uppercase tracking-wider">Package</p><p className="text-sm text-primary-900">{viewBooking.packageType}</p></div>
              <div><p className="text-xs text-primary-400 uppercase tracking-wider">Travel Date</p><p className="text-sm text-primary-900">{formatDate(viewBooking.travelDate)}</p></div>
              <div><p className="text-xs text-primary-400 uppercase tracking-wider">Travelers</p><p className="text-sm text-primary-900">{viewBooking.travelers}</p></div>
              <div><p className="text-xs text-primary-400 uppercase tracking-wider">Total Price</p><p className="text-sm font-semibold text-accent">{formatPrice(viewBooking.totalPrice)}</p></div>
              <div><p className="text-xs text-primary-400 uppercase tracking-wider">Booked On</p><p className="text-sm text-primary-900">{formatDate(viewBooking.createdAt)}</p></div>
            </div>
            {viewBooking.specialRequests && <div><p className="text-xs text-primary-400 uppercase tracking-wider mb-1">Special Requests</p><p className="text-sm text-primary-700 bg-cream rounded-lg p-3">{viewBooking.specialRequests}</p></div>}
          </div>
        )}
      </Modal>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Booking" message="Are you sure you want to delete this booking?" />
    </div>
  );
}

const dummyBookings = [
  { id: "b1", name: "Rajesh Sharma", email: "rajesh@example.com", phone: "+91-9876543210", destinationId: "d1", destinationTitle: "Kerala Backwaters", packageType: "Premium", travelDate: "2026-08-15", travelers: 2, specialRequests: "Need vegetarian meals", status: "confirmed", totalPrice: 45000, createdAt: "2026-07-01" },
  { id: "b2", name: "Priya Singh", email: "priya@example.com", phone: "+91-9876543211", destinationId: "d2", destinationTitle: "Swiss Alps Adventure", packageType: "Luxury", travelDate: "2026-09-20", travelers: 4, status: "in-progress", totalPrice: 285000, createdAt: "2026-06-28" },
  { id: "b3", name: "Amit Patel", email: "amit@example.com", phone: "+91-9876543212", destinationId: "d3", destinationTitle: "Maldives Paradise", packageType: "Deluxe", travelDate: "2026-10-05", travelers: 2, specialRequests: "Allergy to seafood", status: "new", totalPrice: 185000, createdAt: "2026-06-25" },
  { id: "b4", name: "Sneha Gupta", email: "sneha@example.com", phone: "+91-9876543213", destinationId: "d4", destinationTitle: "Rajasthan Royal Journey", packageType: "Premium", travelDate: "2026-11-12", travelers: 6, status: "confirmed", totalPrice: 125000, createdAt: "2026-06-20" },
  { id: "b5", name: "Vikram Mehta", email: "vikram@example.com", phone: "+91-9876543214", destinationId: "d5", destinationTitle: "Bali Wellness Retreat", packageType: "Standard", travelDate: "2026-07-28", travelers: 3, status: "completed", totalPrice: 95000, createdAt: "2026-06-15" },
  { id: "b6", name: "Ananya Reddy", email: "ananya@example.com", phone: "+91-9876543215", destinationId: "d6", destinationTitle: "Goa Beach Escape", packageType: "Economy", travelDate: "2026-08-10", travelers: 2, status: "cancelled", totalPrice: 35000, createdAt: "2026-06-10" },
  { id: "b7", name: "Rahul Verma", email: "rahul@example.com", phone: "+91-9876543216", destinationId: "d1", destinationTitle: "Kerala Backwaters", packageType: "Deluxe", travelDate: "2026-12-20", travelers: 5, status: "new", totalPrice: 78000, createdAt: "2026-07-05" },
];



/* ───────── Media Library ───────── */

function MediaSection() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [uploadModal, setUploadModal] = useState(false);
  const [previewItem, setPreviewItem] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => { fetchMedia(); }, []);

  async function fetchMedia() {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch("/api/media", { headers });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMedia(data);
    } catch {
      setMedia(dummyMedia);
    } finally {
      setLoading(false);
    }
  }

  const filtered = filter === "all" ? media : media.filter((m: any) => m.type === filter);

  function handleUpload(files: File[]) {
    const newMedia = files.map((f, i) => ({ id: `media-${Date.now()}-${i}`, url: URL.createObjectURL(f), alt: f.name.replace(/\.[^/.]+$/, ""), type: f.type.startsWith("video") ? "video" : "image", size: f.size, uploadedAt: new Date().toISOString() }));
    setMedia((prev: any) => [...newMedia, ...prev]);
    setUploadModal(false);
  }

  function copyUrl(url: string, id: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      await fetch(`/api/media/${deleteId}`, { method: "DELETE", headers });
    } catch {}
    setMedia((prev: any) => prev.filter((m: any) => m.id !== deleteId));
    setDeleteId(null);
  }

  function formatFileSize(bytes?: number) {
    if (!bytes) return "";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  }

  if (loading) return <div className="space-y-4 animate-pulse"><div className="h-10 w-48 bg-white rounded-lg" /><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">{[...Array(10)].map((_, i) => <div key={i} className="aspect-square bg-white rounded-xl border border-cream-dark/20" />)}</div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary-900">Media Library</h2>
          <p className="text-sm text-primary-400">Upload and manage media files</p>
        </div>
        <button onClick={() => setUploadModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors text-sm">
          <Upload size={16} /> Upload Media
        </button>
      </div>
      <div className="flex items-center gap-2">
        {(["all", "image", "video"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn("flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors", filter === f ? "bg-accent text-white" : "bg-white text-primary-500 border border-cream-dark/20 hover:bg-cream")}>
            {f === "image" && <ImageIcon size={14} />}
            {f === "video" && <Video size={14} />}
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="opacity-60">({f === "all" ? media.length : media.filter((m: any) => m.type === f).length})</span>
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-cream-dark/20">
          <ImageIcon size={48} className="mx-auto text-primary-200 mb-4" />
          <p className="text-primary-400">No media files found</p>
          <button onClick={() => setUploadModal(true)} className="mt-3 text-sm text-accent hover:underline">Upload your first file</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item: any) => (
            <div key={item.id} className="group relative bg-white rounded-xl border border-cream-dark/20 overflow-hidden">
              <div className="aspect-square cursor-pointer overflow-hidden" onClick={() => setPreviewItem(item)}>
                {item.type === "video" ? (
                  <div className="w-full h-full bg-primary-900 flex items-center justify-center"><Video size={32} className="text-accent/60" /></div>
                ) : (
                  <img src={item.url} alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                )}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => copyUrl(item.url, item.id)} className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors" title="Copy URL">
                  {copiedId === item.id ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-primary-700" />}
                </button>
                <button onClick={() => setDeleteId(item.id)} className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors" title="Delete">
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>
              <div className="px-3 py-2 border-t border-cream-dark/10">
                <p className="text-xs text-primary-600 truncate">{item.alt}</p>
                <p className="text-[10px] text-primary-400">{formatFileSize(item.size)} · {formatDate(item.uploadedAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={uploadModal} onClose={() => setUploadModal(false)} title="Upload Media" size="lg">
        <ImageUploader onUpload={handleUpload} maxFiles={20} accept="image/*,video/*" />
      </Modal>
      <Modal isOpen={!!previewItem} onClose={() => setPreviewItem(null)} title={previewItem?.alt || "Media Preview"} size="lg">
        {previewItem && (
          <div className="space-y-4">
            {previewItem.type === "video" ? (
              <div className="aspect-video bg-primary-900 rounded-lg flex items-center justify-center"><Video size={48} className="text-accent/40" /></div>
            ) : (
              <img src={previewItem.url} alt={previewItem.alt} className="w-full rounded-lg" />
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-primary-400 uppercase">File Name</p><p className="text-primary-900">{previewItem.alt}</p></div>
              <div><p className="text-xs text-primary-400 uppercase">Type</p><p className="text-primary-900">{previewItem.type}</p></div>
              <div><p className="text-xs text-primary-400 uppercase">Size</p><p className="text-primary-900">{formatFileSize(previewItem.size)}</p></div>
              <div><p className="text-xs text-primary-400 uppercase">Uploaded</p><p className="text-primary-900">{formatDate(previewItem.uploadedAt)}</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => copyUrl(previewItem.url, previewItem.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors text-sm">
                {copiedId === previewItem.id ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy URL</>}
              </button>
              <button onClick={() => { setDeleteId(previewItem.id); setPreviewItem(null); }} className="px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        )}
      </Modal>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Media" message="Are you sure you want to delete this file?" />
    </div>
  );
}

const dummyMedia = [
  { id: "m1", url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc1?w=400", alt: "Kerala Backwaters", type: "image", size: 245000, uploadedAt: "2026-07-01" },
  { id: "m2", url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400", alt: "Swiss Alps", type: "image", size: 312000, uploadedAt: "2026-07-01" },
  { id: "m3", url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400", alt: "Maldives Beach", type: "image", size: 189000, uploadedAt: "2026-06-28" },
  { id: "m4", url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400", alt: "Rajasthan Palace", type: "image", size: 276000, uploadedAt: "2026-06-25" },
  { id: "m5", url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400", alt: "Bali Rice Terraces", type: "image", size: 198000, uploadedAt: "2026-06-20" },
  { id: "m6", url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400", alt: "Goa Beach", type: "image", size: 156000, uploadedAt: "2026-06-18" },
  { id: "m7", url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400", alt: "Indian Cuisine", type: "image", size: 234000, uploadedAt: "2026-06-15" },
  { id: "m8", url: "https://images.unsplash.com/photo-1540206395-68808572332f?w=400", alt: "Wellness Retreat", type: "image", size: 178000, uploadedAt: "2026-06-12" },
  { id: "m9", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400", alt: "Tropical Beach", type: "image", size: 267000, uploadedAt: "2026-06-10" },
  { id: "m10", url: "", alt: "Travel Highlights", type: "video", size: 5200000, uploadedAt: "2026-06-08" },
];

/* ───────── Customers ───────── */

function CustomersSection() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewCustomer, setViewCustomer] = useState<any | null>(null);

  useEffect(() => { fetchCustomers(); }, []);

  async function fetchCustomers() {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch("/api/customers", { headers });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setCustomers(data);
    } catch {
      setCustomers(dummyCustomers);
    } finally {
      setLoading(false);
    }
  }

  function exportCSV() {
    const headers = ["Name", "Email", "Phone", "Total Bookings", "Last Trip", "Status", "Total Spent"];
    const rows = customers.map((c: any) => [c.name, c.email, c.phone, c.totalBookings, c.lastTrip ? formatDate(c.lastTrip) : "N/A", c.status, c.totalSpent ? formatPrice(c.totalSpent) : "N/A"]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const columns = [
    {
      key: "name", label: "Name", sortable: true,
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-primary-800 text-xs font-bold">
            {getInitials(row.name)}
          </div>
          <span className="font-medium text-primary-900">{row.name}</span>
        </div>
      ),
    },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", sortable: true },
    { key: "totalBookings", label: "Total Bookings", sortable: true },
    { key: "lastTrip", label: "Last Trip", sortable: true, render: (row: any) => (row.lastTrip ? formatDate(row.lastTrip) : "—") },
    { key: "status", label: "Status", sortable: true, render: (row: any) => <StatusBadge status={row.status} /> },
  ];

  if (loading) return <div className="space-y-4 animate-pulse"><div className="h-10 w-48 bg-white rounded-lg" /><div className="h-96 bg-white rounded-xl" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary-900">Customers</h2>
          <p className="text-sm text-primary-400">View and manage your customer database</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cream-dark/20 text-primary-700 font-medium rounded-lg hover:bg-cream transition-colors text-sm">
          <Download size={16} /> Export CSV
        </button>
      </div>
      <DataTable columns={columns} data={customers} onView={(row: any) => setViewCustomer(row)} />
      <Modal isOpen={!!viewCustomer} onClose={() => setViewCustomer(null)} title="Customer Details" size="lg">
        {viewCustomer && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-cream-dark/10">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-primary-800 text-xl font-bold">
                {getInitials(viewCustomer.name)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900">{viewCustomer.name}</h3>
                <p className="text-sm text-primary-400"><StatusBadge status={viewCustomer.status} /></p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3"><Mail size={16} className="text-accent shrink-0" /><div><p className="text-xs text-primary-400">Email</p><p className="text-sm text-primary-900">{viewCustomer.email}</p></div></div>
              <div className="flex items-center gap-3"><Phone size={16} className="text-accent shrink-0" /><div><p className="text-xs text-primary-400">Phone</p><p className="text-sm text-primary-900">{viewCustomer.phone}</p></div></div>
              <div className="flex items-center gap-3"><Calendar size={16} className="text-accent shrink-0" /><div><p className="text-xs text-primary-400">Total Bookings</p><p className="text-sm text-primary-900 font-medium">{viewCustomer.totalBookings}</p></div></div>
              <div className="flex items-center gap-3"><DollarSign size={16} className="text-accent shrink-0" /><div><p className="text-xs text-primary-400">Total Spent</p><p className="text-sm text-primary-900 font-medium">{formatPrice(viewCustomer.totalSpent)}</p></div></div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-primary-700 mb-3">Booking History</h4>
              {viewCustomer.bookingHistory && viewCustomer.bookingHistory.length > 0 ? (
                <div className="space-y-2">
                  {viewCustomer.bookingHistory.map((booking: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-cream rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-primary-900">{booking.destination}</p>
                        <p className="text-xs text-primary-400">{formatDate(booking.date)} · {booking.travelers} traveler(s)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary-900">{formatPrice(booking.price)}</p>
                        <StatusBadge status={booking.status} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-primary-400">No booking history available</p>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

const dummyCustomers = [
  { id: "c1", name: "Rajesh Sharma", email: "rajesh.sharma@email.com", phone: "+91 98765 43210", totalBookings: 3, lastTrip: "2026-08-15", status: "active", totalSpent: 178000, bookingHistory: [{ destination: "Kerala Backwaters", date: "2026-08-15", travelers: 2, price: 45000, status: "confirmed" }, { destination: "Goa Beach Escape", date: "2025-12-10", travelers: 4, price: 35000, status: "completed" }, { destination: "Rajasthan Royal Journey", date: "2025-06-20", travelers: 2, price: 98000, status: "completed" }] },
  { id: "c2", name: "Priya Singh", email: "priya.singh@email.com", phone: "+91 98765 43211", totalBookings: 2, lastTrip: "2026-09-20", status: "active", totalSpent: 420000, bookingHistory: [{ destination: "Swiss Alps Adventure", date: "2026-09-20", travelers: 4, price: 285000, status: "in-progress" }, { destination: "Maldives Paradise", date: "2025-11-05", travelers: 2, price: 135000, status: "completed" }] },
  { id: "c3", name: "Amit Patel", email: "amit.patel@email.com", phone: "+91 98765 43212", totalBookings: 1, lastTrip: "2026-10-05", status: "new", totalSpent: 185000, bookingHistory: [{ destination: "Maldives Paradise", date: "2026-10-05", travelers: 2, price: 185000, status: "new" }] },
  { id: "c4", name: "Sneha Gupta", email: "sneha.gupta@email.com", phone: "+91 98765 43213", totalBookings: 4, lastTrip: "2026-11-12", status: "active", totalSpent: 345000, bookingHistory: [{ destination: "Rajasthan Royal Journey", date: "2026-11-12", travelers: 6, price: 125000, status: "confirmed" }, { destination: "Bali Wellness Retreat", date: "2026-03-15", travelers: 2, price: 95000, status: "completed" }, { destination: "Kerala Backwaters", date: "2025-09-10", travelers: 4, price: 75000, status: "completed" }, { destination: "Goa Beach Escape", date: "2025-04-20", travelers: 2, price: 50000, status: "completed" }] },
  { id: "c5", name: "Vikram Mehta", email: "vikram.mehta@email.com", phone: "+91 98765 43214", totalBookings: 2, lastTrip: "2026-07-28", status: "inactive", totalSpent: 135000, bookingHistory: [{ destination: "Bali Wellness Retreat", date: "2026-07-28", travelers: 3, price: 95000, status: "completed" }, { destination: "Goa Beach Escape", date: "2025-10-15", travelers: 2, price: 40000, status: "completed" }] },
  { id: "c6", name: "Ananya Reddy", email: "ananya.reddy@email.com", phone: "+91 98765 43215", totalBookings: 5, lastTrip: "2026-08-10", status: "active", totalSpent: 520000, bookingHistory: [{ destination: "Goa Beach Escape", date: "2026-08-10", travelers: 2, price: 35000, status: "cancelled" }, { destination: "Swiss Alps Adventure", date: "2025-12-20", travelers: 2, price: 285000, status: "completed" }, { destination: "Kerala Backwaters", date: "2025-07-15", travelers: 4, price: 85000, status: "completed" }, { destination: "Bali Wellness Retreat", date: "2025-03-10", travelers: 2, price: 75000, status: "completed" }, { destination: "Maldives Paradise", date: "2024-11-05", travelers: 2, price: 40000, status: "completed" }] },
];

/* ───────── Users ───────── */

function UsersSection() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "", role: "editor" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch("/api/users", { headers });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setUsers(data);
    } catch {
      setUsers(dummyUsers);
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() { setEditingId(null); setForm({ name: "", email: "", username: "", password: "", role: "editor" }); setFormErrors({}); setModalOpen(true); }

  function openEditModal(user: any) {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, username: user.username, password: "", role: user.role });
    setFormErrors({}); setModalOpen(true);
  }

  function handleChange(e: React.ChangeEvent<any>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    if (!form.username.trim()) errors.username = "Username is required";
    if (!editingId && !form.password.trim()) errors.password = "Password is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email format";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    const payload = editingId && !form.password ? { name: form.name, email: form.email, username: form.username, role: form.role } : form;
    try {
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      const url = editingId ? `/api/users/${editingId}` : "/api/users";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Failed");
      await fetchUsers();
      setModalOpen(false);
    } catch {
      if (editingId) setUsers((prev) => prev.map((u: any) => (u.id === editingId ? { ...u, ...payload } : u)));
      else setUsers((prev: any) => [{ id: String(Date.now()), ...payload, lastLogin: null, createdAt: new Date().toISOString() }, ...prev]);
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      await fetch(`/api/users/${deleteId}`, { method: "DELETE", headers });
    } catch {}
    setUsers((prev) => prev.filter((u: any) => u.id !== deleteId));
    setDeleteId(null);
  }

  const roleConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
    "super-admin": { label: "Super Admin", icon: ShieldAlert, color: "text-red-600 bg-red-50 border-red-200" },
    editor: { label: "Editor", icon: ShieldCheck, color: "text-blue-600 bg-blue-50 border-blue-200" },
    manager: { label: "Manager", icon: Shield, color: "text-green-600 bg-green-50 border-green-200" },
  };

  function RoleBadge({ role }: { role: string }) {
    const config = roleConfig[role] || roleConfig.editor;
    const Icon = config.icon;
    return <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border", config.color)}><Icon size={11} />{config.label}</span>;
  }

  const columns = [
    {
      key: "name", label: "Name", sortable: true,
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-primary-800 text-xs font-bold">{getInitials(row.name)}</div>
          <div><p className="text-sm font-medium text-primary-900">{row.name}</p><p className="text-xs text-primary-400">{row.email}</p></div>
        </div>
      ),
    },
    { key: "role", label: "Role", sortable: true, render: (row: any) => <RoleBadge role={row.role} /> },
    { key: "lastLogin", label: "Last Login", sortable: true, render: (row: any) => (row.lastLogin ? formatDate(row.lastLogin) : "Never") },
    { key: "status", label: "Status", sortable: true, render: (row: any) => <StatusBadge status={row.status || "active"} /> },
  ];

  if (loading) return <div className="space-y-4 animate-pulse"><div className="h-10 w-48 bg-white rounded-lg" /><div className="h-96 bg-white rounded-xl" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary-900">User Management</h2>
          <p className="text-sm text-primary-400">Manage admin users and their roles</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors text-sm">
          <Plus size={16} /> Add New User
        </button>
      </div>
      <DataTable columns={columns} data={users} onEdit={openEditModal} onDelete={(row: any) => setDeleteId(row.id)} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit User" : "Add New User"} size="md">
        <div className="space-y-4">
          <FormField label="Full Name" name="name" value={form.name} onChange={handleChange} error={formErrors.name} required placeholder="e.g. John Doe" />
          <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={formErrors.email} required placeholder="john@example.com" />
          <FormField label="Username" name="username" value={form.username} onChange={handleChange} error={formErrors.username} required placeholder="johndoe" />
          <FormField label={editingId ? "Password (leave blank to keep current)" : "Password"} name="password" type="password" value={form.password} onChange={handleChange} error={formErrors.password} required={!editingId} placeholder={editingId ? "Leave blank to keep current" : "Enter password"} />
          <FormField label="Role" name="role" type="select" value={form.role} onChange={handleChange} options={[{ value: "super-admin", label: "Super Admin" }, { value: "editor", label: "Editor" }, { value: "manager", label: "Manager" }]} />
          <div className="flex justify-end gap-3 pt-4 border-t border-cream-dark/10">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2.5 text-sm font-medium text-primary-700 bg-cream rounded-lg hover:bg-cream-dark/30 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50">
              {saving ? "Saving..." : editingId ? "Update User" : "Create User"}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete User" message="Are you sure you want to delete this user?" />
    </div>
  );
}

const dummyUsers = [
  { id: "u1", name: "Admin User", email: "admin@mahadevholidays.com", username: "admin", role: "super-admin", lastLogin: "2026-07-03T08:30:00", status: "active", createdAt: "2026-01-01" },
  { id: "u2", name: "Priya Sharma", email: "priya@mahadevholidays.com", username: "priya", role: "editor", lastLogin: "2026-07-02T14:20:00", status: "active", createdAt: "2026-02-15" },
  { id: "u3", name: "Rajesh Kumar", email: "rajesh@mahadevholidays.com", username: "rajesh", role: "manager", lastLogin: "2026-07-01T10:00:00", status: "active", createdAt: "2026-03-01" },
  { id: "u4", name: "Anita Desai", email: "anita@mahadevholidays.com", username: "anita", role: "editor", lastLogin: "2026-06-28T16:45:00", status: "active", createdAt: "2026-03-15" },
  { id: "u5", name: "Vikram Patel", email: "vikram@mahadevholidays.com", username: "vikram", role: "manager", lastLogin: null, status: "inactive", createdAt: "2026-04-01" },
];

/* ───────── Inquiries Section ───────── */

function InquiriesSection() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("mahadev_inquiries");
    if (raw) {
      try {
        setInquiries(JSON.parse(raw));
      } catch {
        setInquiries([]);
      }
    }
  }, []);

  function handleDelete(id: string) {
    const updated = inquiries.filter((i) => i.id !== id);
    setInquiries(updated);
    localStorage.setItem("mahadev_inquiries", JSON.stringify(updated));
    setDeleteId(null);
  }

  function handleClearAll() {
    setInquiries([]);
    localStorage.removeItem("mahadev_inquiries");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary-400 text-sm">Contact Form Submissions</p>
          <h2 className="text-2xl font-heading font-bold text-primary-900">Customer Inquiries</h2>
        </div>
        {inquiries.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-100 border border-red-200 transition-all"
          >
            Clear All
          </button>
        )}
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-cream-dark/20 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-primary/30" />
          </div>
          <h3 className="text-lg font-heading font-bold text-primary mb-2">No Inquiries Yet</h3>
          <p className="text-primary/60 text-sm">When visitors submit the contact form, their inquiries will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-white rounded-2xl p-6 border border-cream-dark/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary/40 font-black mb-1">Name</p>
                    <p className="text-primary font-bold text-sm">{inq.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary/40 font-black mb-1">Phone</p>
                    <a href={`tel:${inq.phone}`} className="text-accent font-bold text-sm hover:underline">{inq.phone}</a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary/40 font-black mb-1">Email</p>
                    <a href={`mailto:${inq.email}`} className="text-accent font-bold text-sm hover:underline break-all">{inq.email || "—"}</a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary/40 font-black mb-1">Destination</p>
                    <p className="text-primary font-bold text-sm">{inq.destination || "—"}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDeleteId(inq.id)}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all"
                  aria-label="Delete inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {inq.message && (
                <div className="mt-4 pt-4 border-t border-cream-dark/20">
                  <p className="text-[10px] uppercase tracking-widest text-primary/40 font-black mb-1">Message</p>
                  <p className="text-primary/80 text-sm leading-relaxed">{inq.message}</p>
                </div>
              )}
              <div className="mt-3 flex items-center gap-4">
                <span className="text-[10px] text-primary/40 font-medium">
                  Received: {inq.createdAt ? new Date(inq.createdAt).toLocaleString("en-IN") : "Unknown"}
                </span>
                <a
                  href={`https://wa.me/${inq.phone?.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${inq.name}! 🙏 Thank you for your inquiry about ${inq.destination || "travel"}. We at Mahadev Holidays would love to assist you!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-green-600 hover:text-green-700 transition-colors"
                >
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                  Reply on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Inquiry"
        message="Are you sure you want to delete this inquiry? This action cannot be undone."
      />
    </div>
  );
}

