"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode, CheckCircle, Clock, User, Phone, Mail, MapPin, Smartphone, RefreshCw } from "lucide-react"

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  totalPurchases: number
  lastPurchase: string
}

interface QRPayment {
  id: string
  qrCode: string
  vendorId: string
  vendorName: string
  amount: number
  description: string
  status: "pending" | "completed" | "expired"
  createdAt: string
  customer?: Customer
  paymentMethod: "upi" | "card" | "wallet"
}

interface Vendor {
  id: string
  name: string
  upiId: string
  merchantCode: string
}

export function QRPaymentSystem() {
  const [vendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "Fresh Foods Co.",
      upiId: "freshfoods@paytm",
      merchantCode: "FRESH001",
    },
    {
      id: "2",
      name: "Tech Solutions Ltd.",
      upiId: "techsolutions@gpay",
      merchantCode: "TECH002",
    },
    {
      id: "3",
      name: "Office Supplies Inc.",
      upiId: "office@phonepe",
      merchantCode: "OFFICE003",
    },
  ])

  const [qrPayments, setQRPayments] = useState<QRPayment[]>([
    {
      id: "QR001",
      qrCode: "upi://pay?pa=freshfoods@paytm&pn=Fresh%20Foods&am=1250&cu=INR&tn=Weekly%20grocery",
      vendorId: "1",
      vendorName: "Fresh Foods Co.",
      amount: 1250,
      description: "Weekly grocery delivery",
      status: "completed",
      createdAt: "2024-01-15 10:30 AM",
      customer: {
        id: "CUST001",
        name: "Rajesh Kumar",
        phone: "+91 9876543210",
        email: "rajesh.kumar@email.com",
        address: "123 MG Road, Bangalore",
        totalPurchases: 15,
        lastPurchase: "2024-01-15",
      },
      paymentMethod: "upi",
    },
    {
      id: "QR002",
      qrCode: "upi://pay?pa=techsolutions@gpay&pn=Tech%20Solutions&am=3500&cu=INR&tn=IT%20equipment",
      vendorId: "2",
      vendorName: "Tech Solutions Ltd.",
      amount: 3500,
      description: "IT equipment purchase",
      status: "pending",
      createdAt: "2024-01-15 02:15 PM",
      paymentMethod: "upi",
    },
  ])

  const [selectedVendor, setSelectedVendor] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [generatedQR, setGeneratedQR] = useState<QRPayment | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Simulate real-time payment updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQRPayments((prev) =>
        prev.map((payment) => {
          if (payment.status === "pending" && Math.random() > 0.7) {
            // Simulate customer scanning and paying
            const mockCustomer: Customer = {
              id: `CUST${Math.floor(Math.random() * 1000)}`,
              name: ["Priya Sharma", "Amit Patel", "Sneha Reddy", "Vikram Singh"][Math.floor(Math.random() * 4)],
              phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
              email: `customer${Math.floor(Math.random() * 1000)}@email.com`,
              address: ["Mumbai", "Delhi", "Bangalore", "Chennai"][Math.floor(Math.random() * 4)] + " Area",
              totalPurchases: Math.floor(Math.random() * 20) + 1,
              lastPurchase: new Date().toISOString().split("T")[0],
            }

            return {
              ...payment,
              status: "completed" as const,
              customer: mockCustomer,
              paymentMethod: ["upi", "card", "wallet"][Math.floor(Math.random() * 3)] as any,
            }
          }
          return payment
        }),
      )
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const generateQRCode = async () => {
    if (!selectedVendor || !amount || !description) return

    setIsGenerating(true)

    const vendor = vendors.find((v) => v.id === selectedVendor)
    if (!vendor) return

    // Generate UPI QR code string
    const upiString = `upi://pay?pa=${vendor.upiId}&pn=${encodeURIComponent(
      vendor.name,
    )}&am=${amount}&cu=INR&tn=${encodeURIComponent(description)}&mc=${vendor.merchantCode}`

    const newQRPayment: QRPayment = {
      id: `QR${Date.now()}`,
      qrCode: upiString,
      vendorId: vendor.id,
      vendorName: vendor.name,
      amount: Number.parseFloat(amount),
      description,
      status: "pending",
      createdAt: new Date().toLocaleString(),
      paymentMethod: "upi",
    }

    setQRPayments((prev) => [newQRPayment, ...prev])
    setGeneratedQR(newQRPayment)

    // Reset form
    setAmount("")
    setDescription("")
    setIsGenerating(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Automated QR Payment System</h2>
        <p className="text-gray-600">Generate QR codes and track customer payments automatically</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCode className="h-5 w-5 mr-2" />
              Generate QR Payment
            </CardTitle>
            <CardDescription>Create a QR code for customer payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vendor-select">Select Vendor</Label>
              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name} ({vendor.upiId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Payment description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={generateQRCode} disabled={isGenerating}>
              {isGenerating ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <QrCode className="h-4 w-4 mr-2" />}
              Generate QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Generated QR Display */}
        {generatedQR && (
          <Card>
            <CardHeader>
              <CardTitle>Generated QR Code</CardTitle>
              <CardDescription>Customer can scan this QR to pay</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-white p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">QR Code</p>
                    <p className="text-xs text-gray-400 mt-2">₹{generatedQR.amount}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium">{generatedQR.vendorName}</p>
                <p className="text-sm text-gray-600">{generatedQR.description}</p>
                <Badge className={getStatusColor(generatedQR.status)}>{generatedQR.status.toUpperCase()}</Badge>
              </div>
              <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded">
                UPI ID: {vendors.find((v) => v.id === generatedQR.vendorId)?.upiId}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Payment History with Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Tracking & Customer Details</CardTitle>
          <CardDescription>Real-time payment status and automatic customer information capture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {qrPayments.map((payment) => (
              <div key={payment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
                      {payment.status === "completed" ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : payment.status === "pending" ? (
                        <Clock className="h-6 w-6 text-yellow-600" />
                      ) : (
                        <QrCode className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-medium">{payment.vendorName}</p>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{payment.description}</p>
                      <p className="text-lg font-bold text-blue-600">₹{payment.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">{payment.createdAt}</p>
                    </div>
                  </div>

                  {/* Customer Details (Auto-filled when payment is completed) */}
                  {payment.customer && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 ml-4 min-w-[300px]">
                      <div className="flex items-center mb-2">
                        <User className="h-4 w-4 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">Customer Details</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <User className="h-3 w-3 text-gray-500 mr-2" />
                          <span>{payment.customer.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 text-gray-500 mr-2" />
                          <span>{payment.customer.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 text-gray-500 mr-2" />
                          <span>{payment.customer.email}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 text-gray-500 mr-2" />
                          <span>{payment.customer.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Smartphone className="h-3 w-3 text-gray-500 mr-2" />
                          <span>{payment.paymentMethod.toUpperCase()}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Total Purchases: {payment.customer.totalPurchases} | Last: {payment.customer.lastPurchase}
                        </div>
                      </div>
                    </div>
                  )}

                  {payment.status === "pending" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 ml-4 min-w-[200px]">
                      <div className="flex items-center mb-2">
                        <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="font-medium text-yellow-800">Waiting for Payment</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Customer details will appear automatically when payment is completed
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total QR Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qrPayments.length}</div>
            <p className="text-xs text-gray-500">Generated today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Completed Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {qrPayments.filter((p) => p.status === "completed").length}
            </div>
            <p className="text-xs text-gray-500">
              ₹
              {qrPayments
                .filter((p) => p.status === "completed")
                .reduce((sum, p) => sum + p.amount, 0)
                .toLocaleString()}{" "}
              collected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Unique Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{qrPayments.filter((p) => p.customer).length}</div>
            <p className="text-xs text-gray-500">Auto-captured profiles</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
