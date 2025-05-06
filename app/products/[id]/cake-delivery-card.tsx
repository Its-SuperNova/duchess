"use client";

import {
  Check,
  Flame,
  Gift,
  MessageSquare,
  Pencil,
  Utensils,
  Clock,
  MapPin,
  Percent,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogContent as ShadcnDialogContent } from "@/components/ui/dialog";

const DialogContent = (props: any) => (
  <ShadcnDialogContent
    {...props}
    className={(props.className || "") + " rounded-2xl"}
  />
);

export default function CakeDeliveryCard() {
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<
    "same-day" | "scheduled"
  >("same-day");
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    string[]
  >([]);
  const { toast } = useToast();
  const [cakeText, setCakeText] = useState("");
  const [messageCardText, setMessageCardText] = useState("");
  const [openModal, setOpenModal] = useState<null | "text" | "card">(null);
  const [tempCakeText, setTempCakeText] = useState("");
  const [tempMessageCardText, setTempMessageCardText] = useState("");
  const [dialogType, setDialogType] = useState<null | "text" | "card">(null);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const addresses = [
    "123 Main St, New Delhi, 110001",
    "456 Park Ave, Mumbai, 400001",
    "789 Lake Rd, Bangalore, 560001",
    "101 Hilltop, Pune, 411001",
  ];

  const toggleCustomization = (option: string) => {
    if (selectedCustomizations.includes(option)) {
      setSelectedCustomizations(
        selectedCustomizations.filter((item) => item !== option)
      );
    } else {
      setSelectedCustomizations([...selectedCustomizations, option]);
      if (option === "text") {
        setTempCakeText(cakeText);
        setOpenModal("text");
      } else if (option === "card") {
        setTempMessageCardText(messageCardText);
        setOpenModal("card");
      }
    }
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast({
          title: "Coupon copied",
          className: "bg-green-50 text-green-800 border-green-300 py-3",
          duration: 2000,
        });
      })
      .catch((error) => {
        console.error("Failed to copy code:", error);
        toast({
          title: "Failed to copy",
          variant: "destructive",
          duration: 2000,
        });
      });
  };

  const getCustomizationOptions = () => [
    {
      id: "text",
      icon: <Pencil className="h-4 w-4" />,
      label: "Add text on cake",
      description: "Add a short message to be written on the cake",
    },
    {
      id: "candles",
      icon: <Flame className="h-4 w-4" />,
      label: "Add candles",
      description: "Add birthday candles to your cake",
    },
    {
      id: "knife",
      icon: <Utensils className="h-4 w-4" />,
      label: "Add knife",
      description: "Include a cake knife with your order",
    },
    {
      id: "card",
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Add message card",
      description: "Include a personalized message card",
    },
  ];

  // Radio button for address selection
  function AddressRadio({
    checked,
    onChange,
    label,
  }: {
    checked: boolean;
    onChange: () => void;
    label: string;
  }) {
    return (
      <label
        className="flex items-center gap-3 cursor-pointer w-full px-4 py-3 rounded-lg border transition-all "
        style={{
          borderColor: checked ? "black" : "#e5e7eb",
          background: checked ? "#f3f4f6" : "white",
        }}
      >
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className="form-radio h-4 w-4 text-black border-gray-300 focus:ring-black"
        />
        <span className="block text-base text-gray-900">{label}</span>
      </label>
    );
  }

  return (
    <div className="px-8">
      <Card className="w-full bg-white shadow-sm rounded-2xl overflow-hidden ">
        <CardContent className="grid gap-6 p-6">
          {/* Delivery Options - Minimalist */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800">
              Delivery Options
            </h3>

            {/* Delivery Details */}
            {selectedDeliveryOption === "same-day" ? (
              <div className="flex items-center gap-2 text-sm text-green-700 mt-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Same-day delivery available</span>
                <span className="mx-1">•</span>
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Today, 5-7pm</span>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {["Today", "Tomorrow", "Wed", "Thu"].map((day) => (
                  <button
                    key={day}
                    className="py-2 text-sm border border-gray-200 rounded-lg hover:border-[#560000]/30 hover:bg-[#560000]/5"
                  >
                    {day}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
              <div className="flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>
                  Delivering to:{" "}
                  {addresses[selectedAddress].split(",").slice(-1)[0].trim()}
                </span>
              </div>
              <Dialog
                open={addressDialogOpen}
                onOpenChange={setAddressDialogOpen}
              >
                <DialogTrigger asChild>
                  <button
                    className="text-black font-medium text-xs"
                    onClick={() => {
                      setShowAddAddress(false);
                    }}
                  >
                    Change
                  </button>
                </DialogTrigger>
                <DialogContent>
                  {!showAddAddress ? (
                    <>
                      <DialogHeader>
                        <DialogTitle>Select Delivery Address</DialogTitle>
                        <DialogDescription>
                          Choose an address for delivery or add a new one.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3 my-4">
                        {addresses.map((addr, idx) => (
                          <AddressRadio
                            key={idx}
                            checked={selectedAddress === idx}
                            onChange={() => setSelectedAddress(idx)}
                            label={addr}
                          />
                        ))}
                      </div>
                      <DialogFooter>
                        <button
                          className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowAddAddress(true)}
                        >
                          Add New Address
                        </button>
                        <DialogClose asChild>
                          <button
                            className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900"
                            onClick={() => setAddressDialogOpen(false)}
                          >
                            Done
                          </button>
                        </DialogClose>
                      </DialogFooter>
                    </>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                        <DialogDescription>
                          Enter your new address below.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-3 my-4">
                        <Input
                          placeholder="Street, Area"
                          className="bg-white text-sm"
                        />
                        <Input
                          placeholder="City"
                          className="bg-white text-sm"
                        />
                        <Input
                          placeholder="State"
                          className="bg-white text-sm"
                        />
                        <Input
                          placeholder="Pincode"
                          className="bg-white text-sm"
                        />
                      </form>
                      <DialogFooter>
                        <button
                          className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowAddAddress(false)}
                        >
                          Back
                        </button>
                        <DialogClose asChild>
                          <button
                            className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900"
                            onClick={() => setAddressDialogOpen(false)}
                          >
                            Save
                          </button>
                        </DialogClose>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Separator />

          {/* Customization - Enhanced with Input Fields */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800">
              Customization
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {getCustomizationOptions().map((option) => (
                <Dialog
                  key={option.id}
                  open={dialogType === option.id}
                  onOpenChange={(open) => {
                    if (open) {
                      if (!selectedCustomizations.includes(option.id)) {
                        toggleCustomization(option.id);
                      }
                      setDialogType(option.id as "text" | "card");
                      if (option.id === "text") setTempCakeText(cakeText);
                      if (option.id === "card")
                        setTempMessageCardText(messageCardText);
                    } else {
                      setDialogType(null);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <button
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                        selectedCustomizations.includes(option.id)
                          ? "border-gray-400 bg-gray-100"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span
                        className={
                          selectedCustomizations.includes(option.id)
                            ? "text-black"
                            : "text-gray-500"
                        }
                      >
                        {option.icon}
                      </span>
                      <span
                        className={`$${
                          selectedCustomizations.includes(option.id)
                            ? "text-black"
                            : "text-gray-700"
                        } truncate`}
                      >
                        {option.label}
                      </span>
                      {selectedCustomizations.includes(option.id) && (
                        <Check className="h-3.5 w-3.5 ml-auto text-black" />
                      )}
                    </button>
                  </DialogTrigger>
                  {(option.id === "text" || option.id === "card") && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {option.id === "text"
                            ? "Text on Cake"
                            : "Message Card"}
                        </DialogTitle>
                        <DialogDescription>
                          {option.id === "text"
                            ? "This will be written on the cake. Max 30 characters."
                            : "This message will be printed on a card."}
                        </DialogDescription>
                      </DialogHeader>
                      {option.id === "text" ? (
                        <>
                          <Input
                            value={tempCakeText}
                            onChange={(e) =>
                              setTempCakeText(e.target.value.slice(0, 30))
                            }
                            placeholder="Happy Birthday John!"
                            className="bg-white text-sm mb-2 focus-visible:ring-black"
                            maxLength={30}
                          />
                          <div className="flex justify-between text-xs text-gray-500 mb-4">
                            <span></span>
                            <span>{tempCakeText.length}/30</span>
                          </div>
                        </>
                      ) : (
                        <Textarea
                          value={tempMessageCardText}
                          onChange={(e) =>
                            setTempMessageCardText(e.target.value)
                          }
                          placeholder="Write your special message here..."
                          className="bg-white text-sm resize-none mb-2 focus-visible:ring-black"
                          rows={3}
                        />
                      )}
                      <DialogFooter>
                        <DialogClose asChild>
                          <button
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                            onClick={() => setDialogType(null)}
                          >
                            Cancel
                          </button>
                        </DialogClose>
                        <DialogClose asChild>
                          <button
                            className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900"
                            onClick={() => {
                              if (option.id === "text")
                                setCakeText(tempCakeText);
                              if (option.id === "card")
                                setMessageCardText(tempMessageCardText);
                              setDialogType(null);
                            }}
                          >
                            Save
                          </button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
              ))}
            </div>

            {/* Selected Customizations Summary */}
            {selectedCustomizations.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  * All customizations will be added to your order when you
                  click "Add to Cart"
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Offers section - Minimalist */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800">Offers</h3>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-green-100 bg-green-50">
                <Percent className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">
                    10% off on orders above ₹1000
                  </p>
                  <p className="text-xs text-green-700">Use code: CAKE10</p>
                </div>
                <button
                  onClick={() => copyCouponCode("CAKE10")}
                  className="text-xs bg-white text-green-700 border border-green-200 rounded-lg px-2 py-1 flex items-center gap-1 hover:bg-green-50 transition-colors"
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-blue-100 bg-blue-50">
                <Gift className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">
                    Free delivery on your first order
                  </p>
                  <p className="text-xs text-blue-700">Use code: FIRSTCAKE</p>
                </div>
                <button
                  onClick={() => copyCouponCode("FIRSTCAKE")}
                  className="text-xs bg-white text-blue-700 border border-blue-200 rounded-lg px-2 py-1 flex items-center gap-1 hover:bg-blue-50 transition-colors"
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
