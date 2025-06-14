"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InstantPaymentSystem } from "./instant-payment-system"
import {
  Bell,
  Users,
  IndianRupee,
  TrendingUp,
  FileText,
  QrCode,
  CreditCard,
  Star,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  MessageSquare,
} from "lucide-react"

interface Vendor {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "pending"
  totalTransactions: number
  totalAmount: number
  rating: number
  lastDelivery: string
}

interface Transaction {
  id: string
  vendorId: string
  vendorName: string
  amount: number
  type: "qr" | "cash"
  status: "completed" | "pending" | "failed"
  date: string
  description: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success"
  timestamp: string
  read: boolean
}

export function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [vendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "Fresh Foods Co.",
      email: "contact@freshfoods.com",
      phone: "+1 234 567 8901",
      status: "active",
      totalTransactions: 156,
      totalAmount: 45230,
      rating: 4.8,
      lastDelivery: "2024-01-15",
    },
    {
      id: "2",
      name: "Tech Solutions Ltd.",
      email: "info@techsolutions.com",
      phone: "+1 234 567 8902",
      status: "active",
      totalTransactions: 89,
      totalAmount: 78900,
      rating: 4.6,
      lastDelivery: "2024-01-14",
    },
    {
      id: "3",
      name: "Office Supplies Inc.",
      email: "sales@officesupplies.com",
      phone: "+1 234 567 8903",
      status: "pending",
      totalTransactions: 23,
      totalAmount: 12450,
      rating: 4.2,
      lastDelivery: "2024-01-10",
    },
  ])

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      vendorId: "1",
      vendorName: "Fresh Foods Co.",
      amount: 1250,
      type: "qr",
      status: "completed",
      date: "2024-01-15",
      description: "Weekly grocery delivery",
    },
    {
      id: "2",
      vendorId: "2",
      vendorName: "Tech Solutions Ltd.",
      amount: 3500,
      type: "cash",
      status: "pending",
      date: "2024-01-14",
      description: "IT equipment purchase",
    },
    {
      id: "3",
      vendorId: "1",
      vendorName: "Fresh Foods Co.",
      amount: 890,
      type: "qr",
      status: "completed",
      date: "2024-01-13",
      description: "Fresh produce order",
    },
  ])

  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Payment Received",
      message: "Fresh Foods Co. payment of ₹1,250 has been processed",
      type: "success",
      timestamp: "2024-01-15 10:30 AM",
      read: false,
    },
    {
      id: "2",
      title: "Delivery Update",
      message: "Tech Solutions Ltd. delivery scheduled for tomorrow",
      type: "info",
      timestamp: "2024-01-15 09:15 AM",
      read: false,
    },
    {
      id: "3",
      title: "Document Required",
      message: "Office Supplies Inc. needs to upload tax certificate",
      type: "warning",
      timestamp: "2024-01-14 04:45 PM",
      read: true,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
      case "success":
        return "bg-green-100 text-green-800"
      case "pending":
      case "info":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
      case "failed":
      case "warning":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalRevenue = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)

  const activeVendors = vendors.filter((v) => v.status === "active").length
  const pendingTransactions = transactions.filter((t) => t.status === "pending").length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center transform rotate-1">
                <Users className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                Vendor Management System
              </h1>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-dashed">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {notifications.filter((n) => !n.read).length}
              </Badge>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 border-r bg-white min-h-screen">
          <nav className="p-4 space-y-2">
            {[
              { id: "dashboard", icon: TrendingUp, label: "Dashboard" },
              { id: "vendors", icon: Users, label: "Vendors" },
              { id: "transactions", icon: IndianRupee, label: "Transactions" },
              { id: "payments", icon: QrCode, label: "QR Payments", isNew: true },
              { id: "documents", icon: FileText, label: "Documents" },
              { id: "deliveries", icon: Truck, label: "Deliveries" },
              { id: "feedback", icon: MessageSquare, label: "Feedback" },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === item.id ? "bg-gradient-to-r from-blue-500 to-blue-600" : ""} transition-all duration-200 hover:translate-x-1 relative`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
                {item.isNew && <Badge className="ml-auto bg-green-500 text-white text-xs">NEW</Badge>}
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-gray-600">Overview of your vendor management system</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="overflow-hidden border-2 hover:shadow-md transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-white">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <IndianRupee className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-2 hover:shadow-md transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-white">
                    <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
                    <Users className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activeVendors}</div>
                    <p className="text-xs text-muted-foreground">+2 new this week</p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-2 hover:shadow-md transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-yellow-50 to-white">
                    <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{pendingTransactions}</div>
                    <p className="text-xs text-muted-foreground">Requires attention</p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-2 hover:shadow-md transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-white">
                    <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.5</div>
                    <p className="text-xs text-muted-foreground">Vendor satisfaction</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.slice(0, 5).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 transform rotate-1">
                              {transaction.type === "qr" ? (
                                <QrCode className="h-5 w-5 text-blue-600" />
                              ) : (
                                <CreditCard className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.vendorName}</p>
                              <p className="text-sm text-gray-600">{transaction.description}</p>
                              <p className="text-xs text-gray-400">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-lg">₹{transaction.amount}</p>
                            <Badge className={`${getStatusColor(transaction.status)} transform -rotate-1`}>
                              {transaction.status}
                            </Badge>
                            <p className="text-xs text-gray-400 mt-1">{transaction.type.toUpperCase()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.slice(0, 5).map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-3">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              notification.type === "success"
                                ? "bg-green-100"
                                : notification.type === "warning"
                                  ? "bg-yellow-100"
                                  : "bg-blue-100"
                            }`}
                          >
                            {notification.type === "success" ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : notification.type === "warning" ? (
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                            ) : (
                              <Bell className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "vendors" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Vendors</h2>
                  <p className="text-gray-600">Manage your vendor relationships</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vendor
                </Button>
              </div>

              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search vendors..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor) => (
                  <Card key={vendor.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{vendor.name}</CardTitle>
                            <CardDescription>{vendor.email}</CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Phone:</span>
                          <span className="text-sm">{vendor.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Transactions:</span>
                          <span className="text-sm">{vendor.totalTransactions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Amount:</span>
                          <span className="text-sm font-medium">₹{vendor.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Rating:</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm ml-1">{vendor.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Delivery:</span>
                          <span className="text-sm">{vendor.lastDelivery}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="flex-1">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Transaction History</h2>
                  <p className="text-gray-600">Track all vendor transactions</p>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>All Transactions</CardTitle>
                    <div className="flex space-x-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="qr">QR Payment</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 transform rotate-1">
                            {transaction.type === "qr" ? (
                              <QrCode className="h-5 w-5 text-blue-600" />
                            ) : (
                              <CreditCard className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.vendorName}</p>
                            <p className="text-sm text-gray-600">{transaction.description}</p>
                            <p className="text-xs text-gray-400">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-lg">₹{transaction.amount}</p>
                          <Badge className={`${getStatusColor(transaction.status)} transform -rotate-1`}>
                            {transaction.status}
                          </Badge>
                          <p className="text-xs text-gray-400 mt-1">{transaction.type.toUpperCase()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "payments" && <InstantPaymentSystem />}

          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Document Management</h2>
                  <p className="text-gray-600">Manage vendor documents and contracts</p>
                </div>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Contracts (12)
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Tax Documents (8)
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Licenses (5)
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Insurance (3)
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Invoices (45)
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Service Agreement - Fresh Foods Co.",
                          type: "Contract",
                          date: "2024-01-15",
                          status: "Active",
                        },
                        {
                          name: "Tax Certificate - Tech Solutions Ltd.",
                          type: "Tax Document",
                          date: "2024-01-14",
                          status: "Pending",
                        },
                        {
                          name: "Business License - Office Supplies Inc.",
                          type: "License",
                          date: "2024-01-13",
                          status: "Expired",
                        },
                        {
                          name: "Insurance Policy - Fresh Foods Co.",
                          type: "Insurance",
                          date: "2024-01-12",
                          status: "Active",
                        },
                        {
                          name: "Invoice #INV-001 - Tech Solutions Ltd.",
                          type: "Invoice",
                          date: "2024-01-11",
                          status: "Paid",
                        },
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-600">
                                {doc.type} • {doc.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(doc.status.toLowerCase())}>{doc.status}</Badge>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "deliveries" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Delivery Tracking</h2>
                <p className="text-gray-600">Monitor vendor deliveries and updates</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">In Transit</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">On the way</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Delivered</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23</div>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Delayed</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">Needs attention</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: "DEL-001",
                        vendor: "Fresh Foods Co.",
                        item: "Weekly grocery delivery",
                        status: "delivered",
                        time: "10:30 AM",
                        date: "2024-01-15",
                      },
                      {
                        id: "DEL-002",
                        vendor: "Tech Solutions Ltd.",
                        item: "IT equipment",
                        status: "in-transit",
                        time: "2:15 PM",
                        date: "2024-01-15",
                      },
                      {
                        id: "DEL-003",
                        vendor: "Office Supplies Inc.",
                        item: "Office materials",
                        status: "scheduled",
                        time: "9:00 AM",
                        date: "2024-01-16",
                      },
                      {
                        id: "DEL-004",
                        vendor: "Fresh Foods Co.",
                        item: "Fresh produce",
                        status: "delayed",
                        time: "11:00 AM",
                        date: "2024-01-15",
                      },
                    ].map((delivery) => (
                      <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${
                              delivery.status === "delivered"
                                ? "bg-green-100"
                                : delivery.status === "in-transit"
                                  ? "bg-blue-100"
                                  : delivery.status === "scheduled"
                                    ? "bg-yellow-100"
                                    : "bg-red-100"
                            }`}
                          >
                            {delivery.status === "delivered" ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : delivery.status === "in-transit" ? (
                              <Truck className="h-5 w-5 text-blue-600" />
                            ) : delivery.status === "scheduled" ? (
                              <Clock className="h-5 w-5 text-yellow-600" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{delivery.vendor}</p>
                            <p className="text-sm text-gray-600">{delivery.item}</p>
                            <p className="text-xs text-gray-400">
                              {delivery.id} • {delivery.date} at {delivery.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(delivery.status)}>{delivery.status.replace("-", " ")}</Badge>
                          <div className="mt-2">
                            <Button size="sm" variant="outline">
                              Track
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Customer Feedback</h2>
                <p className="text-gray-600">Monitor and respond to customer feedback</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Feedback Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">5 Stars</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm">80%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">4 Stars</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-8 h-2 bg-green-400 rounded-full"></div>
                          </div>
                          <span className="text-sm">15%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">3 Stars</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          </div>
                          <span className="text-sm">3%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">2 Stars</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-1 h-2 bg-orange-400 rounded-full"></div>
                          </div>
                          <span className="text-sm">1%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">1 Star</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-1 h-2 bg-red-400 rounded-full"></div>
                          </div>
                          <span className="text-sm">1%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96">
                      <div className="space-y-4">
                        {[
                          {
                            customer: "John Smith",
                            vendor: "Fresh Foods Co.",
                            rating: 5,
                            comment: "Excellent service and fresh products. Always on time!",
                            date: "2024-01-15",
                          },
                          {
                            customer: "Sarah Johnson",
                            vendor: "Tech Solutions Ltd.",
                            rating: 4,
                            comment: "Good quality equipment, but delivery was slightly delayed.",
                            date: "2024-01-14",
                          },
                          {
                            customer: "Mike Wilson",
                            vendor: "Fresh Foods Co.",
                            rating: 5,
                            comment: "Best vendor we've worked with. Highly recommended!",
                            date: "2024-01-13",
                          },
                          {
                            customer: "Emily Davis",
                            vendor: "Office Supplies Inc.",
                            rating: 3,
                            comment: "Average service. Room for improvement in communication.",
                            date: "2024-01-12",
                          },
                          {
                            customer: "David Brown",
                            vendor: "Tech Solutions Ltd.",
                            rating: 5,
                            comment: "Professional team and excellent support. Very satisfied!",
                            date: "2024-01-11",
                          },
                        ].map((feedback, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {feedback.customer
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{feedback.customer}</p>
                                  <p className="text-xs text-gray-600">{feedback.vendor}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{feedback.comment}</p>
                            <p className="text-xs text-gray-400">{feedback.date}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
