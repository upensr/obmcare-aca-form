'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Shield, Heart, Home, DollarSign, CheckCircle } from 'lucide-react'

export function AcaInsuranceForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    zipCode: '',
    hasIllness: '',
    incomeSlab: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isQualified, setIsQualified] = useState(false)

  const phoneNumber = '+1 (999)-999-9999'

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleRadioChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleNext = () => {
    if (step < 6) {
      setStep(prevStep => prevStep + 1)
    }
  }

  const handleSubmit = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsQualified(true)
    }, 2000)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center text-primary"><Shield className="mr-2" /> Personal Information</CardTitle>
              <CardDescription>Please enter your full name</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>
            </CardContent>
          </>
        )
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center text-primary"><Heart className="mr-2" /> Date of Birth</CardTitle>
              <CardDescription>Please enter your date of birth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </>
        )
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center text-primary"><Home className="mr-2" /> Location</CardTitle>
              <CardDescription>Please enter your ZIP code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="12345"
                />
              </div>
            </CardContent>
          </>
        )
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center text-primary"><Heart className="mr-2" /> Health Status</CardTitle>
              <CardDescription>Do you have any pre-existing illnesses?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(value) => handleRadioChange('hasIllness', value)}
                value={formData.hasIllness}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="illness-yes" />
                  <Label htmlFor="illness-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="illness-no" />
                  <Label htmlFor="illness-no">No</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </>
        )
      case 5:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center text-primary"><DollarSign className="mr-2" /> Income Information</CardTitle>
              <CardDescription>Is your yearly income under $50,000?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(value) => handleRadioChange('incomeSlab', value)}
                value={formData.incomeSlab}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="under50k" id="income-under50k" />
                  <Label htmlFor="income-under50k">Yes, under $50,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="over50k" id="income-over50k" />
                  <Label htmlFor="income-over50k">No, $50,000 or more</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </>
        )
      case 6:
        if (isProcessing) {
          return (
            <CardContent className="flex flex-col items-center justify-center h-48">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-lg">Processing your information...</p>
            </CardContent>
          )
        } else if (isQualified) {
          return (
            <CardContent className="flex flex-col items-center justify-center h-48">
              <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-4">Congratulations!</h2>
              <p className="text-lg text-center mb-4">
                You're qualified for the Free Affordable Care Act insurance!
              </p>
              <p className="text-lg font-semibold">
                Please dial: <a href={`tel:${phoneNumber}`} className="text-blue-600">{phoneNumber}</a>
              </p>
            </CardContent>
          )
        }
        return null
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-bold text-primary">OBMCARE</span>
            </div>
            <div className="flex items-center">
              <Button asChild variant="outline">
                <a href={`tel:${phoneNumber}`} className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  {phoneNumber}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Affordable Care Act Insurance Eligibility</h1>
          <p className="text-lg text-gray-600">Find out if you qualify for free or low-cost health insurance.</p>
        </div>
        <Card className="w-full max-w-lg mx-auto shadow-lg">
          {renderStep()}
          <CardFooter className="flex justify-between">
            {step < 6 && (
              <Button onClick={handleNext} disabled={step === 6}>
                {step === 5 ? 'Submit' : 'Next'}
              </Button>
            )}
            {step === 6 && !isProcessing && !isQualified && (
              <Button onClick={handleSubmit}>Process Application</Button>
            )}
          </CardFooter>
          <div className="px-6 pb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        </Card>
      </main>
      <footer className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2023 OBMCARE. All rights reserved.</p>
          <p className="mt-2">This is a simulated insurance eligibility checker for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  )
}