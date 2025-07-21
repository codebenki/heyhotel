"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  checkInDate: z.string().min(1, "Check-in date is required"),
  checkOutDate: z.string().min(1, "Check-out date is required"),
  guests: z
    .number()
    .min(1, "At least one guest is required")
    .max(10, "Maximum 10 guests allowed"),
});

export function HotelSearchForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        destination: "",
        checkInDate: "",
        checkOutDate: "",
        guests: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted values:", values);
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="text-gray-700 bg-white p-2 rounded-lg space-y-2">
        {Object.keys(form.formState.errors).length > 0 && (
            <p className="text-sm text-red-500 font-medium">Invalid input</p>
        )}
        <div className="grid gap-4 sm:grid-cols-4">
            <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Where to?" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            
            <FormField
            control={form.control}
            name="checkInDate"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Check In Date</FormLabel>
                <FormControl>
                    <Input type="date" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="checkOutDate"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Check Out Date</FormLabel>
                <FormControl>
                    <Input type="date" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Guests</FormLabel>
                <FormControl>
                    <Input type="number" min={1} max={10} placeholder="1" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
        </div>
        <Button type="submit" className="text-gray-600 w-full bg-gradient-to-r from-blue-200 to-yellow-200">Search Hotels</Button>
    </form>
    </Form>
  );
}
