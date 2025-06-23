"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  QrCode,
  Banknote,
  CheckCircle,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Mic,
  MicOff,
  Zap,
  IndianRupee,
  Users,
  TrendingUp,
} from "lucide-react"

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  paymentMethod: string
  timestamp: string
}

interface Transaction {
  id: string
  vendorId: string
  vendorName: string
  amount: number
  type: "qr" | "cash"
  status: "completed" | "pending"
  customer?: Customer
  timestamp: string
  description: string
}

interface Vendor {
  id: string
  name: string
  upiId: string
}

export function InstantPaymentSystem() {
  const [vendors] = useState<Vendor[]>([
    { id: "1", name: "Fresh Foods Co.", upiId: "freshfoods@paytm" },
    { id: "2", name: "Tech Solutions Ltd.", upiId: "techsolutions@gpay" },
    { id: "3", name: "Office Supplies Inc.", upiId: "office@phonepe" },
  ])

  const [selectedVendor, setSelectedVendor] = useState("1")
  const [amount, setAmount] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [currentQR, setCurrentQR] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  // Voice recognition setup
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const speechRecognition = new (window as any).webkitSpeechRecognition()
      speechRecognition.continuous = false
      speechRecognition.interimResults = false
      speechRecognition.lang = "en-IN"

      speechRecognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        handleVoiceCommand(transcript)
      }

      speechRecognition.onend = () => {
        setIsListening(false)
      }

      setRecognition(speechRecognition)
    }
  }, [])

  const handleVoiceCommand = (command: string) => {
    console.log("Voice command:", command)

    // Extract amount from voice
    const amountMatch = command.match(/(\d+)/)
    if (amountMatch) {
      setAmount(amountMatch[1])
    }

    // Check for payment type
    if (command.includes("qr") || command.includes("code")) {
      generateInstantQR()
    } else if (command.includes("cash")) {
      handleCashPayment()
    }
  }

  const startVoiceInput = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  const stopVoiceInput = () => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }

  // Generate QR instantly without forms
  const generateInstantQR = () => {
    if (!amount) {
      alert("Please enter amount first!")
      return
    }

    const vendor = vendors.find((v) => v.id === selectedVendor)
    if (!vendor) return

    const qrData = `upi://pay?pa=${vendor.upiId}&pn=${encodeURIComponent(vendor.name)}&am=${amount}&cu=INR`
    setCurrentQR(qrData)
    setIsProcessingPayment(true)

    // Simulate customer scanning and payment completion
    setTimeout(() => {
      const mockCustomer: Customer = {
        id: `CUST${Date.now()}`,
        name: ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Reddy"][Math.floor(Math.random() * 4)],
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `customer${Math.floor(Math.random() * 1000)}@email.com`,
        address: ["Mumbai", "Delhi", "Bangalore", "Chennai"][Math.floor(Math.random() * 4)] + " Area",
        paymentMethod: "UPI",
        timestamp: new Date().toLocaleString(),
      }

      const newTransaction: Transaction = {
        id: `TXN${Date.now()}`,
        vendorId: selectedVendor,
        vendorName: vendor.name,
        amount: Number.parseFloat(amount),
        type: "qr",
        status: "completed",
        customer: mockCustomer,
        timestamp: new Date().toLocaleString(),
        description: "QR Payment",
      }

      setTransactions((prev) => [newTransaction, ...prev])
      setCurrentQR(null)
      setAmount("")
      setIsProcessingPayment(false)

      // Success notification
      alert(`Payment Received! ₹${amount} from ${mockCustomer.name}`)
    }, 3000) // 3 seconds to simulate payment
  }

  // Handle cash payment
  const handleCashPayment = () => {
    if (!amount) {
      alert("Please enter amount first!")
      return
    }

    const vendor = vendors.find((v) => v.id === selectedVendor)
    if (!vendor) return

    const mockCustomer: Customer = {
      id: `CUST${Date.now()}`,
      name: "Walk-in Customer",
      phone: "Not provided",
      email: "Not provided",
      address: "Not provided",
      paymentMethod: "Cash",
      timestamp: new Date().toLocaleString(),
    }

    const newTransaction: Transaction = {
      id: `TXN${Date.now()}`,
      vendorId: selectedVendor,
      vendorName: vendor.name,
      amount: Number.parseFloat(amount),
      type: "cash",
      status: "completed",
      customer: mockCustomer,
      timestamp: new Date().toLocaleString(),
      description: "Cash Payment",
    }

    setTransactions((prev) => [newTransaction, ...prev])
    setAmount("")
    alert(`Cash Payment Recorded! ₹${amount}`)
  }

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0)
  const qrPayments = transactions.filter((t) => t.type === "qr").length
  const cashPayments = transactions.filter((t) => t.type === "cash").length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Vyapaari - Instant Payment System</h2>
        <p className="text-gray-600">Quick QR & Cash payments with automatic customer tracking</p>
      </div>

      {/* Quick Payment Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              Quick Payment
            </CardTitle>
            <CardDescription>Customer wants to pay - Choose payment method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Vendor Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Vendor</label>
              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount Input with Voice */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (₹)</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={isListening ? stopVoiceInput : startVoiceInput}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              {isListening && (
                <p className="text-sm text-blue-600 animate-pulse">🎤 Listening... Say "QR 500" or "Cash 200"</p>
              )}
            </div>

            {/* Payment Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={generateInstantQR}
                disabled={!amount || isProcessingPayment}
                className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <QrCode className="h-6 w-6 mr-2" />
                <div>
                  <div className="font-bold">QR Payment</div>
                  <div className="text-xs opacity-90">Generate QR Code</div>
                </div>
              </Button>

              <Button
                onClick={handleCashPayment}
                disabled={!amount}
                variant="outline"
                className="h-16 border-2 border-green-200 hover:bg-green-50"
              >
                <Banknote className="h-6 w-6 mr-2 text-green-600" />
                <div>
                  <div className="font-bold text-green-700">Cash Payment</div>
                  <div className="text-xs text-green-600">Record Cash</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Display */}
        {currentQR && (
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="h-5 w-5 mr-2 text-green-600" />
                Customer Scan This QR
              </CardTitle>
              <CardDescription>Waiting for customer payment...</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-white p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-20 w-20 mx-auto mb-2 text-gray-400 animate-pulse" />
                    <p className="text-lg font-bold">₹{amount}</p>
                    <p className="text-sm text-gray-500">Scan to Pay</p>
                  </div>
                </div>
              </div>
              {isProcessingPayment && (
                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <Clock className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Processing payment...</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Analytics Cards */}
        {!currentQR && (
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <IndianRupee className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                  <div className="text-lg font-bold">₹{totalRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <QrCode className="h-6 w-6 mx-auto mb-1 text-green-600" />
                  <div className="text-lg font-bold">{qrPayments}</div>
                  <div className="text-xs text-gray-600">QR Payments</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <Banknote className="h-6 w-6 mx-auto mb-1 text-yellow-600" />
                  <div className="text-lg font-bold">{cashPayments}</div>
                  <div className="text-xs text-gray-600">Cash Payments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Live Transaction Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Live Transaction Feed
            <Badge className="ml-2 bg-green-100 text-green-800">{transactions.length} transactions</Badge>
          </CardTitle>
          <CardDescription>Real-time customer details and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No transactions yet. Start accepting payments!</p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${
                          transaction.type === "qr" ? "bg-blue-100" : "bg-green-100"
                        }`}
                      >
                        {transaction.type === "qr" ? (
                          <QrCode className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Banknote className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-bold text-lg">₹{transaction.amount.toLocaleString()}</span>
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            PAID
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{transaction.vendorName}</p>
                        <p className="text-xs text-gray-400">{transaction.timestamp}</p>
                      </div>
                    </div>

                    {/* Auto-captured Customer Details */}
                    {transaction.customer && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 min-w-[280px]">
                        <div className="flex items-center mb-2">
                          <User className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="font-medium text-blue-800">Customer Details</span>
                          <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">AUTO-CAPTURED</Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <User className="h-3 w-3 text-gray-500 mr-2" />
                            <span>{transaction.customer.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 text-gray-500 mr-2" />
                            <span>{transaction.customer.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 text-gray-500 mr-2" />
                            <span>{transaction.customer.email}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 text-gray-500 mr-2" />
                            <span>{transaction.customer.address}</span>
                          </div>
                          <div className="text-xs text-blue-600 mt-2 font-medium">
                            Payment: {transaction.customer.paymentMethod}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
