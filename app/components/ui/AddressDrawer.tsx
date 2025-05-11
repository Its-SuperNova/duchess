import {
  Drawer,
  DrawerTrigger,
  DrawerContent as ShadcnDrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerClose as DrawerCloseBtn,
} from "../../../components/ui/drawer";
import { Plus } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Home, MapPin, Building, Landmark, Hash } from "lucide-react";
import React from "react";

interface Address {
  label: string;
  address: string;
}

interface AddressDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  addresses: Address[];
  selectedAddress: number;
  setSelectedAddress: (idx: number) => void;
  showAddAddress: boolean;
  setShowAddAddress: (show: boolean) => void;
}

const AddressDrawer: React.FC<AddressDrawerProps> = ({
  open,
  setOpen,
  addresses,
  selectedAddress,
  setSelectedAddress,
  showAddAddress,
  setShowAddAddress,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <ShadcnDrawerContent className="rounded-t-2xl w-full h-[70vh] bg-[#F5F6FB]">
        <DrawerHeader>
          <DrawerTitle>Select Delivery Address</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 my-2">
          <div className="flex items-center w-full gap-3 mb-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[14px] text-gray-400 uppercase font-semibold tracking-widest">
              Saved Addresses
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto px-4 pb-4"
          style={{ maxHeight: "calc(70vh - 80px)" }}
        >
          {addresses.map((addr, idx) => (
            <label
              key={idx}
              className={`flex items-center gap-3 cursor-pointer w-full mb-3 last:mb-0 bg-white p-4 rounded-xl shadow-sm border transition-all ${
                selectedAddress === idx ? "border-primary" : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                checked={selectedAddress === idx}
                onChange={() => setSelectedAddress(idx)}
                className={`form-radio h-4 w-4 border-gray-300 focus:ring-primary mt-1 ${
                  selectedAddress === idx
                    ? "text-primary checked:bg-primary checked:border-primary checked:accent-primary"
                    : "text-gray-400"
                }`}
                style={
                  selectedAddress === idx
                    ? {
                        accentColor:
                          "var(--tw-prose-primary, theme(colors.primary.DEFAULT))",
                      }
                    : {}
                }
              />
              <span className="flex flex-col">
                <span className="text-base font-semibold text-gray-800 mb-1">
                  {addr.label}
                </span>
                <span className="text-sm text-gray-500 leading-snug">
                  {(() => {
                    const [line1, ...rest] = addr.address.split(",");
                    return (
                      <>
                        <span className="text-sm text-gray-500 leading-snug">
                          {line1.trim()}
                        </span>
                        <span className="text-sm text-gray-500 leading-snug">
                          {rest.join(",").trim()}
                        </span>
                      </>
                    );
                  })()}
                </span>
              </span>
            </label>
          ))}
        </div>
        <DrawerFooter>
          <button
            className="px-4 py-3 rounded-[12px] border  font-semibold bg-gray-50 text-primary flex items-center gap-2 justify-center border-primary"
            onClick={() => setShowAddAddress(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add New Address
          </button>
          <DrawerCloseBtn asChild>
            <button
              className="px-4 py-3 rounded-[12px] border bg-primary text-white font-semibold hover:bg-gray-900 border-primary"
              onClick={() => setOpen(false)}
            >
              Done
            </button>
          </DrawerCloseBtn>
        </DrawerFooter>
      </ShadcnDrawerContent>
    </Drawer>
  );
};

export default AddressDrawer;
